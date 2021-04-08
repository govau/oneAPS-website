using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Sql {
    public partial class OneApsContext : DbContext {
        // static OneApsContext() {
        //     Npgsql.NpgsqlConnection.GlobalTypeMapper.MapEnum<UserRole>("UserRole", new Npgsql.NameTranslation.NpgsqlNullNameTranslator());
        // }

        public OneApsContext() {
        }

        public OneApsContext(DbContextOptions<OneApsContext> options)
            : base(options) {
        }        public virtual DbSet<Opportunity> Opportunity { get; set; }
        public virtual DbSet<OpportunityAssessor> OpportunityAssessor { get; set; }
        public virtual DbSet<OpportunityClarificationQuestion> OpportunityClarificationQuestion { get; set; }
        public virtual DbSet<OpportunityHistory> OpportunityHistory { get; set; }
        public virtual DbSet<OpportunityResponse> OpportunityResponse { get; set; }
        public virtual DbSet<OpportunityResponseContact> OpportunityResponseContact { get; set; }
        public virtual DbSet<OpportunityResponseDownload> OpportunityResponseDownload { get; set; }
        public virtual DbSet<OpportunityUser> OpportunityUser { get; set; }
        public virtual DbSet<KeyValue> KeyValue { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
                optionsBuilder.UseNpgsql(System.Environment.GetEnvironmentVariable("ConnectionString"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<Opportunity>(entity => {
                entity.HasIndex(e => e.JobTitle)
                    .HasDatabaseName("ix_opportunity_job_title");

                entity.HasIndex(e => e.StartDate)
                    .HasDatabaseName("ix_opportunity_start_date");

                entity.HasIndex(e => e.EndDate)
                    .HasDatabaseName("ix_opportunity_end_date");

                entity.HasOne(d => d.CreatedByUser)
                    .WithMany(p => p.OpportunityCreatedByUser)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("opportunity_created_by_user_id_fkey");

                entity.HasOne(d => d.ModifiedByUser)
                    .WithMany(p => p.OpportunityModifiedByUser)
                    .HasForeignKey(d => d.ModifiedBy)
                    .HasConstraintName("opportunity_modified_by_user_id_fkey");
            });

            modelBuilder.Entity<OpportunityAssessor>(entity => {
                entity.HasOne(d => d.Opportunity)
                    .WithMany(p => p.OpportunityAssessor)
                    .HasForeignKey(d => d.OpportunityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("opportunity_assessor_opportunity_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.OpportunityAssessor)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("opportunity_assessor_user_id_fkey");
            });

            modelBuilder.Entity<OpportunityClarificationQuestion>(entity => {
                entity.HasIndex(e => e.PublishedAt)
                    .HasDatabaseName("ix_opportunity_clarification_question_published_at");

                entity.HasOne(d => d.Opportunity)
                    .WithMany(p => p.OpportunityClarificationQuestion)
                    .HasForeignKey(d => d.OpportunityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("opportunity_clarification_question_opportunity_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.OpportunityClarificationQuestion)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("opportunity_clarification_question_user_id_fkey");
            });

            modelBuilder.Entity<OpportunityHistory>(entity => {
                entity.HasIndex(e => e.OpportunityId)
                    .HasDatabaseName("ix_opportunity_history_opportunity_id");

                entity.HasIndex(e => e.EditedAt)
                    .HasDatabaseName("ix_opportunity_history_edited_at");

                entity.HasIndex(e => e.UserId)
                    .HasDatabaseName("ix_opportunity_history_user_id");

                entity.HasOne(d => d.Opportunity)
                    .WithMany(p => p.OpportunityHistory)
                    .HasForeignKey(d => d.OpportunityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("opportunity_history_opportunity_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.OpportunityHistory)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("opportunity_history_user_id_fkey");
            });

            modelBuilder.Entity<OpportunityResponse>(entity => {
                entity.HasIndex(e => e.CreatedAt)
                    .HasDatabaseName("ix_opportunity_response_created_at");

                entity.HasIndex(e => e.SubmittedAt)
                    .HasDatabaseName("ix_opportunity_response_submitted_at");

                entity.HasIndex(e => e.UpdatedAt)
                    .HasDatabaseName("ix_opportunity_response_updated_at");

                entity.HasOne(d => d.Opportunity)
                    .WithMany(p => p.OpportunityResponse)
                    .HasForeignKey(d => d.OpportunityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("opportunity_response_opportunity_id_fkey");
            });

            modelBuilder.Entity<OpportunityResponseContact>(entity => {
                entity.HasOne(d => d.Opportunity)
                    .WithMany(p => p.OpportunityResponseContact)
                    .HasForeignKey(d => d.OpportunityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("opportunity_response_opportunity_contact_id_fkey");
            });

            modelBuilder.Entity<OpportunityResponseDownload>(entity => {
                entity.HasIndex(e => e.CreatedAt)
                    .HasDatabaseName("ix_opportunity_response_download_created_at");

                entity.HasOne(d => d.Opportunity)
                    .WithMany(p => p.OpportunityResponseDownload)
                    .HasForeignKey(d => d.OpportunityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("opportunity_response_download_opportunity_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.OpportunityResponseDownload)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("opportunity_response_download_user_id_fkey");
            });

            modelBuilder.Entity<OpportunityUser>(entity => {
                entity.HasKey(e => new { e.OpportunityId, e.UserId })
                    .HasName("opportunity_user_pkey");

                entity.HasOne(d => d.Opportunity)
                    .WithMany(p => p.OpportunityUser)
                    .HasForeignKey(d => d.OpportunityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("opportunity_user_opportunity_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.OpportunityUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("opportunity_user_user_id_fkey");
            });

            modelBuilder.Entity<OpportunitySkill>(entity => {
                entity.HasKey(e => new { e.Id })
                    .HasName("opportunity_skill_pkey");

                entity.HasOne(d => d.Opportunity)
                    .WithMany(p => p.OpportunitySkills)
                    .HasForeignKey(d => d.OpportunityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("opportunity_skill_opportunity_id_fkey");
            });

            modelBuilder.Entity<KeyValue>(entity => {
                entity.HasIndex(e => e.Key)
                    .HasDatabaseName("key_value_key_key")
                    .IsUnique();

                entity.HasIndex(e => e.UpdatedAt)
                    .HasDatabaseName("ix_key_value_updated_at");
            });

            modelBuilder.Entity<User>(entity => {

                entity.HasIndex(e => e.EmailAddress)
                    .HasDatabaseName("ix_user_email_address")
                    .IsUnique();
            });

            modelBuilder.HasSequence("opportunity_assessor_id_seq");

            modelBuilder.HasSequence("opportunity_history_id_seq");

            modelBuilder.HasSequence("opportunity_question_id_seq");

            modelBuilder.HasSequence("opportunity_response_answer_id_seq");

            modelBuilder.HasSequence("opportunity_response_contact_id_seq");

            modelBuilder.HasSequence("opportunity_response_download_id_seq");

            modelBuilder.HasSequence("key_value_id_seq");

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
