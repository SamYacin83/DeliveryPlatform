using Digitalizer.DeliveryPlatform.Domain.Enums;

namespace Digitalizer.DeliveryPlatform.Domain.Caching.Models;
public sealed class Cart
{
    public required string Id { get; set; }
#pragma warning disable CA2227
#pragma warning disable CA1002
    public List<CartItem> Items { get; set; } = [];
#pragma warning restore CA1002
#pragma warning restore CA2227
    public DeliveryServiceType DeliveryMethod { get; set; }
    public Guid CustomerId { get; set; }

    public static Cart Create(Guid customerId) => new() { Id = Guid.NewGuid().ToString(), CustomerId = customerId };
}
