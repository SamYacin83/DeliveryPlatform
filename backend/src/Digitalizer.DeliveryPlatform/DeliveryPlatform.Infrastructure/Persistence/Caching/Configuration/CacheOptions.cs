using Microsoft.Extensions.Caching.Distributed;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Caching.Configuration;
public static class CacheOptions
{
    public static DistributedCacheEntryOptions DefaultExpiration => new()
    {
        AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(14)
    };

    public static DistributedCacheEntryOptions Create(int? expirationInDays) =>
        expirationInDays is not null ?
            new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(expirationInDays.Value) } :
            DefaultExpiration;
}

