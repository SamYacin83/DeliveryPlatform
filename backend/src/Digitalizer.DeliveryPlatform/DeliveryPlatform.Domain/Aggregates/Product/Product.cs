using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Events;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Exceptions;
using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
public class Product : AggregateRoot
{
    public string Name { get; private set; }
    public string Description { get; private set; }
    public Money Price { get; private set; }
    public Guid CategoryId { get; private set; }
    public int StockQuantity { get; private set; }
    public bool IsAvailable => StockQuantity > 0;

    private Product() { }

    public static Product Create(
        string name,
        string description,
        Money price,
        Guid categoryId,
        int stockQuantity)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentNullException(nameof(name));
        if (price.Amount < 0)
            throw new InvalidPriceException(price.Amount);
        if (stockQuantity < 0)
            throw new InvalidStockQuantityException(stockQuantity);

        var product = new Product
                      {
                          Name = name,
                          Description = description,
                          Price = price,
                          CategoryId = categoryId,
                          StockQuantity = stockQuantity
                      };

        product.AddDomainEvent(new ProductCreatedEvent(product.Id));
        return product;
    }

    public void Update(
        string name,
        string description,
        Money price,
        Guid categoryId,
        int stockQuantity)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentNullException(nameof(name));
        if (price.Amount < 0)
            throw new InvalidPriceException(price.Amount);
        if (stockQuantity < 0)
            throw new InvalidStockQuantityException(stockQuantity);

        Name = name;
        Description = description;
        Price = price;
        CategoryId = categoryId;
        StockQuantity = stockQuantity;

        AddDomainEvent(new ProductUpdatedEvent(Id));
    }
}

