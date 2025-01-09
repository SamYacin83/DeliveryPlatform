using Digitalizer.DeliveryPlatform.Domain.Commun;
using MediatR;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer.Events;
public record CustomerCreatedEvent(Guid CustomerId, string IdentityId) : DomainEvent, INotification
{
    public DateTime CreatedAt { get; } = DateTime.UtcNow;
}
