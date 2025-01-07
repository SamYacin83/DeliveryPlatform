using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using Digitalizer.DeliveryPlatform.Domain.Enums;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.ValueObjects;
public record DeliveryService
{
    public DeliveryService()
    {
        
    }

    public DeliveryServiceType Type { get; }
    public Money Cost { get; }

    private static readonly Dictionary<DeliveryServiceType, Money> ServiceCosts = new()
                                                                                  {
                                                                                      { DeliveryServiceType.Standard, new Money(500) },
                                                                                      { DeliveryServiceType.Express, new Money(1000) },
                                                                                      { DeliveryServiceType.Scheduled, new Money(600) }
                                                                                  };

    private DeliveryService(DeliveryServiceType type)
    {
        Type = type;
        Cost = ServiceCosts[type];
    }

    public static DeliveryService Create(DeliveryServiceType type) => new(type);
}
