namespace Digitalizer.DeliveryPlatform.Application.Interfaces;
public interface IEmailService
{
    Task<bool> SendWelcomeEmailAsync(string email, string verificationToken);
    Task SendPasswordResetEmailAsync(string email, string resetToken);
    Task SendEmailVerificationAsync(string email, string verificationToken);
}