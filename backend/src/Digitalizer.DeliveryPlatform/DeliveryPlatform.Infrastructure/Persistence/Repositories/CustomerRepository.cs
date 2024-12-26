using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;
using Microsoft.EntityFrameworkCore;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Repositories;
internal sealed class CustomerRepository(DeliveryDbContext context) : ICustomerRepository
{
    public Task<Customer?> GetByIdAsync(Guid id)
    {
        return context.Customers
                       .SingleOrDefaultAsync(c => c.Id == id);
    }
}