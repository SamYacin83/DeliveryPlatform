using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.Product.DeleteProduct;
public record DeleteProductCommand(Guid Id) : ICommand;
