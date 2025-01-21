using Digitalizer.DeliveryPlatform.Common.Configuration;
using Digitalizer.DeliveryPlatform.Infrastructure.Hubs;
using Digitalizer.DeliveryPlatform.Infrastructure.Installers;
using Digitalizer.DeliveryPlatform.Infrastructure.Services;
using Digitalizer.DeliveryPlatform.WebApi.Extensions;
using Digitalizer.DeliveryPlatform.WebApi.Middleware;
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
builder.Services.AddSignalR(); // 👈 Ajoute SignalR pour la communication en temps réel
builder.Services.AddSingleton<RealTimeTrackingService>();




var app = builder.Build();

app.UseLogContext();
app.UseSerilogRequestLogging();
app.UseSwaggerConfiguration();
app.MapEndpoints();
app.MapHub<DeliveryTrackingHub>("/trackingHub");
await app.RunAsync().ConfigureAwait(false);
