using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Product;
using Microsoft.EntityFrameworkCore;

namespace Digitalizer.DeliveryPlatform.Application.Data;
public interface IDeliveryDbContext
{
    DbSet<Customer> Customers { get; set; }
    DbSet<Product> Products { get; set; }
}
