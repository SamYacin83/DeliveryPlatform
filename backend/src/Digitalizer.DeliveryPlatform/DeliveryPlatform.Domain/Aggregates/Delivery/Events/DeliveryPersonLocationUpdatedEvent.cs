using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.ValueObjects;
using Digitalizer.DeliveryPlatform.Domain.Commun;


namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Events;
public record DeliveryPersonLocationUpdatedEvent(Guid DeliveryPersonId, Location CurrentLocation) : DomainEvent;
