using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.UpdateProduct;
public record UpdateProductCommand(
    Guid? Id,
    string Name,
    string Description,
    decimal Price,
    string Currency,
    Guid CategoryId,
    int StockQuantity) : ICommand<ProductDto>;
