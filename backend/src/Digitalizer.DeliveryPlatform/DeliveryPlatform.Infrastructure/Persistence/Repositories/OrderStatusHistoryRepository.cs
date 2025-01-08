using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;
using Microsoft.EntityFrameworkCore;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Repositories;
public class OrderStatusHistoryRepository(DeliveryDbContext context) : IOrderStatusHistoryRepository
{
    public async Task AddAsync(OrderStatusHistory history, CancellationToken cancellationToken = default)
    {
        await context.OrderStatusHistories.AddAsync(history, cancellationToken).ConfigureAwait(false);
    }

    public async Task<IEnumerable<OrderStatusHistory>> GetByOrderIdAsync(Guid orderId)
    {
        return await context.OrderStatusHistories
                             .Where(h => h.OrderId == orderId)
                             .OrderByDescending(h => h.ChangedAt)
                             .ToListAsync().ConfigureAwait(false);
    }
}
