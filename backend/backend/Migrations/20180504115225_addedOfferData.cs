using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace backend.Migrations
{
    public partial class addedOfferData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "StreetAdress",
                table: "Offers",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "Offers",
                maxLength: 40,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "AirConditioner",
                table: "Offers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "CarPlace",
                table: "Offers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Offers",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "HeatingCost",
                table: "Offers",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SizeOfRoom",
                table: "Offers",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AirConditioner",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "CarPlace",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "HeatingCost",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "SizeOfRoom",
                table: "Offers");

            migrationBuilder.AlterColumn<string>(
                name: "StreetAdress",
                table: "Offers",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "Offers",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 40);
        }
    }
}
