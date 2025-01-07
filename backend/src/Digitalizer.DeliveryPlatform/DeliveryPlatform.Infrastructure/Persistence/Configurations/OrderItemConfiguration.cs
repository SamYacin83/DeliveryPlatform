using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Configurations;
public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.HasKey(ol => ol.Id);

        builder.Property(ol => ol.Quantity)
               .IsRequired();

        builder.HasOne<Product>()
               .WithMany()
               .HasForeignKey("ProductId")
               .IsRequired();

        builder.OwnsOne(ol => ol.UnitPrice, money =>
        {
            money.Property(m => m.Amount)
                 .HasColumnName("unit_price_amount")
                 .HasPrecision(18, 2)
                 .IsRequired();

            money.Property(m => m.Currency)
                 .HasColumnName("unit_price_currency")
                 .HasMaxLength(3)
                 .IsRequired();
        });
    }
}