namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
public interface ICustomerRepository
{
    Task<IEnumerable<Customer>> GetAllAsync();
    Task<Customer?> GetByIdAsync(Guid id);
    void Add(Customer customer);
}

