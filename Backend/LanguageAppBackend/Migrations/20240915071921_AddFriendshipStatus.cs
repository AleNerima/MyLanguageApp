using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguageAppBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddFriendshipStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RequesterId",
                table: "Friendships",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Friendships",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequesterId",
                table: "Friendships");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Friendships");
        }
    }
}
