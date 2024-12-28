using Digitalizer.DeliveryPlatform.Domain.Exceptions;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory;
public sealed class ProductCategoryNotFoundException : NotFoundException
{
    public ProductCategoryNotFoundException() { }

    public ProductCategoryNotFoundException(string message) : base(message) { }

    public ProductCategoryNotFoundException(Guid id)
        : base($"ProductCategory with ID {id} was not found.") { }

    public ProductCategoryNotFoundException(string message, Exception innerException)
        : base(message, innerException) { }
}
