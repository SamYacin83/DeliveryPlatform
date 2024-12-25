using Digitalizer.DeliveryPlatform.Common.Results;
using MediatR;

namespace Digitalizer.DeliveryPlatform.Common.Messaging;
public interface IQuery<TResponse> : IRequest<Result<TResponse>>;