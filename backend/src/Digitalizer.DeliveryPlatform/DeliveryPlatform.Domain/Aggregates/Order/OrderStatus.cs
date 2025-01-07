namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
public enum OrderStatus
{
    Created,
    Submitted,
    Confirmed,
    InDelivery,
    Delivered,
    Cancelled
}
