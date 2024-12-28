using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;
using FluentValidation;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.UpdateProductCategory;
public class UpdateProductCategoryCommandValidator : AbstractValidator<UpdateProductCategoryCommand>
{
    private readonly IProductCategoryRepository _productCategoryRepository;

    public UpdateProductCategoryCommandValidator(IProductCategoryRepository productCategoryRepository)
    {
        _productCategoryRepository = productCategoryRepository;

        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Product category ID is required");

        RuleFor(x => x.Name)
            .NotEmpty()
            .WithErrorCode("Required")
            .WithMessage("Product category name cannot be empty")
            .MaximumLength(100)
            .WithMessage("Product category name cannot exceed 100 characters")
            .MustAsync(BeUniqueNameAsync)
            .WithErrorCode("Duplicate")
            .WithMessage("A product category with this name already exists");

        RuleFor(x => x.Description)
            .MaximumLength(500)
            .WithMessage("Description cannot exceed 500 characters");
    }

    private async Task<bool> BeUniqueNameAsync(UpdateProductCategoryCommand command, string name, CancellationToken cancellationToken)
    {
        var existingProductCategories = await _productCategoryRepository.GetAllAsync().ConfigureAwait(false);
        return !existingProductCategories.Any(p =>
            p.Id != command.Id &&
            p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
    }
}
