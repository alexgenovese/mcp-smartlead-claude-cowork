import * as api from "./api.js";

export async function create_email_account(args) {
  return api.post("email-accounts/save", {
    email: args.email,
    from_name: args.from_name,
    smtp_host: args.smtp_host,
    smtp_port: args.smtp_port,
    smtp_username: args.smtp_username,
    smtp_password: args.smtp_password,
    imap_host: args.imap_host,
    imap_port: args.imap_port,
  });
}

export async function fetch_all_email_accounts(args) {
  return api.get("email-accounts");
}

export async function update_email_account(args) {
  return api.patch(`email-accounts/${args.account_id}`, {
    email: args.email,
    from_name: args.from_name,
    smtp_host: args.smtp_host,
    smtp_port: args.smtp_port,
  });
}

export async function delete_email_account(args) {
  return api.del(`email-accounts/${args.account_id}`);
}

export async function test_email_account(args) {
  return api.get(`email-accounts/${args.account_id}`);
}

export async function warmup_config(args) {
  return api.patch(`email-accounts/${args.account_id}`, {
    warmup_enabled: args.warmup_enabled,
  });
}

export async function get_warmup_status(args) {
  return api.get(`email-accounts/${args.account_id}/warmup-stats`);
}

export async function pause_warmup(args) {
  return api.post(`email-accounts/${args.account_id}/warmup/pause`);
}

export async function resume_warmup(args) {
  return api.post(`email-accounts/${args.account_id}/warmup/resume`);
}
