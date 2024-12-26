using Digitalizer.DeliveryPlatform.Application.Data;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Installers
{
    public static class EntityFrameworkInstaller
    {
        public static IServiceCollection AddPersistence(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddScoped<IDeliveryDbContext>(sp =>
                sp.GetRequiredService<DeliveryDbContext>());

            var connectionString = configuration.GetConnectionString("Database");
            
            services.AddDbContext<DeliveryDbContext>(options =>
                options.UseMySql(
                    connectionString,
                    ServerVersion.AutoDetect(connectionString),
                    b => b.MigrationsAssembly(typeof(DeliveryDbContext).Assembly.FullName)
                ).UseSnakeCaseNamingConvention()
                .LogTo(Console.WriteLine)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
            );

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            return services;
        }
    }
}
