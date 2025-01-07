namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.ValueObjects;
public record CustomerId
{
    public Guid Value { get; }

    public CustomerId(Guid value)
    {
        if (value == Guid.Empty)
            throw new ArgumentException("Customer ID cannot be empty", nameof(value));
        Value = value;
    }
}