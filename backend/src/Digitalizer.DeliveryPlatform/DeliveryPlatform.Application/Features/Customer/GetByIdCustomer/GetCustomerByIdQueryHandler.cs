using Digitalizer.DeliveryPlatform.Application.Features.Order.GetByCustomerIdOrder;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.User;
using Microsoft.AspNetCore.Identity;

namespace Digitalizer.DeliveryPlatform.Application.Features.Customer.GetByIdCustomer;
public class GetCustomerByIdQueryHandler(ICustomerRepository repository) : IQueryHandler<GetCustomerByIdQuery, CustomerDto>
{
    public async Task<Result<CustomerDto>> Handle(GetCustomerByIdQuery? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return Result.Failure<CustomerDto>(ErrorResult.Problem("InvalidRequest", "Request cannot be null"));

        var customer = await repository.GetByIdAsync(request.CustomerId).ConfigureAwait(false);

        if (customer == null)
            return Result.Failure<CustomerDto>(ErrorResult.NotFound("CustomerNotFound", "Customer not found"));

        return Result.Success<CustomerDto>(new CustomerDto(
            customer.Id,
            customer.IdentityId,
            customer.FirstName,
            customer.LastName,
            customer.Email.Value,
            customer.BirthDate,
            customer.Age,
            customer.Address.Street,
            customer.Address.City,
            customer.Address.PostalCode,
            customer.Address.Country
        ));
  
    }
}
