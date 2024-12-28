using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Exceptions;
public class InvalidStockQuantityException : DomainException
{
    public InvalidStockQuantityException() { }

    public InvalidStockQuantityException(string message) : base(message) { }

    public InvalidStockQuantityException(int quantity)
        : base($"Stock quantity cannot be negative: {quantity}") { }

    public InvalidStockQuantityException(string message, Exception innerException)
        : base(message, innerException) { }
}
