using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.AddProductCategory;

public record AddProductCategoryCommand(string Name, string Description) : ICommand<ProductCategoryDto>;

