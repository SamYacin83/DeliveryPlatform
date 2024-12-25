using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Digitalizer.DeliveryPlatform.Common.Behaviors;

namespace Digitalizer.DeliveryPlatform.Common.Configuration;

public static class ApplicationConfiguration
{
    private const string AssemblySolution = "Digitalizer.DeliveryPlatform";

    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var assemblies = GetSolutionAssemblies();

        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssemblies(assemblies);
            config.AddOpenBehavior(typeof(ExceptionHandlingPipelineBehavior<,>));
            config.AddOpenBehavior(typeof(RequestLoggingPipelineBehavior<,>));
            config.AddOpenBehavior(typeof(ValidationPipelineBehavior<,>));
        });

        services.AddValidatorsFromAssemblies(assemblies);
        return services;
    }

    private static Assembly[] GetSolutionAssemblies()
    {
        var loadedAssemblies = AppDomain.CurrentDomain.GetAssemblies().ToList();
        var loadedPaths = loadedAssemblies.Select(a => a.Location).ToArray();

        var referencedPaths = Directory
                              .GetFiles(AppDomain.CurrentDomain.BaseDirectory, "*.dll")
                              .Where(path => Path.GetFileName(path).StartsWith(AssemblySolution, StringComparison.Ordinal));

        foreach (var path in referencedPaths)
        {
            if (!loadedPaths.Contains(path, StringComparer.InvariantCultureIgnoreCase))
            {
                loadedAssemblies.Add(Assembly.LoadFrom(path));
            }
        }

        return loadedAssemblies
               .Where(IsRelevantAssembly)
               .ToArray();
    }

    private static bool IsRelevantAssembly(Assembly assembly)
    {
        return assembly.FullName?.StartsWith(AssemblySolution, StringComparison.Ordinal) == true;
    }
}