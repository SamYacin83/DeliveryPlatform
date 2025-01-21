using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Events;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Exceptions;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.ValueObjects;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
using Digitalizer.DeliveryPlatform.Domain.Commun;
using Digitalizer.DeliveryPlatform.Domain.Enums;
using Digitalizer.DeliveryPlatform.Domain.ValueObjects;
using System.Net;


namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Entities;
public class DeliveryPerson : AggregateRoot
{
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public PhoneNumber PhoneNumber { get; private set; }
    public Email Email { get; private set; }
    public Location CurrentLocation { get; private set; }
    public DeliveryStatus Status { get; private set; }
    private readonly List<Order.Order> _assignedOrders = new();
    public IReadOnlyCollection<Order.Order> AssignedOrders => _assignedOrders.AsReadOnly();
    public DeliveryAddress Address { get; private set; } // Ajout de l'adresse

    private DeliveryPerson() { }

    // Méthode de création
    public static DeliveryPerson Create(string firstName, string lastName, PhoneNumber phoneNumber, Email email, DeliveryAddress address)
    {
        if (string.IsNullOrWhiteSpace(firstName)) throw new ArgumentNullException(nameof(firstName));
        if (string.IsNullOrWhiteSpace(lastName)) throw new ArgumentNullException(nameof(lastName));

        if (phoneNumber is null)
            throw new ArgumentNullException(nameof(phoneNumber), "Le numéro de téléphone ne peut pas être nul.");

        if (email is null) throw new ArgumentNullException(nameof(email), "Le numéro de téléphone ne peut pas être nul.");
        if (address is null) throw new ArgumentNullException(nameof(address), "L'adresse ne peut pas être nulle.");

        return new DeliveryPerson
        {
            FirstName = firstName,
            LastName = lastName,
            PhoneNumber = phoneNumber,
            Email = email,
            CurrentLocation = Location.Default,
            Status = DeliveryStatus.Available,
            Address = address
        };
    }

    // Mettre à jour la localisation
    public void UpdateLocation(double latitude, double longitude)
    {
        CurrentLocation = new Location(latitude, longitude);
        AddDomainEvent(new DeliveryPersonLocationUpdatedEvent(Id, CurrentLocation));
    }

    // Mettre à jour l'adresse    
    public void UpdateAddress(DeliveryAddress newAddress)
    {
        if (newAddress is null)
            throw new ArgumentNullException(nameof(newAddress), "L'adresse ne peut pas être nulle.");

        Address = newAddress;
        AddDomainEvent(new DeliveryPersonAddressUpdatedEvent(Id, newAddress));
    }


    // Assigner une commande
    public void AssignOrder(Order.Order order)
    {
        if (Status == DeliveryStatus.Unavailable)
            throw new InvalidDeliveryPersonStatusException(Status.ToString());

        _assignedOrders.Add(order);
        Status = DeliveryStatus.Assigned;
        AddDomainEvent(new DeliveryPersonOrderAssignedEvent(Id, order.Id));
    }

    // Marquer une commande comme livrée
    public void MarkOrderAsDelivered(Guid orderId)
    {
        var order = _assignedOrders.FirstOrDefault(o => o.Id == orderId);
        if (order == null)
            throw new InvalidOperationException($"Order {orderId} not found.");

        order.MarkAsDelivered();
        if (_assignedOrders.All(o => o.Status == OrderStatus.Delivered))
            Status = DeliveryStatus.Available;

        AddDomainEvent(new DeliveryPersonOrderDeliveredEvent(Id, orderId));
    }
}




