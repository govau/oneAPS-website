using Microsoft.EntityFrameworkCore.Migrations;

namespace Dta.OneAps.Api.Services.Sql.Migrations
{
    public partial class UpdateOpportunityResponse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "supplier_code",
                table: "opportunity_response");

            migrationBuilder.AddColumn<string>(
                name: "Agency",
                table: "opportunity_response",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "opportunity_response",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResumeLink",
                table: "opportunity_response",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResumeUpload",
                table: "opportunity_response",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "user_id",
                table: "opportunity_response",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "WhyPickMe",
                table: "opportunity_response",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_opportunity_response_user_id",
                table: "opportunity_response",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "opportunity_response_user_id_fkey",
                table: "opportunity_response",
                column: "user_id",
                principalTable: "user",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "opportunity_response_user_id_fkey",
                table: "opportunity_response");

            migrationBuilder.DropIndex(
                name: "IX_opportunity_response_user_id",
                table: "opportunity_response");

            migrationBuilder.DropColumn(
                name: "Agency",
                table: "opportunity_response");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "opportunity_response");

            migrationBuilder.DropColumn(
                name: "ResumeLink",
                table: "opportunity_response");

            migrationBuilder.DropColumn(
                name: "ResumeUpload",
                table: "opportunity_response");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "opportunity_response");

            migrationBuilder.DropColumn(
                name: "WhyPickMe",
                table: "opportunity_response");

            migrationBuilder.AddColumn<long>(
                name: "supplier_code",
                table: "opportunity_response",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
