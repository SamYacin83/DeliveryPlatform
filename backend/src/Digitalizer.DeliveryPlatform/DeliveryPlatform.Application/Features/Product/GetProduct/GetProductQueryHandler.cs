using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.GetProduct;
public class GetProductQueryHandler(IProductRepository productRepository) : IQueryHandler<GetProductQuery, ProductDto>
{
    
    public async Task<Result<ProductDto>> Handle(GetProductQuery request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetByIdAsync(request.Id).ConfigureAwait(false);

        if (product is null)
            throw new ProductNotFoundException(request.Id);

        return new ProductDto
               {
                   Id = product.Id,
                   Name = product.Name,
                   Description = product.Description,
                   PriceAmount = product.Price.Amount,
                   Currency = product.Price.Currency,
                   CategoryId = product.Id,
                   StockQuantity = product.StockQuantity,
                   IsAvailable = product.IsAvailable
               };
    }
}
