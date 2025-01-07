using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.ValueObjects;
using Digitalizer.DeliveryPlatform.Domain.Enums;

namespace Digitalizer.DeliveryPlatform.Application.Features.Order;
public record OrderDto(
    Guid Id,
    Guid CustomerId,
    decimal TotalAmount,
    OrderStatus Status,
    DeliveryServiceType ServiceType,
    string Street,
    string City,
    string PostalCode,
    string Country,
    IReadOnlyCollection<OrderItemDto> Items);