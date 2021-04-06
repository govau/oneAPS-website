using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Sql {
    public partial class OneApsContext : DbContext {
        static OneApsContext() {
            Npgsql.NpgsqlConnection.GlobalTypeMapper.MapEnum<UserRole>();
        }

        public OneApsContext() {
        }

        public OneApsContext(DbContextOptions<OneApsContext> options)
            : base(options) {
        }        public virtual DbSet<Brief> Brief { get; set; }
        public virtual DbSet<BriefAssessment> BriefAssessment { get; set; }
        public virtual DbSet<BriefAssessor> BriefAssessor { get; set; }
        public virtual DbSet<BriefClarificationQuestion> BriefClarificationQuestion { get; set; }
        public virtual DbSet<BriefHistory> BriefHistory { get; set; }
        public virtual DbSet<BriefResponse> BriefResponse { get; set; }
        public virtual DbSet<BriefResponseContact> BriefResponseContact { get; set; }
        public virtual DbSet<BriefResponseDownload> BriefResponseDownload { get; set; }
        public virtual DbSet<BriefUser> BriefUser { get; set; }
        public virtual DbSet<KeyValue> KeyValue { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
                optionsBuilder.UseNpgsql(System.Environment.GetEnvironmentVariable("ConnectionString"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder
                .HasPostgresEnum(null, "user_roles_enum", Enum.GetNames(typeof(UserRole)))
                .HasPostgresExtension("pg_trgm");

            modelBuilder.Entity<Brief>(entity => {
                entity.HasIndex(e => e.ClosedAt)
                    .HasDatabaseName("ix_brief_closed_at");

                entity.HasIndex(e => e.CreatedAt)
                    .HasDatabaseName("ix_brief_created_at");

                entity.HasIndex(e => e.PublishedAt)
                    .HasDatabaseName("ix_brief_published_at");

                entity.HasIndex(e => e.QuestionsClosedAt)
                    .HasDatabaseName("ix_brief_questions_closed_at");

                entity.HasIndex(e => e.UpdatedAt)
                    .HasDatabaseName("ix_brief_updated_at");

                entity.HasIndex(e => e.WithdrawnAt)
                    .HasDatabaseName("ix_brief_withdrawn_at");
            });

            modelBuilder.Entity<BriefAssessment>(entity => {
                entity.HasKey(e => new { e.BriefId, e.AssessmentId })
                    .HasName("brief_assessment_pkey");

                entity.HasOne(d => d.Brief)
                    .WithMany(p => p.BriefAssessment)
                    .HasForeignKey(d => d.BriefId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("brief_assessment_brief_id_fkey");
            });

            modelBuilder.Entity<BriefAssessor>(entity => {
                entity.HasOne(d => d.Brief)
                    .WithMany(p => p.BriefAssessor)
                    .HasForeignKey(d => d.BriefId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("brief_assessor_brief_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.BriefAssessor)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("brief_assessor_user_id_fkey");
            });

            modelBuilder.Entity<BriefClarificationQuestion>(entity => {
                entity.HasIndex(e => e.PublishedAt)
                    .HasDatabaseName("ix_brief_clarification_question_published_at");

                entity.HasOne(d => d.Brief)
                    .WithMany(p => p.BriefClarificationQuestion)
                    .HasForeignKey(d => d.BriefId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("brief_clarification_question_brief_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.BriefClarificationQuestion)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("brief_clarification_question_user_id_fkey");
            });

            modelBuilder.Entity<BriefHistory>(entity => {
                entity.HasIndex(e => e.BriefId)
                    .HasDatabaseName("ix_brief_history_brief_id");

                entity.HasIndex(e => e.EditedAt)
                    .HasDatabaseName("ix_brief_history_edited_at");

                entity.HasIndex(e => e.UserId)
                    .HasDatabaseName("ix_brief_history_user_id");

                entity.HasOne(d => d.Brief)
                    .WithMany(p => p.BriefHistory)
                    .HasForeignKey(d => d.BriefId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("brief_history_brief_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.BriefHistory)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("brief_history_user_id_fkey");
            });

            modelBuilder.Entity<BriefResponse>(entity => {
                entity.HasIndex(e => e.CreatedAt)
                    .HasDatabaseName("ix_brief_response_created_at");

                entity.HasIndex(e => e.SubmittedAt)
                    .HasDatabaseName("ix_brief_response_submitted_at");

                entity.HasIndex(e => e.UpdatedAt)
                    .HasDatabaseName("ix_brief_response_updated_at");

                entity.HasOne(d => d.Brief)
                    .WithMany(p => p.BriefResponse)
                    .HasForeignKey(d => d.BriefId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("brief_response_brief_id_fkey");
            });

            modelBuilder.Entity<BriefResponseContact>(entity => {
                entity.HasOne(d => d.Brief)
                    .WithMany(p => p.BriefResponseContact)
                    .HasForeignKey(d => d.BriefId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("brief_response_brief_contact_id_fkey");
            });

            modelBuilder.Entity<BriefResponseDownload>(entity => {
                entity.HasIndex(e => e.CreatedAt)
                    .HasDatabaseName("ix_brief_response_download_created_at");

                entity.HasOne(d => d.Brief)
                    .WithMany(p => p.BriefResponseDownload)
                    .HasForeignKey(d => d.BriefId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("brief_response_download_brief_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.BriefResponseDownload)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("brief_response_download_user_id_fkey");
            });

            modelBuilder.Entity<BriefUser>(entity => {
                entity.HasKey(e => new { e.BriefId, e.UserId })
                    .HasName("brief_user_pkey");

                entity.HasOne(d => d.Brief)
                    .WithMany(p => p.BriefUser)
                    .HasForeignKey(d => d.BriefId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("brief_user_brief_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.BriefUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("brief_user_user_id_fkey");
            });

            modelBuilder.Entity<KeyValue>(entity => {
                entity.HasIndex(e => e.Key)
                    .HasDatabaseName("key_value_key_key")
                    .IsUnique();

                entity.HasIndex(e => e.UpdatedAt)
                    .HasDatabaseName("ix_key_value_updated_at");
            });

            modelBuilder.Entity<User>(entity => {
                entity.HasIndex(e => e.AgencyId)
                    .HasDatabaseName("ix_user_agency_id");

                entity.HasIndex(e => e.ApplicationId)
                    .HasDatabaseName("ix_user_application_id");

                entity.HasIndex(e => e.EmailAddress)
                    .HasDatabaseName("ix_user_email_address")
                    .IsUnique();

                entity.HasIndex(e => e.SupplierCode)
                    .HasDatabaseName("ix_user_supplier_code");
            });

            modelBuilder.HasSequence("brief_assessor_id_seq");

            modelBuilder.HasSequence("brief_history_id_seq");

            modelBuilder.HasSequence("brief_question_id_seq");

            modelBuilder.HasSequence("brief_response_answer_id_seq");

            modelBuilder.HasSequence("brief_response_contact_id_seq");

            modelBuilder.HasSequence("brief_response_download_id_seq");

            modelBuilder.HasSequence("key_value_id_seq");

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
