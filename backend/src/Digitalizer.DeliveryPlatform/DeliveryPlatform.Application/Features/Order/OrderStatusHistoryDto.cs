using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;

namespace Digitalizer.DeliveryPlatform.Application.Features.Order;
public record OrderStatusHistoryDto(
    Guid OrderId,
    OrderStatus OldStatus,
    OrderStatus NewStatus,
    string? Comment,
    DateTime ChangedAt);