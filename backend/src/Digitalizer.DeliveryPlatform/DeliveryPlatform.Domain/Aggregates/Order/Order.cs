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

    private Order() { }

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

        UpdateStatus(OrderStatus.Submitted, "Order submitted");
        AddDomainEvent(new OrderSubmittedEvent(Id));
    }

    public void UpdateStatus(OrderStatus newStatus, string? comment = null)
    {
        var oldStatus = Status;
        if (!IsValidStatusTransition(oldStatus, newStatus))
            throw new InvalidOrderStateTransitionException(oldStatus, newStatus);

        Status = newStatus;
        AddDomainEvent(new OrderStatusChangedEvent(Id, oldStatus, newStatus, comment));
    }

    public void Cancel(string reason)
    {
        UpdateStatus(OrderStatus.Cancelled, reason);
        AddDomainEvent(new OrderCancelledEvent(Id, reason));
    }

    public void ProcessPayment()
    {
        UpdateStatus(OrderStatus.PaymentPending, "Payment processing started");
    }

    public void ConfirmPayment()
    {
        UpdateStatus(OrderStatus.PaymentConfirmed, "Payment confirmed");
    }

    private static bool IsValidStatusTransition(OrderStatus currentStatus, OrderStatus newStatus)
    {
        return (currentStatus, newStatus) switch
               {
                   (OrderStatus.Created, OrderStatus.Submitted) => true,
                   (OrderStatus.Submitted, OrderStatus.PaymentPending) => true,
                   (OrderStatus.PaymentPending, OrderStatus.PaymentConfirmed) => true,
                   (OrderStatus.PaymentConfirmed, OrderStatus.Processing) => true,
                   (OrderStatus.Processing, OrderStatus.ReadyForDelivery) => true,
                   (OrderStatus.ReadyForDelivery, OrderStatus.AssignedToDriver) => true,
                   (OrderStatus.AssignedToDriver, OrderStatus.InTransit) => true,
                   (OrderStatus.InTransit, OrderStatus.OutForDelivery) => true,
                   (OrderStatus.OutForDelivery, OrderStatus.Delivered) => true,
                   (_, OrderStatus.Cancelled) => true, 
                   _ => false
               };
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
