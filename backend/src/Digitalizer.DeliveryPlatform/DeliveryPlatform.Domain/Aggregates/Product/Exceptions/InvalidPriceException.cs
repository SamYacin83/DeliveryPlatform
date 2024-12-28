using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Exceptions;
public class InvalidPriceException : DomainException
{
    public InvalidPriceException(decimal price)
        : base($"Price cannot be negative: {price}") { }

    public InvalidPriceException()
    {
    }

    public InvalidPriceException(string message) : base(message)
    {
    }

    public InvalidPriceException(string message, Exception innerException) : base(message, innerException)
    {
    }
}
