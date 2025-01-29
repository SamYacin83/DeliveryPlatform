using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Services;
public class RealTimeTrackingService
{
    private readonly Dictionary<Guid, Location> _locations = new();

    public void UpdateLocation(Guid deliveryPersonId, Location location)
    {
        _locations[deliveryPersonId] = location;
    }

    public Location? GetLocation(Guid deliveryPersonId)
    {
        return _locations.TryGetValue(deliveryPersonId, out var location) ? location : null;
    }
}

