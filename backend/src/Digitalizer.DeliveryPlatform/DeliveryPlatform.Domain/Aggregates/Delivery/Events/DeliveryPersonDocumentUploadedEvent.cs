using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.ValueObjects;
using Digitalizer.DeliveryPlatform.Domain.Commun;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Events;
public record DeliveryPersonDocumentUploadedEvent(Guid DeliveryPersonId, Document UploadedDocument) : DomainEvent;
