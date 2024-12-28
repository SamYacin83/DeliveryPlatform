namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
public sealed record Money(decimal Amount, string Currency = "FDJ");