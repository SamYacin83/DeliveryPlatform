using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;

namespace Digitalizer.DeliveryPlatform.Application.Features.Customer.GetCustomer;
public sealed class GetCustomerQueryHandler(ICustomerRepository repository) : IQueryHandler<GetCustomerQuery, IEnumerable<CustomerDto>>
{
    public async Task<Result<IEnumerable<CustomerDto>>> Handle(GetCustomerQuery request, CancellationToken cancellationToken)
    {
        var cutomers = await repository.GetAllAsync().ConfigureAwait(false);

        var enumerable = cutomers as Domain.Aggregates.Customer.Customer[] ?? cutomers.ToArray();
        if (enumerable.Length ==0)
        {
            return Result.Failure<IEnumerable<CustomerDto>>(ErrorResult.NotFound("CustomerNotFound", "No customers found"));
        }

        var result = enumerable.Select(c => new CustomerDto(
            c.Id,
            c.IdentityId,
            c.FirstName,
            c.LastName,
            c.Email.Value,
            c.BirthDate,
            c.Age,
            c.Address.Street,
            c.Address.City,
            c.Address.PostalCode,
            c.Address.Country
        )).ToList();

        return Result.Success<IEnumerable<CustomerDto>>(result);
    }
}
