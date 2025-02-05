using Digitalizer.DeliveryPlatform.Application.Features.Product;
using Digitalizer.DeliveryPlatform.Application.Features.Product.GetAllProducts;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using MediatR;

namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.GetAllDeliveryPersons;

public class GetAllDeliveryPersonsQueryHandler(IDeliveryPersonRepository deliveryPersonRepository)
    : IQueryHandler<GetAllDeliveryPersonsQuery, IEnumerable<DeliveryPersonDto>>
{

public async Task<Result<IEnumerable<DeliveryPersonDto>>> Handle(GetAllDeliveryPersonsQuery request, CancellationToken cancellationToken)
{
    var deliveryPerson = await deliveryPersonRepository.GetAllAsync().ConfigureAwait(false);

    var deliveryPersonDtos = deliveryPerson.Select(deliveryPerson => new DeliveryPersonDto
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

    return Result.Success(deliveryPersonDtos);
    }
}