using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;

namespace Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart.AddCart;
public class AddCartCommandHandler(ICartService cartService, ICustomerRepository repositoryCustomer, IProductRepository repositoryProduct) : ICommandHandler<AddCartCommand, ShoppingCartDto>
{
    public async Task<Result<ShoppingCartDto>> Handle(AddCartCommand? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return Result.Failure<ShoppingCartDto>(ErrorResult.Problem("InvalidRequest", "Request cannot be null"));

        var customer = await repositoryCustomer.GetByIdAsync(request.CustomerId).ConfigureAwait(false);
        if (customer == null)
            return Result.Failure<ShoppingCartDto>(ErrorResult.NotFound("CustomerNotFound", "Customer not found"));


        foreach (var item in request.Items)
        {
            var product = await repositoryProduct.GetByIdAsync(item.ProductId).ConfigureAwait(false);
            if (product == null)
                return Result.Failure<ShoppingCartDto>(ErrorResult.NotFound("ProductNotFound", $"Product with ID {item.ProductId} not found"));

            if (!product.IsAvailable)
                ErrorResult.NotFound("ProductNotAvailable", $"Product with ID {item.ProductId} is not available");
        }

        await cartService.AddItemToCartAsync(request.CustomerId, request.Items, cancellationToken).ConfigureAwait(false);

        return Result.Success(new ShoppingCartDto(request.CustomerId, request.ServiceType,request.Items));

    }
}
