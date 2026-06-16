import * as api from "./api.js";

export async function get_analytics_campaign_list(args) {
  return api.get("campaigns/", { include_tags: "true" });
}

export async function get_overall_stats(args) {
  return api.get("analytics/overall-stats-v2", {
    start_date: args.start_date,
    end_date: args.end_date,
    timezone: args.timezone,
  });
}

export async function getDayWiseStats(args) {
  return api.get("analytics/overall-stats-v2", {
    start_date: args.start_date,
    end_date: args.end_date,
    timezone: args.timezone,
  });
}

export async function getCampaignPerformance(args) {
  return api.get(`campaigns/${args.campaign_id}/statistics`);
}

export async function getSequencePerformance(args) {
  return api.get(`campaigns/${args.campaign_id}/statistics`, {
    email_sequence_number: args.sequence_number,
  });
}

export async function getConversionFunnel(args) {
  return api.get(`campaigns/${args.campaign_id}/statistics`);
}

export async function fetchCampaignStats(args) {
  return api.get(`campaigns/${args.campaign_id}/statistics`);
}

export async function getSendingStats(args) {
  return api.get(`campaigns/${args.campaign_id}/statistics`);
}

export async function getResponseRates(args) {
  return api.get(`campaigns/${args.campaign_id}/statistics`);
}

export async function getBounceAnalysis(args) {
  return api.get(`campaigns/${args.campaign_id}/statistics`, {
    email_status: "bounced",
  });
}

export async function getUnsubscribeStats(args) {
  return api.get(`campaigns/${args.campaign_id}/statistics`, {
    email_status: "unsubscribed",
  });
}
