using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Events;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Entities;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Events;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Exceptions;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.ValueObjects;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using Digitalizer.DeliveryPlatform.Domain.Commun;
using Digitalizer.DeliveryPlatform.Domain.Enums;
using Digitalizer.DeliveryPlatform.Domain.ValueObjects;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order;
public class Order : AggregateRoot
{
    private readonly List<OrderItem> _orderLines = [];
    private const decimal MinimumOrderAmount = 10000;

    public CustomerId CustomerId { get; private set; }
    public IReadOnlyCollection<OrderItem> OrderLines => _orderLines.AsReadOnly();
    public Money TotalAmount { get; private set; }
    public OrderStatus Status { get; private set; }
    public DateTime OrderDate { get; private set; }
    public DeliveryAddress DeliveryAddress { get; private set; }
    public DeliveryServiceType DeliveryServiceType { get; private set; }
    public Guid? AssignedDeliveryPersonId { get; private set; }
    public DeliveryPerson? AssignedDeliveryPerson { get; private set; }

    private Order() { }

    public void AssignDeliveryPerson(Guid deliveryPersonId)
    {
        if (Status != OrderStatus.Submitted)
            throw new InvalidOperationException("Un livreur ne peut être assigné qu'à une commande soumise.");

        AssignedDeliveryPersonId = deliveryPersonId;
        Status = OrderStatus.InDelivery;

        AddDomainEvent(new OrderAssignedToDeliveryPersonEvent(Id, deliveryPersonId));
    }
    public void MarkAsDelivered()
    {
        if (Status != OrderStatus.InDelivery)
            throw new InvalidOrderStateException();

        Status = OrderStatus.Delivered;
        AddDomainEvent(new OrderDeliveredEvent(Id));
    }
    public static Order Create(CustomerId customerId, DeliveryAddress deliveryAddress, DateTime orderDate)
    {
        var order = new Order
                    {
                        CustomerId = customerId,
                        DeliveryAddress = deliveryAddress,
                        Status = OrderStatus.Created,
                        TotalAmount = Money.Zero,
                        OrderDate = orderDate
        };

        order.AddDomainEvent(new OrderCreatedEvent(order.Id));
        return order;
    }

    public void AddOrderItem(Guid productId, int quantity, Money unitPrice, int availableStock)
    {
        if (Status != OrderStatus.Created)
            throw new InvalidOrderStateException();

        if (quantity <= 0)
            throw new InvalidQuantityException(quantity);

        if (quantity > availableStock)
            throw new InsufficientStockException(productId, quantity, availableStock);

        if (_orderLines.Any(x => x.ProductId == productId))
            throw new DuplicateOrderItemException(productId);

        var orderLine = new OrderItem(productId, quantity, unitPrice);
        _orderLines.Add(orderLine);
        RecalculateTotal();
    }

    public void Submit()
    {
        if (_orderLines.Count == 0)
            throw new EmptyOrderException();

        if (TotalAmount.Amount < MinimumOrderAmount)
            throw new InvalidOrderAmountException(TotalAmount.Amount, MinimumOrderAmount);

        Status = OrderStatus.Submitted;
        AddDomainEvent(new OrderSubmittedEvent(Id));
    }

    private Money GetDeliveryFee() => DeliveryServiceType switch
                                      {
                                          DeliveryServiceType.Standard => new Money(500),
                                          DeliveryServiceType.Express => new Money(1000),
                                          DeliveryServiceType.Scheduled => new Money(600),
                                          _ => Money.Zero
                                      };

    private void RecalculateTotal()
    {
        var subtotal = _orderLines.Sum(line => line.Quantity * line.UnitPrice.Amount);
        var deliveryFee = GetDeliveryFee().Amount;
        TotalAmount = new Money(subtotal + deliveryFee);
    }

    public void SetDeliveryService(DeliveryServiceType serviceType)
    {
        DeliveryServiceType = serviceType;
        RecalculateTotal();
    }
}
