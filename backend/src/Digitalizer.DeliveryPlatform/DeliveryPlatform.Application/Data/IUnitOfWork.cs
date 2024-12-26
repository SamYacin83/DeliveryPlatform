namespace Digitalizer.DeliveryPlatform.Application.Data;
public interface IUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}