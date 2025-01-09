namespace Digitalizer.DeliveryPlatform.Application.Features.Auth.Responses;
public record AuthResponse
{
    public string Token { get; init; }
    public string RefreshToken { get; init; }
    public DateTime ExpiresAt { get; init; }
}