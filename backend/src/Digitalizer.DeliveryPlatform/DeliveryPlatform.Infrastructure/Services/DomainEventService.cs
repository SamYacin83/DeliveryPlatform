using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Domain.Commun;
using MediatR;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Services;

public class DomainEventService(IPublisher publisher) : IDomainEventService
{
    public async Task PublishEvents(AggregateRoot aggregate, CancellationToken cancellationToken = default)
    {
        foreach (var domainEvent in aggregate.DomainEvents)
        {
            if (domainEvent is INotification notification)
            {
                await publisher.Publish(notification, cancellationToken).ConfigureAwait(false);
            }
        }

        aggregate.ClearDomainEvents();
    }
}
