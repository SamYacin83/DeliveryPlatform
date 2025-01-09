using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Events;
using MediatR;

namespace Digitalizer.DeliveryPlatform.Application.Features.Order.Events;

public class OrderStatusChangedHandler(IOrderStatusHistoryRepository historyRepository, IUnitOfWork unitOfWork, INotificationService notificationService) : INotificationHandler<OrderStatusChangedEvent>
{
    public async Task Handle(OrderStatusChangedEvent notification, CancellationToken cancellationToken)
    {
        var history = OrderStatusHistory.Create(
            notification.OrderId,
            notification.OldStatus,
            notification.NewStatus,
            notification.Comment);

        await historyRepository.AddAsync(history, cancellationToken).ConfigureAwait(false);
        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        await notificationService.NotifyOrderStatusChanged(
            notification.OrderId,
            notification.NewStatus).ConfigureAwait(false);
    }
}