using Microsoft.AspNetCore.Diagnostics;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace Digitalizer.DeliveryPlatform.WebApi.Middleware;

internal sealed class ValidationExceptionHandler(ILogger<ValidationExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception,
        CancellationToken cancellationToken)
    {
        if (exception is not ValidationException validationException)
        {
            return false;
        }

        logger.LogError(
            validationException,
            "ValidationException occurred: {Message}",
            validationException.Message);

        var problemDetails = new ValidationProblemDetails(validationException.ValidationResult.MemberNames.ToDictionary(
            memberName => memberName,
            memberName => new[] { validationException.ValidationResult.ErrorMessage ?? string.Empty }))
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1",
            Title = "One or more validation errors occurred.",
            Detail = validationException.Message
        };

        httpContext.Response.StatusCode = problemDetails.Status ?? StatusCodes.Status400BadRequest;

        await httpContext.Response
                         .WriteAsJsonAsync(problemDetails, cancellationToken)
                         .ConfigureAwait(false);

        return true;
    }
}
