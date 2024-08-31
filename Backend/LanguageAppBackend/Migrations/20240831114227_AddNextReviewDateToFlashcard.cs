using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguageAppBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddNextReviewDateToFlashcard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "NextReviewDate",
                table: "Flashcards",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NextReviewDate",
                table: "Flashcards");
        }
    }
}
