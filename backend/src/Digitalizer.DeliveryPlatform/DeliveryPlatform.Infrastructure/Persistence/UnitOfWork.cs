using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence;
public class UnitOfWork(DeliveryDbContext context) : IUnitOfWork
{
    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            return await context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        }
        catch (Exception)
        {
            context.ChangeTracker.Entries().ToList().ForEach(x => x.Reload());
            throw;
        }
       
    }
}