using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FixReviewStatusDefault : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "status",
                table: "Reviews",
                type: "review_status",
                nullable: false,
                defaultValueSql: "'PENDING'::review_status",
                oldClrType: typeof(string),
                oldType: "review_status",
                oldDefaultValue: "PENDING");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "status",
                table: "Reviews",
                type: "review_status",
                nullable: false,
                defaultValue: "PENDING",
                oldClrType: typeof(string),
                oldType: "review_status",
                oldDefaultValueSql: "'PENDING'::review_status");
        }
    }
}
