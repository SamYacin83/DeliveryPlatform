using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart.RemoveItemFromCart;
public sealed record RemoveItemFromCartCommand(Guid CustomerId, Guid ProductId) : ICommand;