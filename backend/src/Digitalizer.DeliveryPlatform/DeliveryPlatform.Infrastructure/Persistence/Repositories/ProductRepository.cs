using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;
using Microsoft.EntityFrameworkCore;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Repositories;
internal sealed class ProductRepository(DeliveryDbContext context) : IProductRepository
{
    public void Add(Product product)
    {
        context.Products.Add(product);
    }

    public void Delete(Product product)
    {
        context.Products.Remove(product);
    }

    public Task<Product?> GetByIdAsync(Guid id)
    {
        return context.Products
                      .SingleOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<Product>> GetByIdsAsync(IEnumerable<Guid> ids)
    {
        return await context.Products
                            .Where(p => ids.Contains(p.Id))
                            .ToListAsync().ConfigureAwait(false);
    }

    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await context.Products.ToListAsync().ConfigureAwait(false);
    }
}
