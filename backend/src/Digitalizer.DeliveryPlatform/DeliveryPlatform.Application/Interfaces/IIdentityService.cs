using Digitalizer.DeliveryPlatform.Application.Features.Auth.Request;
using Digitalizer.DeliveryPlatform.Application.Features.Auth.Responses;
using Digitalizer.DeliveryPlatform.Common.Results;

namespace Digitalizer.DeliveryPlatform.Application.Interfaces;
public interface IIdentityService
{
    Task<Result<string>> RegisterUserAsync(RegisterRequest request);
    Task<Result<AuthResponse>> LoginAsync(LoginRequest request);
    Task<Result> AssignRoleAsync(string userId, string role);
    Task<Result> VerifyEmailAsync(string userId, string token);
}
