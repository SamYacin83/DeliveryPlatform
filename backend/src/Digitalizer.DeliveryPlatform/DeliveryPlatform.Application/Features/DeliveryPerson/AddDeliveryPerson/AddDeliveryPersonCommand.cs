using Digitalizer.DeliveryPlatform.Application.Features.Product;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using MediatR;

namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.AddDeliveryPerson;
public record AddDeliveryPersonCommand(
    string FirstName,
    string LastName,
    string PhoneNumber,
    string Email,
    string Street,
    string City,
    string PostalCode,
    string Country
) : ICommand<DeliveryPersonDto>;
