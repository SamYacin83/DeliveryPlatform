using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory.Events;
using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;
public class ProductCategory : AggregateRoot
{
    public string Name { get; private set; }
    public string Description { get; private set; }

    private ProductCategory() { }

    public static ProductCategory Create(string name, string description)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentNullException(nameof(name));

        var category = new ProductCategory
        {
            Name = name,
            Description = description
        };

        category.AddDomainEvent(new ProductCategoryCreatedEvent(category.Id));
        return category;
    }

    public void Update(string name, string description)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentNullException(nameof(name));

        Name = name;
        Description = description;

        AddDomainEvent(new ProductCategoryUpdatedEvent(Id));
    }
}
