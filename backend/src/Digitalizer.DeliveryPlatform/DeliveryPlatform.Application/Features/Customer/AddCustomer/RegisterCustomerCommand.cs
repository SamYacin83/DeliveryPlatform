using Digitalizer.DeliveryPlatform.Application.Features.Order;
using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.Customer.AddCustomer;
public record RegisterCustomerCommand(string FirstName,
    string LastName,
    string Email,
    string Password,
    DateTime BirthDate,
    string Street,
    string City,
    string PostalCode,
    string Country) : ICommand<CustomerDto>;