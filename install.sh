#!/bin/bash
# install.sh - One-click hidmaster installation

set -e

HIDMASTER_DIR="$HOME/.hidmaster"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Installing hidmaster..."

# Create directory structure
mkdir -p "$HIDMASTER_DIR/bin"
mkdir -p "$HIDMASTER_DIR/skills"
mkdir -p "$HIDMASTER_DIR/instructions"

# Copy files
if [ -d "$SCRIPT_DIR/skills" ]; then
    cp -r "$SCRIPT_DIR/skills/"* "$HIDMASTER_DIR/skills/" 2>/dev/null || true
fi

if [ -d "$SCRIPT_DIR/instructions" ]; then
    cp -r "$SCRIPT_DIR/instructions/"* "$HIDMASTER_DIR/instructions/" 2>/dev/null || true
fi

# Copy CLI entry point
cat > "$HIDMASTER_DIR/bin/hidmaster.ts" << 'ENTRY'
#!/usr/bin/env bun
import { main } from './cli'
main()
ENTRY

# Copy CLI module
if [ -f "$SCRIPT_DIR/src/cli.ts" ]; then
    cp "$SCRIPT_DIR/src/cli.ts" "$HIDMASTER_DIR/bin/cli.ts"
fi

# Copy core modules
mkdir -p "$HIDMASTER_DIR/bin/core"
if [ -d "$SCRIPT_DIR/src/core" ]; then
    cp -r "$SCRIPT_DIR/src/core/"* "$HIDMASTER_DIR/bin/core/"
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

echo ""
echo "Installation complete!"
echo ""
echo "Usage:"
echo "  cd your-project"
echo "  hidmaster"
echo ""
echo "This will automatically:"
echo "  1. Detect your AI agent"
echo "  2. Install 22 production skills"
echo "  3. Configure auto-orchestration"
