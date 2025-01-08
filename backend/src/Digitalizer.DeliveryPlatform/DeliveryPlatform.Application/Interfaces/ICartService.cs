using Digitalizer.DeliveryPlatform.Domain.Caching.Models;

namespace Digitalizer.DeliveryPlatform.Application.Interfaces;
public interface ICartService
{
    Task<Cart> GetCartAsync(Guid customerId, CancellationToken cancellationToken = default);
    Task AddItemToCartAsync(Guid customerId, IEnumerable<CartItem> cartItems, CancellationToken cancellationToken = default);
    Task RemoveItemFromCartAsync(Guid customerId, Guid productId, CancellationToken cancellationToken = default);
    Task ClearCartAsync(Guid customerId, CancellationToken cancellationToken = default);
}
