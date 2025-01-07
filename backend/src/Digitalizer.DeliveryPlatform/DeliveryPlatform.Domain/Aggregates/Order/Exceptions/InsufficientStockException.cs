using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Exceptions;

public class InsufficientStockException : DomainException
{
    public InsufficientStockException() {}

    public InsufficientStockException(Guid productId, int requestedQuantity, int availableStock)
        : base($"Insufficient stock for product {productId}. Requested: {requestedQuantity}, Available: {availableStock}") { }

    public InsufficientStockException(string message) : base(message)
    {
    }

    public InsufficientStockException(string message, Exception innerException) : base(message, innerException)
    {
    }
}
