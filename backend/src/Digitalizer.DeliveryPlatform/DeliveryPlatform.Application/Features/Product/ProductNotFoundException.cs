using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Exceptions;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product;
public sealed class ProductNotFoundException : NotFoundException
{
    public ProductNotFoundException() { }

    public ProductNotFoundException(string message) : base(message) { }

    public ProductNotFoundException(Guid id)
        : base($"Product with ID {id} was not found.") { }

    public ProductNotFoundException(string message, Exception innerException)
        : base(message, innerException) { }
}



