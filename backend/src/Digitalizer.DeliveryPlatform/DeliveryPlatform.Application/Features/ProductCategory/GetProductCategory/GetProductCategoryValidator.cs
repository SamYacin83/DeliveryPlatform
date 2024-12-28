using FluentValidation;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.GetProductCategory;
public class GetProductCategoryValidator : AbstractValidator<GetProductCategoryQuery>
{
    public GetProductCategoryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithErrorCode("Required")
            .WithMessage("Product category ID is required");
    }
}
