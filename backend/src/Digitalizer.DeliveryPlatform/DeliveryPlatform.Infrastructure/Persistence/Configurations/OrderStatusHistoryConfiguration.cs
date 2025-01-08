using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Configurations;
public class OrderStatusHistoryConfiguration : BaseConfiguration<OrderStatusHistory>
{
    public override void Configure(EntityTypeBuilder<OrderStatusHistory> builder)
    {
        base.Configure(builder);

        builder.Property(h => h.OrderId)
               .IsRequired();

        builder.Property(h => h.OldStatus)
               .HasConversion<string>()
               .IsRequired();

        builder.Property(h => h.NewStatus)
               .HasConversion<string>()
               .IsRequired();

        builder.Property(h => h.Comment)
               .HasMaxLength(500);

        builder.Property(h => h.ChangedAt)
               .IsRequired();

        builder.HasIndex(h => h.OrderId);
        builder.HasIndex(h => h.ChangedAt);

        builder.HasOne<Order>()
               .WithMany()
               .HasForeignKey(h => h.OrderId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
    }
}
