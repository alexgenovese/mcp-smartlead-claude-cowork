import * as api from "./api.js";

export async function create_campaign(args) {
  return api.post("campaigns/create", {
    name: args.campaign_name || "Untitled Campaign",
    client_id: args.client_id,
  });
}

export async function list_campaigns(args) {
  return api.get("campaigns/", {
    include_tags: args.include_tags || false,
    client_id: args.client_id,
  });
}

export async function get_campaign_by_id(args) {
  return api.get(`campaigns/${args.campaign_id}`, {
    include_tags: args.include_tags || false,
  });
}

export async function update_campaign_settings(args) {
  const body = {};
  if (args.name !== undefined) body.name = args.name;
  if (args.track_settings !== undefined) body.track_settings = args.track_settings;
  if (args.stop_lead_settings !== undefined) body.stop_lead_settings = args.stop_lead_settings;
  if (args.unsubscribe_text !== undefined) body.unsubscribe_text = args.unsubscribe_text;
  if (args.send_as_plain_text !== undefined) body.send_as_plain_text = args.send_as_plain_text;
  if (args.follow_up_percentage !== undefined) body.follow_up_percentage = args.follow_up_percentage;
  if (args.enable_ai_esp_matching !== undefined) body.enable_ai_esp_matching = args.enable_ai_esp_matching;
  return api.post(`campaigns/${args.campaign_id}/settings`, body);
}

export async function get_campaigns_with_analytics(args) {
  return api.get("campaigns/", { include_tags: "true" });
}

export async function delete_campaign(args) {
  return api.del(`campaigns/${args.campaign_id}`);
}

export async function pause_campaign(args) {
  return api.post(`campaigns/${args.campaign_id}/status`, { status: "PAUSED" });
}

export async function resume_campaign(args) {
  return api.post(`campaigns/${args.campaign_id}/status`, { status: "START" });
}

export async function update_campaign_schedule(args) {
  const schedule = {};
  if (args.timezone) schedule.timezone = args.timezone;
  if (args.days) schedule.days = args.days;
  if (args.start_hour) schedule.start_hour = args.start_hour;
  if (args.end_hour) schedule.end_hour = args.end_hour;
  if (args.min_time_btw_emails) schedule.min_time_btw_emails = args.min_time_btw_emails;
  return api.post(`campaigns/${args.campaign_id}/schedule`, { schedule });
}

export async function clone_campaign(args) {
  const data = await api.get(`campaigns/${args.campaign_id}`);
  return api.post("campaigns/create", {
    name: args.new_campaign_name || `${data.name || data.data?.name || "Campaign"} (Clone)`,
  });
}

export async function update_campaign_sequences(args) {
  return api.post(`campaigns/${args.campaign_id}/sequences`, {
    sequences: args.sequences,
  });
}

export async function set_campaign_limits(args) {
  const body = {};
  if (args.max_leads_per_day !== undefined) body.max_leads_per_day = args.max_leads_per_day;
  if (args.min_time_btw_emails !== undefined) body.min_time_btw_emails = args.min_time_btw_emails;
  return api.post(`campaigns/${args.campaign_id}/settings`, body);
}

export async function update_campaign_tracking(args) {
  const track_settings = [];
  if (args.disable_open_tracking) track_settings.push("DONT_TRACK_EMAIL_OPEN");
  if (args.disable_click_tracking) track_settings.push("DONT_TRACK_LINK_CLICK");
  return api.post(`campaigns/${args.campaign_id}/settings`, { track_settings });
}

export async function schedule_campaign(args) {
  const schedule = {
    timezone: args.timezone || "America/New_York",
    days: args.days || [1, 2, 3, 4, 5],
    start_hour: args.start_hour || "09:00",
    end_hour: args.end_hour || "17:00",
  };
  return api.post(`campaigns/${args.campaign_id}/schedule`, { schedule });
}

export async function add_leads_to_campaign(args) {
  return api.post(`campaigns/${args.campaign_id}/leads`, {
    lead_list: args.lead_list,
    settings: args.settings,
  });
}

export async function list_leads_by_campaign(args) {
  return api.get(`campaigns/${args.campaign_id}/leads`, {
    offset: args.offset || 0,
    limit: args.limit || 100,
    status: args.status,
  });
}

export async function stop_campaign(args) {
  return api.post(`campaigns/${args.campaign_id}/status`, { status: "STOPPED" });
}
