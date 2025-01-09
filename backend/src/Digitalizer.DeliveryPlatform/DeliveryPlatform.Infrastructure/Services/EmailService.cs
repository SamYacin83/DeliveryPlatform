using System.Net;
using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net.Mail;
using Microsoft.Extensions.Logging;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Services;
public class EmailService : IEmailService, IDisposable
{
    private readonly IConfiguration _configuration;
    private readonly SmtpClient _smtpClient;
    private readonly ILogger<EmailService> _logger;
    private bool _disposed;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
        _smtpClient = new SmtpClient
        {
            Host = _configuration["Email:SmtpHost"] ?? string.Empty,
            Port = int.TryParse(_configuration["Email:SmtpPort"], out var port) ? port : int.MinValue,
            EnableSsl = true,
            Credentials = new NetworkCredential(
                              _configuration["Email:Username"],
                              _configuration["Email:Password"])
        };
    }

    public async Task<bool> SendWelcomeEmailAsync(string email, string verificationToken)
    {
        //TODO: Implement the link to confirm email address validation and activate the account
        try
        {
            using var message = new MailMessage
            {
                From = new MailAddress(_configuration["Email:From"] ??
                                                           throw new ArgumentNullException(nameof(email), "Email:From configuration is missing")),
                Subject = "Welcome to Delivery Platform",
                Body = BuildWelcomeEmailBody(verificationToken),
                IsBodyHtml = true
            };
            message.To.Add(email);

            _smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            _smtpClient.UseDefaultCredentials = false;
            await _smtpClient.SendMailAsync(message).ConfigureAwait(false);
            return true;
        }
        catch (SmtpException ex)
        {
            _logger.LogError(ex, "Failed to send welcome email to {Email}", email);
            return false;
        }
    }

    public async Task SendPasswordResetEmailAsync(string email, string resetToken)
    {
        using var message = new MailMessage
        {
            From = new MailAddress(_configuration["Email:From"] ?? throw new ArgumentNullException(nameof(email))),
            Subject = "Password Reset Request",
            Body = $"Click this link to reset your password: {resetToken}",
            IsBodyHtml = true
        };
        message.To.Add(email);

        _smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
        _smtpClient.UseDefaultCredentials = false;
        await _smtpClient.SendMailAsync(message).ConfigureAwait(false);
    }

    public async Task SendEmailVerificationAsync(string email, string verificationToken)
    {
        using var message = new MailMessage
        {
            From = new MailAddress(_configuration["Email:From"] ?? throw new ArgumentNullException(nameof(email))),
            Subject = "Email Verification",
            Body = $"Please verify your email by clicking this link: {verificationToken}",
            IsBodyHtml = true
        };
        message.To.Add(email);

        _smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
        _smtpClient.UseDefaultCredentials = false;
        await _smtpClient.SendMailAsync(message).ConfigureAwait(false);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                _smtpClient?.Dispose();
            }
            _disposed = true;
        }
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    private string BuildWelcomeEmailBody(string verificationToken)
    {
        var baseUrl = _configuration["Application:BaseUrl"];
        var verificationUrl = $"{baseUrl}/verify-email?token={verificationToken}";

        return $@"
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset='UTF-8' />
              <meta name='viewport' content='width=device-width, initial-scale=1.0' />
              <style>
                /* General Reset */
                body, table, td, a {{
                  margin: 0;
                  padding: 0;
                  text-decoration: none;
                  color: #4a4a4a;
                  font-family: Arial, sans-serif;
                  line-height: 1.5;
                }}
                body {{
                  background-color: #f4f4f4; /* Light gray background */
                }}

                /* Container */
                .email-container {{
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff; /* White background for the content box */
                  border-radius: 6px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }}

                /* Header */
                .email-header {{
                  background-color: #6A1B9A; /* Violet/purple background */
                  color: #ffffff;
                  padding: 20px;
                  text-align: center;
                  border-radius: 6px 6px 0 0;
                }}
                .email-header h1 {{
                  margin: 0;
                  font-size: 24px;
                }}

                /* Body */
                .email-body {{
                  padding: 20px;
                }}
                .email-body h2 {{
                  color: #6A1B9A;
                  font-size: 20px;
                  margin-top: 0;
                  margin-bottom: 10px;
                }}
                .email-body p {{
                  margin: 0 0 15px 0;
                }}

                /* Call-to-Action Button */
                .cta-button {{
                  display: inline-block;
                  padding: 12px 20px;
                  background-color: #6A1B9A; /* Violet/purple background */
                  color: #ffffff;
                  font-weight: bold;
                  border-radius: 4px;
                  text-align: center;
                }}
                .cta-button:hover {{
                  background-color: #8133b1; /* Slightly darker shade on hover */
                }}

                /* Footer */
                .email-footer {{
                  padding: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #999999;
                  border-top: 1px solid #ececec;
                  border-radius: 0 0 6px 6px;
                }}

              </style>
            </head>
            <body>
              <table role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%'>
                <tr>
                  <td align='center'>
                    <div class='email-container'>
                      <!-- Header -->
                      <div class='email-header'>
                        <h1>Delivery Platform</h1>
                      </div>

                      <!-- Body -->
                      <div class='email-body'>
                        <h2>Bienvenue sur Delivery Platform!</h2>
                        <p>Merci de vous être inscrit. Nous sommes ravis de vous compter parmi nous. 
                           Veuillez vérifier votre adresse courriel en cliquant sur le lien ci-dessous :</p>

                        <p style='text-align: center;'>
                          <a 
                            class='cta-button' 
                            href='{verificationUrl}' 
                            target='_blank'>
                            Vérifier mon adresse courriel
                          </a>
                        </p>

                        <p>Ce lien expirera dans 24 heures.</p>
                        <p>
                          Note: Il se peut que vous ayez à copier et coller l'URL ci-dessus dans la barre d'adresse 
                          de votre navigateur si le lien ne fonctionne pas.
                        </p>

                        <p>Cordialement,<br/>
                        Équipe Digitalizer Support</p>
                      </div>

                      <!-- Footer -->
                      <div class='email-footer'>
                        &copy; {DateTime.Now.Year} Delivery Platform. Tous droits réservés.
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </body>
            </html>";
    }
}
