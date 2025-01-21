using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.ValueObjects;
using Digitalizer.DeliveryPlatform.Infrastructure.Services;
using Microsoft.AspNetCore.SignalR;
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
        var location = new Location(latitude, longitude);
        _trackingService.UpdateLocation(deliveryPersonId, location);

        await Clients.All.SendAsync("ReceiveLocationUpdate", deliveryPersonId, latitude, longitude).ConfigureAwait(false);
    }
}