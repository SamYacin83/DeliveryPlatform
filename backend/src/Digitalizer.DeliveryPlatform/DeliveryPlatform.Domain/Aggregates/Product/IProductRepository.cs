namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
public interface IProductRepository
{
    void Add(Product product);
    void Delete(Product product);
    Task<Product?> GetByIdAsync(Guid id);
    Task<IEnumerable<Product>> GetAllAsync();
}
