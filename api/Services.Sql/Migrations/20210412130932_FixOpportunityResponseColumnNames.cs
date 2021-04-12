using Microsoft.EntityFrameworkCore.Migrations;

namespace Dta.OneAps.Api.Services.Sql.Migrations
{
    public partial class FixOpportunityResponseColumnNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Agency",
                table: "opportunity_response",
                newName: "agency");

            migrationBuilder.RenameColumn(
                name: "WhyPickMe",
                table: "opportunity_response",
                newName: "why_pick_me");

            migrationBuilder.RenameColumn(
                name: "ResumeUpload",
                table: "opportunity_response",
                newName: "resume_upload");

            migrationBuilder.RenameColumn(
                name: "ResumeLink",
                table: "opportunity_response",
                newName: "resume_link");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "opportunity_response",
                newName: "phone_number");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "agency",
                table: "opportunity_response",
                newName: "Agency");

            migrationBuilder.RenameColumn(
                name: "why_pick_me",
                table: "opportunity_response",
                newName: "WhyPickMe");

            migrationBuilder.RenameColumn(
                name: "resume_upload",
                table: "opportunity_response",
                newName: "ResumeUpload");

            migrationBuilder.RenameColumn(
                name: "resume_link",
                table: "opportunity_response",
                newName: "ResumeLink");

            migrationBuilder.RenameColumn(
                name: "phone_number",
                table: "opportunity_response",
                newName: "PhoneNumber");
        }
    }
}
