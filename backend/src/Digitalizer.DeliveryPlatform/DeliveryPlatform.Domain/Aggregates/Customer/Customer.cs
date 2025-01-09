using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer.Events;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer.ValueObjects;
using Digitalizer.DeliveryPlatform.Domain.Commun;
using Digitalizer.DeliveryPlatform.Domain.ValueObjects;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
public class Customer : AggregateRoot
{
    public string IdentityId { get; private set; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public Email Email { get; private set; }
    public DateTime BirthDate { get; private set; }
    public DeliveryAddress Address { get; private set; }
    public Age Age { get; private set; }
    public bool IsEmailVerified { get; private set; }

    private Customer() { }

    public static Customer Create(
        string identityId,
        string firstName,
        string lastName,
        Email email,
        DateTime birthDate,
        DeliveryAddress address)
    {
        var customer = new Customer
                       {
                           IdentityId = identityId,
                           FirstName = firstName,
                           LastName = lastName,
                           Email = email,
                           BirthDate = birthDate,
                           Address = address,
                           Age = new Age(birthDate),
                           IsEmailVerified = false
                       };

        customer.AddDomainEvent(new CustomerCreatedEvent(customer.Id, customer.IdentityId));
        return customer;
    }

    public void UpdateAddress(DeliveryAddress newAddress)
    {
        Address = newAddress;
        AddDomainEvent(new CustomerAddressUpdatedEvent(Id));
    }

    public void VerifyEmail()
    {
        if (IsEmailVerified)
            return;

        IsEmailVerified = true;
        AddDomainEvent(new CustomerEmailVerifiedEvent(Id));
    }
}