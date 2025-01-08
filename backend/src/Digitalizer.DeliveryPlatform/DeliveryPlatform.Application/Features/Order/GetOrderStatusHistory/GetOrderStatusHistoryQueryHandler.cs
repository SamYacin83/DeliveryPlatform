using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;

namespace Digitalizer.DeliveryPlatform.Application.Features.Order.GetOrderStatusHistory;
public class GetOrderStatusHistoryQueryHandler(IOrderStatusHistoryRepository repository) : IQueryHandler<GetOrderStatusHistoryQuery, IEnumerable<OrderStatusHistoryDto>>
{
    public async Task<Result<IEnumerable<OrderStatusHistoryDto>>> Handle(GetOrderStatusHistoryQuery request, CancellationToken cancellationToken)
    {
        var history = await repository.GetByOrderIdAsync(request.OrderId).ConfigureAwait(false);

        var result = history.Select(h => new OrderStatusHistoryDto(
            h.OrderId,
            h.OldStatus,
            h.NewStatus,
            h.Comment,
            h.ChangedAt
        ));

        return Result.Success<IEnumerable<OrderStatusHistoryDto>>(result);
    }
}
