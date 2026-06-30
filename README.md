# SmartLead MCP Server v2.0.0

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Protocol](https://img.shields.io/badge/protocol-MCP-green.svg)](https://modelcontextprotocol.io)
[![Runtime](https://img.shields.io/badge/runtime-Node.js%20%3E%3D18-brightgreen.svg)](https://nodejs.org/)

An advanced Model Context Protocol (MCP) Server that provides a seamless integration with **SmartLead CRM**. This server exposes **39 powerful tools** allowing Claude, ChatGPT, and other AI tools to manage cold email campaigns, track leads, configure sending accounts, and retrieve comprehensive analytics directly through natural language.

---

## 🚀 Key Features

The server exposes 39 specialized tools divided into four functional domains, enabling complete programmatic control over your SmartLead workspace:

### 1. Campaign Management (14 Tools)
*   `smartlead_create_campaign` - Create new email campaigns with custom sequences and configurations.
*   `smartlead_list_campaigns` - Retrieve and filter campaigns with full pagination.
*   `smartlead_get_campaign_by_id` - Fetch detailed configuration for a specific campaign.
*   `smartlead_update_campaign_settings` - Modify existing campaign configurations.
*   `smartlead_get_campaigns_with_analytics` - Fetch campaigns enriched with real-time performance data.
*   `smartlead_delete_campaign` - Safely remove campaigns from your workspace.
*   `smartlead_pause_campaign` / `smartlead_resume_campaign` - Instantly pause or resume campaign schedules.
*   `smartlead_update_campaign_schedule` - Adjust sending schedules and timetables.
*   `smartlead_clone_campaign` - Duplicate successful campaigns and sequences.
*   `smartlead_update_campaign_sequences` - Edit or append email steps and delays.
*   `smartlead_set_campaign_limits` - Configure strict daily and total sending limits.
*   `smartlead_update_campaign_tracking` - Enable/disable open and click tracking parameters.
*   `smartlead_schedule_campaign` - Setup advanced scheduling and timezones.

### 2. Lead Management (6 Tools)
*   `smartlead_add_leads_to_campaign` - Bulk import prospective leads to campaigns.
*   `smartlead_list_leads_by_campaign` - Page through leads assigned to a specific campaign.
*   `smartlead_fetch_lead_by_email` - Search and locate a specific prospect by email.
*   `smartlead_get_lead_details` - Retrieve complete status, attributes, and touchpoint history for a lead.
*   `smartlead_import_leads_from_csv` - Standardized bulk CSV importing utility.
*   `smartlead_export_leads_data` - Export prospect datasets in CSV or JSON format.

### 3. Email Accounts Management (10 Tools)
*   `smartlead_create_email_account` - Add and configure new SMTP/IMAP sending accounts.
*   `smartlead_fetch_all_email_accounts` - List all sender accounts configured in your workspace.
*   `smartlead_update_email_account` - Adjust SMTP host, port, credentials, and from-names.
*   `smartlead_delete_email_account` - Remove sending accounts safely.
*   `smartlead_test_email_account` - Test and verify SMTP/IMAP connection status.
*   `smartlead_add_update_warmup_to_email` - Configure deliverability warmup schedules.
*   `smartlead_get_warmup_status` - Track warmup metrics and progress.
*   `smartlead_pause_warmup` / `smartlead_resume_warmup` - Toggle the deliverability warmup process.

### 4. Comprehensive Analytics (9 Tools)
*   `smartlead_get_analytics_campaign_list` - List campaigns with high-level performance indicators.
*   `smartlead_get_analytics_overall_stats_v2` - Fetch aggregated workspace statistics over custom periods.
*   `smartlead_get_analytics_day_wise_overall_stats` - Extract day-by-day metrics for trend plotting.
*   `smartlead_get_campaign_performance_summary` - Extract deep-dive campaign reports.
*   `smartlead_get_sequence_performance_analytics` - Measure individual email-step conversion/bounce rates.
*   `smartlead_get_campaign_conversion_funnel` - Evaluate campaigns through visual funnels.
*   `smartlead_fetch_campaign_statistics` - Comprehensive statistics across all touchpoints.
*   `smartlead_get_campaign_sending_stats` - Monitor aggregate sending volume and deliverability ratios.
*   `smartlead_get_campaign_response_rates` - Measure engagement, reply, and interest rates.

---

## 🛠️ Technology Stack

*   **Runtime Environment:** Node.js (version `>= 18.0.0` required, ESM support)
*   **Protocol:** [Model Context Protocol (MCP) SDK](https://github.com/modelcontextprotocol/node-sdk) v1.29.0
*   **Type Validation & Coercion:** [Zod](https://github.com/colinhacks/zod) v3.24.0
*   **Network Client:** Native Fetch API
*   **Package Manager:** npm (v9.0.0+)
*   **Packaging Utility:** Bash Zip with Custom Manifest specs (.mcpb format)

---

## 📐 Project Architecture

This server is designed to act as a lightweight, robust bridge between any Model Context Protocol compliant client and the SmartLead REST API.

```
┌───────────────────────────────────────────────┐
│              Claude / AI Client               │
└───────────────────────┬───────────────────────┘
                        │
                        │ Stdio Server Transport
                        ▼
┌───────────────────────────────────────────────┐
│             SmartLead MCP Server              │
│               (server/index.js)               │
└───────────────────────┬───────────────────────┘
                        │
                        │ Parameter Validation (Zod)
                        ▼
┌───────────────────────────────────────────────┐
│              API Helper Modules               │
│   ┌─────────────┬────────────┬────────────┐   │
│   │  Campaigns  │   Leads    │   Emails   │   │
│   ├─────────────┴────────────┴────────────┤   │
│   │               Analytics               │   │
│   └───────────────────────────────────────┘   │
└───────────────────────┬───────────────────────┘
                        │
                        │ Fetch Requests (with SMARTLEAD_API_KEY)
                        ▼
┌───────────────────────────────────────────────┐
│               SmartLead REST API              │
└───────────────────────────────────────────────┘
```

### Architectural Design Principles:
1.  **Strict Isolation:** Logic is modularized into feature domains (`campaigns.js`, `leads.js`, `emails.js`, `analytics.js`).
2.  **Robust Error Handling:** The central API client (`api.js`) standardizes fetch requests, validates standard network statuses (`response.ok`), and translates API errors into readable messages before bubbling them up to the AI tool runner.
3.  **Declarative Validation:** The main server schema definitions are written in Zod, making it extremely fast for LLMs to generate valid inputs.

---

## 📂 Project Structure

```
.
├── LICENSE                      # Apache-2.0 License
├── README.md                    # Project documentation
├── create-bundle.sh             # Bundle compilation script (.mcpb packager)
├── manifest.json                # MCP Bundle deployment configuration
├── package.json                 # Node dependencies and scripts
├── .gitignore                   # Git exclusion configurations
├── .mcpbignore                  # Bundle compiler exclusion configurations
└── server/                      # Main server codebase
    ├── index.js                 # Server entry point and tool registrations
    └── tools/                   # Modular sub-tool implementations
        ├── api.js               # SmartLead REST client helper (fetch wrapper)
        ├── analytics.js         # Analytics metrics tools
        ├── campaigns.js         # Campaign creation and control tools
        ├── emails.js            # Sending account config and warmup tools
        └── leads.js             # Lead import, export, and search tools
```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js `>= 18.0.0`
*   npm `>= 9.0.0`
*   A valid **SmartLead API Key**

### 1. Manual Setup (For Development)

Clone the repository and install dependencies:
```bash
git clone https://github.com/alexgenovese/mcp-smartlead-claude-cowork.git
cd mcp-smartlead-claude-cowork
npm install
```

Configure your environment variables:
```bash
export SMARTLEAD_API_KEY="your_api_key_here"
```

Start the MCP Server locally:
```bash
npm start
```
*Note: The server communicates via standard I/O (StdioServerTransport) and will wait silently for stdin commands.*

### 2. Manual Configuration in Claude Desktop

Add the server config to your `claude_desktop_config.json` (typically located in `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS, or `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "smartlead": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-smartlead-claude-cowork/server/index.js"],
      "env": {
        "SMARTLEAD_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

---

## 📦 Utilizing the Bundle Generator

### Overview
The repository includes an automated utility script `create-bundle.sh` to compile, package, and compress the codebase into a portable **Model Context Protocol Bundle (`.mcpb`)**. This bundle is compatible with **Claude Cowork** and similar tool loaders.

### Creating the Bundle
Execute the builder script directly from your terminal:
```bash
./create-bundle.sh
```

### ⚠️ Critical Note on Bundle Size Optimization
When compiling raw directories containing the `node_modules` folder, the total package size can easily exceed **7 MB**. 

To prevent install dialogs in Claude Desktop/Cowork from timing out (which happens after ~50 seconds for bundles over ~3 MB), you **MUST** execute the bundle optimizer (`mcpb clean`) right after packaging:

```bash
# Standard pack (creates the bundle)
mcpb pack

# Optimization step (shrinks file payload)
mcpb clean smartlead-crm.mcpb
```

This reduces the final payload size from **~7 MB to ~2.8 MB** by purging development tools and trimming unused library binaries, ensuring a smooth click-to-install experience.

---

## 🧼 Coding Standards

*   **Module System:** ES Modules (ESM) exclusively (`import` and `export` statements).
*   **Code Quality & Safety:**
    *   No hardcoded URLs: Single base URL constant in `api.js` (`https://server.smartlead.ai/api/v1`).
    *   Fail Fast: Required parameters are modeled with strict Zod types. If validation fails, errors are immediately returned without initiating external API requests.
    *   Null Safety: The `buildUrl` helper filters out any empty strings, `null`, or `undefined` parameters before serialization.
*   **Security:** API Keys are NEVER stored in code or repository logs. They must always be supplied securely via the `SMARTLEAD_API_KEY` environment variable.

---

## 🧪 Testing

To verify the connectivity of your MCP server configuration, you can start the script manually via node:
```bash
node server/index.js
```
The server will log `SmartLead MCP server started with 39 tools` to `stderr` upon successfully mounting, proving that the tools have compiled and initialized correctly.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1.  Ensure all parameters in any newly added tool are validated using proper `zod` schemas inside `server/index.js`.
2.  Maintain modular separation by implementing core logic inside the `server/tools/` folder.
3.  Verify any changes do not break ES Module compatibility.

---

## 📄 License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.

© 2026 Alex Genovese - [alexgenovese.com](https://alexgenovese.com)  
GitHub: [alexgenovese/mcp-smartlead-claude-cowork](https://github.com/alexgenovese/mcp-smartlead-claude-cowork)
