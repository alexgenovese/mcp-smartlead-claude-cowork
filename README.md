# SmartLead MCP Server 2.0

MCP Server per integrazione SmartLead CRM per [Claude Cowork](https://claude.ai) - gestione campagne, lead e analytics direttamente dai tuoi AI tools.

## 🚀 Features

- **42+ Tools disponibili** per gestione completa di SmartLead
- **Integration complete**: Campaign, Leads, Email, Analytics
- **TypeScript** con validatione Zod
- **Zero configuration** per installazione veloce
- **Production-ready** con error handling robusto

## 📦 Tools Disponibili

### Campaign Management (14)
- `smartlead_create_campaign` - Crea nuova campagna compilati
- `smartlead_list_campaigns` - Elenco con filtri
- `smartlead_get_campaign_by_id` - Dettagli campagna
- `smartlead_update_campaign_settings` - Modifica configurazione
- `smartlead_pause_campaign` / `smartlead_resume_campaign` - Pause/risum
- `smartlead_update_campaign_schedule` - Modifica schedulazione
- `smartlead_clone_campaign` - Duplica campagne
- `smartlead_update_campaign_sequences` - Modifica sequenze
- `smartlead_set_campaign_limits` - Limiti invio giornaliero
- `smartlead_update_campaign_tracking` - Abilita/disabilita tracking
- `smartlead_schedule_campaign` - Programmazione avanzata
- `smartlead_get_campaigns_with_analytics` - Compianeti con performance data

### Lead Management (6)
- `smartlead_add_leads_to_campaign` - Import multiple lead
- `smartlead_list_leads_by_campaign` - Lista lead
- `smartlead_fetch_lead_by_email` - Cerca lead per email
- `smartlead_get_lead_details` - Dettagli lead
- `smartlead_import_leads_from_csv` - Import CSV
- `smartlead_export_leads_data` - Esporta dati

### Email Accounts (10)
- `smartlead_create_email_account` - Crea account email
- `smartlead_fetch_all_email_accounts` - Lista account
- `smartlead_update_email_account` - Modifica account
- `smartlead_delete_email_account` - Rimuovi account
- `smartlead_test_email_account` - Test connettività
- `smartlead_add_update_warmup_to_email` - Configurazione warmup
- `smartlead_get_warmup_status` - Status warmup
- `smartlead_pause_warmup` / `smartlead_resume_warmup` - Pause warmup

### Analytics (12)
- `smartlead_get_analytics_campaign_list` - Lista con analytics
- `smartlead_get_analytics_overall_stats_v2` - Statistics generali
- `smartlead_get_analytics_day_wise_overall_stats` - Grafica giornaliera
- `smartlead_get_campaign_performance_summary` - Performance
- `smartlead_get_sequence_performance_analytics` - Analisi sequenze
- `smartlead_get_campaign_conversion_funnel` - Funnel conversione
- `smartlead_fetch_campaign_statistics` - Statistiche complete
- `smartlead_get_campaign_sending_stats` - Invio volume
- `smartlead_get_campaign_response_rates` - Tassi di risposta
- `smartlead_get_campaign_bounce_analysis` - Analisi rimbalzi
- `smartlead_get_campaign_unsubscribe_stats` - Unsubscribe tracking
- `smartlead_get_deliverability_stats` - Deliverability
- `smartlead_get_engagement_stats` - Engagement

## 🛠️ Requisiti

- Node.js >= 18.0.0
- npm >= 9.0.0

## 📦 Installazione

```bash
# Clone repository
git clone https://github.com/alexgenovese/mcp-smartlead-claude-cowork.git
cd mcp-smartlead-claude-cowork

# Installa dipendenze
npm install

# Scarica bundle
npm run bundle:smartlead-improved-2.0.mcpb

# Oppure scarica bundle diretto
cd bundle-mcp-server
```

## 🛠️ Utilizzo Bundle Generator

### Panoramica

Il `create-bundle.sh` script automatizza la creazione di bundle MCP per il server SmartLead. Genera un file `.mcpb` compresso contenente tutti i file sorgente necessari per l'installazione MCP.

### Requisiti

- Bash 4+
- Node.js >= 18.0.0
- npm >= 9.0.0
- zip utility

### Utilizzo

```bash
# Esegui il generatore di bundle (crea bundle nella directory build-output)
./create-bundle.sh

# Il bundle verrà creato come:
# /Users/alexgenovese/Documents/GitHub/mcp-smartlead-claude-cowork/build-output/mcp-smartlead-claude-cowork.mcpb
```

### Funzionalità

Il generatore esegue queste operazioni in sequenza:

1. **Verifica prerequisiti** - Controlla zip e Node.js
2. **Installa dipendenze** - Esegue `npm ci` o `npm install`
3. **Compila server** - Esegue il TypeScript compiler (se disponibile)
4. **Crea bundle** - Comprime tutti i file sorgente (esclude .git, node_modules, TypeScript, test, documentazione)
5. **Genera metadata** - Crea file JSON con informazioni sul bundle
6. **Mostra riepilogo** - Visualizza statistiche complete del bundle

### File Esclusi

Durante la creazione del bundle, i seguenti file sono automaticamente esclusi:

- `*.git/*` - Directory git
- `node_modules/.bin/*` - Script di sviluppo
- `*.ts` - File TypeScript sorgente
- `*.test.js` - Test JavaScript
- `.blade/*` - Template Blade
- `*/.config/*` - File di configurazione
- `*/LICENSE` - File di licenza
- `*.md` - File Markdown
- `*.sh` - Script shell
- `*.log` - File di log
- `.DS_Store` - File di sistema macOS

### Output

- **Bundle**: `build-output/mcp-smartlead-claude-cowork.mcpb`
- **Metadata**: `bundle-metadata.json`
- **Directory**: `build-output/` (creata automaticamente)

### Note di Sviluppo

- Per eseguire in modalità silenziosa, modifica `set -eu` a `set -euo pipefail`
- Per personalizzare gli script esclusi, modifica la sezione zip `-x` nel codice
- Per modificare il nome del bundle, modifica `SCRIPT_NAME` nella sezione directory variables
- Per aggiungere script di build personalizzati, modifica la sezione compilation step

### Esempio di Output

```
┌─────────────────────────────────────────────────────────────┐
│ 🛠️  SmartLead MCP Bundle Generator v2.0 🛠️                   │
│                                                             │
│    © 2026 Alex Genovese | https://alexgenovese.com          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

===============================================================
🚀 Starting Bundle Generation Process...
===============================================================

🔄 PHASE: CHECKING PREREQUISITES
  ✅ Zip utility found
  ✅ Node.js available (v20.15.0)

🔄 PHASE: STEP 1: Installing Dependencies
  ✅ Dependencies already installed

🔄 PHASE: STEP 2: Building Server
  👉  Compiling TypeScript to JavaScript
  ✅ TypeScript compiler found

🔄 PHASE: STEP 3: Creating Bundle
  👉  Gathering source files...
  ✅ Found 17 source files
  👉  Removing old bundle if exists...
  ✅ Old bundle removed
  👉  Creating output directory...
  ✅ Output directory created
  👉  Creating new bundle...
  ✅ Bundle created successfully!

🔄 PHASE: STEP 4: Bundle Statistics
  ℹ️  Bundle Size:    2,9M
  ℹ️  Total Files:    17
  ℹ️  Unzip Size:      ~0,00745583MB

🔄 PHASE: STEP 5: Generating Metadata
  ✅ Metadata saved to /path/to/bundle-metadata.json

🔄 PHASE: STYLE: BUILD COMPLETE
#################################
# Build complete!
#################################

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
               BUNDLE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  📦  Bundle Name:   smartlead-mcp-improved
       Version:      2.0.0
       Size:         2M
       Files:        17

  📂  Location:      /path/to/build-output/mcp-smartlead-claude-cowork.mcpb
       Metadata:     /path/to/bundle-metadata.json

  🌐  Repository:    https://github.com/alexgenovese/mcp-smartlead-claude-cowork
       Website:      https://alexgenovese.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Press Enter to exit...
```

## ⚙️ Configurazione

### Claude Cowork

1. Scarica bundle `.mcpb`:
   ```
   /Users/alexgenovese/Desktop/mcp-smartlead-bundle/bundle-smartlead-improved-2.0-final.mcpb
   ```

2. Apri file `.mcpb` con Claude Cowork
3. Imposta **SmartLead API Key** nell'interfaccia
4. Clicca **Install**

### Esempio Configurazione

```json
{
  "mcpServers": {
    "smartlead": {
      "command": "node",
      "args": ["server/index.js"],
      "env": {
        "SMARTLEAD_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## 📖 API Reference

- [SmartLead API Docs](https://api.smartlead.ai/introduction)
- [MCPB Bundle Spec](https://github.com/modelcontextprotocol/mcpb/blob/main/MANIFEST.md)

## 📄 Licenza

Apache-2.0

© 2026 Alex Genovese - [alexgenovese.com](https://alexgenovese.com)

GitHub: [alexgenovese/mcp-smartlead-claude-cowork](https://github.com/alexgenovese/mcp-smartlead-claude-cowork)
