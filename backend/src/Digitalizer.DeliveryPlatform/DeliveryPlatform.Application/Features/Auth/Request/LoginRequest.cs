namespace Digitalizer.DeliveryPlatform.Application.Features.Auth.Request;
public record LoginRequest
{
    public string Email { get; init; }
    public string Password { get; init; }
}