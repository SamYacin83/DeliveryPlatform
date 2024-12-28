using Digitalizer.DeliveryPlatform.Application.Data;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.UpdateProduct;
public class UpdateProductCommandHandler(IProductRepository repository, IProductCategoryRepository repositoryCategory, IUnitOfWork unitOfWork)
    : ICommandHandler<UpdateProductCommand, ProductDto>
{
    public async Task<Result<ProductDto>> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var product = await repository.GetByIdAsync(request.Id).ConfigureAwait(false);
        if (product == null)
            return Result.Failure<ProductDto>(ErrorResult.NotFound("ProductNotFound", $"Product with ID {request.Id} not found."));

        var category = await repositoryCategory.GetByIdAsync(request.CategoryId).ConfigureAwait(false);
        if (category == null)
            return Result.Failure<ProductDto>(ErrorResult.NotFound("CategoryNotFound", $"Category with ID {request.CategoryId} not found."));

        var money = new Money(request.Price, request.Currency);

        product.Update(
            request.Name,
            request.Description,
            money,
            request.CategoryId,
            request.StockQuantity);

        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return Result.Success(new ProductDto
                              {
                                  Id = product.Id,
                                  Name = product.Name,
                                  Description = product.Description,
                                  PriceAmount = product.Price.Amount,
                                  Currency = product.Price.Currency,
                                  CategoryId = product.CategoryId,
                                  StockQuantity = product.StockQuantity,
                                  IsAvailable = product.IsAvailable
                              });
    }
}
