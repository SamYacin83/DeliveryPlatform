using MediatR;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using Serilog.Context;
using Digitalizer.DeliveryPlatform.Common.Results;

namespace Digitalizer.DeliveryPlatform.Common.Behaviors;

internal sealed class RequestLoggingPipelineBehavior<TRequest, TResponse>(
    ILogger<RequestLoggingPipelineBehavior<TRequest, TResponse>> logger)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : class
    where TResponse : Result
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        string featureName = GetFeatureName(typeof(TRequest).FullName!);
        string requestName = typeof(TRequest).Name;

        Activity.Current?.SetTag("request.feature", featureName);
        Activity.Current?.SetTag("request.name", requestName);

        using (LogContext.PushProperty("Features", featureName))
        {
            logger.LogInformation(
                "Processing request {RequestName} in feature {FeatureName}",
                requestName,
                featureName);

            TResponse result = await next().ConfigureAwait(false);

            if (result.IsSuccess)
            {
                logger.LogInformation(
                    "Completed request {RequestName} in feature {FeatureName}",
                    requestName,
                    featureName);
            }
            else
            {
                using (LogContext.PushProperty("Error", result.Error, true))
                {
                    logger.LogError(
                        "Completed request {RequestName} in feature {FeatureName} with error",
                        requestName,
                        featureName);
                }
            }

            return result;
        }
    }

    private static string GetFeatureName(string requestName)
    {
        string[] parts = requestName.Split('.');

        // Trouver l'index de "Features" s'il existe
        int featuresIndex = Array.IndexOf(parts, "Features");
        if (featuresIndex >= 0 && featuresIndex + 1 < parts.Length)
        {
            return parts[featuresIndex + 1];
        }

        // Si "Features" n'est pas trouvé, essayer de trouver le nom après "Application"
        int applicationIndex = Array.IndexOf(parts, "Application");
        if (applicationIndex >= 0 && applicationIndex + 2 < parts.Length)
        {
            return parts[applicationIndex + 2];
        }

        // Si aucun pattern n'est trouvé, retourner la partie après le dernier point
        return parts.Length > 1 ? parts[^2] : "Unknown";
    }
}