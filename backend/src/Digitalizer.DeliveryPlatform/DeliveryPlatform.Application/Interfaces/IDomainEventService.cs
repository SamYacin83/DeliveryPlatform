using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Application.Interfaces;
public interface IDomainEventService
{
    Task PublishEvents(AggregateRoot aggregate, CancellationToken cancellationToken = default);
}
