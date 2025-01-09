using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer.Exceptions;
public class InvalidCustomerAgeDomainException : DomainException
{
    public InvalidCustomerAgeDomainException(string message) : base(message) { }

    public InvalidCustomerAgeDomainException(string message, Exception innerException)
        : base(message, innerException) { }

    public InvalidCustomerAgeDomainException()
        : base("Customer has to be at least 18 years old.")
    {
    }
}
