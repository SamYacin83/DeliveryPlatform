using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
public class Product : AggregateRoot
{
    public string Name { get; private set; }
    public string Description { get; private set; }
    public int StockQuantity { get; private set; }
    public bool IsAvailable => StockQuantity > 0;
}
