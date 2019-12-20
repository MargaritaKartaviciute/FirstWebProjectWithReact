using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace backend.Migrations
{
    public partial class _addedAllUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Data",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Data",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Users");
        }
    }
}
