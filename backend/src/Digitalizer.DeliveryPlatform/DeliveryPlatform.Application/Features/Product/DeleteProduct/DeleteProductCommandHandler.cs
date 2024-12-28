using Digitalizer.DeliveryPlatform.Application.Data;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.DeleteProduct;
public class DeleteProductCommandHandler(IProductRepository repository, IUnitOfWork unitOfWork)
    : ICommandHandler<DeleteProductCommand>
{
    public async Task<Result> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var product = await repository.GetByIdAsync(request.Id).ConfigureAwait(false);

        if (product == null)
            throw new ProductNotFoundException(request.Id);

        repository.Delete(product);
        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return Result.Success();
    }
}
