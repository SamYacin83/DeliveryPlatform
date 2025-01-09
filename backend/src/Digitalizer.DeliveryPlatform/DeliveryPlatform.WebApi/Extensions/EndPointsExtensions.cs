using Digitalizer.DeliveryPlatform.WebApi.EndPoints;

namespace Digitalizer.DeliveryPlatform.WebApi.Extensions;

public static class EndpointsExtensions
{
    public static IServiceCollection AddEndpoints(this IServiceCollection services)
    {
        var endpointTypes = AppDomain.CurrentDomain.GetAssemblies()
                                     .SelectMany(assembly => assembly.GetTypes())
                                     .Where(type => !type.IsAbstract && !type.IsInterface)
                                     .Where(type => typeof(IEndpoint).IsAssignableFrom(type));

        foreach (var type in endpointTypes)
        {
            services.AddTransient(typeof(IEndpoint), type);
        }

        return services;
    }

    public static WebApplication MapEndpoints(this WebApplication app)
    {
        var endpoints = app.Services.GetServices<IEndpoint>();
        var apiGroup = app.MapGroup("/api");

        foreach (var endpoint in endpoints)
        {
            endpoint.MapEndpoint(apiGroup);
        }

        return app;
    }
}
