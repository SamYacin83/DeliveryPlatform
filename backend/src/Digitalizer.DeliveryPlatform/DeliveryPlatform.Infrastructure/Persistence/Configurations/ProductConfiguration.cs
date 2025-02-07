using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Configurations;
public class ProductConfiguration : BaseConfiguration<Product>
{
    public override void Configure(EntityTypeBuilder<Product> builder)
    {
        base.Configure(builder);

        builder.Property(p => p.Name)
               .HasMaxLength(100)
               .IsRequired();

        builder.Property(p => p.Description)
               .HasMaxLength(500);

        builder.OwnsOne(p => p.Price, money =>
        {
            money.Property(m => m.Amount)
                 .HasColumnName("price_amount")
                 .HasPrecision(18, 2)
                 .IsRequired();

            money.Property(m => m.Currency)
                 .HasColumnName("price_currency")
                 .HasMaxLength(3)
                 .IsRequired();
        });

        builder.Property(p => p.PictureUrl)
               .HasMaxLength(500);

        builder.HasOne<ProductCategory>()
               .WithMany()
               .HasForeignKey("CategoryId")
               .IsRequired();

        builder.Property(p => p.StockQuantity)
               .IsRequired();

        // Indexes
        builder.HasIndex(p => p.Name)
               .IsUnique();

        builder.HasIndex(p => p.CategoryId);
    }
}
