using Digitalizer.DeliveryPlatform.Application.Data;
using Digitalizer.DeliveryPlatform.Domain.Caching.Models;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Caching.Services;
public sealed class CartService(ICacheService cacheService) : ICartService
{
    private static readonly TimeSpan DefaultExpiration = TimeSpan.FromDays(14);

    private static string CreateCacheKey(Guid customerId) => $"carts:{customerId}";

    public async Task<Cart> GetCartAsync(Guid customerId, CancellationToken cancellationToken = default)
    {
        var cacheKey = CreateCacheKey(customerId);

        var cart = await cacheService.GetAsync<Cart>(cacheKey, cancellationToken).ConfigureAwait(false)
                   ?? Cart.Create(customerId);

        return cart;
    }

    public async Task AddItemToCartAsync(Guid customerId, IEnumerable<CartItem> cartItems, CancellationToken cancellationToken = default)
    {
        var cacheKey = CreateCacheKey(customerId);

        var cart = await GetCartAsync(customerId, cancellationToken).ConfigureAwait(false);

        foreach (var cartItem in cartItems)
        {
            var existingCartItem = cart.Items.FirstOrDefault(c => c.ProductId == cartItem.ProductId);

            if (existingCartItem is null)
            {
                cart.Items.Add(cartItem);
            }
            else
            {
                existingCartItem.Quantity += cartItem.Quantity;
            }
        }

        await cacheService.SetAsync(cacheKey, cart, (int)DefaultExpiration.TotalSeconds, cancellationToken).ConfigureAwait(false);
    }

    public async Task RemoveItemFromCartAsync(Guid customerId, Guid productId, CancellationToken cancellationToken = default)
    {
        var cacheKey = CreateCacheKey(customerId);

        var cart = await GetCartAsync(customerId, cancellationToken).ConfigureAwait(false);
        var cartItem = cart.Items.Find(c => c.ProductId == productId);

        if (cartItem is null)
        {
            return;
        }

        cart.Items.Remove(cartItem);

        await cacheService.SetAsync(cacheKey, cart, (int)DefaultExpiration.TotalSeconds, cancellationToken).ConfigureAwait(false);
    }

    public async Task ClearCartAsync(Guid customerId, CancellationToken cancellationToken = default)
    {
        var cacheKey = CreateCacheKey(customerId);
        var cart = Cart.Create(customerId);

        await cacheService.SetAsync(cacheKey, cart, (int)DefaultExpiration.TotalSeconds, cancellationToken).ConfigureAwait(false);
    }
}
