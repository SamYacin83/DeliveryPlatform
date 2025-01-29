using Digitalizer.DeliveryPlatform.Domain.Aggregates.Entities;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;
using Microsoft.EntityFrameworkCore;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Repositories;
public class DeliveryPersonRepository(DeliveryDbContext context) : IDeliveryPersonRepository
{
    public void Add(DeliveryPerson deliveryPerson)
    {
        context.DeliveryPerson.Add(deliveryPerson);
    }

    public async Task<List<DeliveryPerson>> GetAllAsync()
    {
        return await context.DeliveryPerson.ToListAsync().ConfigureAwait(false);
    }

    public Task<DeliveryPerson?> GetByIdAsync(Guid id)
    {
        return context.DeliveryPerson
                    .SingleOrDefaultAsync(c => c.Id == id);
    }
}
 