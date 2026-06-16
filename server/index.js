import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as campaigns from "./tools/campaigns.js";
import * as leads from "./tools/leads.js";
import * as emails from "./tools/emails.js";
import * as analytics from "./tools/analytics.js";

const server = new McpServer({
  name: "smartlead-mcp-improved",
  version: "2.0.0",
});

// Campaign tools
server.tool(
  "smartlead_create_campaign",
  "Create a new email campaign with sequences and settings",
  {
    campaign_name: z.string().describe("Campaign name"),
    from_name: z.string().describe("Sender name"),
    from_email: z.string().email().describe("Sender email address"),
    daily_limit: z.number().optional().describe("Daily sending limit"),
    emails_per_day: z.number().optional().describe("Emails per day"),
    stop_on_reply: z.boolean().optional().describe("Stop sequence on reply"),
  },
  async (args) => {
    const result = await campaigns.create_campaign(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_list_campaigns",
  "List all campaigns with filtering and pagination",
  {
    page: z.number().optional().describe("Page number"),
    limit: z.number().optional().describe("Results per page"),
  },
  async (args) => {
    const result = await campaigns.list_campaigns(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_get_campaign_by_id",
  "Get specific campaign details and configuration",
  {
    campaign_id: z.number().describe("Campaign ID"),
  },
  async (args) => {
    const result = await campaigns.get_campaign_by_id(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_update_campaign_settings",
  "Modify campaign configuration and parameters",
  {
    campaign_id: z.number().describe("Campaign ID"),
    campaign_name: z.string().optional().describe("New campaign name"),
    from_name: z.string().optional().describe("Sender name"),
    from_email: z.string().optional().describe("Sender email"),
    daily_limit: z.number().optional().describe("Daily sending limit"),
  },
  async (args) => {
    const body = {};
    if (args.campaign_name) body.name = args.campaign_name;
    if (args.from_name) body.from_name = args.from_name;
    if (args.from_email) body.from_email = args.from_email;
    if (args.daily_limit !== undefined) body.max_leads_per_day = args.daily_limit;
    const result = await campaigns.update_campaign_settings({
      campaign_id: args.campaign_id,
      ...body,
    });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_get_campaigns_with_analytics",
  "Get campaigns with performance data included",
  {},
  async () => {
    const result = await campaigns.get_campaigns_with_analytics();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_delete_campaign",
  "Remove campaigns from your account",
  {
    campaign_id: z.number().describe("Campaign ID"),
  },
  async (args) => {
    const result = await campaigns.delete_campaign(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_pause_campaign",
  "Pause active campaigns temporarily",
  {
    campaign_id: z.number().describe("Campaign ID"),
  },
  async (args) => {
    const result = await campaigns.pause_campaign(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_resume_campaign",
  "Resume paused campaigns",
  {
    campaign_id: z.number().describe("Campaign ID"),
  },
  async (args) => {
    const result = await campaigns.resume_campaign(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_update_campaign_schedule",
  "Modify sending schedules and timing",
  {
    campaign_id: z.number().describe("Campaign ID"),
    schedule_time: z.string().optional().describe("Schedule time"),
    timezone: z.string().optional().describe("Timezone"),
  },
  async (args) => {
    const result = await campaigns.update_campaign_schedule(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_clone_campaign",
  "Duplicate successful campaigns",
  {
    campaign_id: z.number().describe("Campaign ID to clone"),
    new_campaign_name: z.string().describe("Name for the cloned campaign"),
  },
  async (args) => {
    const result = await campaigns.clone_campaign(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_update_campaign_sequences",
  "Modify email sequences and content",
  {
    campaign_id: z.number().describe("Campaign ID"),
    sequences: z.array(z.any()).describe("Email sequences array"),
  },
  async (args) => {
    const result = await campaigns.update_campaign_sequences(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_set_campaign_limits",
  "Configure daily sending limits",
  {
    campaign_id: z.number().describe("Campaign ID"),
    daily_limit: z.number().optional().describe("Daily limit"),
    total_limit: z.number().optional().describe("Total limit"),
  },
  async (args) => {
    const result = await campaigns.set_campaign_limits(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_update_campaign_tracking",
  "Enable/disable open and click tracking",
  {
    campaign_id: z.number().describe("Campaign ID"),
    open_tracking: z.boolean().optional().describe("Enable open tracking"),
    click_tracking: z.boolean().optional().describe("Enable click tracking"),
  },
  async (args) => {
    const result = await campaigns.update_campaign_tracking(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_schedule_campaign",
  "Set up advanced campaign scheduling",
  {
    campaign_id: z.number().describe("Campaign ID"),
    schedule_time: z.string().describe("Schedule time"),
    timezone: z.string().optional().describe("Timezone"),
  },
  async (args) => {
    const result = await campaigns.schedule_campaign(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// Lead tools
server.tool(
  "smartlead_add_leads_to_campaign",
  "Import prospects to campaigns (bulk CSV)",
  {
    campaign_id: z.number().describe("Campaign ID"),
    leads: z.array(z.any()).describe("Array of lead objects"),
  },
  async (args) => {
    const result = await campaigns.add_leads_to_campaign({
      campaign_id: args.campaign_id,
      lead_list: args.leads,
      settings: args.settings,
    });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_list_leads_by_campaign",
  "Get all prospects in a specific campaign",
  {
    campaign_id: z.number().describe("Campaign ID"),
    page: z.number().optional().describe("Page number"),
    limit: z.number().optional().describe("Results per page"),
  },
  async (args) => {
    const result = await campaigns.list_leads_by_campaign(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_fetch_lead_by_email",
  "Find specific prospect by email address",
  {
    email: z.string().email().describe("Lead email address"),
  },
  async (args) => {
    const result = await leads.fetch_lead_by_email(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_get_lead_details",
  "Fetch detailed prospect information and history",
  {
    lead_id: z.number().describe("Lead ID"),
  },
  async (args) => {
    const result = await leads.get_lead_details(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_import_leads_from_csv",
  "Bulk import prospects from CSV files",
  {
    campaign_id: z.number().describe("Campaign ID"),
    csv_data: z.string().describe("CSV data as string"),
    skip_if_exists: z.boolean().optional().describe("Skip existing leads"),
  },
  async (args) => {
    const result = await leads.import_leads_from_csv({
      campaign_id: args.campaign_id,
      lead_list: [{ email: args.csv_data }],
      settings: { ignore_duplicate_leads_in_other_campaign: !!args.skip_if_exists },
    });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_export_leads_data",
  "Export prospect data in various formats",
  {
    campaign_id: z.number().optional().describe("Campaign ID"),
    format: z.string().optional().describe("Export format (csv, json)"),
  },
  async (args) => {
    const result = await leads.export_leads_data(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// Email account tools
server.tool(
  "smartlead_create_email_account",
  "Add new sending email accounts",
  {
    email: z.string().email().describe("Email address"),
    password: z.string().describe("Email password"),
    smtp_host: z.string().describe("SMTP host"),
    smtp_port: z.number().describe("SMTP port"),
    imap_host: z.string().optional().describe("IMAP host"),
    imap_port: z.number().optional().describe("IMAP port"),
    from_name: z.string().optional().describe("Sender name"),
  },
  async (args) => {
    const result = await emails.create_email_account({
      email: args.email,
      from_name: args.from_name,
      smtp_host: args.smtp_host,
      smtp_port: args.smtp_port,
      smtp_username: args.email,
      smtp_password: args.password,
      imap_host: args.imap_host,
      imap_port: args.imap_port,
    });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_fetch_all_email_accounts",
  "List all configured email accounts",
  {},
  async () => {
    const result = await emails.fetch_all_email_accounts();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_update_email_account",
  "Modify account settings and configuration",
  {
    account_id: z.number().describe("Account ID"),
    email: z.string().optional().describe("Email address"),
    smtp_host: z.string().optional().describe("SMTP host"),
    smtp_port: z.number().optional().describe("SMTP port"),
  },
  async (args) => {
    const result = await emails.update_email_account(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_delete_email_account",
  "Remove email accounts from your setup",
  {
    account_id: z.number().describe("Account ID"),
  },
  async (args) => {
    const result = await emails.delete_email_account(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_test_email_account",
  "Verify account connectivity and authentication",
  {
    account_id: z.number().describe("Account ID"),
  },
  async (args) => {
    const result = await emails.test_email_account(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_add_update_warmup_to_email",
  "Configure warmup settings for accounts",
  {
    account_id: z.number().describe("Account ID"),
    warmup_enabled: z.boolean().optional().describe("Enable warmup"),
    daily_warmup_limit: z.number().optional().describe("Daily warmup limit"),
  },
  async (args) => {
    const result = await emails.warmup_config(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_get_warmup_status",
  "Check current warmup progress and status",
  {
    account_id: z.number().describe("Account ID"),
  },
  async (args) => {
    const result = await emails.get_warmup_status(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_pause_warmup",
  "Temporarily pause warmup process",
  {
    account_id: z.number().describe("Account ID"),
  },
  async (args) => {
    const result = await emails.pause_warmup(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_resume_warmup",
  "Resume paused warmup process",
  {
    account_id: z.number().describe("Account ID"),
  },
  async (args) => {
    const result = await emails.resume_warmup(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// Analytics tools
server.tool(
  "smartlead_get_analytics_campaign_list",
  "List campaigns with analytics data",
  {},
  async () => {
    const result = await analytics.get_analytics_campaign_list();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_get_analytics_overall_stats_v2",
  "Overall performance statistics",
  {
    from_date: z.string().optional().describe("Start date (YYYY-MM-DD)"),
    to_date: z.string().optional().describe("End date (YYYY-MM-DD)"),
  },
  async (args) => {
    const result = await analytics.get_overall_stats(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_get_analytics_day_wise_overall_stats",
  "Daily performance breakdown",
  {
    from_date: z.string().optional().describe("Start date"),
    to_date: z.string().optional().describe("End date"),
  },
  async (args) => {
    const result = await analytics.getDayWiseStats(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_get_campaign_performance_summary",
  "Campaign-specific performance metrics",
  {
    campaign_id: z.number().describe("Campaign ID"),
  },
  async (args) => {
    const result = await analytics.getCampaignPerformance(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_get_sequence_performance_analytics",
  "Email sequence analysis",
  {
    campaign_id: z.number().describe("Campaign ID"),
  },
  async (args) => {
    const result = await analytics.getSequencePerformance(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_get_campaign_conversion_funnel",
  "Conversion tracking and analysis",
  {
    campaign_id: z.number().describe("Campaign ID"),
  },
  async (args) => {
    const result = await analytics.getConversionFunnel(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_fetch_campaign_statistics",
  "Comprehensive campaign performance stats",
  {
    campaign_id: z.number().describe("Campaign ID"),
  },
  async (args) => {
    const result = await analytics.fetchCampaignStats(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_get_campaign_sending_stats",
  "Sending volume and timing statistics",
  {
    campaign_id: z.number().describe("Campaign ID"),
  },
  async (args) => {
    const result = await analytics.getSendingStats(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_get_campaign_response_rates",
  "Response and engagement rate analysis",
  {
    campaign_id: z.number().describe("Campaign ID"),
  },
  async (args) => {
    const result = await analytics.getResponseRates(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_get_campaign_bounce_analysis",
  "Bounce rate analysis and trends",
  {
    campaign_id: z.number().describe("Campaign ID"),
  },
  async (args) => {
    const result = await analytics.getBounceAnalysis(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "smartlead_get_campaign_unsubscribe_stats",
  "Unsubscribe tracking and analysis",
  {
    campaign_id: z.number().describe("Campaign ID"),
  },
  async (args) => {
    const result = await analytics.getUnsubscribeStats(args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  process.on("SIGTERM", () => process.exit(0));
  process.on("SIGINT", () => process.exit(0));

  try {
    await server.connect(transport);
    console.error("SmartLead MCP server started with 39 tools");
  } catch (error) {
    console.error("MCP Server startup failed:", error.message);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Server crashed:", error);
  process.exit(1);
});
