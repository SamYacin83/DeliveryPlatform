using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Microsoft.AspNetCore.Http;

namespace Digitalizer.DeliveryPlatform.Application.Features.Auth.GetAuthStatus;
public sealed class GetAutSatusQueryHandler(IHttpContextAccessor httpContextAccessor) : IQueryHandler<GetAuthStatusQuery, bool>
{
    public Task<Result<bool>> Handle(GetAuthStatusQuery request, CancellationToken cancellationToken)
    {
        var user = httpContextAccessor.HttpContext?.User;
       return Task.FromResult<Result<bool>>(user?.Identity?.IsAuthenticated ?? false);
    }
}
