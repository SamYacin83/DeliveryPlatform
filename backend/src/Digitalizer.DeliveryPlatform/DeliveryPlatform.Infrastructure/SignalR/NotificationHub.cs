

using Microsoft.AspNetCore.SignalR;

namespace Digitalizer.DeliveryPlatform.Infrastructure.SignalR;

public class NotificationHub : Hub
{
    public async Task JoinOrderGroup(string orderId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"order-{orderId}").ConfigureAwait(false);
    }

    public async Task LeaveOrderGroup(string orderId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"order-{orderId}").ConfigureAwait(false);
    }
}
