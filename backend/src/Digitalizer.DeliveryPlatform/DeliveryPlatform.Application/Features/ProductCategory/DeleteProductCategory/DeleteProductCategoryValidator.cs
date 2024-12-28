using FluentValidation;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.DeleteProductCategory;
public class DeleteProductCategoryValidator : AbstractValidator<DeleteProductCategoryCommand>
{
    public DeleteProductCategoryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithErrorCode("Required")
            .WithMessage("Product category ID is required");
    }
}
