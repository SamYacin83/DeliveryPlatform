using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;

namespace Digitalizer.DeliveryPlatform.Application.Features.Order;
public record OrderItemDto(
    Guid ProductId,
    string? ProductName,
    int Quantity,
    Money UnitPrice);
