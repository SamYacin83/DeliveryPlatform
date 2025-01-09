using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Digitalizer.DeliveryPlatform.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIdentityRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: ["id", "concurrency_stamp", "name", "normalized_name"],
                values: new object[,]
                {
                    { "13f3bcce-2718-4eb9-8e1f-368a301903c4", null, "Customer", "CUSTOMER" },
                    { "20c32258-2c66-4f8e-a5f0-76695070b77b", null, "Admin", "ADMIN" },
                    { "de5e589d-6612-42cf-9cd6-0c99c870989d", null, "Supplier", "SUPPLIER" },
                    { "e8d774d1-c356-495f-a6af-08c6aa023d17", null, "Driver", "DRIVER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "id",
                keyValue: "13f3bcce-2718-4eb9-8e1f-368a301903c4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "id",
                keyValue: "20c32258-2c66-4f8e-a5f0-76695070b77b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "id",
                keyValue: "de5e589d-6612-42cf-9cd6-0c99c870989d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "id",
                keyValue: "e8d774d1-c356-495f-a6af-08c6aa023d17");
        }
    }
}
