using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;

namespace Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart.RemoveItemFromCart;
public class RemoveItemFromCartCommandHandler(ICartService cartService) : ICommandHandler<RemoveItemFromCartCommand>
{
    public async Task<Result> Handle(RemoveItemFromCartCommand? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return Result.Failure(ErrorResult.Problem("InvalidRequest", "Request cannot be null"));

        await cartService.RemoveItemFromCartAsync(request.CustomerId, request.ProductId, cancellationToken).ConfigureAwait(false);

        return Result.Success();
    }
}
