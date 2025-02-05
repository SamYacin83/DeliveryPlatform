using Digitalizer.DeliveryPlatform.Common.Messaging;

namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.DeleteDeliveryPerson;
public record DeleteDeliveryPersonCommand(Guid Id) : ICommand;
