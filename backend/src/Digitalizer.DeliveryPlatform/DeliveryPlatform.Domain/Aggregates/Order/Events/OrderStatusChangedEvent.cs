using Digitalizer.DeliveryPlatform.Domain.Commun;
using MediatR;
namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Events;
public record OrderStatusChangedEvent(
    Guid OrderId,
    OrderStatus OldStatus,
    OrderStatus NewStatus,
    string? Comment = null)
    : DomainEvent, INotification
{
    public DateTime ChangedAt { get; } = DateTime.UtcNow;
}
