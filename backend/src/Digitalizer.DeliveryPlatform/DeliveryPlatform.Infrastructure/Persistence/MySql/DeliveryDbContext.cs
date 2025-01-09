using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.User;
using Digitalizer.DeliveryPlatform.Domain.Commun;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;


public class DeliveryDbContext(DbContextOptions<DeliveryDbContext> options) : IdentityDbContext<ApplicationUser, IdentityRole, string>(options), IDeliveryDbContext
{
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductCategory> ProductCategory { get; set; }
    public DbSet<Order> Order { get; set; }
    public DbSet<OrderItem> OrderItem { get; set; }
    public DbSet<OrderStatusHistory> OrderStatusHistories { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSnakeCaseNamingConvention();
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Seed les rôles par défaut
        builder.Entity<IdentityRole>().HasData(
            new IdentityRole { Name = "Customer", NormalizedName = "CUSTOMER" },
            new IdentityRole { Name = "Driver", NormalizedName = "DRIVER" },
            new IdentityRole { Name = "Supplier", NormalizedName = "SUPPLIER" },
            new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
        );

        builder.ApplyConfigurationsFromAssembly(typeof(DeliveryDbContext).Assembly);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateAuditableEntities();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateAuditableEntities()
    {
        var entries = ChangeTracker.Entries<Entity>();
        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Modified)
            {
                entry.Entity.SetUpdatedAt(DateTime.UtcNow);
            }
        }
    }
}


