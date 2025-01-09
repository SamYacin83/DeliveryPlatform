using System.Net.Mail;
using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer.Events;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.User;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace Digitalizer.DeliveryPlatform.Application.Features.Customer.Events;

public class CustomerCreatedHandler(
    IEmailService emailService,
    UserManager<ApplicationUser> userManager,
    ILogger<CustomerCreatedHandler> logger)
    : INotificationHandler<CustomerCreatedEvent>
{
    public async Task Handle(CustomerCreatedEvent notification, CancellationToken cancellationToken)
    {
        try
        {
            var user = await userManager.FindByIdAsync(notification.IdentityId).ConfigureAwait(false);
            if (user == null)
            {
                logger.LogError("User not found for identity {IdentityId}, customer {CustomerId}",
                    notification.IdentityId, notification.CustomerId);
                return;
            }

            if (!user.EmailConfirmed)
            {
                var token = await userManager.GenerateEmailConfirmationTokenAsync(user).ConfigureAwait(false);
                if (user.Email != null)
                {
                    await emailService.SendWelcomeEmailAsync(
                        user.Email,
                        token
                    ).ConfigureAwait(false);
                    logger.LogInformation("Welcome email sent to {Email} for customer {CustomerId}",
                        user.Email, notification.CustomerId);
                }
            }
        }
        catch (SmtpException ex)
        {
            logger.LogError(ex, "SMTP error sending welcome email for customer {CustomerId}",
                notification.CustomerId);
        }
        catch (InvalidOperationException ex)
        {
            logger.LogError(ex, "Invalid operation error sending welcome email for customer {CustomerId}",
                notification.CustomerId);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unexpected error sending welcome email for customer {CustomerId}",
                notification.CustomerId);
            throw;
        }
    }
}
