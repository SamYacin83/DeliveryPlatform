using Digitalizer.DeliveryPlatform.Domain.Commun;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Exceptions;
public class InvalidLocationException : DomainException
{
    public InvalidLocationException(double latitude, double longitude)
        : base($"Les coordonnées fournies sont invalides : Latitude = {latitude}, Longitude = {longitude}.") { }

    public InvalidLocationException()
    {
    }

    public InvalidLocationException(string message) : base(message)
    {
    }

    public InvalidLocationException(string message, Exception innerException) : base(message, innerException)
    {
    }
}
