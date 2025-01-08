using Digitalizer.DeliveryPlatform.Application.Data;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Exceptions;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.ValueObjects;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using Digitalizer.DeliveryPlatform.Domain.Commun;
using Digitalizer.DeliveryPlatform.Domain.ValueObjects;
using DomainOrder = Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Order;

namespace Digitalizer.DeliveryPlatform.Application.Features.Order.AddOrder;
public class AddOrderCommandHandler(ICustomerRepository repositoryCustomer, IOrderRepository repositoryOrder,
    IProductRepository repositoryProduct, IUnitOfWork unitOfWork, ICartService cartService, IDomainEventService domainEventService) : ICommandHandler<AddOrderCommand, OrderDto>
{
    private const string Djibouti = "Djibouti";

    public async Task<Result<OrderDto>> Handle(AddOrderCommand? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return Result.Failure<OrderDto>(ErrorResult.Problem("InvalidRequest", "Request cannot be null"));

        var cart = await cartService.GetCartAsync(request.CustomerId, cancellationToken).ConfigureAwait(false);
        var customer = await repositoryCustomer.GetByIdAsync(request.CustomerId).ConfigureAwait(false);

        if (customer == null)
            return Result.Failure<OrderDto>(ErrorResult.NotFound("CustomerNotFound", "Customer not found"));

        var order = DomainOrder.Create(
            new CustomerId(request.CustomerId),
            DeliveryAddress.Create(request.Street, request.City, request.PostalCode, Djibouti), DateTime.UtcNow
        );

        
        if (cart.Items.Count == 0)
            return Result.Failure<OrderDto>(ErrorResult.Problem("EmptyCart", "Cart is empty"));

        foreach (var item in cart.Items)
        {
            var product = await repositoryProduct.GetByIdAsync(item.ProductId).ConfigureAwait(false);
            if (product == null)
                return Result.Failure<OrderDto>(ErrorResult.NotFound("ProductNotFound", $"Product with ID {item.ProductId} not found"));

            try
            {
                product.DecrementStock(item.Quantity);
                order.AddOrderItem(item.ProductId, item.Quantity, product.Price, product.StockQuantity);
            }
            catch (DomainException ex)
            {
                return Result.Failure<OrderDto>(ErrorResult.Problem("ValidationError", ex.Message));
            }
        }

        order.SetDeliveryService(cart.DeliveryMethod);

        try
        {
            order.Submit();
        }
        catch (InvalidOrderAmountException ex)
        {
            return Result.Failure<OrderDto>(ErrorResult.Problem("InvalidAmount", ex.Message));
        }

        repositoryOrder.Add(order);
        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        var orderDto = order.MapToOrderDto();

        await domainEventService.PublishEvents(order, cancellationToken).ConfigureAwait(false);

        return Result.Success(orderDto);
    }
}
