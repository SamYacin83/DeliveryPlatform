using Digitalizer.DeliveryPlatform.Application.Data;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;

namespace Digitalizer.DeliveryPlatform.Application.Features.Order.GetOrder;
internal sealed class GetOrderQueryHandler(ICustomerRepository customerRepository, IUnitOfWork unitOfWork) : IQueryHandler<GetOrderQuery, OrderDto>
{
    public async Task<Result<OrderDto>> Handle(GetOrderQuery request, CancellationToken cancellationToken)
    {
        // Simulate fetching order data 
        var order = await Task.Run(() => new OrderDto(Guid.NewGuid(), new List<OrderItemDto>(), 100.0m, "USD")).ConfigureAwait(false);
        var customer = await customerRepository.GetByIdAsync(Guid.NewGuid()).ConfigureAwait(false);
        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        
        return order;
    }
}
