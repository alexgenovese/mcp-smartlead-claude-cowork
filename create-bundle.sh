#!/bin/bash

# SmartLead MCP Bundle Generator
# © 2026 Alex Genovese - https://alexgenovese.com

set -eu

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="${SCRIPT_DIR}"
SCRIPT_NAME=$(basename "$SCRIPT_DIR")
BUNDLE_OUTPUT="${SCRIPT_DIR}/build-output/${SCRIPT_NAME}.mcpb"

print_header() {
    echo -e "\n${BOLD}${MAGENTA}==============================================================${NC}"
    echo -e "${BOLD}${MAGENTA}${1}${NC}"
    echo -e "${BOLD}${MAGENTA}==============================================================${NC}\n"
}

print_success() { echo -e "  ✅ ${GREEN}${1}${NC}"; }
print_error()   { echo -e "  ❌ ${RED}${1}${NC}"; }
print_info()    { echo -e "  ℹ️  ${CYAN}${1}${NC}"; }
print_step()    { echo -e "  👉  ${BLUE}${1}${NC}"; }
print_phase()   { echo -e "\n${BOLD}${CYAN}🔄 PHASE: $1${NC}"; }

generate_bundle() {
    print_header "🚀 SmartLead MCP Bundle Generator v2.0"

    # Check prerequisites
    print_phase "CHECKING PREREQUISITES"
    command -v zip &>/dev/null || { print_error "zip not found"; exit 1; }
    print_success "Zip utility found"

    command -v node &>/dev/null || { print_error "Node.js not found"; exit 1; }
    print_success "Node.js available ($(node -v))"

    # Validate manifest.json exists
    print_phase "VALIDATING MANIFEST"
    if [ ! -f "$PROJECT_DIR/manifest.json" ]; then
        print_error "manifest.json not found at project root"
        exit 1
    fi
    print_success "manifest.json found"

    # Validate manifest has required fields
    if ! node -e "
        const m = require('./manifest.json');
        if (!m.manifest_version || !m.name || !m.version || !m.server) {
            console.error('Missing required fields');
            process.exit(1);
        }
    " 2>/dev/null; then
        print_error "manifest.json is missing required fields (manifest_version, name, version, server)"
        exit 1
    fi
    print_success "manifest.json is valid"

    # Install dependencies
    print_phase "INSTALLING DEPENDENCIES"
    if [ ! -d "$PROJECT_DIR/node_modules" ]; then
        print_step "Running npm install..."
        cd "$PROJECT_DIR"
        npm ci --silent 2>/dev/null || npm install --silent
    else
        print_success "Dependencies already installed"
    fi

    # Create bundle
    print_phase "CREATING BUNDLE"
    mkdir -p "$(dirname "$BUNDLE_OUTPUT")"
    rm -f "$BUNDLE_OUTPUT"

    cd "$PROJECT_DIR"

    zip -r "$BUNDLE_OUTPUT" \
        manifest.json \
        package.json \
        server/ \
        node_modules/ \
        -x "node_modules/.bin/*" \
        -x "*.test.js" \
        -x "*.spec.js" \
        --quiet 2>/dev/null

    if [ $? -ne 0 ]; then
        print_error "Failed to create bundle"
        exit 1
    fi
    print_success "Bundle created"

    # Bundle stats
    print_phase "BUNDLE STATISTICS"
    BUNDLE_SIZE=$(du -h "$BUNDLE_OUTPUT" | cut -f1)
    FILE_COUNT=$(unzip -l "$BUNDLE_OUTPUT" | tail -1 | awk '{print $2}')

    print_info "Size: ${BOLD}${BUNDLE_SIZE}${NC}"
    print_info "Files: ${BOLD}${FILE_COUNT}${NC}"
    print_info "Location: ${BOLD}${BUNDLE_OUTPUT}${NC}"

    # Summary
    echo -e "\n${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}${CYAN}               BUILD COMPLETE${NC}"
    echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "\n  📦  ${BOLD}smartlead-mcp-improved v2.0.0${NC}"
    echo -e "  📂  ${BOLD}${BUNDLE_OUTPUT}${NC}"
    echo -e "  🌐  ${BOLD}https://github.com/alexgenovese/mcp-smartlead-claude-cowork${NC}\n"
}

generate_bundle

echo -e "${CYAN}Press Enter to exit...${NC}"
read -r
