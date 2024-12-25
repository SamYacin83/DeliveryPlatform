namespace Digitalizer.DeliveryPlatform.Application.Features.Order.GetOrder
{
    public record OrderDto(Guid OrderId, IEnumerable<OrderItemDto> OrderItems, decimal TotalAmount, string Currency);
    public record OrderItemDto(Guid OrderItemId, string productName, decimal price, uint quantity);
}
