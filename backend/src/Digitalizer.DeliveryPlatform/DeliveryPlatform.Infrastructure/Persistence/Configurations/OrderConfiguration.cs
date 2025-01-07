using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Configurations;
public class OrderConfiguration : BaseConfiguration<Order>
{
    public override void Configure(EntityTypeBuilder<Order> builder)
    {
        base.Configure(builder);

        builder.Property(o => o.CustomerId)
               .HasConversion(
                   id => id.Value,
                   value => new CustomerId(value));

        builder.Property(o => o.DeliveryServiceType)
               .HasConversion<string>();

        builder.HasMany(o => o.OrderLines)
               .WithOne()
               .HasForeignKey("OrderId");

        builder.Property(o => o.Status)
               .HasConversion<string>();

        builder.OwnsOne(o => o.TotalAmount, money =>
        {
            money.Property(m => m.Amount)
                 .HasColumnName("total_amount")
                 .HasPrecision(18, 2);

            money.Property(m => m.Currency)
                 .HasColumnName("currency")
                 .HasMaxLength(3);
        });

        builder.OwnsOne(o => o.DeliveryAddress, address =>
        {
            address.Property(a => a.Street).HasMaxLength(200).IsRequired();
            address.Property(a => a.City).HasMaxLength(100).IsRequired();
            address.Property(a => a.PostalCode).HasMaxLength(20);
            address.Property(a => a.Country).HasMaxLength(100).IsRequired();
        });

        builder.HasIndex(o => o.CustomerId);
        builder.HasIndex(o => o.Status);
    }
}