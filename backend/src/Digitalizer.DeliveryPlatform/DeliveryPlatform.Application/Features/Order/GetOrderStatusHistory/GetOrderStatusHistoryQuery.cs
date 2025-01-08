using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.Order.GetOrderStatusHistory;

public sealed record GetOrderStatusHistoryQuery(Guid OrderId) : IQuery<IEnumerable<OrderStatusHistoryDto>>;
