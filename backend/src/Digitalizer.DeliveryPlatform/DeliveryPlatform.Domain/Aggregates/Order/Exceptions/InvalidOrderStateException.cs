using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Exceptions;
public class InvalidOrderStateException : DomainException
{
    public InvalidOrderStateException()
        : base("Cannot modify order in current state") { }

    public InvalidOrderStateException(string message) : base(message) { }

    public InvalidOrderStateException(string message, Exception innerException)
        : base(message, innerException) { }
}