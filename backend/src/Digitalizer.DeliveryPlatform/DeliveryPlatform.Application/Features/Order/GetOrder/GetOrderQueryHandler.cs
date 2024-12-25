using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;

namespace Digitalizer.DeliveryPlatform.Application.Features.Order.GetOrder;
internal sealed class GetOrderQueryHandler : IQueryHandler<GetOrderQuery, OrderDto>
{
    public async Task<Result<OrderDto>> Handle(GetOrderQuery request, CancellationToken cancellationToken)
    {
        // Simulate fetching order data
        var order = await Task.Run(() => new OrderDto(Guid.NewGuid(), new List<OrderItemDto>(), 100.0m, "USD")).ConfigureAwait(false);

        // Return the result
        return order;
    }
}
