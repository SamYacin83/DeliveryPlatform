using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using FluentValidation;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.AddProduct;
public class AddProductCommandValidator : AbstractValidator<AddProductCommand>
{
    private readonly IProductRepository _productRepository;

    public AddProductCommandValidator(IProductRepository productRepository)
    {
        _productRepository = productRepository;

        RuleFor(x => x.Name)
            .NotEmpty()
            .WithErrorCode("Required")
            .WithMessage("Product name cannot be empty")
            .MaximumLength(100)
            .WithMessage("Product name cannot exceed 100 characters")
            .MustAsync(BeUniqueNameAsync)
            .WithErrorCode("Duplicate")
            .WithMessage("A product with this name already exists");

        RuleFor(x => x.PictureUrl)
            .NotEmpty()
            .WithErrorCode("Required")
            .WithMessage("Picture URL cannot be empty");

        RuleFor(x => x.Description)
            .MaximumLength(500)
            .WithMessage("Description cannot exceed 500 characters");

        RuleFor(x => x.Price)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Price must be greater than or equal to 0");

        RuleFor(x => x.StockQuantity)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Stock quantity must be greater than or equal to 0");
    }

    private async Task<bool> BeUniqueNameAsync(string name, CancellationToken cancellationToken)
    {
        var existingProducts = await _productRepository.GetAllAsync().ConfigureAwait(false);
        return !existingProducts.Any(p => p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
    }
}
