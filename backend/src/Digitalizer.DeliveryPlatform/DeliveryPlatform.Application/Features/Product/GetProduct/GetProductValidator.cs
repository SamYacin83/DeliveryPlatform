using FluentValidation;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.GetProduct;
public class GetProductValidator : AbstractValidator<GetProductQuery>
{
    public GetProductValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithErrorCode("Required")
            .WithMessage("Product ID is required");
    }
}
