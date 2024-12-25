using Digitalizer.DeliveryPlatform.Common.Results;
using MediatR;

namespace Digitalizer.DeliveryPlatform.Common.Messaging;
public interface IQueryHandler<in TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>>
    where TQuery : IQuery<TResponse>;