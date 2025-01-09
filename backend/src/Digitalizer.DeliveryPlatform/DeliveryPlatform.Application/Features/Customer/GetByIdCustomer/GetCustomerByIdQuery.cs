using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.Customer.GetByIdCustomer;
public sealed record GetCustomerByIdQuery(Guid CustomerId) : IQuery<CustomerDto>;
