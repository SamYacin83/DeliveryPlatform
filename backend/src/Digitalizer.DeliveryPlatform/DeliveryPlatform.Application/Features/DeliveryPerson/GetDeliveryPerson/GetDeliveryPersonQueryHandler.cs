using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery;
using Digitalizer.DeliveryPlatform.Common.Messaging;

using Digitalizer.DeliveryPlatform.Application.Features.Product.GetProduct;
using Digitalizer.DeliveryPlatform.Application.Features.Product;


namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.GetDeliveryPerson;


//public class GetDeliveryPersonQueryHandler(IDeliveryPersonRepository deliveryPersonRepository) : IQueryHandler<GetDeliveryPersonQuery, DeliveryPersonDto>
//{

    //public async Task<Result<DeliveryPersonDto>> Handle(GetProductQuery request, CancellationToken cancellationToken)
    //{
    //    var deliveryPerson = await deliveryPersonRepository.GetByIdAsync(request.Id).ConfigureAwait(false);

    //    if (deliveryPerson is null)
    //        throw new ProductNotFoundException(request.Id);

    //    return new DeliveryPersonDto
    //    {
    //        Id = deliveryPerson.Id,
    //        FirstName = deliveryPerson.FirstName,
    //        LastName = deliveryPerson.LastName,
    //        PhoneNumber = deliveryPerson.PhoneNumber.Value, 
    //        Email = deliveryPerson.Email.Value, 

    //        Address =  new AddressDto
    //        {
    //            Street = deliveryPerson.Address.Street,
    //            City = deliveryPerson.Address.City,
    //            PostalCode = deliveryPerson.Address.PostalCode,
    //            Country = deliveryPerson.Address.Country
    //        }
    //    };
    //}
//}