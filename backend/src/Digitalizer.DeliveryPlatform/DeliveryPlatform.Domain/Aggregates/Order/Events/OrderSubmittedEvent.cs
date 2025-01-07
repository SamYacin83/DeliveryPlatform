﻿using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Events;
public record OrderSubmittedEvent(Guid OrderId) : DomainEvent;