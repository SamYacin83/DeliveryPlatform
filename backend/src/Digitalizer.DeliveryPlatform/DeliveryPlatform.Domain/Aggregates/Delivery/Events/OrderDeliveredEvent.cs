using Digitalizer.DeliveryPlatform.Domain.Commun;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Events;
public record OrderDeliveredEvent(Guid OrderId) : DomainEvent;
