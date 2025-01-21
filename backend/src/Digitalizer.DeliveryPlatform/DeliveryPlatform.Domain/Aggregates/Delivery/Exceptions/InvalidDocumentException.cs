using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Exceptions;
public class InvalidDocumentException : DomainException
{
    public InvalidDocumentException(string documentType)
        : base($"Le document requis '{documentType}' est manquant ou invalide.") { }

    public InvalidDocumentException()
    {
    }

    public InvalidDocumentException(string message, Exception innerException) : base(message, innerException)
    {
    }
}