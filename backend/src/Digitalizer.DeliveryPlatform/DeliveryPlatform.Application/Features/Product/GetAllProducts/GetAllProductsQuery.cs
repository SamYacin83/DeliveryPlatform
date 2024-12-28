using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.GetAllProducts;
public record GetAllProductsQuery() : IQuery<IEnumerable<ProductDto>>;
