using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Events;
public record ProductUpdatedEvent(Guid ProductId) : DomainEvent;
