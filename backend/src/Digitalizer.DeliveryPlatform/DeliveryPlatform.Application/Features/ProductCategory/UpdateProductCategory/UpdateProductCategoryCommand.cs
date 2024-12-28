using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.UpdateProductCategory;

public record UpdateProductCategoryCommand(Guid Id, string Name, string Description) : ICommand<ProductCategoryDto>;
