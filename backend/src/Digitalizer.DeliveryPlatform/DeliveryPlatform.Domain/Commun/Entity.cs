namespace Digitalizer.DeliveryPlatform.Domain.Commun;
public abstract class Entity
{
    public Guid Id { get; protected set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? UpdatedAt { get; private set; }

    protected Entity()
    {
        Id = Guid.NewGuid();
        CreatedAt = DateTime.UtcNow;
    }

    public void SetUpdatedAt(DateTime dateTime)
    {
        UpdatedAt = dateTime;
    }
}