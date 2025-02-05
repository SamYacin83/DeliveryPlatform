using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.AddProduct;
public record AddProductCommand(
    string Name,
    string Description,
    decimal Price,
    string Currency,
    Guid CategoryId,
    Uri PictureUrl,
    int StockQuantity) : ICommand<ProductDto>;
