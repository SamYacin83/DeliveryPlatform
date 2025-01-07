using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;

namespace Digitalizer.DeliveryPlatform.Domain.Caching.Models;
public sealed class CartItem
{
    public Guid ProductId { get; set; }
    public required string ProductName { get; set; }
    public Money UnitPrice { get; set; }
    public int Quantity { get; set; }
}
