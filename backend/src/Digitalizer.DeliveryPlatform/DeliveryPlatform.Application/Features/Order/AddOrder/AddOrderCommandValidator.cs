using FluentValidation;

namespace Digitalizer.DeliveryPlatform.Application.Features.Order.AddOrder;
public class AddOrderCommandValidator : AbstractValidator<AddOrderCommand>
{
    public AddOrderCommandValidator()
    {
        RuleFor(x => x.CustomerId)
            .NotEmpty()
            .WithErrorCode("Required")
            .WithMessage("Customer ID cannot be empty");


        RuleFor(x => x.Street)
            .NotEmpty()
            .WithErrorCode("Required")
            .WithMessage("Street cannot be empty");

        RuleFor(x => x.City)
            .NotEmpty()
            .WithErrorCode("Required")
            .WithMessage("City cannot be empty");

        RuleFor(x => x.PostalCode)
            .NotEmpty()
            .WithErrorCode("Required")
            .WithMessage("PostalCode cannot be empty");

        RuleFor(x => x.Country)
            .NotEmpty()
            .WithErrorCode("Required")
            .WithMessage("Country cannot be empty");
    }
}
