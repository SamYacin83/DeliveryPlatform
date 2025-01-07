using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Exceptions;
public class DuplicateOrderItemException : DomainException
{
    public DuplicateOrderItemException() { }

    public DuplicateOrderItemException(Guid productId)
        : base($"Product {productId} is already in the order") { }

    public DuplicateOrderItemException(string message) : base(message)
    {
    }

    public DuplicateOrderItemException(string message, Exception innerException) : base(message, innerException)
    {
    }
}
