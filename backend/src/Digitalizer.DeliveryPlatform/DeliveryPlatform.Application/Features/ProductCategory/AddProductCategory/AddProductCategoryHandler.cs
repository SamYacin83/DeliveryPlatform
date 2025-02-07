using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;
using DomaineProductCategory = Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory.ProductCategory;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.AddProductCategory;
public class AddProductCategoryHandler(IProductCategoryRepository repository,
    IUnitOfWork unitOfWork) : ICommandHandler<AddProductCategoryCommand, ProductCategoryDto>
{
    public async Task<Result<ProductCategoryDto>> Handle(AddProductCategoryCommand request, CancellationToken cancellationToken)
    {
        var productCategory = DomaineProductCategory.Create(
            request.Name,
            request.Description);

        repository.Add(productCategory);

        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        var productCategoryDto = MapToProductCategoryDto(productCategory);

        return Result.Success(productCategoryDto);
    }

    private static ProductCategoryDto MapToProductCategoryDto(DomaineProductCategory productCategory)
    {
        return new ProductCategoryDto
        {
                   CategoryId = productCategory.Id,
                   Name = productCategory.Name,
                   Description = productCategory.Description
        };
    }
}
