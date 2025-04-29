using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Review_log> Review_logs { get; set; }

    public virtual DbSet<Review_version> Review_versions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseNpgsql(connectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // modelBuilder
        //     .HasPostgresEnum("moderation_action", ["APPROVE", "REJECT", "EDIT", "DELETE"])
        //     .HasPostgresEnum("review_report_status", ["PENDING", "RESOLVED", "DISMISSED"])
        //     .HasPostgresEnum("review_status", ["PENDING", "APPROVED", "REJECTED"])
        //     .HasPostgresEnum("user_role", ["USER", "ADMIN", "MODERATOR"]);

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.id).HasName("products_pkey");

            entity.Property(e => e.created_at)
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            // .HasDefaultValueSql("timestamptz");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.id).HasName("reviews_pkey");

            // entity.Property(e => e.created_at).HasDefaultValueSql("timestamptz");
            // entity.Property(e => e.updated_at).HasDefaultValueSql("timestamptz");

            entity.Property(e => e.created_at)
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.updated_at)
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.moderated_byNavigation).WithMany(p => p.reviewmoderated_byNavigations).HasConstraintName("reviews_moderated_by_fkey");

            entity.HasOne(d => d.product).WithMany(p => p.reviews).HasConstraintName("reviews_product_id_fkey");

            entity.HasOne(d => d.user).WithMany(p => p.reviewusers)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("reviews_user_id_fkey");
        });

        modelBuilder.Entity<Review_log>(entity =>
        {
            entity.HasKey(e => e.id).HasName("review_logs_pkey");

            // entity.Property(e => e.timestamp).HasDefaultValueSql("timestamptz");
            entity.Property(e => e.timestamp)
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.performed_byNavigation).WithMany(p => p.review_logs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("review_logs_performed_by_fkey");

            entity.HasOne(d => d.review).WithMany(p => p.review_logs).HasConstraintName("review_logs_review_id_fkey");
        });

        modelBuilder.Entity<Review_version>(entity =>
        {
            entity.HasKey(e => e.id).HasName("review_versions_pkey");

            // entity.Property(e => e.edited_at).HasDefaultValueSql("timestamptz");
            entity.Property(e => e.edited_at)
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.edited_byNavigation).WithMany(p => p.review_versions).HasConstraintName("review_versions_edited_by_fkey");

            entity.HasOne(d => d.review).WithMany(p => p.review_versions).HasConstraintName("review_versions_review_id_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.id).HasName("users_pkey");

            // entity.Property(e => e.created_at).HasDefaultValueSql("timestamptz");
            entity.Property(e => e.created_at)
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.Property(e => e.role).HasDefaultValueSql("'USER'::character varying");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
