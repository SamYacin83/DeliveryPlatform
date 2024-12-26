using Digitalizer.DeliveryPlatform.Application.Data;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;
using Microsoft.EntityFrameworkCore;

namespace Digitalizer.DeliveryPlatform.WebApi.Extensions;

public static class MigrationExtensions
{
    public static void ApplyMigrations(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var dbContext = scope.ServiceProvider.GetRequiredService<DeliveryDbContext>();

        dbContext.Database.Migrate();
    }
}
