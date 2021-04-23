using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dta.OneAps.Api.Services.Sql.Migrations
{
    public partial class AddClosedAt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "closed_at",
                table: "opportunity",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "closed_at",
                table: "opportunity");
        }
    }
}
