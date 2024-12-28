using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.DeleteProductCategory;
public record DeleteProductCategoryCommand(Guid Id) : ICommand;