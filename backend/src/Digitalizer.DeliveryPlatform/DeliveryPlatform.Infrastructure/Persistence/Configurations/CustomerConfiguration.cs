using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Configurations;
public class CustomerConfiguration : BaseConfiguration<Customer>
{
    public override void Configure(EntityTypeBuilder<Customer> builder)
    {
        base.Configure(builder);

        builder.Property(c => c.Name)
               .HasMaxLength(100)
               .IsRequired();


        //builder.Property(c => c.Email)
        //       .HasMaxLength(150)
        //       .IsRequired();

        //builder.Property(c => c.Phone)
        //       .HasMaxLength(20)
        //       .IsRequired();

        builder.OwnsMany(c => c.Addresses, address =>
        {
            address.WithOwner().HasForeignKey("CustomerId");
            address.Property(a => a.Street).HasMaxLength(200).IsRequired();
            address.Property(a => a.City).HasMaxLength(100).IsRequired();
            address.Property(a => a.PostalCode).HasMaxLength(20);
            address.Property(a => a.Country).HasMaxLength(100).IsRequired();
        });

        builder.Navigation(c => c.Addresses).UsePropertyAccessMode(PropertyAccessMode.Field);
    }
}