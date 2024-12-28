using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.GetAllProductCategory;
public record GetAllProductCategoryQuery : IQuery<IEnumerable<ProductCategoryDto>>;
