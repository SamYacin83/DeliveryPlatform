using Digitalizer.DeliveryPlatform.Domain.Aggregates.Entities;
using Digitalizer.DeliveryPlatform.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Digitalizer.DeliveryPlatform.Infrastructure.Persistence.Configurations;
public class DeliveryPersonConfiguration : BaseConfiguration<DeliveryPerson>
{
    public override void Configure(EntityTypeBuilder<DeliveryPerson> builder)
    {
        base.Configure(builder);

        builder.Property(d => d.FirstName)
               .HasMaxLength(100)
               .IsRequired();
        
        builder.Property(d => d.LastName)
               .HasMaxLength(100)
               .IsRequired();

        var phoneNumberConverter = new ValueConverter<PhoneNumber, string>(
            phoneNumber => phoneNumber != null ? phoneNumber.Value : string.Empty,
            value => string.IsNullOrEmpty(value) ? null : PhoneNumber.Create(value) // Retourne null si vide
        );

        builder.Property(d => d.PhoneNumber)
               .HasConversion(phoneNumberConverter)
               .HasMaxLength(15)
               .IsRequired();

        var emailConverter = new ValueConverter<Email, string>(
            email => email != null ? email.Value : string.Empty,
            value => string.IsNullOrEmpty(value) ? null : Email.Create(value) // Retourne null si vide       
         );

        builder.Property(d => d.Email)
       .HasConversion(emailConverter) 
       .HasMaxLength(255)
       .IsRequired();


        
        builder.Property(d => d.Status)
               .HasConversion<string>();

        
        builder.OwnsOne(d => d.CurrentLocation, location =>
        {
            location.Property(l => l.Latitude)
                    .IsRequired()
                    .HasColumnName("latitude");

            location.Property(l => l.Longitude)
                    .IsRequired()
                    .HasColumnName("longitude");
        });


       
        builder.HasMany(d => d.AssignedOrders) 
               .WithOne(o => o.AssignedDeliveryPerson) 
               .HasForeignKey(o => o.AssignedDeliveryPersonId) 
               .OnDelete(DeleteBehavior.Restrict); 

        
        builder.OwnsOne(d => d.Address, address =>
        {
            address.Property(a => a.Street)
                   .HasMaxLength(200)
                   .HasColumnName("street")
                   .IsRequired();

            address.Property(a => a.City)
                   .HasMaxLength(100)
                   .HasColumnName("city")
                   .IsRequired();

            address.Property(a => a.PostalCode)
                   .HasMaxLength(20)
                   .HasColumnName("postal_code")
                   .IsRequired();

            address.Property(a => a.Country)
                   .HasMaxLength(100)
                   .HasColumnName("country")
                   .IsRequired();
        });

       
        builder.HasIndex(d => d.PhoneNumber).IsUnique();
        builder.HasIndex(d => d.Email).IsUnique();
        builder.HasIndex(d => d.Status); 
    }
}