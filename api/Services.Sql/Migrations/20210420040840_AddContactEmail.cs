using Microsoft.EntityFrameworkCore.Migrations;

namespace Dta.OneAps.Api.Services.Sql.Migrations
{
    public partial class AddContactEmail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "contact_person_email",
                table: "opportunity",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "contact_person_email",
                table: "opportunity");
        }
    }
}
