namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;
public interface IProductCategoryRepository
{
    void Add(ProductCategory productCategory);
    void Delete(ProductCategory productCategory);
    Task<IEnumerable<ProductCategory>> GetAllAsync();
    Task<ProductCategory?> GetByIdAsync(Guid id);
}