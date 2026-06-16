import * as api from "./api.js";

export async function fetch_lead_by_email(args) {
  return api.get("leads/by-email", { email: args.email });
}

export async function get_lead_details(args) {
  return api.get(`leads/${args.lead_id}`);
}

export async function import_leads_from_csv(args) {
  return api.post(`campaigns/${args.campaign_id}/leads`, {
    lead_list: args.lead_list,
    settings: args.settings,
  });
}

export async function export_leads_data(args) {
  return api.get(`campaigns/${args.campaign_id}/leads`, {
    limit: args.limit || 1000,
    offset: args.offset || 0,
  });
}
