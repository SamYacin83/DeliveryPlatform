using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Configurations;
public class ProductCategoryConfiguration : BaseConfiguration<ProductCategory>
{
    public override void Configure(EntityTypeBuilder<ProductCategory> builder)
    {
        base.Configure(builder);

        builder.Property(c => c.Name)
               .HasMaxLength(50)
               .IsRequired();

        builder.Property(c => c.Description)
               .HasMaxLength(200);

        // Indexes
        builder.HasIndex(c => c.Name)
               .IsUnique();
    }
}
