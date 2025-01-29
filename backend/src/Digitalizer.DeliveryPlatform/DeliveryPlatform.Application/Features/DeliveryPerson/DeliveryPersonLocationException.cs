using Digitalizer.DeliveryPlatform.Domain.Exceptions;

namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson;
public sealed class DeliveryPersonLocationException : NotFoundException
{
    public DeliveryPersonLocationException() { }

    public DeliveryPersonLocationException(string message) : base(message) { }

    public DeliveryPersonLocationException(Guid id)
        : base($"Delivery person with ID {id} was not found.") { }

    public DeliveryPersonLocationException(string message, Exception innerException)
        : base(message, innerException) { }
}