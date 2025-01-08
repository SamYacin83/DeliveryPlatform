using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Application.Data;
public interface IDomainEventService
{
    Task PublishEvents(AggregateRoot aggregate, CancellationToken cancellationToken = default);
}
