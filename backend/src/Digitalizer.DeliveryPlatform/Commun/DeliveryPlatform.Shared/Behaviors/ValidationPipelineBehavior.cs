using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using FluentValidation;
using FluentValidation.Results;
using MediatR;


namespace Digitalizer.DeliveryPlatform.Common.Behaviors;
internal sealed class ValidationPipelineBehavior<TRequest, TResponse>(
        IEnumerable<IValidator<TRequest>> validators)
        : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IBaseCommand
    {
        public async Task<TResponse> Handle(
            TRequest request,
            RequestHandlerDelegate<TResponse> next,
            CancellationToken cancellationToken)
        {
            var validationFailures = await ValidateAsync(request).ConfigureAwait(false);

            if (validationFailures.Length == 0)
            {
                return await next().ConfigureAwait(false);
            }

            if (typeof(TResponse).IsGenericType &&
                typeof(TResponse).GetGenericTypeDefinition() == typeof(Result<>))
            {
                var resultType = typeof(TResponse).GetGenericArguments()[0];

                var failureMethod = typeof(Result<>)
                    .MakeGenericType(resultType)
                    .GetMethod(nameof(Result<object>.ValidationFailure));

                if (failureMethod is not null)
                {
                return (TResponse)failureMethod!.Invoke(null, [CreateValidationError(validationFailures)])!;
                }
            }
            else if (typeof(TResponse) == typeof(Result))
            {
                return (TResponse)(object)Result.Failure(CreateValidationError(validationFailures));
            }

            throw new ValidationException(validationFailures);
        }

        private async Task<ValidationFailure[]> ValidateAsync(TRequest request)
        {
            if (!validators.Any())
            {
                return [];
            }

            var context = new ValidationContext<TRequest>(request);

            var validationResults = await Task.WhenAll(
                validators.Select(validator => validator.ValidateAsync(context))).ConfigureAwait(false);

            var validationFailures = validationResults
                .Where(validationResult => !validationResult.IsValid)
                .SelectMany(validationResult => validationResult.Errors)
                .ToArray();

            return validationFailures;
        }

        private static ValidationError CreateValidationError(ValidationFailure[] validationFailures) =>
            new(validationFailures.Select(f => ErrorResult.Problem(f.ErrorCode, f.ErrorMessage)).ToArray());
    }
