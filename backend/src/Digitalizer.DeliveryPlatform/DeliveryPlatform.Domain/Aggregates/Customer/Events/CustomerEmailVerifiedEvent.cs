using Digitalizer.DeliveryPlatform.Domain.Commun;
using MediatR;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer.Events;
public record CustomerEmailVerifiedEvent(Guid CustomerId) : DomainEvent, INotification
{
    public DateTime VerifiedAt { get; } = DateTime.UtcNow;
}