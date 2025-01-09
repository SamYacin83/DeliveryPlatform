using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Configurations;
public class CustomerConfiguration : BaseConfiguration<Customer>
{
    public override void Configure(EntityTypeBuilder<Customer> builder)
    {
        base.Configure(builder);

        builder.Property(c => c.IdentityId)
               .HasMaxLength(450)  // Taille standard pour Identity ID
               .IsRequired();

        builder.Property(c => c.FirstName)
               .HasMaxLength(100)
               .IsRequired();

        builder.Property(c => c.LastName)
               .HasMaxLength(100)
               .IsRequired();

        builder.OwnsOne(c => c.Email, email =>
        {
            email.Property(e => e.Value)
                 .HasColumnName("email")
                 .HasMaxLength(150)
                 .IsRequired();
        });

        builder.Property(c => c.BirthDate)
               .IsRequired();

        builder.OwnsOne(c => c.Address, address =>
        {
            address.Property(a => a.Street)
                   .HasColumnName("street")
                   .HasMaxLength(200)
                   .IsRequired();

            address.Property(a => a.City)
                   .HasColumnName("city")
                   .HasMaxLength(100)
                   .IsRequired();

            address.Property(a => a.PostalCode)
                   .HasColumnName("postal_code")
                   .HasMaxLength(20);

            address.Property(a => a.Country)
                   .HasColumnName("country")
                   .HasMaxLength(100)
                   .IsRequired();

            // Spécifier le nom de la table et la stratégie de splitting
            address.ToTable("Addresses");
        });

        builder.Ignore(c => c.Age); // Car c'est calculé

        builder.Property(c => c.IsEmailVerified)
               .HasDefaultValue(false);

        // Index
        builder.HasIndex(c => c.IdentityId).IsUnique();
        builder.HasIndex(c => new { c.FirstName, c.LastName });

        // Relation un-à-un avec Identity
        builder.HasOne<ApplicationUser>()
               .WithOne()
               .HasForeignKey<Customer>(c => c.IdentityId)
               .IsRequired();
    }
}