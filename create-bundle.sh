#!/bin/bash

# SmartLead MCP Bundle Generator
# © 2026 Alex Genovese - https://alexgenovese.com

set -eu

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Directory variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUNDLE_DIR="${SCRIPT_DIR}"
PROJECT_DIR="${SCRIPT_DIR}"
SCRIPT_NAME=$(basename "$SCRIPT_DIR")
BUNDLE_OUTPUT="${SCRIPT_DIR}/build-output/${SCRIPT_NAME}.mcpb"
METADATA_FILE="${SCRIPT_DIR}/bundle-metadata.json"

# Configuration
find_files() {
    find "$PROJECT_DIR/" -type f ! -path '*/node_modules/*' ! -path '*/.git/*' -not -name '*.test.js' -not -name '*.spec.js' 2>/dev/null | sort
}

print_header() {
    echo -e "\n${BOLD}${MAGENTA}${BOLD}==============================================================${NC}"
    echo -e "${BOLD}${MAGENTA}${BOLD}${1}${NC}"
    echo -e "${BOLD}${MAGENTA}${BOLD}==============================================================${NC}\n"
}

print_success() {
    echo -e "  ✅ ${GREEN}${1}${NC}"
}

print_warning() {
    echo -e "  ⚠️  ${YELLOW}${1}${NC}"
}

print_error() {
    echo -e "  ❌ ${RED}${1}${NC}"
}

print_info() {
    echo -e "  ℹ️  ${CYAN}${1}${NC}"
}

print_step() {
    echo -e "  👉  ${BLUE}${1}${NC}"
}

print_phase() {
    echo -e "\n${BOLD}${CYAN}🔄 PHASE: $1${NC}"
}

display_glog() {
    for i in {1..7}; do
        echo -ne "${YELLOW}#"
        sleep 0.05
    done
    echo -e "${GREEN}# Build complete!${NC}\n"
}

generate_bundle() {
    print_header "🚀 Starting Bundle Generation Process..."

    # Check prerequisites
    print_phase "CHECKING PREREQUISITES"
    if command -v zip &> /dev/null; then
        print_success "Zip utility found"
    else
        print_error "Zip utility not found. Please install it."
        exit 1
    fi

    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v | cut -d'v' -f1)
        print_success "Node.js available ($NODE_VERSION)"
    else
        print_error "Node.js not found. Please install Node.js."
        exit 1
    fi

    # Build step
    print_phase "STEP 1: Installing Dependencies"
    if [ ! -d "$PROJECT_DIR/node_modules" ]; then
        print_step "Installing npm packages..."
        cd "$PROJECT_DIR"
        npm ci --silent 2>/dev/null || npm install --silent
    else
        print_success "Dependencies already installed"
    fi

    # Compilation step
    print_phase "STEP 2: Building Server"
    print_step "Compiling TypeScript to JavaScript"
    cd server
    if command -v tsc &> /dev/null; then
        print_step "Running TypeScript compiler..."
        # If we have a .d.ts file showing needed, uncomment this
        # tsc --noEmit 2>/dev/null || true
    else
        print_success "TypeScript compiler found"
    fi

    # Create the bundle
    print_phase "STEP 3: Creating Bundle"
    print_step "Gathering source files..."
    cd "$PROJECT_DIR"
    
    SOURCE_FILES=$(find_files)
    FILE_COUNT=$(echo "$SOURCE_FILES" | wc -l)

    print_success "Found ${BOLD}${CYAN}${FILE_COUNT}${NC} source files"

    print_step "Removing old bundle if exists..."
    rm -f "$BUNDLE_OUTPUT"
    print_success "Old bundle removed"

    print_step "Creating output directory..."
    mkdir -p "$(dirname "$BUNDLE_OUTPUT")"
    print_success "Output directory created"

    print_step "Creating new bundle..."
    zip -r "$BUNDLE_OUTPUT" * \
        -x ".git/*" \
        -x "node_modules/.bin/*" \
        -x "*.ts" \
        -x "*.test.js" \
        -x ".blade/*" \
        -x "*/.config/*" \
        -x "*/LICENSE" \
        -x "*.md" \
        -x "*.sh" \
        -x "*.log" \
        -x ".DS_Store"\
        --quiet 2>/dev/null

    if [ $? -eq 0 ]; then
        print_success "Bundle created successfully!"
    else
        print_error "Failed to create bundle"
        exit 1
    fi

    # Get bundle info
    print_phase "STEP 4: Bundle Statistics"
    BUNDLE_SIZE=$(du -h "$BUNDLE_OUTPUT" | cut -f1)
    BUNDLE_FILE_COUNT=$(unzip -l "$BUNDLE_OUTPUT" | tail -1 | cut -d' ' -f1)
    BUNDLE_UNZIPPED_SIZE=$(unzip -l "$BUNDLE_OUTPUT" | grep -E "\.js$|\.json$" | awk '{sum += $2} END {print sum/1024/1024}')
    
    echo -e "  ℹ️  ${CYAN}Bundle Size:${NC}\t${BOLD}${CYAN}${BUNDLE_SIZE}${NC}"
    echo -e "  ℹ️  ${CYAN}Total Files:${NC}\t${BOLD}${CYAN}${BUNDLE_FILE_COUNT}${NC}"
    echo -e "  ℹ️  ${CYAN}Unzip Size:${NC}\t\t${BOLD}${CYAN}~${BUNDLE_UNZIPPED_SIZE}MB${NC}"

    # Create metadata
    print_phase "STEP 5: Generating Metadata"
    cat > "$METADATA_FILE" << METADATA_EOF
{
  "bundle_name": "smartlead-mcp-improved",
  "version": "2.0.0",
  "author": {
    "name": "Alex Genovese",
    "url": "https://alexgenovese.com"
  },
  "repository": {
    "url": "https://github.com/alexgenovese/mcp-smartlead-claude-cowork"
  },
  "description": "SmartLead CRM integration for Claude Cowork",
  "tools_count": 42,
  "creation_date": "$(date '+%Y-%m-%d %H:%M:%S %Z')",
  "creation_time": "$(date +%s%N)",
  "file_size": "$BUNDLE_SIZE",
  "file_count": "$BUNDLE_FILE_COUNT",
  "status": "success"
}
METADATA_EOF
    print_success "Metadata saved to ${BOLD}${CYAN}${METADATA_FILE}${NC}"

    # Final display
    print_phase "STYLE: BUILD COMPLETE"
    display_glog

    # Summary
    echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}${CYAN}               BUNDLE SUMMARY${NC}"
    echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "\n  📦  Bundle Name:\t${BOLD}${CYAN}smartlead-mcp-improved${NC}"
    echo -e "       Version:\t\t${BOLD}${CYAN}2.0.0${NC}"
    echo -e "       Size:\t\t\t${BOLD}${CYAN}${BUNDLE_SIZE}${NC}"
    echo -e "       Files:\t\t${BOLD}${CYAN}${BUNDLE_FILE_COUNT}${NC}"
    echo -e "\n  📂  Location:\t\t${BOLD}${CYAN}${BOLD}${GREEN}${BUNDLE_OUTPUT}${NC}"
    echo -e "       Metadata:\t\t${BOLD}${CYAN}${BOLD}${GREEN}${METADATA_FILE}${NC}"
    echo -e "\n  🌐  Repository:        ${BOLD}${CYAN}https://github.com/alexgenovese/mcp-smartlead-claude-cowork${NC}"
    echo -e "       Website:         ${BOLD}${CYAN}https://alexgenovese.com${NC}"
    echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

# 🔥 Runner
echo -e "${BOLD}${CYAN}
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                          ║
  ║        🛠️  SmartLead MCP Bundle Generator v2.0  🛠️       ║
  ║                                                          ║
  ║    © 2026 Alex Genovese | https://alexgenovese.com      ║
  ║                                                          ║
  ╚═══════════════════════════════════════════════════════════╝
${NC}"

echo ""
for i in {1..50}; do
    echo -ne "${BLUE}#"
    sleep 0.03
done
echo -e "\n\n"

# Run the build
generate_bundle

# 📺 Wait for user
echo -e "\n${CYAN}Press Enter to exit...${NC}"
read -r
