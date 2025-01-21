using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Digitalizer.DeliveryPlatform.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDelivery : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "assigned_delivery_person_id",
                table: "order",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "delivery_person_id",
                table: "order",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateTable(
                name: "delivery_person",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    first_name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    last_name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    phone_number = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    email = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    latitude = table.Column<double>(type: "double", nullable: false),
                    longitude = table.Column<double>(type: "double", nullable: false),
                    status = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_delivery_person", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "ix_order_assigned_delivery_person_id",
                table: "order",
                column: "assigned_delivery_person_id");

            migrationBuilder.CreateIndex(
                name: "ix_order_delivery_person_id",
                table: "order",
                column: "delivery_person_id");

            migrationBuilder.CreateIndex(
                name: "ix_delivery_person_email",
                table: "delivery_person",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_delivery_person_phone_number",
                table: "delivery_person",
                column: "phone_number",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_delivery_person_status",
                table: "delivery_person",
                column: "status");

            migrationBuilder.AddForeignKey(
                name: "fk_order_delivery_person_assigned_delivery_person_id",
                table: "order",
                column: "assigned_delivery_person_id",
                principalTable: "delivery_person",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_order_delivery_person_delivery_person_id",
                table: "order",
                column: "delivery_person_id",
                principalTable: "delivery_person",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_order_delivery_person_assigned_delivery_person_id",
                table: "order");

            migrationBuilder.DropForeignKey(
                name: "fk_order_delivery_person_delivery_person_id",
                table: "order");

            migrationBuilder.DropTable(
                name: "delivery_person");

            migrationBuilder.DropIndex(
                name: "ix_order_assigned_delivery_person_id",
                table: "order");

            migrationBuilder.DropIndex(
                name: "ix_order_delivery_person_id",
                table: "order");

            migrationBuilder.DropColumn(
                name: "assigned_delivery_person_id",
                table: "order");

            migrationBuilder.DropColumn(
                name: "delivery_person_id",
                table: "order");
        }
    }
}
