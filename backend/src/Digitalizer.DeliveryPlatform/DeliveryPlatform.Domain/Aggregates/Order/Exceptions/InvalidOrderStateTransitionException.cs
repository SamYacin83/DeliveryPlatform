using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Exceptions;

public class InvalidOrderStateTransitionException : DomainException
{
    public InvalidOrderStateTransitionException() { }

    public InvalidOrderStateTransitionException(OrderStatus currentStatus, OrderStatus newStatus)
        : base($"Invalid order status transition from {currentStatus} to {newStatus}")
    {
        CurrentStatus = currentStatus;
        NewStatus = newStatus;
    }

    public InvalidOrderStateTransitionException(string message) : base(message) { }

    public InvalidOrderStateTransitionException(string message, Exception innerException)
        : base(message, innerException) { }

    public OrderStatus CurrentStatus { get; }
    public OrderStatus NewStatus { get; }
}