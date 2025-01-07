using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.Order.GetByCustomerIdOrder;
public sealed record GetOrderByCustomerIdQuery(Guid CustomerId) :  IQuery<IEnumerable<OrderDto>>;