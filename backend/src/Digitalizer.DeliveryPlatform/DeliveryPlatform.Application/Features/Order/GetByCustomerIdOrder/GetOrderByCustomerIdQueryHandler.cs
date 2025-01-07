using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;

namespace Digitalizer.DeliveryPlatform.Application.Features.Order.GetByCustomerIdOrder;
public class GetOrderByCustomerIdQueryHandler(IOrderRepository repository, IProductRepository repositoryProduct) : IQueryHandler<GetOrderByCustomerIdQuery, IEnumerable<OrderDto>>
{
    public async Task<Result<IEnumerable<OrderDto>>> Handle(GetOrderByCustomerIdQuery request, CancellationToken cancellationToken)
    {
        var orders = await repository.GetByCustomerIdAsync(request.CustomerId).ConfigureAwait(false);

        if (!orders.Any())
        {
            return Result.Failure<IEnumerable<OrderDto>>(ErrorResult.NotFound("OrderNotFound", "No orders found"));
        }

        var productIds = orders.SelectMany(o => o.OrderLines.Select(ol => ol.ProductId)).Distinct();
        var products = await repositoryProduct.GetByIdsAsync(productIds).ConfigureAwait(false);
        var productDictionary = products.ToDictionary(p => p.Id, p => p.Name);

        var orderDtos = orders.Select(order => new OrderDto(
            order.Id,
            order.CustomerId.Value,
            order.TotalAmount.Amount,
            order.Status,
            order.DeliveryServiceType,
            order.DeliveryAddress?.Street ?? string.Empty,
            order.DeliveryAddress?.City ?? string.Empty,
            order.DeliveryAddress?.PostalCode ?? string.Empty,
            order.DeliveryAddress?.Country ?? string.Empty,
            order.OrderLines.Select(ol => new OrderItemDto(ol.ProductId, productDictionary.GetValueOrDefault(ol.ProductId, "Unknown Product"), ol.Quantity, ol.UnitPrice)).ToList()
        )).ToList();

        return Result.Success<IEnumerable<OrderDto>>(orderDtos);
    }
}

