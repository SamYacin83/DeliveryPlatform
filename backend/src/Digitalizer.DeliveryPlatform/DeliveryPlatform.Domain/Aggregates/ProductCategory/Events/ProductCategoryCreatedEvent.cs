using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory.Events;
public record ProductCategoryUpdatedEvent(Guid CategoryId) : DomainEvent;
