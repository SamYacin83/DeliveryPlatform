using Digitalizer.DeliveryPlatform.Domain.Caching.Models;
using Digitalizer.DeliveryPlatform.Domain.Enums;

namespace Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart;

public record ShoppingCartDto(
    Guid CustomerId,
    DeliveryServiceType ServiceType,
    IReadOnlyCollection<CartItem> Items);

