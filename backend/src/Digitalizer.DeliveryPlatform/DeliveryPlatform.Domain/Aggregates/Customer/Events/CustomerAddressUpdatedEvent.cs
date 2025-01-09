using Digitalizer.DeliveryPlatform.Domain.Commun;
using MediatR;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer.Events;
public record CustomerAddressUpdatedEvent(Guid CustomerId) : DomainEvent, INotification
{
    public DateTime UpdatedAt { get; } = DateTime.UtcNow;
}
