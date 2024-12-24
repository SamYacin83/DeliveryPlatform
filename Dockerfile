# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["DeliveryPlatform.WebApi/DeliveryPlatform.WebApi.csproj", "DeliveryPlatform.WebApi/"]
COPY ["DeliveryPlatform.Infrastructure/DeliveryPlatform.Infrastructure.csproj", "DeliveryPlatform.Infrastructure/"]
COPY ["DeliveryPlatform.Application/DeliveryPlatform.Application.csproj", "DeliveryPlatform.Application/"]
COPY ["DeliveryPlatform.Domain/DeliveryPlatform.Domain.csproj", "DeliveryPlatform.Domain/"]
COPY ["DeliveryPlatform.Shared/DeliveryPlatform.Shared.csproj", "DeliveryPlatform.Shared/"]

RUN dotnet restore "DeliveryPlatform.WebApi/DeliveryPlatform.WebApi.csproj"

# Copy all source files and build
COPY src/ .
RUN dotnet build "DeliveryPlatform.WebApi/DeliveryPlatform.WebApi.csproj" -c Release -o /app/build

# Publish Stage
FROM build AS publish
RUN dotnet publish "DeliveryPlatform.WebApi/DeliveryPlatform.WebApi.csproj" -c Release -o /app/publish

# Final Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Install necessary tools (if needed)
RUN apt-get update && apt-get install -y curl

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "DeliveryPlatform.WebApi.dll"]