using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.GetAllProductCategory;
public class GetAllProductCategoryQueryHandler(IProductCategoryRepository repository)
    : IQueryHandler<GetAllProductCategoryQuery, IEnumerable<ProductCategoryDto>>
{
    public async Task<Result<IEnumerable<ProductCategoryDto>>> Handle(GetAllProductCategoryQuery request, CancellationToken cancellationToken)
    {
        var productCategory = await repository.GetAllAsync().ConfigureAwait(false);

        var productCategoryDto = productCategory.Select(p => new ProductCategoryDto
                                                          {
                                                              CategoryId = p.Id,
                                                              Name = p.Name,
                                                              Description = p.Description
                                                          });

        return Result.Success(productCategoryDto);
    }
}
