using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.ValueObjects;
using Digitalizer.DeliveryPlatform.Infrastructure.Services;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Security.Cryptography;
using static System.Runtime.InteropServices.JavaScript.JSType;



namespace Digitalizer.DeliveryPlatform.Infrastructure.Hubs;
public class DeliveryTrackingHub : Hub
{
    private readonly RealTimeTrackingService _trackingService;
    private CancellationTokenSource? _cts= new();

    public DeliveryTrackingHub(RealTimeTrackingService trackingService)
    {
        _trackingService = trackingService;
        _cts = new CancellationTokenSource();
    }
    public async Task JoinGroup(string deliveryPersonId, string role, string? relatedId = null)
    {
        if (!Guid.TryParse(deliveryPersonId, out Guid deliveryId))
        {
            Console.WriteLine($"❌ ID du livreur invalide : {deliveryPersonId}");
            return;
        }

        Guid? relatedGuid = null;
        if (!string.IsNullOrEmpty(relatedId))
        {
            if (!Guid.TryParse(relatedId, out Guid parsedId))
            {
                Console.WriteLine($"❌ relatedId invalide : {relatedId}");
                return;
            }
            relatedGuid = parsedId;
        }

        // ✅ Ajout d'une condition spécifique pour le rôle "Livreur"
        var groupName = role == "Livreur"
            ? $"Livreur-{deliveryPersonId}"
            : relatedGuid != null
                ? $"{role}-{relatedGuid}"
                : $"{role}-{deliveryPersonId}";

        await Groups.AddToGroupAsync(Context.ConnectionId, groupName).ConfigureAwait(false);
        Console.WriteLine($"✅ {role} {deliveryPersonId} a rejoint le groupe {groupName}");

        // ✅ Association correcte des rôles
        if (relatedGuid != null)
        {
            if (role == "Client")
            {
                _trackingService.AssignClientToDelivery(deliveryId, relatedGuid.Value);
                Console.WriteLine($"🤝 Client {relatedGuid} assigné au livreur {deliveryPersonId}");
            }
            else if (role == "Vendeur")
            {
                _trackingService.AssignVendeurToDelivery(deliveryId, relatedGuid.Value);
                Console.WriteLine($"🏪 Vendeur {relatedGuid} assigné au livreur {deliveryPersonId}");
            }
        }
    }


    public async Task SendLocationUpdate(Guid deliveryPersonId, double latitude, double longitude)
    {
        try
        {
            Random random = new Random();
            latitude = 11.5721 + (GetSecureRandomDouble() * 0.002 - 0.001);
            longitude = 43.1456 + (GetSecureRandomDouble() * 0.002 - 0.001);

            Console.WriteLine($"📡 Mise à jour de localisation : {deliveryPersonId} => {latitude}, {longitude}");


            await Clients.Group($"Livreur-{deliveryPersonId}")
                .SendAsync("ReceiveLocationUpdate", deliveryPersonId, latitude, longitude)
                .ConfigureAwait(false);
            Console.WriteLine($"✅ Envoi au groupe : Livreur-{deliveryPersonId}");

            var clientId = _trackingService.GetClientIdForDelivery(deliveryPersonId);
            if (clientId != null)
            {
                Console.WriteLine($"✅ Envoi au groupe : Client-{clientId}");
                await Clients.Group($"Client-{clientId}")
                    .SendAsync("ReceiveLocationUpdate", deliveryPersonId, latitude, longitude)
                    .ConfigureAwait(false);
            }

            var vendeurId = _trackingService.GetVendeurIdForDelivery(deliveryPersonId);
            if (vendeurId != null)
            {
                Console.WriteLine($"✅ Envoi au groupe : Vendeur-{vendeurId}");
                await Clients.Group($"Vendeur-{vendeurId}")
                    .SendAsync("ReceiveLocationUpdate", deliveryPersonId, latitude, longitude)
                    .ConfigureAwait(false);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Erreur dans SendLocationUpdate : {ex.Message}");
            throw;
        }
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine($"❌ Déconnexion de : {Context.ConnectionId}");

        if (exception != null)
        {
            Console.WriteLine($"⚠️ Déconnexion inattendue : {exception.Message}");       }

        await base.OnDisconnectedAsync(exception).ConfigureAwait(false);
    }


    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            if (_cts != null)
            {
                _cts.Cancel();
                _cts.Dispose();
                _cts = null;
            }
        }

        base.Dispose(disposing);
    }




    private static double GetSecureRandomDouble()
    {
        byte[] buffer = new byte[8];
        RandomNumberGenerator.Fill(buffer);
        return Math.Abs(BitConverter.ToUInt64(buffer, 0) / (double)ulong.MaxValue);
    }

}