using Digitalizer.DeliveryPlatform.Common.Configuration;
using Digitalizer.DeliveryPlatform.Infrastructure.Hubs;
using Digitalizer.DeliveryPlatform.Infrastructure.Installers;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;
using Digitalizer.DeliveryPlatform.Infrastructure.Services;
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
builder.Services.AddAuthorization();
builder.Services.AddSingleton<RealTimeTrackingService>(); // 🔹 OU scoped selon le besoin

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://localhost:28110", "http://localhost:28109", "http://localhost:3000" +
            "") // 🔹 Ajoute les bonnes origines
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials(); // 🔹 Permettre WebSockets (SignalR)
    });
});


var app = builder.Build(); 
app.UseCors();



app.UseLogContext();
app.UseSerilogRequestLogging();
app.UseSwaggerConfiguration();

app.UseDefaultFiles(); // Active index.html par défaut
app.UseStaticFiles();  // Active le support des fichiers statiques
app.UseWebSockets(); // 🔹 Active WebSocket pour SignalR
app.MapEndpoints();
app.MapHub<DeliveryTrackingHub>("/trackingHub");  // Ajoute le Hub SignalR

await app.RunAsync().ConfigureAwait(false);
