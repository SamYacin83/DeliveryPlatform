using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
using Microsoft.EntityFrameworkCore;

namespace Digitalizer.DeliveryPlatform.Application.Data;
public interface IDeliveryDbContext
{
    DbSet<Customer> Customers { get; set; }
}
