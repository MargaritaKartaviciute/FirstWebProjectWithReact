using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace backend.Migrations
{
    public partial class addedIDs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OfferPhotos_Offers_OfferId",
                table: "OfferPhotos");

            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Users_OwnerId",
                table: "Offers");

            migrationBuilder.AlterColumn<int>(
                name: "OwnerId",
                table: "Offers",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "OfferId",
                table: "OfferPhotos",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OfferPhotos_Offers_OfferId",
                table: "OfferPhotos",
                column: "OfferId",
                principalTable: "Offers",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Users_OwnerId",
                table: "Offers",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OfferPhotos_Offers_OfferId",
                table: "OfferPhotos");

            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Users_OwnerId",
                table: "Offers");

            migrationBuilder.AlterColumn<int>(
                name: "OwnerId",
                table: "Offers",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "OfferId",
                table: "OfferPhotos",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_OfferPhotos_Offers_OfferId",
                table: "OfferPhotos",
                column: "OfferId",
                principalTable: "Offers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Users_OwnerId",
                table: "Offers",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
