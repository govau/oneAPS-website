using Microsoft.EntityFrameworkCore.Migrations;

namespace Dta.OneAps.Api.Services.Sql.Migrations
{
    public partial class OpportunityInitialv2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "whatYoullGain",
                table: "opportunity",
                newName: "what_you_gain");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "what_you_gain",
                table: "opportunity",
                newName: "whatYoullGain");
        }
    }
}
