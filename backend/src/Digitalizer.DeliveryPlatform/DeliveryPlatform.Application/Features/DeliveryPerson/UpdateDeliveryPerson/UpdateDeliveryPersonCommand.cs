using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.UpdateDeliveryPerson;
public record UpdateDeliveryPersonCommand(
    Guid Id,
    string FirstName,
    string LastName,
    string PhoneNumber,
    string Email,
    string Street,
    string City,
    string PostalCode,
    string Country
) : ICommand<DeliveryPersonDto>;

