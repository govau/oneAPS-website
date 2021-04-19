using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Dta.OneAps.Api.Services.Sql.Migrations
{
    public partial class AddUserClaims : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_user",
                table: "user");

            migrationBuilder.CreateSequence(
                name: "user_claim_id_seq");

            migrationBuilder.AddPrimaryKey(
                name: "user_pkey",
                table: "user",
                column: "id");

            migrationBuilder.CreateTable(
                name: "user_claim",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<int>(nullable: false),
                    claim_token = table.Column<string>(nullable: true),
                    claim_type = table.Column<string>(nullable: true),
                    is_claimed = table.Column<bool>(nullable: false),
                    created_at = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("user_claim_pkey", x => x.id);
                    table.ForeignKey(
                        name: "user_claims_user_id_fkey",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_user_claim_user_id",
                table: "user_claim",
                column: "user_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user_claim");

            migrationBuilder.DropPrimaryKey(
                name: "user_pkey",
                table: "user");

            migrationBuilder.DropSequence(
                name: "user_claim_id_seq");

            migrationBuilder.AddPrimaryKey(
                name: "PK_user",
                table: "user",
                column: "id");
        }
    }
}
