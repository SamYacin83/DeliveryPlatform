namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.ValueObjects;
public record ProductId
{
    public Guid Value { get; }

    public ProductId() {}

    public ProductId(Guid value)
    {
        if (value == Guid.Empty)
            throw new ArgumentException("Product ID cannot be empty", nameof(value));
        Value = value;
    }
}