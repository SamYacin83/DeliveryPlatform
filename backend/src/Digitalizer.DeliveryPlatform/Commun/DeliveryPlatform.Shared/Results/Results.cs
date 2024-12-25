using System.Diagnostics.CodeAnalysis;

namespace Digitalizer.DeliveryPlatform.Common.Results
{
    public class Result
    {
        public Result(bool isSuccess, ErrorResult error)
        {
            if (isSuccess && error != ErrorResult.None ||
                !isSuccess && error == ErrorResult.None)
            {
                throw new ArgumentException("Invalid error", nameof(error));
            }

            IsSuccess = isSuccess;
            Error = error;
        }

        public bool IsSuccess { get; }

        public bool IsFailure => !IsSuccess;

        public ErrorResult Error { get; }

        public static Result Success() => new(true, ErrorResult.None);

        public static Result<TValue> Success<TValue>(TValue value) =>
            new(value, true, ErrorResult.None);

        public static Result Failure(ErrorResult error) => new(false, error);

        public static Result<TValue> Failure<TValue>(ErrorResult error) =>
            new(default, false, error);
    }

    public class Result<TValue>(TValue? value, bool isSuccess, ErrorResult error) : Result(isSuccess, error)
    {

        [NotNull]
        public TValue Value => IsSuccess
            ? value!
            : throw new InvalidOperationException("The value of a failure result can't be accessed.");

#pragma warning disable CA2225
        public static implicit operator Result<TValue>(TValue? value) =>
#pragma warning restore CA2225
            value is not null ? Success(value) : Failure<TValue>(ErrorResult.NullValue);

#pragma warning disable CA1000
        public static Result<TValue> ValidationFailure(ErrorResult error) =>
#pragma warning restore CA1000
            new(default, false, error);
    }

}
