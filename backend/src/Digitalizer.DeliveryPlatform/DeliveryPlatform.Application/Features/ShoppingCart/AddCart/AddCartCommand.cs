using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Domain.Caching.Models;
using Digitalizer.DeliveryPlatform.Domain.Enums;

namespace Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart.AddCart;
public record AddCartCommand(
    Guid CustomerId,
    DeliveryServiceType ServiceType,
    IReadOnlyCollection<CartItem> Items) : ICommand<ShoppingCartDto>;

