using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Events;
public record DeliveryPersonCreatedEvent(Guid DeliveryPersonId, string FullName) : DomainEvent;
