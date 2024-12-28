using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Digitalizer.DeliveryPlatform.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFeaturesProductsAddProductCat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "category_description",
                table: "products");

            migrationBuilder.DropColumn(
                name: "category_name",
                table: "products");

            migrationBuilder.AddColumn<Guid>(
                name: "category_id",
                table: "products",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateTable(
                name: "product_category",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    description = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_product_category", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "ix_products_category_id",
                table: "products",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "ix_products_name",
                table: "products",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_product_category_name",
                table: "product_category",
                column: "name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_products_product_category_category_id",
                table: "products",
                column: "category_id",
                principalTable: "product_category",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_products_product_category_category_id",
                table: "products");

            migrationBuilder.DropTable(
                name: "product_category");

            migrationBuilder.DropIndex(
                name: "ix_products_category_id",
                table: "products");

            migrationBuilder.DropIndex(
                name: "ix_products_name",
                table: "products");

            migrationBuilder.DropColumn(
                name: "category_id",
                table: "products");

            migrationBuilder.AddColumn<string>(
                name: "category_description",
                table: "products",
                type: "varchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "category_name",
                table: "products",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
