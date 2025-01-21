using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Digitalizer.DeliveryPlatform.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDelivery0 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_order_delivery_person_delivery_person_id",
                table: "order");

            migrationBuilder.DropIndex(
                name: "ix_order_delivery_person_id",
                table: "order");

            migrationBuilder.DropColumn(
                name: "delivery_person_id",
                table: "order");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "delivery_person",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldMaxLength: 200)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "city",
                table: "delivery_person",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "country",
                table: "delivery_person",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "postal_code",
                table: "delivery_person",
                type: "varchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "street",
                table: "delivery_person",
                type: "varchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "city",
                table: "delivery_person");

            migrationBuilder.DropColumn(
                name: "country",
                table: "delivery_person");

            migrationBuilder.DropColumn(
                name: "postal_code",
                table: "delivery_person");

            migrationBuilder.DropColumn(
                name: "street",
                table: "delivery_person");

            migrationBuilder.AddColumn<Guid>(
                name: "delivery_person_id",
                table: "order",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "delivery_person",
                type: "varchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "ix_order_delivery_person_id",
                table: "order",
                column: "delivery_person_id");

            migrationBuilder.AddForeignKey(
                name: "fk_order_delivery_person_delivery_person_id",
                table: "order",
                column: "delivery_person_id",
                principalTable: "delivery_person",
                principalColumn: "id");
        }
    }
}
