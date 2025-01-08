using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Events;
public record OrderCancelledEvent(Guid OrderId, string Reason) : DomainEvent
{
    public DateTime CancelledAt { get; } = DateTime.UtcNow;
}