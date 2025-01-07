using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Domain.Caching.Models;

namespace Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart.GetCart;
public sealed record GetCartQuery(Guid CustomerId) : IQuery<Cart>;
