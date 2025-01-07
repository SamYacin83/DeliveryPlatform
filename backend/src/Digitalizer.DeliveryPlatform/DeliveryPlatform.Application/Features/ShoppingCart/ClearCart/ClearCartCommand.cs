using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart.ClearCart;
public sealed record ClearCartCommand(Guid CustomerId) : ICommand;
