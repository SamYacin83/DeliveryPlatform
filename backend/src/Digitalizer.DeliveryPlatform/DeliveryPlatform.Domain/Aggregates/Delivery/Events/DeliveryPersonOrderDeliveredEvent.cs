using Digitalizer.DeliveryPlatform.Domain.Commun;


namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Events;
public record DeliveryPersonOrderDeliveredEvent(Guid DeliveryPersonId, Guid OrderId) : DomainEvent;
