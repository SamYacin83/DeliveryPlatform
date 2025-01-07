using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Domain.Enums;

namespace Digitalizer.DeliveryPlatform.Application.Features.Order.AddOrder;
public record AddOrderCommand(
    Guid CustomerId,
    string Street,
    string City,
    string PostalCode,
    string Country) : ICommand<OrderDto>;