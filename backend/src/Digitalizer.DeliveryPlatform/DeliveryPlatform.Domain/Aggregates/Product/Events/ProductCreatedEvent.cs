using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Events;
public record ProductCreatedEvent(Guid ProductId) : DomainEvent;
