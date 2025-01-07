using Digitalizer.DeliveryPlatform.Application.Data;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;

namespace Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart.ClearCart;
public class ClearCartCommandHandler(ICartService cartService) : ICommandHandler<ClearCartCommand>
{
    public async Task<Result> Handle(ClearCartCommand request, CancellationToken cancellationToken)
    {
        await cartService.ClearCartAsync(request.CustomerId, cancellationToken).ConfigureAwait(false);

        return Result.Success();
    }
}
