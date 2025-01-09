using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer.ValueObjects;
using Digitalizer.DeliveryPlatform.Domain.Enums;

namespace Digitalizer.DeliveryPlatform.Application.Features.Customer;

public record CustomerDto(Guid Id,
    string IdentityId, 
    string FirstName,
    string LastName,
    string Email,
    DateTime BirthDate,
    Age Age,
    string Street,
    string City,
    string PostalCode,
    string Country);
