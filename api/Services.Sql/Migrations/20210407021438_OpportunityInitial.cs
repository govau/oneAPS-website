using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Dta.OneAps.Api.Services.Sql.Migrations
{
    public partial class OpportunityInitial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_opportunity_closed_at",
                table: "opportunity");

            migrationBuilder.DropIndex(
                name: "ix_opportunity_published_at",
                table: "opportunity");

            migrationBuilder.DropIndex(
                name: "ix_opportunity_questions_closed_at",
                table: "opportunity");

            migrationBuilder.DropIndex(
                name: "ix_opportunity_withdrawn_at",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "closed_at",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "data",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "domain_id",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "framework_id",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "lot_id",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "published_at",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "questions_closed_at",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "responses_zip_filesize",
                table: "opportunity");

            migrationBuilder.RenameColumn(
                name: "withdrawn_at",
                table: "opportunity",
                newName: "modifed");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "opportunity",
                newName: "start_date");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "opportunity",
                newName: "end_date");

            migrationBuilder.RenameIndex(
                name: "ix_opportunity_updated_at",
                table: "opportunity",
                newName: "ix_opportunity_start_date");

            migrationBuilder.RenameIndex(
                name: "ix_opportunity_created_at",
                table: "opportunity",
                newName: "ix_opportunity_end_date");

            migrationBuilder.AddColumn<string>(
                name: "about_team",
                table: "opportunity",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "additional_info",
                table: "opportunity",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "agency",
                table: "opportunity",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "commitment_time",
                table: "opportunity",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "contact_person_name",
                table: "opportunity",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "contact_person_phone",
                table: "opportunity",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "created",
                table: "opportunity",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "created_by",
                table: "opportunity",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "job_description",
                table: "opportunity",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "job_title",
                table: "opportunity",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "location",
                table: "opportunity",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "modified_by",
                table: "opportunity",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "number_of_people",
                table: "opportunity",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "security_clearance ",
                table: "opportunity",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "skills",
                table: "opportunity",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "whatYoullGain",
                table: "opportunity",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "opportunity_skill",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    opportunity_id = table.Column<int>(type: "integer", nullable: false),
                    skill_key = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("opportunity_skill_pkey", x => x.id);
                    table.ForeignKey(
                        name: "opportunity_skill_opportunity_id_fkey",
                        column: x => x.opportunity_id,
                        principalTable: "opportunity",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "ix_opportunity_job_title",
                table: "opportunity",
                column: "job_title");

            migrationBuilder.CreateIndex(
                name: "IX_opportunity_skill_opportunity_id",
                table: "opportunity_skill",
                column: "opportunity_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "opportunity_skill");

            migrationBuilder.DropIndex(
                name: "ix_opportunity_job_title",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "about_team",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "additional_info",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "agency",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "commitment_time",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "contact_person_name",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "contact_person_phone",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "created",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "created_by",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "job_description",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "job_title",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "location",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "modified_by",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "number_of_people",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "security_clearance ",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "skills",
                table: "opportunity");

            migrationBuilder.DropColumn(
                name: "whatYoullGain",
                table: "opportunity");

            migrationBuilder.RenameColumn(
                name: "start_date",
                table: "opportunity",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "modifed",
                table: "opportunity",
                newName: "withdrawn_at");

            migrationBuilder.RenameColumn(
                name: "end_date",
                table: "opportunity",
                newName: "created_at");

            migrationBuilder.RenameIndex(
                name: "ix_opportunity_start_date",
                table: "opportunity",
                newName: "ix_opportunity_updated_at");

            migrationBuilder.RenameIndex(
                name: "ix_opportunity_end_date",
                table: "opportunity",
                newName: "ix_opportunity_created_at");

            migrationBuilder.AddColumn<DateTime>(
                name: "closed_at",
                table: "opportunity",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "data",
                table: "opportunity",
                type: "json",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "domain_id",
                table: "opportunity",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "framework_id",
                table: "opportunity",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "lot_id",
                table: "opportunity",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "published_at",
                table: "opportunity",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "questions_closed_at",
                table: "opportunity",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "responses_zip_filesize",
                table: "opportunity",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_opportunity_closed_at",
                table: "opportunity",
                column: "closed_at");

            migrationBuilder.CreateIndex(
                name: "ix_opportunity_published_at",
                table: "opportunity",
                column: "published_at");

            migrationBuilder.CreateIndex(
                name: "ix_opportunity_questions_closed_at",
                table: "opportunity",
                column: "questions_closed_at");

            migrationBuilder.CreateIndex(
                name: "ix_opportunity_withdrawn_at",
                table: "opportunity",
                column: "withdrawn_at");
        }
    }
}
