namespace Digitalizer.DeliveryPlatform.Domain.Commun;
public interface IDomainEvent
{
    Guid EventId { get; }
    DateTime OccurredOn { get; }
}
