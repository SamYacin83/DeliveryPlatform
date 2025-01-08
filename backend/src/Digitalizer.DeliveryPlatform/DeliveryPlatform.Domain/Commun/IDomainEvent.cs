using MediatR;

namespace Digitalizer.DeliveryPlatform.Domain.Commun;
public interface IDomainEvent : INotification
{
    Guid EventId { get; }
    DateTime OccurredOn { get; }
}
