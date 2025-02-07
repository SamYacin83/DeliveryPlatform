using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
namespace Digitalizer.DeliveryPlatform.Application.Features.Auth.GetUserInfo;
public sealed class GetUserInfoQueryHandler(
    SignInManager<ApplicationUser> signInManager,
    IHttpContextAccessor httpContextAccessor)
    : IQueryHandler<GetUserInfoQuery, UserDto>
{
    public async Task<Result<UserDto>> Handle(GetUserInfoQuery request, CancellationToken cancellationToken)
    {
        var user = httpContextAccessor.HttpContext?.User;
#pragma warning disable CS8625 
        if (user?.Identity?.IsAuthenticated != true) return Result.Success<UserDto>(null);
#pragma warning restore CS8625 

        var applicationUser = await signInManager.UserManager.GetUserAsync(user).ConfigureAwait(false);
        if (applicationUser == null) return Result.Failure<UserDto>(ErrorResult.NotFound("UserNotFound", "User not found"));

        var userDto = new UserDto(
            applicationUser.Id,
            applicationUser.FirstName ?? string.Empty,
            applicationUser.LastName ?? string.Empty,
            applicationUser.Email ?? string.Empty,
            string.Join(",", await signInManager.UserManager.GetRolesAsync(applicationUser).ConfigureAwait(false))
        );
        return Result.Success(userDto);
    }
}
