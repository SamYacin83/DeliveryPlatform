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
    private readonly Dictionary<Guid, Guid> _deliveryToClientMap;   // 🔗 Association Livreur → Client
    private readonly Dictionary<Guid, Guid> _deliveryToVendeurMap = new();

    public RealTimeTrackingService()
    {
        _deliveryToClientMap = new Dictionary<Guid, Guid>();
        _deliveryToVendeurMap = new Dictionary<Guid, Guid>();
    }
    

    public void UpdateLocation(Guid deliveryPersonId, Location location)
    {
        _locations[deliveryPersonId] = location;
    }
    // ✅ Associer un client à un livreur
    public void AssignClientToDelivery(Guid deliveryPersonId, Guid clientId)
    {
        _deliveryToClientMap[deliveryPersonId] = clientId;
        Console.WriteLine($"🤝 Livreur {deliveryPersonId} assigné au client {clientId}");
    }

    // ✅ Associer un vendeur à un livreur
    public void AssignVendeurToDelivery(Guid deliveryPersonId, Guid vendeurId)
    {
        _deliveryToVendeurMap[deliveryPersonId] = vendeurId;
        Console.WriteLine($"🏪 Livreur {deliveryPersonId} assigné au vendeur {vendeurId}");
    }

    // ✅ Obtenir l'ID du client assigné à un livreur
    public Guid? GetClientIdForDelivery(Guid deliveryPersonId)
    {
        if (_deliveryToClientMap.TryGetValue(deliveryPersonId, out Guid clientId))
        {
            return clientId;
        }
        return null; // 🚩 Aucun client trouvé
    }

    // ✅ Obtenir l'ID du vendeur assigné à un livreur
    public Guid? GetVendeurIdForDelivery(Guid deliveryPersonId)
    {
        if (_deliveryToVendeurMap.TryGetValue(deliveryPersonId, out Guid vendeurId))
        {
            return vendeurId;
        }
        return null; // 🚩 Aucun vendeur trouvé
    }

    public Location? GetLocation(Guid deliveryPersonId)
    {
        return _locations.TryGetValue(deliveryPersonId, out var location) ? location : null;
    }
}

