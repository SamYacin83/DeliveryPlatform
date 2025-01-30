using Digitalizer.DeliveryPlatform.Common.Configuration;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.User;
using Digitalizer.DeliveryPlatform.Infrastructure.Installers;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;
using Digitalizer.DeliveryPlatform.Infrastructure.SignalR;
using Digitalizer.DeliveryPlatform.WebApi.Extensions;
using Digitalizer.DeliveryPlatform.WebApi.Features;
using Digitalizer.DeliveryPlatform.WebApi.Middleware;
using Microsoft.AspNetCore.Identity;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, loggerConfig) => loggerConfig.ReadFrom.Configuration(context.Configuration));

builder.Services.AddPersistence(builder.Configuration);
builder.Services.AddApplication();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<ValidationExceptionHandler>();
builder.Services.AddEndpoints();
builder.Services.AddSwaggerConfiguration();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddSignalR();
builder.Services.AddCors();
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
       .AddRoles<IdentityRole>()
       .AddEntityFrameworkStores<DeliveryDbContext>();

builder.Services.ConfigureApplicationCookie(options =>
{
    // Autoriser l’envoi du cookie en cross-site
    options.Cookie.SameSite = SameSiteMode.None;

    // Exiger HTTPS (idéalement en production) :
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

var app = builder.Build();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
                  .WithOrigins("http://localhost:5173", "https://localhost:5173"));

app.UseAuthentication();
app.UseAuthorization();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseLogContext();
app.UseSerilogRequestLogging();
app.UseSwaggerConfiguration();
app.MapEndpoints();
app.MapHub<NotificationHub>("/hubs/notifications");
app.MapGroup("api").MapIdentityApi<ApplicationUser>().WithTags(Tags.Identity);
await app.RunAsync().ConfigureAwait(false);
