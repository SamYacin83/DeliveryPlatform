using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.GetProductCategory;
public class GetProductCategoryQueryHandler(IProductCategoryRepository repository) : IQueryHandler<GetProductCategoryQuery, ProductCategoryDto>
{
    public async Task<Result<ProductCategoryDto>> Handle(GetProductCategoryQuery request, CancellationToken cancellationToken)
    {
        var productCategory = await repository.GetByIdAsync(request.Id).ConfigureAwait(false);

        if (productCategory == null) {
            throw new ProductCategoryNotFoundException(request.Id);
        }

        return new ProductCategoryDto
        {
            Id = productCategory.Id,
            Name = productCategory.Name,
            Description = productCategory.Description
        };
    }
}
