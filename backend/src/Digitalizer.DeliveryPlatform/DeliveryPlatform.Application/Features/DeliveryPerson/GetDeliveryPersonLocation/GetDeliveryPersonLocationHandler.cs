using Digitalizer.DeliveryPlatform.Application.Features.Product;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery;
using MediatR;

namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.GetDeliveryPersonLocation;
public class GetDeliveryPersonLocationHandler : IRequestHandler<GetDeliveryPersonLocationQuery, Result<LocationDto>>
{
    private readonly IDeliveryPersonRepository _repository;
    

    public GetDeliveryPersonLocationHandler(IDeliveryPersonRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<LocationDto>> Handle(GetDeliveryPersonLocationQuery request, CancellationToken cancellationToken)
    {
        var deliveryPerson = await _repository.GetByIdAsync(request.Id).ConfigureAwait(false);

        if (deliveryPerson is null)
            return Result.Failure<LocationDto>(
                ErrorResult.NotFound("DeliveryPerson.NotFound", $"Delivery person with ID {request.Id} was not found.")
            );

        if (deliveryPerson.CurrentLocation is null)
            return Result.Failure<LocationDto>(
                ErrorResult.NotFound("DeliveryPerson.LocationNotAvailable", "Location is not available.")
            );

        return Result.Success(new LocationDto
        {
            Latitude = deliveryPerson.CurrentLocation.Latitude,
            Longitude = deliveryPerson.CurrentLocation.Longitude
        });
    }

}
