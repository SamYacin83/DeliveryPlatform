using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Exceptions;
public class InvalidPhoneNumberException : DomainException
{
    public InvalidPhoneNumberException(string phoneNumber)
        : base($"Phone number '{phoneNumber}' is invalid.") { }

    public InvalidPhoneNumberException()
    {
    }

    public InvalidPhoneNumberException(string message, Exception innerException) : base(message, innerException)
    {
    }
}