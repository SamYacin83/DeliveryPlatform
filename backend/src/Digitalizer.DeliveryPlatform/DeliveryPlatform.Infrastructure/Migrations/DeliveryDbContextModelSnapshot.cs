﻿// <auto-generated />
using System;
using Digitalizer.DeliveryPlatform.Infrastructure.Persistence.MySql;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Digitalizer.DeliveryPlatform.Infrastructure.Migrations
{
    [DbContext(typeof(DeliveryDbContext))]
    partial class DeliveryDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer.Customer", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("created_at");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("name");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_customers");

                    b.ToTable("customers", (string)null);
                });

            modelBuilder.Entity("Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Order", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("created_at");

                    b.Property<Guid>("CustomerId")
                        .HasColumnType("char(36)")
                        .HasColumnName("customer_id");

                    b.Property<string>("DeliveryServiceType")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("delivery_service_type");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("order_date");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("status");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_order");

                    b.HasIndex("CustomerId")
                        .HasDatabaseName("ix_order_customer_id");

                    b.HasIndex("Status")
                        .HasDatabaseName("ix_order_status");

                    b.ToTable("order", (string)null);
                });

            modelBuilder.Entity("Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.OrderItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("created_at");

                    b.Property<Guid?>("OrderId")
                        .HasColumnType("char(36)")
                        .HasColumnName("order_id");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("char(36)")
                        .HasColumnName("product_id");

                    b.Property<int>("Quantity")
                        .HasColumnType("int")
                        .HasColumnName("quantity");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_order_item");

                    b.HasIndex("OrderId")
                        .HasDatabaseName("ix_order_item_order_id");

                    b.HasIndex("ProductId")
                        .HasDatabaseName("ix_order_item_product_id");

                    b.ToTable("order_item", (string)null);
                });

            modelBuilder.Entity("Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.OrderStatusHistory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)")
                        .HasColumnName("id");

                    b.Property<DateTime>("ChangedAt")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("changed_at");

                    b.Property<string>("Comment")
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)")
                        .HasColumnName("comment");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("created_at");

                    b.Property<string>("NewStatus")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("new_status");

                    b.Property<string>("OldStatus")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("old_status");

                    b.Property<Guid>("OrderId")
                        .HasColumnType("char(36)")
                        .HasColumnName("order_id");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_order_status_histories");

                    b.HasIndex("ChangedAt")
                        .HasDatabaseName("ix_order_status_histories_changed_at");

                    b.HasIndex("OrderId")
                        .HasDatabaseName("ix_order_status_histories_order_id");

                    b.ToTable("order_status_histories", (string)null);
                });

            modelBuilder.Entity("Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)")
                        .HasColumnName("id");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("char(36)")
                        .HasColumnName("category_id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("created_at");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)")
                        .HasColumnName("description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("name");

                    b.Property<int>("StockQuantity")
                        .HasColumnType("int")
                        .HasColumnName("stock_quantity");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_products");

                    b.HasIndex("CategoryId")
                        .HasDatabaseName("ix_products_category_id");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasDatabaseName("ix_products_name");

                    b.ToTable("products", (string)null);
                });

            modelBuilder.Entity("Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory.ProductCategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("created_at");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)")
                        .HasColumnName("description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("name");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_product_category");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasDatabaseName("ix_product_category_name");

                    b.ToTable("product_category", (string)null);
                });

            modelBuilder.Entity("Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer.Customer", b =>
                {
                    b.OwnsMany("Digitalizer.DeliveryPlatform.Domain.ValueObjects.DeliveryAddress", "Addresses", b1 =>
                        {
                            b1.Property<Guid>("CustomerId")
                                .HasColumnType("char(36)")
                                .HasColumnName("customer_id");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasColumnName("id");

                            MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b1.Property<int>("Id"));

                            b1.Property<string>("City")
                                .IsRequired()
                                .HasMaxLength(100)
                                .HasColumnType("varchar(100)")
                                .HasColumnName("city");

                            b1.Property<string>("Country")
                                .IsRequired()
                                .HasMaxLength(100)
                                .HasColumnType("varchar(100)")
                                .HasColumnName("country");

                            b1.Property<string>("PostalCode")
                                .IsRequired()
                                .HasMaxLength(20)
                                .HasColumnType("varchar(20)")
                                .HasColumnName("postal_code");

                            b1.Property<string>("Street")
                                .IsRequired()
                                .HasMaxLength(200)
                                .HasColumnType("varchar(200)")
                                .HasColumnName("street");

                            b1.HasKey("CustomerId", "Id")
                                .HasName("pk_customers_addresses");

                            b1.ToTable("customers_addresses", (string)null);

                            b1.WithOwner()
                                .HasForeignKey("CustomerId")
                                .HasConstraintName("fk_customers_addresses_customers_customer_id");
                        });

                    b.Navigation("Addresses");
                });

            modelBuilder.Entity("Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Order", b =>
                {
                    b.OwnsOne("Digitalizer.DeliveryPlatform.Domain.ValueObjects.DeliveryAddress", "DeliveryAddress", b1 =>
                        {
                            b1.Property<Guid>("OrderId")
                                .HasColumnType("char(36)")
                                .HasColumnName("id");

                            b1.Property<string>("City")
                                .IsRequired()
                                .HasMaxLength(100)
                                .HasColumnType("varchar(100)")
                                .HasColumnName("delivery_address_city");

                            b1.Property<string>("Country")
                                .IsRequired()
                                .HasMaxLength(100)
                                .HasColumnType("varchar(100)")
                                .HasColumnName("delivery_address_country");

                            b1.Property<string>("PostalCode")
                                .IsRequired()
                                .HasMaxLength(20)
                                .HasColumnType("varchar(20)")
                                .HasColumnName("delivery_address_postal_code");

                            b1.Property<string>("Street")
                                .IsRequired()
                                .HasMaxLength(200)
                                .HasColumnType("varchar(200)")
                                .HasColumnName("delivery_address_street");

                            b1.HasKey("OrderId");

                            b1.ToTable("order");

                            b1.WithOwner()
                                .HasForeignKey("OrderId")
                                .HasConstraintName("fk_order_order_id");
                        });

                    b.OwnsOne("Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Money", "TotalAmount", b1 =>
                        {
                            b1.Property<Guid>("OrderId")
                                .HasColumnType("char(36)")
                                .HasColumnName("id");

                            b1.Property<decimal>("Amount")
                                .HasPrecision(18, 2)
                                .HasColumnType("decimal(18,2)")
                                .HasColumnName("total_amount");

                            b1.Property<string>("Currency")
                                .IsRequired()
                                .HasMaxLength(3)
                                .HasColumnType("varchar(3)")
                                .HasColumnName("currency");

                            b1.HasKey("OrderId");

                            b1.ToTable("order");

                            b1.WithOwner()
                                .HasForeignKey("OrderId")
                                .HasConstraintName("fk_order_order_id");
                        });

                    b.Navigation("DeliveryAddress")
                        .IsRequired();

                    b.Navigation("TotalAmount")
                        .IsRequired();
                });

            modelBuilder.Entity("Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.OrderItem", b =>
                {
                    b.HasOne("Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Order", null)
                        .WithMany("OrderLines")
                        .HasForeignKey("OrderId")
                        .HasConstraintName("fk_order_item_order_order_id");

                    b.HasOne("Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Product", null)
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_order_item_products_product_id");

                    b.OwnsOne("Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Money", "UnitPrice", b1 =>
                        {
                            b1.Property<Guid>("OrderItemId")
                                .HasColumnType("char(36)")
                                .HasColumnName("id");

                            b1.Property<decimal>("Amount")
                                .HasPrecision(18, 2)
                                .HasColumnType("decimal(18,2)")
                                .HasColumnName("unit_price_amount");

                            b1.Property<string>("Currency")
                                .IsRequired()
                                .HasMaxLength(3)
                                .HasColumnType("varchar(3)")
                                .HasColumnName("unit_price_currency");

                            b1.HasKey("OrderItemId");

                            b1.ToTable("order_item");

                            b1.WithOwner()
                                .HasForeignKey("OrderItemId")
                                .HasConstraintName("fk_order_item_order_item_id");
                        });

                    b.Navigation("UnitPrice")
                        .IsRequired();
                });

            modelBuilder.Entity("Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.OrderStatusHistory", b =>
                {
                    b.HasOne("Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Order", null)
                        .WithMany()
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_order_status_histories_order_order_id");
                });

            modelBuilder.Entity("Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Product", b =>
                {
                    b.HasOne("Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory.ProductCategory", null)
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_products_product_category_category_id");

                    b.OwnsOne("Digitalizer.DeliveryPlatform.Domain.Aggregates.Product.Money", "Price", b1 =>
                        {
                            b1.Property<Guid>("ProductId")
                                .HasColumnType("char(36)")
                                .HasColumnName("id");

                            b1.Property<decimal>("Amount")
                                .HasPrecision(18, 2)
                                .HasColumnType("decimal(18,2)")
                                .HasColumnName("price_amount");

                            b1.Property<string>("Currency")
                                .IsRequired()
                                .HasMaxLength(3)
                                .HasColumnType("varchar(3)")
                                .HasColumnName("price_currency");

                            b1.HasKey("ProductId");

                            b1.ToTable("products");

                            b1.WithOwner()
                                .HasForeignKey("ProductId")
                                .HasConstraintName("fk_products_products_id");
                        });

                    b.Navigation("Price")
                        .IsRequired();
                });

            modelBuilder.Entity("Digitalizer.DeliveryPlatform.Domain.Aggregates.Order.Order", b =>
                {
                    b.Navigation("OrderLines");
                });
#pragma warning restore 612, 618
        }
    }
}
