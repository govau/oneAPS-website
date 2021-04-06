using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Services {
    public interface IAuditService {
        Task LogAuditEventAsync(string auditType, string user, string data, string dbObject, int objectId);
    }
    public static class AuditType {
        public static string update_price = "update_price";
        public static string sent_closed_opportunity_email = "sent_closed_opportunity_email";
        public static string sent_opportunity_closed_early_email = "sent_opportunity_closed_early_email";
        public static string sent_opportunity_edited_email_to_buyers = "sent_opportunity_edited_email_to_buyers";
        public static string sent_opportunity_edited_email_to_seller = "sent_opportunity_edited_email_to_seller";
        public static string sent_opportunity_withdrawn_email_to_buyers = "sent_opportunity_withdrawn_email_to_buyers";
        public static string sent_opportunity_withdrawn_email_to_seller = "sent_opportunity_withdrawn_email_to_seller";
        public static string update_opportunity_response = "update_opportunity_response";
        public static string update_opportunity_response_contact = "update_opportunity_response_contact";
        public static string update_application = "update_application";
        public static string update_application_admin = "update_application_admin";
        public static string create_application = "create_application";
        public static string submit_application = "submit_application";
        public static string revert_application = "revert_application";
        public static string approve_application = "approve_application";
        public static string reject_application = "reject_application";
        public static string delete_application = "delete_application";
        public static string create_opportunity = "create_opportunity";
        public static string update_opportunity_admin = "update_opportunity_admin";
        public static string update_opportunity = "update_opportunity";
        public static string update_opportunity_status = "update_opportunity_status";
        public static string create_opportunity_response = "create_opportunity_response";
        public static string read_opportunity_responses = "read_opportunity_responses";
        public static string add_opportunity_clarification_question = "add_opportunity_clarification_question";
        public static string close_opportunity_early = "close_opportunity_early";
        public static string opportunity_edited = "opportunity_edited";
        public static string withdraw_opportunity = "withdraw_opportunity";
        public static string delete_opportunity = "delete_opportunity";
        public static string seller_requested_feedback_from_buyer_email = "seller_requested_feedback_from_buyer_email";
        public static string seller_to_review_pricing_case_study_email = "seller_to_review_pricing_case_study_email";
        public static string seller_invited_to_rfx_opportunity = "seller_invited_to_rfx_opportunity";
        public static string seller_invited_to_training_opportunity = "seller_invited_to_training_opportunity";
        public static string seller_invited_to_atm_opportunity = "seller_invited_to_atm_opportunity";
        public static string seller_added_to_rfx_opportunity_admin = "seller_added_to_rfx_opportunity_admin";
        public static string seller_removed_from_rfx_opportunity_admin = "seller_removed_from_rfx_opportunity_admin";
        public static string seller_to_review_pricing_case_study_email_part_2 = "seller_to_review_pricing_case_study_email_part_2";
        public static string seller_to_review_pricing_case_study_email_part_3 = "seller_to_review_pricing_case_study_email_part_3";
        public static string sent_expiring_documents_email = "sent_expiring_documents_email";
        public static string sent_expiring_licence_email = "sent_expiring_licence_email";
        public static string create_team = "create_team";
        public static string specialist_opportunity_published = "specialist_opportunity_published";
        public static string specialist_opportunity_closed_email = "specialist_opportunity_closed_email";
        public static string seller_invited_to_specialist_opportunity = "seller_invited_to_specialist_opportunity";
        public static string specialist_opportunity_response_received_email = "specialist_opportunity_response_received_email";
        public static string specialist_opportunity_response_withdrawn_email = "specialist_opportunity_response_withdrawn_email";
        public static string opportunity_response_withdrawn_email = "opportunity_response_withdrawn_email";
        public static string update_supplier = "update_supplier";
        public static string notify_auth_rep_accept_master_agreement = "notify_auth_rep_accept_master_agreement";
        public static string declined_master_agreement = "declined_master_agreement";
        public static string accepted_master_agreement = "accepted_master_agreement";
        public static string declined_master_agreement_email = "declined_master_agreement_email";
        public static string create_work_order = "create_work_order";
        public static string create_opportunity_question = "create_opportunity_question";
        public static string create_opportunity_clarification_question = "create_opportunity_clarification_question";
        public static string team_lead_added = "team_lead_added";
        public static string team_member_added = "team_member_added";
        public static string team_member_removed = "team_member_removed";
        public static string sent_opportunity_question_to_buyer = "sent_opportunity_question_to_buyer";
        public static string sent_opportunity_question_to_seller = "sent_opportunity_question_to_seller";
        public static string sent_request_access = "sent_request_access";
        public static string sent_request_to_join_team = "sent_request_to_join_team";
        public static string sent_request_to_join_team_decline = "sent_request_to_join_team_decline";
        public static string evidence_draft_deleted = "evidence_draft_deleted";
        public static string agency_updated = "agency_updated";
    }
}
