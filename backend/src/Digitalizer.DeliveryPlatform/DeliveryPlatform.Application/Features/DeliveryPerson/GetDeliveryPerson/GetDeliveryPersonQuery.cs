﻿using Digitalizer.DeliveryPlatform.Application.Features.Product;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using MediatR;

namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson;
public record GetDeliveryPersonQuery(Guid Id) : IQuery<DeliveryPersonDto>;

