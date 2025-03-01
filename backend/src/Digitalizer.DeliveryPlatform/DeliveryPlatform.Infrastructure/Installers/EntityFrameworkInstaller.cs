﻿using Digitalizer.DeliveryPlatform.Application.Identity;
using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Caching.Services;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Repositories;
using Digitalizer.DeliveryPlatform.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

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
            );

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IProductCategoryRepository, ProductCategoryRespository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderStatusHistoryRepository, OrderStatusHistoryRepository>();
            services.AddScoped<ICacheService, CacheService>();
            services.AddScoped<ICartService, CartService>();
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<IDomainEventService, DomainEventService>();
            services.AddScoped <IIdentityService,IdentityService>();
            services.AddScoped<IEmailService, EmailService>();

            //Redis
            try
            {
#pragma warning disable CA2208
                // ReSharper disable once NotResolvedInText
                var connString = configuration.GetConnectionString("Redis") ?? throw new ArgumentNullException("Redis connection string is missing");
#pragma warning restore CA2208
                IConnectionMultiplexer connectionMultiplexer = ConnectionMultiplexer.Connect(connString);
                services.AddSingleton(connectionMultiplexer);
                services.AddStackExchangeRedisCache(options =>
                    options.ConnectionMultiplexerFactory = () => Task.FromResult(connectionMultiplexer));
            }
            catch (RedisConnectionException)
            {
                services.AddDistributedMemoryCache();
            }

            return services;
        }
    }
}
