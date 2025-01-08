namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
public enum OrderStatus
{
    Created,
    Submitted,
    PaymentPending,
    PaymentConfirmed,
    Processing,
    ReadyForDelivery,
    AssignedToDriver,
    InTransit,
    OutForDelivery,
    Delivered,
    Cancelled,
    Failed
}
