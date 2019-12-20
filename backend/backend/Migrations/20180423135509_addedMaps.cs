using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace backend.Migrations
{
    public partial class addedMaps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Lat",
                table: "Offers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Lng",
                table: "Offers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "Lng",
                table: "Offers");
        }
    }
}
