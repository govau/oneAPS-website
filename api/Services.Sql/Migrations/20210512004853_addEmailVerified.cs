using Microsoft.EntityFrameworkCore.Migrations;

namespace Dta.OneAps.Api.Services.Sql.Migrations
{
    public partial class addEmailVerified : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "email_verified",
                table: "user",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "email_verified",
                table: "user");
        }
    }
}
