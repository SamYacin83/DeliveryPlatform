using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Events;
public record ProductStockUpdatedEvent(Guid ProductId, int OldQuantity, int NewQuantity) : DomainEvent;
