using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery;
using Digitalizer.DeliveryPlatform.Common.Messaging;

using Digitalizer.DeliveryPlatform.Application.Features.Product.GetProduct;
using Digitalizer.DeliveryPlatform.Application.Features.Product;
using MediatR;


namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.GetDeliveryPerson;
public class GetDeliveryPersonQueryHandler : IRequestHandler<GetDeliveryPersonQuery, Result<DeliveryPersonDto>>
{
    private readonly IDeliveryPersonRepository _repository;

    public GetDeliveryPersonQueryHandler(IDeliveryPersonRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<DeliveryPersonDto>> Handle(GetDeliveryPersonQuery request, CancellationToken cancellationToken)
    {
        var deliveryPerson = await _repository.GetByIdAsync(request.Id).ConfigureAwait(false);

        if (deliveryPerson is null)
            return Result.Failure<DeliveryPersonDto>(
                ErrorResult.NotFound(
                    "DeliveryPerson.NotFound",
                    $"Delivery person with ID {request.Id} was not found."
                )
            );

        return new DeliveryPersonDto
        {
            Id = deliveryPerson.Id,
            FirstName = deliveryPerson.FirstName,
            LastName = deliveryPerson.LastName,
            PhoneNumber = deliveryPerson.PhoneNumber.Value,
            Email = deliveryPerson.Email.Value,
            Address = new AddressDto
            {
                Street = deliveryPerson.Address.Street,
                City = deliveryPerson.Address.City,
                PostalCode = deliveryPerson.Address.PostalCode,
                Country = deliveryPerson.Address.Country
            }
        };
    }
}
