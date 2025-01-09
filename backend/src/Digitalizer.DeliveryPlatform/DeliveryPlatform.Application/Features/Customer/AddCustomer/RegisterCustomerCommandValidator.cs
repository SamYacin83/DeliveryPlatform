using FluentValidation;

namespace Digitalizer.DeliveryPlatform.Application.Features.Customer.AddCustomer;
public class RegisterCustomerCommandValidator : AbstractValidator<RegisterCustomerCommand>
{
    public RegisterCustomerCommandValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required.")
            .MaximumLength(50).WithMessage("First name must not exceed 50 characters.");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required.")
            .MaximumLength(50).WithMessage("Last name must not exceed 50 characters.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("A valid email is required.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters long.");

        RuleFor(x => x.BirthDate)
            .NotEmpty().WithMessage("Birth date is required.")
            .Must(BeAtLeast18YearsOld).WithMessage("Customer must be at least 18 years old.");

        RuleFor(x => x.Street)
            .NotEmpty().WithMessage("Street is required.");

        RuleFor(x => x.City)
            .NotEmpty().WithMessage("City is required.");

        RuleFor(x => x.PostalCode)
            .NotEmpty().WithMessage("Postal code is required.");

        RuleFor(x => x.Country)
            .NotEmpty().WithMessage("Country is required.");
    }

    private bool BeAtLeast18YearsOld(DateTime birthDate)
    {
        return birthDate <= DateTime.Today.AddYears(-18);
    }
}
