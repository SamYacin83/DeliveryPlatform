using Digitalizer.DeliveryPlatform.Domain.Commun;
using Digitalizer.DeliveryPlatform.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Events;
public record DeliveryPersonUpdatedEvent(Guid DeliveryPersonId, string FirstName, string LastName, PhoneNumber PhoneNumber, Email Email) : DomainEvent;
