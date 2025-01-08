using Digitalizer.DeliveryPlatform.Application.Features.Order;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;

namespace Digitalizer.DeliveryPlatform.Application.Data;
public interface INotificationService
{
    Task NotifyOrderStatusChanged(Guid orderId, OrderStatus newStatus);
    Task NotifyNewOrder(OrderDto order);
    Task NotifySupplierOrderReceived(Guid supplierId, OrderDto order);
}
