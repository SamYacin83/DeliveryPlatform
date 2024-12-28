using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql
{
    public class DeliveryDbContextFactory : IDesignTimeDbContextFactory<DeliveryDbContext>
    {
        public DeliveryDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                                .AddUserSecrets<DeliveryDbContextFactory>()
                                .Build();

            var connectionString = configuration.GetConnectionString("Database");
            var serverVersion = ServerVersion.AutoDetect(connectionString);
            var optionsBuilder = new DbContextOptionsBuilder<DeliveryDbContext>();
            
            optionsBuilder.UseMySql(connectionString, serverVersion);
            return new DeliveryDbContext(optionsBuilder.Options);
        }
    }
}