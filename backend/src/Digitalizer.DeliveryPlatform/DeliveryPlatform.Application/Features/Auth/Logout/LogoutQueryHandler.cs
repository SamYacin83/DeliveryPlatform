using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.User;
using Microsoft.AspNetCore.Identity;

namespace Digitalizer.DeliveryPlatform.Application.Features.Auth.Logout;
public class LogoutQueryHandler(SignInManager<ApplicationUser> signInManager) : ICommandHandler<LogoutQuery>
{
    public async Task<Result> Handle(LogoutQuery request, CancellationToken cancellationToken)
    {
        await signInManager.SignOutAsync().ConfigureAwait(false);

        return Result.Success();
    }
}
