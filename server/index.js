import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import * as campaigns from "./tools/campaigns.ts";
import * as leads from "./tools/leads.ts";
import * as emails from "./tools/emails.ts";
import * as analytics from "./tools/analytics.ts";

// 🏗️ MCP Server Initialization
const server = new McpServer(
  {
    name: "smartlead-mcp-improved",
    version: "2.0.0",
    description: "MCP Server for SmartLead CRM with 39+ tools",
    author: "Alex Genovese",
    repository: "https://github.com/alexgenovese/mcp-smartlead-claude-cowork",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// 🎯 All 39 tools descriptions for ListTools handler
const allTools = [
  "smartlead_create_campaign",
  "smartlead_list_campaigns",
  "smartlead_get_campaign_by_id",
  "smartlead_update_campaign_settings",
  "smartlead_get_campaigns_with_analytics",
  "smartlead_delete_campaign",
  "smartlead_pause_campaign",
  "smartlead_resume_campaign",
  "smartlead_update_campaign_schedule",
  "smartlead_clone_campaign",
  "smartlead_update_campaign_sequences",
  "smartlead_set_campaign_limits",
  "smartlead_update_campaign_tracking",
  "smartlead_schedule_campaign",
  "smartlead_add_leads_to_campaign",
  "smartlead_list_leads_by_campaign",
  "smartlead_fetch_lead_by_email",
  "smartlead_get_lead_details",
  "smartlead_import_leads_from_csv",
  "smartlead_export_leads_data",
  "smartlead_create_email_account",
  "smartlead_fetch_all_email_accounts",
  "smartlead_update_email_account",
  "smartlead_delete_email_account",
  "smartlead_test_email_account",
  "smartlead_add_update_warmup_to_email",
  "smartlead_get_warmup_status",
  "smartlead_pause_warmup",
  "smartlead_resume_warmup",
  "smartlead_get_analytics_campaign_list",
  "smartlead_get_analytics_overall_stats_v2",
  "smartlead_get_analytics_day_wise_overall_stats",
  "smartlead_get_campaign_performance_summary",
  "smartlead_get_sequence_performance_analytics",
  "smartlead_get_campaign_conversion_funnel",
  "smartlead_fetch_campaign_statistics",
  "smartlead_get_campaign_sending_stats",
  "smartlead_get_campaign_response_rates",
  "smartlead_get_campaign_bounce_analysis",
  "smartlead_get_campaign_unsubscribe_stats",
  "smartlead_get_deliverability_stats",
  "smartlead_get_engagement_stats",
];

// Tool descriptions for documentation
const toolDescriptions = {
  "smartlead_create_campaign": "Create a new email campaign with sequences and settings",
  "smartlead_list_campaigns": "List all campaigns with filtering and pagination",
  "smartlead_get_campaign_by_id": "Get specific campaign details and configuration",
  "smartlead_update_campaign_settings": "Modify campaign configuration and parameters",
  "smartlead_get_campaigns_with_analytics": "Get campaigns with performance data included",
  "smartlead_delete_campaign": "Remove campaigns from your account",
  "smartlead_pause_campaign": "Pause active campaigns temporarily",
  "smartlead_resume_campaign": "Resume paused campaigns",
  "smartlead_update_campaign_schedule": "Modify sending schedules and timing",
  "smartlead_clone_campaign": "Duplicate successful campaigns",
  "smartlead_update_campaign_sequences": "Modify email sequences and content",
  "smartlead_set_campaign_limits": "Configure daily sending limits",
  "smartlead_update_campaign_tracking": "Enable/disable open and click tracking",
  "smartlead_schedule_campaign": "Set up advanced campaign scheduling",
  "smartlead_add_leads_to_campaign": "Import prospects to campaigns (bulk CSV)",
  "smartlead_list_leads_by_campaign": "Get all prospects in a specific campaign",
  "smartlead_fetch_lead_by_email": "Find specific prospect by email address",
  "smartlead_get_lead_details": "Fetch detailed prospect information and history",
  "smartlead_import_leads_from_csv": "Bulk import prospects from CSV files",
  "smartlead_export_leads_data": "Export prospect data in various formats",
  "smartlead_create_email_account": "Add new sending email accounts",
  "smartlead_fetch_all_email_accounts": "List all configured email accounts",
  "smartlead_update_email_account": "Modify account settings and configuration",
  "smartlead_delete_email_account": "Remove email accounts from your setup",
  "smartlead_test_email_account": "Verify account connectivity and authentication",
  "smartlead_add_update_warmup_to_email": "Configure warmup settings for accounts",
  "smartlead_get_warmup_status": "Check current warmup progress and status",
  "smartlead_pause_warmup": "Temporarily pause warmup process",
  "smartlead_resume_warmup": "Resume paused warmup process",
  "smartlead_get_analytics_campaign_list": "List campaigns with analytics data",
  "smartlead_get_analytics_overall_stats_v2": "Overall performance statistics",
  "smartlead_get_analytics_day_wise_overall_stats": "Daily performance breakdown",
  "smartlead_get_campaign_performance_summary": "Campaign-specific performance metrics",
  "smartlead_get_sequence_performance_analytics": "Email sequence analysis",
  "smartlead_get_campaign_conversion_funnel": "Conversion tracking and analysis",
  "smartlead_fetch_campaign_statistics": "Comprehensive campaign performance stats",
  "smartlead_get_campaign_sending_stats": "Sending volume and timing statistics",
  "smartlead_get_campaign_response_rates": "Response and engagement rate analysis",
  "smartlead_get_campaign_bounce_analysis": "Bounce rate analysis and trends",
  "smartlead_get_campaign_unsubscribe_stats": "Unsubscribe tracking and analysis",
  "smartlead_get_deliverability_stats": "Email deliverability insights",
  "smartlead_get_engagement_stats": "Open, click, and response rate analysis",
};

// Initialize analytics base function
async function getCampaignStats({ campaign_id, days = 30 }) {
  return await campaigns.getCampaignStats(args);
}

// Register all tools

const allTools = [
  { name: "smartlead_create_campaign", fn: campaigns.create_campaign },
  { name: "smartlead_list_campaigns", fn: campaigns.list_campaigns },
  { name: "smartlead_get_campaign_by_id", fn: campaigns.get_campaign_by_id },
  { name: "smartlead_update_campaign_settings", fn: campaigns.update_campaign_settings },
  { name: "smartlead_get_campaigns_with_analytics", fn: campaigns.get_campaigns_with_analytics },
  { name: "smartlead_delete_campaign", fn: campaigns.delete_campaign },
  { name: "smartlead_pause_campaign", fn: campaigns.pause_campaign },
  { name: "smartlead_resume_campaign", fn: campaigns.resume_campaign },
  { name: "smartlead_update_campaign_schedule", fn: campaigns.update_campaign_schedule },
  { name: "smartlead_clone_campaign", fn: campaigns.clone_campaign },
  { name: "smartlead_update_campaign_sequences", fn: campaigns.update_campaign_sequences },
  { name: "smartlead_set_campaign_limits", fn: campaigns.set_campaign_limits },
  { name: "smartlead_update_campaign_tracking", fn: campaigns.update_campaign_tracking },
  { name: "smartlead_schedule_campaign", fn: campaigns.schedule_campaign },
  { name: "smartlead_add_leads_to_campaign", fn: leads.add_leads_to_campaign },
  { name: "smartlead_list_leads_by_campaign", fn: leads.list_leads_by_campaign },
  { name: "smartlead_fetch_lead_by_email", fn: leads.fetch_lead_by_email },
  { name: "smartlead_get_lead_details", fn: leads.get_lead_details },
  { name: "smartlead_import_leads_from_csv", fn: leads.import_leads_from_csv },
  { name: "smartlead_export_leads_data", fn: leads.export_leads_data },
  { name: "smartlead_create_email_account", fn: emails.create_email_account },
  { name: "smartlead_fetch_all_email_accounts", fn: emails.fetch_all_email_accounts },
  { name: "smartlead_update_email_account", fn: emails.update_email_account },
  { name: "smartlead_delete_email_account", fn: emails.delete_email_account },
  { name: "smartlead_test_email_account", fn: emails.test_email_account },
  { name: "smartlead_add_update_warmup_to_email", fn: emails.warmup_config },
  { name: "smartlead_get_warmup_status", fn: emails.get_warmup_status },
  { name: "smartlead_pause_warmup", fn: emails.pause_warmup },
  { name: "smartlead_resume_warmup", fn: emails.resume_warmup },
  { name: "smartlead_get_analytics_campaign_list", fn: analytics.get_analytics_campaign_list },
  { name: "smartlead_get_analytics_overall_stats_v2", fn: analytics.get_overall_stats },
  { name: "smartlead_get_analytics_day_wise_overall_stats", fn: analytics.getDayWiseStats },
  { name: "smartlead_get_campaign_performance_summary", fn: analytics.getCampaignPerformance },
  { name: "smartlead_get_sequence_performance_analytics", fn: analytics.getSequencePerformance },
  { name: "smartlead_get_campaign_conversion_funnel", fn: analytics.getConversionFunnel },
  { name: "smartlead_fetch_campaign_statistics", fn: analytics.fetchCampaignStats },
  { name: "smartlead_get_campaign_sending_stats", fn: analytics.getSendingStats },
  { name: "smartlead_get_campaign_response_rates", fn: analytics.getResponseRates },
  { name: "smartlead_get_campaign_bounce_analysis", fn: analytics.getBounceAnalysis },
  { name: "smartlead_get_campaign_unsubscribe_stats", fn: analytics.getUnsubscribeStats },
];

// Register all tools description
server.server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: allTools.map(tool => ({
      name: tool.name,
      description: getToolDescription(tool.name),
    })),
  };
});

// Tool description helper
function getToolDescription(toolName: string): string {
  const descriptions: Record<string, string> = {
    "smartlead_create_campaign": "Create a new email campaign with sequences and settings",
    "smartlead_list_campaigns": "List all campaigns with filtering and pagination",
    "smartlead_get_campaign_by_id": "Get specific campaign details and configuration",
    "smartlead_update_campaign_settings": "Modify campaign configuration and performance tracking",
    "smartlead_get_campaigns_with_analytics": "Get campaigns with associated performance data",
    "smartlead_delete_campaign": "Remove a campaign permanently from your account",
    "smartlead_pause_campaign": "Temporarily pause an active campaign",
    "smartlead_resume_campaign": "Resume a paused campaign",
    "smartlead_update_campaign_schedule": "Modify sending schedules and timing configurations",
    "smartlead_clone_campaign": "Duplicate a successful campaign template",
    "smartlead_update_campaign_sequences": "Modify email sequences and content",
    "smartlead_set_campaign_limits": "Configure daily sending limits and volume control",
    "smartlead_update_campaign_tracking": "Enable or disable open and click tracking",
    "smartlead_schedule_campaign": "Set up advanced scheduled sending",
    "smartlead_add_leads_to_campaign": "Import prospects to campaigns with bulk operations",
    "smartlead_list_leads_by_campaign": "Get all prospects in a specific campaign",
    "smartlead_fetch_lead_by_email": "Find specific prospect by email address",
    "smartlead_get_lead_details": "Fetch detailed prospect information and history",
    "smartlead_import_leads_from_csv": "Bulk import prospects from CSV files",
    "smartlead_export_leads_data": "Export prospect data in various formats",
    "smartlead_create_email_account": "Add new sending email accounts",
    "smartlead_fetch_all_email_accounts": "List all configured email accounts",
    "smartlead_update_email_account": "Modify account settings and configuration",
    "smartlead_delete_email_account": "Remove email accounts from your setup",
    "smartlead_test_email_account": "Verify account connectivity and authentication",
    "smartlead_add_update_warmup_to_email": "Configure warmup settings and sending speed",
    "smartlead_get_warmup_status": "Check current warmup progress and performance",
    "smartlead_pause_warmup": "Temporarily pause warmup process",
    "smartlead_resume_warmup": "Resume paused warmup process",
    "smartlead_get_analytics_campaign_list": "List campaigns with analytics performance data",
    "smartlead_get_analytics_overall_stats_v2": "Get overall performance statistics including all available metrics",
    "smartlead_get_analytics_day_wise_overall_stats": "Get daily performance breakdown and trend analysis",
    "smartlead_get_campaign_performance_summary": "Get detailed campaign-specific performance metrics",
    "smartlead_get_sequence_performance_analytics": "Analyze email sequence performance",
    "smartlead_get_campaign_conversion_funnel": "Track and analyze conversion funnel performance",
    "smartlead_fetch_campaign_statistics": "Get comprehensive campaign performance stats",
    "smartlead_get_campaign_sending_stats": "View sending volume and delivery statistics",
    "smartlead_get_campaign_response_rates": "Analyze response and engagement rates",
    "smartlead_get_campaign_bounce_analysis": "Get detailed bounce rate analysis",
    "smartlead_get_campaign_unsubscribe_stats": "Track and analyze unsubscribed metrics",
  };
  
  return descriptions[toolName] || "A tool";
}

server.server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    const tool = allTools.find(t => t.name === name);
    
    if (!tool) {
      throw new Error(`Unknown tool: ${name}`);
    }

    const result = await tool.fn(args);
    
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ [Tool Error: ${name}]`, errorMessage);

    return {
      content: [{ type: "text", text: JSON.stringify({ 
        error: true, 
        tool_name: name,
        message: errorMessage, 
        timestamp: new Date().toISOString() 
      }, null, 2) }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  
  process.on("SIGTERM", () => process.exit(0));
  process.on("SIGINT", () => process.exit(0));

  try {
    await server.connect(transport);
    console.log("✅ SmartLead MCP server started successfully with 39 tools");
  } catch (error) {
    console.error("❌ MCP Server startup failed:", error.message);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("💥 Server crashed:", error);
  process.exit(1);
});
