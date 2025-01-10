using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.GetAllProducts;
public class GetAllProductsQueryHandler(IProductRepository productRepository, IProductCategoryRepository repository)
    : IQueryHandler<GetAllProductsQuery, IEnumerable<ProductDto>>
{
    public async Task<Result<IEnumerable<ProductDto>>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await productRepository.GetAllAsync().ConfigureAwait(false);
        var productCategory = await repository.GetAllAsync().ConfigureAwait(false);
        var enumerable = products as Domain.Aggregates.Product.Product[] ?? products.ToArray();

        if (enumerable.Length == 0)
        {
            return Result.Failure<IEnumerable<ProductDto>>(ErrorResult.NotFound("ProductNotFound", "No products found"));
        }

        var productCategoryDictionary = productCategory.ToDictionary(p => p.Id, p => p.Name);

        var productDtos = enumerable.Select(p => new ProductDto
                                                 {
                                                     Id = p.Id,
                                                     Name = p.Name,
                                                     Description = p.Description,
                                                     PriceAmount = p.Price.Amount,
                                                     PictureUrl = p.PictureUrl,
                                                     NameCategory = productCategoryDictionary.GetValueOrDefault( p.CategoryId, "Unknown Category"),
                                                     Currency = p.Price.Currency,
                                                     CategoryId = p.CategoryId,
                                                     StockQuantity = p.StockQuantity,
                                                     IsAvailable = p.IsAvailable
                                                 });

        return Result.Success(productDtos);
    }
}
