using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.ValueObjects;
using Digitalizer.DeliveryPlatform.Infrastructure.Services;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;


namespace Digitalizer.DeliveryPlatform.Infrastructure.Hubs;
public class DeliveryTrackingHub : Hub
{
    private readonly RealTimeTrackingService _trackingService;

    public DeliveryTrackingHub(RealTimeTrackingService trackingService)
    {
        _trackingService = trackingService;
    }

    public async Task SendLocationUpdate(Guid deliveryPersonId, double latitude, double longitude)
    {
        try
        {
            Console.WriteLine($"📡 Tentative de mise à jour de localisation : {deliveryPersonId} => {latitude}, {longitude}");

            var location = new Location(latitude, longitude);
            _trackingService.UpdateLocation(deliveryPersonId, location);

            await Clients.All.SendAsync("ReceiveLocationUpdate", deliveryPersonId, latitude, longitude).ConfigureAwait(false);
#pragma warning disable CA1303 // Ne pas passer de littéraux en paramètres localisés
            Console.WriteLine("""Localisation envoyée avec succes""");
#pragma warning restore CA1303 // Ne pas passer de littéraux en paramètres localisés

        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Erreur dans SendLocationUpdate : {ex.Message}");
            throw;
        }
    }
    
}