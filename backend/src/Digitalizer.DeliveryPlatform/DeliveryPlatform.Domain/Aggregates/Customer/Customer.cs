using Digitalizer.DeliveryPlatform.Domain.Commun;
using Digitalizer.DeliveryPlatform.Domain.ValueObjects;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
public class Customer : AggregateRoot
{
    private List<DeliveryAddress> _addresses = new();

    public string Name { get; private set; }
    //public Email Email { get; private set; }
    //public PhoneNumber Phone { get; private set; }
    public IEnumerable<DeliveryAddress> Addresses => _addresses.AsReadOnly();
}