using Digitalizer.DeliveryPlatform.Application.Features.Order.GetByCustomerIdOrder;
using FluentValidation;

namespace Digitalizer.DeliveryPlatform.Application.Features.Customer.GetByIdCustomer;
public class GetCustomerCommandValidator : AbstractValidator<GetOrderByCustomerIdQuery>
{
    public GetCustomerCommandValidator()
    {
        RuleFor(x => x.CustomerId)
            .NotEmpty().WithMessage("CustomerId is required.")
            .Must(BeAValidGuid).WithMessage("CustomerId must be a valid GUID.");
    }

    private bool BeAValidGuid(Guid customerId)
    {
        return customerId != Guid.Empty;
    }
}
