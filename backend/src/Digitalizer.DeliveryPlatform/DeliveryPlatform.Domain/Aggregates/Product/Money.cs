namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;

public sealed record Money(decimal Amount, string Currency = "FDJ")
{
    public static Money Zero => new(0);

    public static Money operator *(Money money, int multiplier)
        => new(money.Amount * multiplier, money.Currency);

    public static Money Multiply(Money money, int multiplier)
        => new(money.Amount * multiplier, money.Currency);
}
