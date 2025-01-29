using Digitalizer.DeliveryPlatform.Common.Results;
using MediatR;

namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.GetDeliveryPersonLocation;
public record GetDeliveryPersonLocationQuery(Guid Id) : IRequest<Result<LocationDto>>;
