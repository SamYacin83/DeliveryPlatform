using FluentValidation;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.DeleteProduct;
public class DeleteProductCommandValidator : AbstractValidator<DeleteProductCommand>
{
    public DeleteProductCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithErrorCode("Required")
            .WithMessage("Product ID is required");
    }
}
