using Digitalizer.DeliveryPlatform.Domain.Aggregates.Entities;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery;
public interface IDeliveryPersonRepository
{
    void Add(DeliveryPerson deliveryPerson);
    Task<DeliveryPerson?> GetByIdAsync(Guid id);
    Task<List<DeliveryPerson>> GetAllAsync();
    void Delete(DeliveryPerson deliveryPerson);

}
