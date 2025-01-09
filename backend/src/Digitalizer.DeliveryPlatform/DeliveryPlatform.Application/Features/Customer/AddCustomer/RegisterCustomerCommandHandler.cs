using Digitalizer.DeliveryPlatform.Application.Features.Auth.Request;
using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
using Digitalizer.DeliveryPlatform.Domain.Enums;
using Digitalizer.DeliveryPlatform.Domain.ValueObjects;
using DomainCustomer = Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer.Customer;

namespace Digitalizer.DeliveryPlatform.Application.Features.Customer.AddCustomer;
public class RegisterCustomerCommandHandler(ICustomerRepository repository, 
    IUnitOfWork unitOfWork, 
    IIdentityService identityService,
    IDomainEventService domainEventService) : ICommandHandler<RegisterCustomerCommand, CustomerDto>
{
    public async Task<Result<CustomerDto>> Handle(RegisterCustomerCommand? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return Result.Failure<CustomerDto>(ErrorResult.Problem("InvalidRequest", "Request cannot be null"));

        var identityResult = await identityService.RegisterUserAsync(new RegisterRequest
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Password = request.Password,
            Role = UserRole.Customer
        }).ConfigureAwait(false);

        if (!identityResult.IsSuccess)
            return Result.Failure<CustomerDto>(identityResult.Error);

        var customer = DomainCustomer.Create(
            identityId: identityResult.Value,
            firstName: request.FirstName,
            lastName: request.LastName,
            email: Email.Create(request.Email),
            birthDate: request.BirthDate,
            address: DeliveryAddress.Create(
                request.Street,
                request.City,
                request.PostalCode,
                request.Country)
        );

        repository.Add(customer);

        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        await domainEventService.PublishEvents(customer, cancellationToken).ConfigureAwait(false); ;

        return Result.Success(new CustomerDto(
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
            customer.Address.Country));
    }
}
