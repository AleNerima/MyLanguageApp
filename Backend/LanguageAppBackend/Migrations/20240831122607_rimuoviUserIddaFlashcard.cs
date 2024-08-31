using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguageAppBackend.Migrations
{
    /// <inheritdoc />
    public partial class rimuoviUserIddaFlashcard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flashcards_Users_UserId",
                table: "Flashcards");

            migrationBuilder.DropIndex(
                name: "IX_Flashcards_UserId",
                table: "Flashcards");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Flashcards");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Flashcards",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Flashcards_UserId",
                table: "Flashcards",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flashcards_Users_UserId",
                table: "Flashcards",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }
    }
}
