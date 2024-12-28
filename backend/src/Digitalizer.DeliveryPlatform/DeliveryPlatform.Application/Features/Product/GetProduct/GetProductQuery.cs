using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.GetProduct;
public record GetProductQuery(Guid Id) : IQuery<ProductDto>;
