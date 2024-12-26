namespace Digitalizer.DeliveryPlatform.Domain.Commun;
public abstract class DomainException : Exception
{
    protected DomainException(string message) : base(message) { }

    protected DomainException()
    {
    }

    protected DomainException(string message, Exception innerException) : base(message, innerException)
    {
    }
}
