using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.DeleteProduct;
public class DeleteProductCommandHandler(IProductRepository repository, IUnitOfWork unitOfWork)
    : ICommandHandler<DeleteProductCommand>
{
    public async Task<Result> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        if (request.Id == null)
        {
            return Result.Failure(new ErrorResult("InvalidId", "Product Id cannot be null", ErrorType.Validation));
        }

        var product = await repository.GetByIdAsync(request.Id.Value).ConfigureAwait(false);


        if (product == null)
        {
            throw new ProductNotFoundException(request.Id.Value);
        }

        repository.Delete(product);
        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return Result.Success();
    }
}
