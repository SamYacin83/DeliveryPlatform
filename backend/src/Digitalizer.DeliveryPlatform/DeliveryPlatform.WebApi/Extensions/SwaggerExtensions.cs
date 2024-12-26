using Microsoft.OpenApi.Models;

namespace Digitalizer.DeliveryPlatform.WebApi.Extensions;

public static class SwaggerExtensions
{
    public static IServiceCollection AddSwaggerConfiguration(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
                                     {
                                         Title = "Delivery Platform API",
                                         Version = "v1",
                                         Description = "API pour la plateforme de livraison",
                                         Contact = new OpenApiContact
                                                   {
                                                       Name = "Digitalizer",
                                                       Email = "contact@digitalizer.com"
                                                   }
                                     });
        });

        return services;
    }

    public static WebApplication UseSwaggerConfiguration(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Delivery Platform API v1");
                options.RoutePrefix = "swagger";
            });
            app.ApplyMigrations();
        }

        return app;
    }

    public static RouteHandlerBuilder WithApiDescription(
        this RouteHandlerBuilder builder,
        string summary,
        string? description = null) 
    {
        return builder.WithOpenApi(operation =>
        {
            operation.Summary = summary;
            if (description != null)
            {
                operation.Description = description;
            }
            return operation;
        });
    }
}
