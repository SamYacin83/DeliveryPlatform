using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Exceptions;
public class EmptyOrderException : DomainException
{
    public EmptyOrderException()
        : base("Order must contain at least one item") { }

    public EmptyOrderException(string message) : base(message) { }

    public EmptyOrderException(string message, Exception innerException)
        : base(message, innerException) { }
}
