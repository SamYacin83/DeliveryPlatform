namespace Digitalizer.DeliveryPlatform.Application.Features.Order;
public static class MappingOrder
{
    public static OrderDto MapToOrderDto(this Domain.Aggregates.Order.Order order)
    {
        var orderItems = order.OrderLines.Select(item => new OrderItemDto(
            item.ProductId,
            null,
            item.Quantity,
            item.UnitPrice
        )).ToList();

        return new OrderDto(
            order.Id,
            order.CustomerId.Value,
            order.TotalAmount.Amount,
            order.Status,
            order.DeliveryServiceType,
            order.DeliveryAddress.Street,
            order.DeliveryAddress.City,
            order.DeliveryAddress.PostalCode,
            order.DeliveryAddress.Country,
            orderItems
        );
    }
}
