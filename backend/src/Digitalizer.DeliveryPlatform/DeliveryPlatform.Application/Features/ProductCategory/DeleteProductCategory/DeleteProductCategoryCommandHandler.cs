using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.DeleteProductCategory;
public class DeleteProductCategoryCommandHandler(IProductCategoryRepository repository, IUnitOfWork unitOfWork)
    : ICommandHandler<DeleteProductCategoryCommand>
{
    public async Task<Result> Handle(DeleteProductCategoryCommand request, CancellationToken cancellationToken)
    {
        var productCategory = await repository.GetByIdAsync(request.Id).ConfigureAwait(false);

        if (productCategory == null)
            throw new ProductCategoryNotFoundException(request.Id);

        repository.Delete(productCategory);

        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return Result.Success();
    }
}
