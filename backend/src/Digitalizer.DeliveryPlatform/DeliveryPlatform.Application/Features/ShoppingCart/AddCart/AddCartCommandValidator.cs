using FluentValidation;

namespace Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart.AddCart;
public class AddCartCommandValidator : AbstractValidator<AddCartCommand>
{
    public AddCartCommandValidator()
    {
        RuleFor(x => x.CustomerId)
            .NotEmpty().WithMessage("CustomerId is required.");

        RuleFor(x => x.ServiceType)
            .IsInEnum().WithMessage("ServiceType must be a valid enum value.");

        RuleFor(x => x.Items)
            .NotEmpty().WithMessage("Items cannot be empty.")
            .Must(items => items.All(item => item.Quantity > 0))
            .WithMessage("All items must have a quantity greater than zero.");
    }
}
