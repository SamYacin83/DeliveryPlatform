using Digitalizer.DeliveryPlatform.Domain.Commun;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Exceptions;
public class InvalidPhoneNumberException : DomainException
{
    public InvalidPhoneNumberException(string phoneNumber)
        : base($"Le numéro de téléphone '{phoneNumber}' est invalide.") { }

    public InvalidPhoneNumberException()
    {
    }


    public InvalidPhoneNumberException(string message, Exception innerException) : base(message, innerException)
    {
    }
}
