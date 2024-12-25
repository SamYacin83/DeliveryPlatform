using Digitalizer.DeliveryPlatform.Common.Configuration;
using Digitalizer.DeliveryPlatform.WebApi.Extensions;
using Digitalizer.DeliveryPlatform.WebApi.Middleware;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, loggerConfig) => loggerConfig.ReadFrom.Configuration(context.Configuration));

builder.Services.AddApplication();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<ValidationExceptionHandler>();
builder.Services.AddEndpoints();
builder.Services.AddSwaggerConfiguration();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

var app = builder.Build();

app.UseLogContext();
app.UseSerilogRequestLogging();
app.UseSwaggerConfiguration();
app.MapEndpoints();

await app.RunAsync().ConfigureAwait(false);
