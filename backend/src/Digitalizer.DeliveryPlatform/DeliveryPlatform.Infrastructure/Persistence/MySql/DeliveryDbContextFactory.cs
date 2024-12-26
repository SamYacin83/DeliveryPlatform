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

            var connectionString = configuration.GetConnectionString("Server=localhost; port=3306;Database=Delivery;Uid=root;Pwd=admin;");
            var serverVersion = ServerVersion.AutoDetect("Server=localhost; port=3306;Database=Delivery;Uid=root;Pwd=admin;");
            var optionsBuilder = new DbContextOptionsBuilder<DeliveryDbContext>();
            
            optionsBuilder.UseMySql(connectionString, serverVersion);
            //"Database": "Server=host.docker.internal; port=3306;Database=Delivery;Uid=root;Pwd=admin;"    "Gim": "Server=localhost;Port=7877;Database=gim;Uid=root;Pwd=admin;",
            return new DeliveryDbContext(optionsBuilder.Options);
        }
    }
}