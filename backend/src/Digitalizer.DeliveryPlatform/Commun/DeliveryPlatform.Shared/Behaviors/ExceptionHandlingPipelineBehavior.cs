﻿using Digitalizer.DeliveryPlatform.Common.Exceptions;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Digitalizer.DeliveryPlatform.Common.Behaviors;
internal sealed class ExceptionHandlingPipelineBehavior<TRequest, TResponse>(
    ILogger<ExceptionHandlingPipelineBehavior<TRequest, TResponse>> logger)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : class
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        try
        {
            return await next().ConfigureAwait(false);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Unhandled exception for {RequestName}", typeof(TRequest).Name);

            throw new DeliveryPlatformException(typeof(TRequest).Name, innerException: exception);
        }
    }
}
