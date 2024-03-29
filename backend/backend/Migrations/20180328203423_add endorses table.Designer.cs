﻿// <auto-generated />
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace backend.Migrations
{
    [DbContext(typeof(RaskKambariokaDbContext))]
    [Migration("20180328203423_add endorses table")]
    partial class addendorsestable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("backend.Models.Endorse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EndorserId");

                    b.Property<string>("SkillName");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("EndorserId");

                    b.HasIndex("UserId");

                    b.ToTable("Endorses");
                });

            modelBuilder.Entity("backend.Models.Offer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City");

                    b.Property<int>("Floor");

                    b.Property<bool>("HasBalcony");

                    b.Property<int>("NumberOfRooms");

                    b.Property<int?>("OwnerId");

                    b.Property<int>("PeopleInRoom");

                    b.Property<bool>("PetsAllowed");

                    b.Property<double>("Price");

                    b.Property<string>("StreetAdress");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Offers");
                });

            modelBuilder.Entity("backend.Models.OffersPhoto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("OfferIdId");

                    b.Property<string>("PhotoContent");

                    b.HasKey("Id");

                    b.HasIndex("OfferIdId");

                    b.ToTable("OfferPhotos");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("BirthDay");

                    b.Property<string>("Degree");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName")
                        .IsRequired();

                    b.Property<string>("Gender");

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("PhoneNumber");

                    b.Property<string>("School");

                    b.Property<string>("Work");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("backend.Models.Endorse", b =>
                {
                    b.HasOne("backend.Models.User", "Endorser")
                        .WithMany()
                        .HasForeignKey("EndorserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.Models.Offer", b =>
                {
                    b.HasOne("backend.Models.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId");
                });

            modelBuilder.Entity("backend.Models.OffersPhoto", b =>
                {
                    b.HasOne("backend.Models.Offer", "OfferId")
                        .WithMany()
                        .HasForeignKey("OfferIdId");
                });
#pragma warning restore 612, 618
        }
    }
}
