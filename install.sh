#!/bin/bash
# install.sh - One-click hidmaster installation
# Works both locally and via: curl -fsSL https://raw.githubusercontent.com/SincereMa/hidmaster/master/install.sh | bash

set -e

HIDMASTER_DIR="$HOME/.hidmaster"
REPO_URL="https://github.com/SincereMa/hidmaster.git"

# Determine if running from cloned repo or via curl pipe
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if we're running from a cloned repo (skills directory exists)
if [ -d "$SCRIPT_DIR/skills" ]; then
    echo "Installing from local directory..."
    SOURCE_DIR="$SCRIPT_DIR"
else
    echo "Downloading hidmaster..."
    TEMP_DIR=$(mktemp -d)
    git clone --depth 1 "$REPO_URL" "$TEMP_DIR" 2>/dev/null || {
        echo "Error: git clone failed. Please install git first."
        exit 1
    }
    SOURCE_DIR="$TEMP_DIR/hidmaster"
fi

echo "Installing hidmaster to $HIDMASTER_DIR..."

# Create directory structure
mkdir -p "$HIDMASTER_DIR/bin"
mkdir -p "$HIDMASTER_DIR/bin/core"
mkdir -p "$HIDMASTER_DIR/skills"
mkdir -p "$HIDMASTER_DIR/instructions"

# Copy skills
if [ -d "$SOURCE_DIR/skills" ]; then
    cp -r "$SOURCE_DIR/skills/"* "$HIDMASTER_DIR/skills/"
    echo "Copied skills"
fi

# Copy instructions
if [ -d "$SOURCE_DIR/instructions" ]; then
    cp -r "$SOURCE_DIR/instructions/"* "$HIDMASTER_DIR/instructions/"
    echo "Copied instructions"
fi

# Copy CLI entry point
cat > "$HIDMASTER_DIR/bin/hidmaster.ts" << 'ENTRY'
#!/usr/bin/env bun
import { main } from './cli'
main()
ENTRY

# Copy CLI module
if [ -f "$SOURCE_DIR/src/cli.ts" ]; then
    cp "$SOURCE_DIR/src/cli.ts" "$HIDMASTER_DIR/bin/cli.ts"
    echo "Copied CLI"
fi

# Copy core modules
if [ -d "$SOURCE_DIR/src/core" ]; then
    cp -r "$SOURCE_DIR/src/core/"* "$HIDMASTER_DIR/bin/core/"
    echo "Copied core modules"
fi

# Create wrapper script
cat > "$HIDMASTER_DIR/bin/hidmaster" << 'WRAPPER'
#!/bin/bash
exec bun run "$HOME/.hidmaster/bin/hidmaster.ts" "$@"
WRAPPER
chmod +x "$HIDMASTER_DIR/bin/hidmaster"

# Add to PATH (different methods for different shells)
add_to_path() {
    local rc_file="$1"
    if [ -f "$rc_file" ]; then
        if ! grep -q '.hidmaster/bin' "$rc_file" 2>/dev/null; then
            echo '' >> "$rc_file"
            echo '# hidmaster' >> "$rc_file"
            echo 'export PATH="$HOME/.hidmaster/bin:$PATH"' >> "$rc_file"
            echo "Added to $rc_file"
        else
            echo "Already in $rc_file"
        fi
    fi
}

if [[ "$SHELL" == */zsh ]]; then
    add_to_path "$HOME/.zshrc"
elif [[ "$SHELL" == */bash ]]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        add_to_path "$HOME/.bash_profile"
    else
        add_to_path "$HOME/.bashrc"
    fi
fi

# Cleanup temp directory if we cloned
if [ -n "$TEMP_DIR" ] && [ -d "$TEMP_DIR" ]; then
    rm -rf "$TEMP_DIR"
fi

echo ""
echo "Installation complete!"
echo ""
echo "Usage:"
echo "  cd your-project"
echo "  hidmaster"
echo ""
echo "This will automatically:"
echo "  1. Detect your AI agent"
echo "  2. Install 21 production skills"
echo "  3. Configure auto-orchestration"
