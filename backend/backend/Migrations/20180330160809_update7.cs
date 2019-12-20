using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace backend.Migrations
{
    public partial class update7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Endorses_User_EndorserId",
                table: "Endorses");

            migrationBuilder.DropForeignKey(
                name: "FK_Endorses_User_UserId",
                table: "Endorses");

            migrationBuilder.DropForeignKey(
                name: "FK_OfferPhotos_Offers_OfferIdId",
                table: "OfferPhotos");

            migrationBuilder.DropForeignKey(
                name: "FK_Offers_User_OwnerId",
                table: "Offers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.RenameColumn(
                name: "OfferIdId",
                table: "OfferPhotos",
                newName: "OfferId");

            migrationBuilder.RenameIndex(
                name: "IX_OfferPhotos_OfferIdId",
                table: "OfferPhotos",
                newName: "IX_OfferPhotos_OfferId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Endorses_Users_EndorserId",
                table: "Endorses",
                column: "EndorserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Endorses_Users_UserId",
                table: "Endorses",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Endorses_Users_EndorserId",
                table: "Endorses");

            migrationBuilder.DropForeignKey(
                name: "FK_Endorses_Users_UserId",
                table: "Endorses");

            migrationBuilder.DropForeignKey(
                name: "FK_OfferPhotos_Offers_OfferId",
                table: "OfferPhotos");

            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Users_OwnerId",
                table: "Offers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.RenameColumn(
                name: "OfferId",
                table: "OfferPhotos",
                newName: "OfferIdId");

            migrationBuilder.RenameIndex(
                name: "IX_OfferPhotos_OfferId",
                table: "OfferPhotos",
                newName: "IX_OfferPhotos_OfferIdId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Endorses_User_EndorserId",
                table: "Endorses",
                column: "EndorserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Endorses_User_UserId",
                table: "Endorses",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OfferPhotos_Offers_OfferIdId",
                table: "OfferPhotos",
                column: "OfferIdId",
                principalTable: "Offers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_User_OwnerId",
                table: "Offers",
                column: "OwnerId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
