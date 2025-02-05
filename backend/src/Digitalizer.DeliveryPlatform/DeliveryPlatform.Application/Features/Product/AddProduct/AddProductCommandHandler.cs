using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using DomainProduct = Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Product;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.AddProduct;
public class AddProductCommandHandler(
    IProductRepository repository,
    IUnitOfWork unitOfWork) : ICommandHandler<AddProductCommand, ProductDto>
{
    public async Task<Result<ProductDto>> Handle(AddProductCommand request, CancellationToken cancellationToken)
    {
        var money = new Money(request.Price, request.Currency);

        var product = DomainProduct.Create(
            request.Name,
            request.Description,
            request.PictureUrl,
            money,
            request.CategoryId,
            request.StockQuantity);

        repository.Add(product);

        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        var productDto = MapToProductDto(product);

        return Result.Success(productDto);
    }

    private static ProductDto MapToProductDto(DomainProduct product)
    {
        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            PriceAmount = product.Price.Amount,
            Currency = product.Price.Currency,
            CategoryId = product.CategoryId,
            StockQuantity = product.StockQuantity,
            IsAvailable = product.IsAvailable
        };
    }
}

