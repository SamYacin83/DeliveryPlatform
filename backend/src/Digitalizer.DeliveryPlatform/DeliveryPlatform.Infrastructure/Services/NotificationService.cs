using Digitalizer.DeliveryPlatform.Application.Features.Order;
using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Digitalizer.DeliveryPlatform.Infrastructure.SignalR;
using Microsoft.AspNetCore.SignalR;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Services;

public class NotificationService(IHubContext<NotificationHub> hubContext) : INotificationService
{
    public async Task NotifyOrderStatusChanged(Guid orderId, OrderStatus newStatus)
    {
        await hubContext.Clients
                         .Group($"order-{orderId}")
                         .SendAsync("OrderStatusChanged", new
                                                          {
                                                              OrderId = orderId,
                                                              Status = newStatus,
                                                              Timestamp = DateTime.UtcNow
                                                          }).ConfigureAwait(false);
    }

    public async Task NotifyNewOrder(OrderDto order)
    {
        await hubContext.Clients
                         .Group("admin-orders")
                         .SendAsync("NewOrder", order).ConfigureAwait(false);
    }

    public async Task NotifySupplierOrderReceived(Guid supplierId, OrderDto order)
    {
        await hubContext.Clients
                         .Group($"supplier-{supplierId}")
                         .SendAsync("NewOrder", order).ConfigureAwait(false);
    }
}
