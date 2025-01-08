using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
public class OrderStatusHistory : Entity
{
    public Guid OrderId { get; private set; }
    public OrderStatus OldStatus { get; private set; }
    public OrderStatus NewStatus { get; private set; }
    public string? Comment { get; private set; }
    public DateTime ChangedAt { get; private set; }

    private OrderStatusHistory() { }

    public static OrderStatusHistory Create(
        Guid orderId,
        OrderStatus oldStatus,
        OrderStatus newStatus,
        string? comment = null)
    {
        return new OrderStatusHistory
               {
                   OrderId = orderId,
                   OldStatus = oldStatus,
                   NewStatus = newStatus,
                   Comment = comment,
                   ChangedAt = DateTime.UtcNow
               };
    }
}
