namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
public interface IOrderStatusHistoryRepository
{
    Task AddAsync(OrderStatusHistory history, CancellationToken cancellationToken = default);
    Task<IEnumerable<OrderStatusHistory>> GetByOrderIdAsync(Guid orderId);
}
