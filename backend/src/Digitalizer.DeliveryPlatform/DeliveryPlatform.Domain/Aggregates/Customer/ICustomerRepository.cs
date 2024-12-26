namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
public interface ICustomerRepository
{
    Task<Customer?> GetByIdAsync(Guid id);
}

