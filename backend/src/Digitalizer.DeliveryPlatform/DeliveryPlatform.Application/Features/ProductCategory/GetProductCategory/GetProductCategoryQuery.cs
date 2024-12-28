using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.GetProductCategory;
public record GetProductCategoryQuery(Guid Id) : IQuery<ProductCategoryDto>;
