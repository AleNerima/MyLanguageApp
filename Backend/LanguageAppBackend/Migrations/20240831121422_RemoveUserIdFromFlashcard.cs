using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguageAppBackend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUserIdFromFlashcard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flashcards_Users_UserId",
                table: "Flashcards");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Flashcards",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Flashcards_Users_UserId",
                table: "Flashcards",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flashcards_Users_UserId",
                table: "Flashcards");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Flashcards",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Flashcards_Users_UserId",
                table: "Flashcards",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
