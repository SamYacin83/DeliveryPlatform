using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Exceptions;
public class InvalidOrderAmountException : DomainException
{
    public InvalidOrderAmountException(decimal actualAmount, decimal minimumAmount)
        : base($"Order amount ({actualAmount} FDJ) is less than minimum required amount ({minimumAmount} FDJ)") { }

    public InvalidOrderAmountException()
    {
    }

    public InvalidOrderAmountException(string message) : base(message)
    {
    }

    public InvalidOrderAmountException(string message, Exception innerException) : base(message, innerException)
    {
    }
}
