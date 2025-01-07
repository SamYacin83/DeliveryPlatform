
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.ValueObjects;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;
using Microsoft.EntityFrameworkCore;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Repositories;
public class OrderRepository(DeliveryDbContext context) : IOrderRepository
{
    public void Add(Order order)
    {
        context.Order.Add(order);
    }

    public void Delete(Order order)
    {
        context.Order.Remove(order);
    }

    public Task<Order?> GetByIdAsync(Guid id)
    {
        return context.Order
                      .Include(o => o.OrderLines)
                      .SingleOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<Order>> GetByCustomerIdAsync(Guid customerId)
    {
        var customerIdVo = new CustomerId(customerId);

        return await context.Order
                            .Include(o => o.OrderLines)
                            .Where(c => c.CustomerId == customerIdVo)
                            .ToListAsync()
                            .ConfigureAwait(false);
    }

    public async Task<IEnumerable<Order>> GetAllAsync()
    {
        return await context.Order
                            .Include(o => o.OrderLines)
                            .ToListAsync()
                            .ConfigureAwait(false);
    }
}
