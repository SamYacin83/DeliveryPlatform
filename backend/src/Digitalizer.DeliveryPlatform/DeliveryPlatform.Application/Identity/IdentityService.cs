using Digitalizer.DeliveryPlatform.Application.Features.Auth.Request;
using Digitalizer.DeliveryPlatform.Application.Features.Auth.Responses;
using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.User;
using Microsoft.AspNetCore.Identity;

namespace Digitalizer.DeliveryPlatform.Application.Identity;
public class IdentityService(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager) : IIdentityService
{
    public async Task<Result<string>> RegisterUserAsync(RegisterRequest request)
    {
        var existingUser = await userManager.FindByEmailAsync(request.Email).ConfigureAwait(false);
        if (existingUser != null)
            return Result.Failure<string>(ErrorResult.Conflict("EmailAlreadyRegistered", "Email already registered"));

        var user = new ApplicationUser
        {
            Email = request.Email,
            UserName = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName
        };

        var result = await userManager.CreateAsync(user, request.Password).ConfigureAwait(false);

        if (!result.Succeeded)
            return Result.Failure<string>(ErrorResult.Problem("UserCreationFailed", string.Join(", ", result.Errors.Select(e => e.Description))));

        await userManager.AddToRoleAsync(user, request.Role.ToString()).ConfigureAwait(false);

        return Result.Success(user.Id);
    }

    public async Task<Result<AuthResponse>> LoginAsync(LoginRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email).ConfigureAwait(false);
        if (user == null)
            return Result.Failure<AuthResponse>(ErrorResult.Problem("InvalidCredentials", "Invalid credentials"));

        if (!user.EmailConfirmed)
            return Result.Failure<AuthResponse>(ErrorResult.Problem("EmailNotVerified", "Email not verified"));

        var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, false).ConfigureAwait(false);
        if (!result.Succeeded)
            return Result.Failure<AuthResponse>(ErrorResult.Problem("InvalidCredentials", "Invalid credentials"));

        throw new NotImplementedException();
    }

    public Task<Result> AssignRoleAsync(string userId, string role)
    {
        throw new NotImplementedException();
    }

    public Task<Result> VerifyEmailAsync(string userId, string token)
    {
        throw new NotImplementedException();
    }
}
