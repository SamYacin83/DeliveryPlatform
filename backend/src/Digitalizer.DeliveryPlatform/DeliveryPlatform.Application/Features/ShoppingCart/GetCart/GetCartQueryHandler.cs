using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Caching.Models;

namespace Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart.GetCart;
public class GetCartQueryHandler(ICartService cartService)  : IQueryHandler<GetCartQuery, Cart>
{
    public async Task<Result<Cart>> Handle(GetCartQuery request, CancellationToken cancellationToken)
    {
        return await cartService.GetCartAsync(request.CustomerId, cancellationToken).ConfigureAwait(false);
    }
}
