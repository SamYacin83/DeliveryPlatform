using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Events;
public record ProductPriceUpdatedEvent(Guid ProductId, Money NewPrice) : DomainEvent;
