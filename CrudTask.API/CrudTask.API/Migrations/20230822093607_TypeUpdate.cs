using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrudTask.API.Migrations
{
    /// <inheritdoc />
    public partial class TypeUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "CustomerTypes",
                newName: "TypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TypeId",
                table: "CustomerTypes",
                newName: "Id");
        }
    }
}
