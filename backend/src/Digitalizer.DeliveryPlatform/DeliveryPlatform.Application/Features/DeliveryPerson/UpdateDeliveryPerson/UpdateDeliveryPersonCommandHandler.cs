using Digitalizer.DeliveryPlatform.Application.Data;
using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.GetDeliveryPersonLocation;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery;
using Digitalizer.DeliveryPlatform.Domain.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.UpdateDeliveryPerson;
public class UpdateDeliveryPersonCommandHandler(
    IDeliveryPersonRepository repository,
    IUnitOfWork unitOfWork
) : ICommandHandler<UpdateDeliveryPersonCommand, DeliveryPersonDto>
{
    public async Task<Result<DeliveryPersonDto>> Handle(UpdateDeliveryPersonCommand request, CancellationToken cancellationToken)
    {
        var deliveryPerson = await repository.GetByIdAsync(request.Id).ConfigureAwait(false);

        if (deliveryPerson == null)
            return Result.Failure<DeliveryPersonDto>(
                ErrorResult.NotFound("DeliveryPersonNotFound", $"Delivery person with ID {request.Id} not found.")
            );

        // Mise à jour des informations du livreur
        deliveryPerson.UpdatePersonalInfo(
            request.FirstName,
            request.LastName,
            PhoneNumber.Create(request.PhoneNumber),
            Email.Create(request.Email)
        );

        deliveryPerson.UpdateAddress(
            DeliveryAddress.Create(
                request.Street,
                request.City,
                request.PostalCode,
                request.Country
            )
        );

        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return Result.Success(new DeliveryPersonDto
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
        });
    }

}
