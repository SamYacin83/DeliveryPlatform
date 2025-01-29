using Digitalizer.DeliveryPlatform.Application.Data;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery;
using Digitalizer.DeliveryPlatform.Domain.ValueObjects;
using DeliveryPersonDriver = Digitalizer.DeliveryPlatform.Domain.Aggregates.Entities.DeliveryPerson;
using Digitalizer.DeliveryPlatform.Common.Messaging;


namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.AddDeliveryPerson;
public class GetByIdDeliveryPersonCommandHandler(
    IDeliveryPersonRepository repository,
    IUnitOfWork unitOfWork) : ICommandHandler<AddDeliveryPersonCommand, DeliveryPersonDto>
{    

    public async Task<Result<DeliveryPersonDto>> Handle(AddDeliveryPersonCommand request, CancellationToken cancellationToken)
    {
        var deliveryPerson = DeliveryPersonDriver.Create(
            request.FirstName,
            request.LastName,
            PhoneNumber.Create(request.PhoneNumber),
            Email.Create(request.Email),
            DeliveryAddress.Create(request.Street, request.City, request.PostalCode, request.Country)
        );

        repository.Add(deliveryPerson);

        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        var deliveryPersonDto = MapToDeliveryPersonDto(deliveryPerson);

        return Result.Success(deliveryPersonDto);
    }

    private static DeliveryPersonDto MapToDeliveryPersonDto(DeliveryPersonDriver deliveryPerson)
    {
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
