using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Exceptions;

public class InvalidQuantityException : DomainException

{
    public InvalidQuantityException(int quantity)
        : base($"Invalid quantity: {quantity}") { }

    public InvalidQuantityException()
    {
    }

    public InvalidQuantityException(string message) : base(message)
    {
    }

    public InvalidQuantityException(string message, Exception innerException) : base(message, innerException)
    {
    }
}
