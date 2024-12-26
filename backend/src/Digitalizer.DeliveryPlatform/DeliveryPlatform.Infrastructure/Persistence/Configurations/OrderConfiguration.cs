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

        builder.OwnsOne(c => c.Email, email =>
        {
            email.Property(e => e.Value)
                 .HasColumnName("Email")
                 .HasMaxLength(256)
                 .IsRequired();
        });

        builder.OwnsOne(c => c.Phone, phone =>
        {
            phone.Property(p => p.Value)
                 .HasColumnName("PhoneNumber")
                 .HasMaxLength(20)
                 .IsRequired();
        });

        builder.OwnsMany(c => c.Addresses, address =>
        {
            address.Property(a => a.Street).HasMaxLength(200).IsRequired();
            address.Property(a => a.City).HasMaxLength(100).IsRequired();
            address.Property(a => a.PostalCode).HasMaxLength(20).IsRequired();
            address.Property(a => a.Country).HasMaxLength(100).IsRequired();
        });
    }
}
