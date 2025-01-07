namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;


public interface IOrderRepository
{
    void Add(Order order);
    void Delete(Order order);
    Task<Order?> GetByIdAsync(Guid id);
    Task<IEnumerable<Order>> GetByCustomerIdAsync(Guid customerId);
    Task<IEnumerable<Order>> GetAllAsync();
}
