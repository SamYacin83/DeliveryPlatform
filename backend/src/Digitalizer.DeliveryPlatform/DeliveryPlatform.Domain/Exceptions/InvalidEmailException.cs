using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Exceptions;
public class InvalidEmailException : DomainException
{
    public InvalidEmailException(string email)
        : base($"Email '{email}' is invalid.") { }

    public InvalidEmailException()
    {
    }

    public InvalidEmailException(string message, Exception innerException) : base(message, innerException)
    {
    }
}