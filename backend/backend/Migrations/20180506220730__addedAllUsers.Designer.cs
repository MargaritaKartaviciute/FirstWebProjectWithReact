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
    [Migration("20180506220730__addedAllUsers")]
    partial class _addedAllUsers
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

            modelBuilder.Entity("backend.Models.LivingPerson", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("OfferId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("OfferId");

                    b.HasIndex("UserId");

                    b.ToTable("LivingPersons");
                });

            modelBuilder.Entity("backend.Models.Offer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("AirConditioner");

                    b.Property<bool>("CarPlace");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<string>("Description");

                    b.Property<int>("Floor");

                    b.Property<bool>("HasBalcony");

                    b.Property<double>("HeatingCost");

                    b.Property<string>("Lat");

                    b.Property<string>("Lng");

                    b.Property<int>("NumberOfRooms");

                    b.Property<int>("OwnerId");

                    b.Property<int>("PeopleInRoom");

                    b.Property<bool>("PetsAllowed");

                    b.Property<double>("Price");

                    b.Property<double>("SizeOfRoom");

                    b.Property<string>("StreetAdress")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Offers");
                });

            modelBuilder.Entity("backend.Models.OffersPhoto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("OfferId");

                    b.Property<string>("PhotoContent");

                    b.HasKey("Id");

                    b.HasIndex("OfferId");

                    b.ToTable("OfferPhotos");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("BirthDay");

                    b.Property<DateTime>("Data");

                    b.Property<string>("Degree");

                    b.Property<string>("Description");

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

                    b.Property<string>("avatarPhoto");

                    b.HasKey("Id");

                    b.ToTable("Users");
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

            modelBuilder.Entity("backend.Models.LivingPerson", b =>
                {
                    b.HasOne("backend.Models.Offer", "Offer")
                        .WithMany()
                        .HasForeignKey("OfferId")
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
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.Models.OffersPhoto", b =>
                {
                    b.HasOne("backend.Models.Offer", "Offer")
                        .WithMany()
                        .HasForeignKey("OfferId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
