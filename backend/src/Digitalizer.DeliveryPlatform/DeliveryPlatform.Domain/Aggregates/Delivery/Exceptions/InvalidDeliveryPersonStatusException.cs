using Digitalizer.DeliveryPlatform.Domain.Commun;



namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Exceptions
{
    public class InvalidDeliveryPersonStatusException : DomainException
    {
        public InvalidDeliveryPersonStatusException(string status)
            : base($"Le statut '{status}' du livreur est invalide.") { }

        public InvalidDeliveryPersonStatusException()
        {
        }

        public InvalidDeliveryPersonStatusException(string message, Exception innerException) : base(message, innerException)
        {
        }        
      
    }
}
