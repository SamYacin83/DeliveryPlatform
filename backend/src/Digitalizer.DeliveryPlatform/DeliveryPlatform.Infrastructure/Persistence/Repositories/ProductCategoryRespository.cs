using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;
using Microsoft.EntityFrameworkCore;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Repositories;
internal sealed class ProductCategoryRespository(DeliveryDbContext context) : IProductCategoryRepository
{
    public void Add(ProductCategory productCategory)
    {
        context.ProductCategory.Add(productCategory);
    }

    public void Delete(ProductCategory productCategory)
    {
        context.ProductCategory.Remove(productCategory);
    }

    public async Task<IEnumerable<ProductCategory>> GetAllAsync()
    {
        return await context.ProductCategory.ToListAsync().ConfigureAwait(false);
    }

    public Task<ProductCategory?> GetByIdAsync(Guid id)
    {
        return context.ProductCategory
                      .SingleOrDefaultAsync(c => c.Id == id);
    }
}
