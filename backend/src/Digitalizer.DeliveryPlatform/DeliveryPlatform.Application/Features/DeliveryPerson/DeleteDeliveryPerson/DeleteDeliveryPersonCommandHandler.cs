using Digitalizer.DeliveryPlatform.Application.Data;
using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.DeleteDeliveryPerson;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery;
using System;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.DeleteProduct;

public class DeleteDeliveryPersonCommandHandler(IDeliveryPersonRepository repository, IUnitOfWork unitOfWork)
    : ICommandHandler<DeleteDeliveryPersonCommand>
{
       public async Task<Result> Handle(DeleteDeliveryPersonCommand request, CancellationToken cancellationToken)
    {
        var deleteDeliveryPerson = await repository.GetByIdAsync(request.Id).ConfigureAwait(false);

        if (deleteDeliveryPerson == null)
            throw new ProductNotFoundException(request.Id);

        repository.Delete(deleteDeliveryPerson);
        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return Result.Success();
    }
}

