using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;
using FluentValidation;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.AddProductCategory;
public class AddProductCategoryCommandValidator : AbstractValidator<AddProductCategoryCommand>
{
    private readonly IProductCategoryRepository _repository;

    public AddProductCategoryCommandValidator(IProductCategoryRepository productCategoryRepository)
    {
        _repository = productCategoryRepository;

        RuleFor(x => x.Name)
            .NotEmpty()
            .WithErrorCode("Required")
            .WithMessage("The product category name cannot be empty")
            .MaximumLength(100)
            .WithMessage("The product category name cannot exceed 100 characters")
            .MustAsync(BeUniqueNameAsync)
            .WithErrorCode("Duplicate")
            .WithMessage("A product category with this name already exists");

        RuleFor(x => x.Description)
            .MaximumLength(500)
            .WithMessage("The description cannot exceed 500 characters");
    }

    private async Task<bool> BeUniqueNameAsync(string name, CancellationToken cancellationToken)
    {
        var existingProductCategories = await _repository.GetAllAsync().ConfigureAwait(false);
        return !existingProductCategories.Any(p => p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
    }
}
