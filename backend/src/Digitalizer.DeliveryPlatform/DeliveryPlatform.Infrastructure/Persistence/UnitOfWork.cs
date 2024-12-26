using Digitalizer.DeliveryPlatform.Application.Data;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence;
public class UnitOfWork : IUnitOfWork
{
    private readonly DeliveryDbContext _context;

    public UnitOfWork(DeliveryDbContext context)
    {
        _context = context;
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
    }
}
