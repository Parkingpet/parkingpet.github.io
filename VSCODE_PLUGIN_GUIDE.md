# VS Code Jules Plugin - Design & Sideload Guide

This guide provides step-by-step instructions for designing and sideloading a VS Code extension that integrates Jules (your learning and agent information system) directly into VS Code.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Plugin Architecture](#plugin-architecture)
- [Implementation Steps](#implementation-steps)
- [Sideloading the Plugin](#sideloading-the-plugin)
- [Testing & Debugging](#testing--debugging)
- [Publishing (Optional)](#publishing-optional)

---

## Overview

### What is Jules?

Jules is a learning and agent information system stored in `.Jules/` directory containing:
- **palette.md** - Dated learning entries with actions
- **agents.md** - Agent profiles and configurations
- **index.md** - Quick reference index

### Plugin Features

The VS Code plugin will provide:
- **Jules Explorer Panel** - Browse learning entries and agents
- **Quick Search** - Search across all Jules entries
- **Add Entry Command** - Create new learning entries from VS Code
- **Agent Status Monitor** - View active agents and their capabilities
- **Syntax Highlighting** - Highlight Jules markdown files
- **Keyboard Shortcuts** - Quick access to Jules commands

---

## Prerequisites

### Required Software

```bash
# Node.js and npm
node --version  # v18+
npm --version   # v10+

# VS Code
# Download from https://code.visualstudio.com

# Yeoman and VS Code Extension Generator
npm install -g yo generator-code
```

### Verify Installation

```bash
yo --version
code --version
```

---

## Project Setup

### Step 1: Generate Extension Scaffold

```bash
# Create a new directory for your plugin
mkdir vscode-jules-plugin
cd vscode-jules-plugin

# Generate extension scaffold using Yeoman
yo code

# When prompted, select:
# - TypeScript
# - Extension name: Jules
# - Extension ID: jules
# - Description: Jules learning and agent integration for VS Code
# - Initialize git: Yes
# - Install dependencies: Yes
```

### Step 2: Project Structure

After generation, your project will look like:

```
vscode-jules-plugin/
├── src/
│   ├── extension.ts          # Main extension entry point
│   ├── commands/
│   │   ├── addEntry.ts       # Add learning entry command
│   │   ├── searchEntries.ts  # Search command
│   │   └── viewAgent.ts      # View agent details
│   ├── providers/
│   │   ├── julesExplorer.ts  # Tree view provider
│   │   └── hoverProvider.ts  # Hover information
│   └── utils/
│       ├── fileParser.ts     # Parse Jules markdown files
│       └── constants.ts      # Constants and paths
├── package.json              # Extension manifest
├── tsconfig.json             # TypeScript config
├── .vscode/
│   └── launch.json           # Debug configuration
└── README.md                 # Extension documentation
```

### Step 3: Install Dependencies

```bash
cd vscode-jules-plugin
npm install

# Additional useful packages
npm install --save-dev @types/node @types/vscode
npm install --save date-fns  # For date handling
```

---

## Plugin Architecture

### Core Components

#### 1. Extension Entry Point (`src/extension.ts`)

```typescript
import * as vscode from 'vscode';
import { JulesExplorerProvider } from './providers/julesExplorer';
import { addEntryCommand } from './commands/addEntry';
import { searchEntriesCommand } from './commands/searchEntries';

export function activate(context: vscode.ExtensionContext) {
  console.log('Jules extension activated');

  // Register tree view provider
  const julesProvider = new JulesExplorerProvider();
  vscode.window.registerTreeDataProvider('julesExplorer', julesProvider);

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('jules.addEntry', () => addEntryCommand(julesProvider)),
    vscode.commands.registerCommand('jules.search', () => searchEntriesCommand()),
    vscode.commands.registerCommand('jules.refresh', () => julesProvider.refresh())
  );

  // Register hover provider
  context.subscriptions.push(
    vscode.languages.registerHoverProvider('markdown', new JulesHoverProvider())
  );
}

export function deactivate() {
  console.log('Jules extension deactivated');
}
```

#### 2. Tree View Provider (`src/providers/julesExplorer.ts`)

```typescript
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class JulesExplorerProvider implements vscode.TreeDataProvider<JulesItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<JulesItem | undefined | null | void> = 
    new vscode.EventEmitter<JulesItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<JulesItem | undefined | null | void> = 
    this._onDidChangeTreeData.event;

  private julesPath: string;

  constructor() {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    this.julesPath = workspaceFolder ? path.join(workspaceFolder.uri.fsPath, '.Jules') : '';
  }

  refresh(): void {
    this._onDidChangeTreeData.fire(null);
  }

  getTreeItem(element: JulesItem): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: JulesItem): Promise<JulesItem[]> {
    if (!element) {
      // Root level - show categories
      return [
        new JulesItem('Learning Entries', vscode.TreeItemCollapsibleState.Collapsed, 'palette'),
        new JulesItem('Agents', vscode.TreeItemCollapsibleState.Collapsed, 'agents'),
        new JulesItem('Index', vscode.TreeItemCollapsibleState.None, 'index')
      ];
    }

    if (element.type === 'palette') {
      return this.getPaletteEntries();
    } else if (element.type === 'agents') {
      return this.getAgentEntries();
    }

    return [];
  }

  private async getPaletteEntries(): Promise<JulesItem[]> {
    const palettePath = path.join(this.julesPath, 'palette.md');
    if (!fs.existsSync(palettePath)) return [];

    const content = fs.readFileSync(palettePath, 'utf-8');
    const entries: JulesItem[] = [];

    // Parse entries from palette.md
    const entryRegex = /## (\d{4}-\d{2}-\d{2}) - (.+)/g;
    let match;

    while ((match = entryRegex.exec(content)) !== null) {
      entries.push(new JulesItem(
        `${match[1]} - ${match[2]}`,
        vscode.TreeItemCollapsibleState.None,
        'entry',
        palettePath
      ));
    }

    return entries.reverse(); // Show newest first
  }

  private async getAgentEntries(): Promise<JulesItem[]> {
    const agentsPath = path.join(this.julesPath, 'agents.md');
    if (!fs.existsSync(agentsPath)) return [];

    const content = fs.readFileSync(agentsPath, 'utf-8');
    const entries: JulesItem[] = [];

    // Parse agent entries
    const agentRegex = /## (.+)/g;
    let match;

    while ((match = agentRegex.exec(content)) !== null) {
      entries.push(new JulesItem(
        match[1],
        vscode.TreeItemCollapsibleState.None,
        'agent',
        agentsPath
      ));
    }

    return entries;
  }
}

export class JulesItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly type: string,
    public readonly filePath?: string
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}`;
    this.command = filePath ? {
      command: 'vscode.open',
      title: 'Open',
      arguments: [vscode.Uri.file(filePath)]
    } : undefined;
  }

  get iconPath() {
    const iconMap: { [key: string]: string } = {
      'palette': '📚',
      'agents': '🤖',
      'entry': '📝',
      'agent': '🎯',
      'index': '📑'
    };
    return iconMap[this.type] || '📄';
  }
}
```

#### 3. Add Entry Command (`src/commands/addEntry.ts`)

```typescript
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export async function addEntryCommand(provider: any) {
  // Get learning input
  const learning = await vscode.window.showInputBox({
    prompt: 'What did you learn?',
    placeHolder: 'Enter your learning...'
  });

  if (!learning) return;

  // Get action input
  const action = await vscode.window.showInputBox({
    prompt: 'What action to take next time?',
    placeHolder: 'Enter action...'
  });

  if (!action) return;

  // Get workspace folder
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    vscode.window.showErrorMessage('No workspace folder open');
    return;
  }

  // Create entry
  const today = new Date().toISOString().split('T')[0];
  const palettePath = path.join(workspaceFolder.uri.fsPath, '.Jules', 'palette.md');

  // Ensure .Jules directory exists
  const julesDir = path.dirname(palettePath);
  if (!fs.existsSync(julesDir)) {
    fs.mkdirSync(julesDir, { recursive: true });
  }

  // Read existing content
  let content = '';
  if (fs.existsSync(palettePath)) {
    content = fs.readFileSync(palettePath, 'utf-8');
  }

  // Add new entry at the top
  const newEntry = `## ${today} - ${learning}\n**Learning:** ${learning}\n**Action:** ${action}\n\n`;
  const updatedContent = newEntry + content;

  // Write back
  fs.writeFileSync(palettePath, updatedContent, 'utf-8');

  vscode.window.showInformationMessage('Learning entry added!');
  provider.refresh();
}
```

#### 4. Search Command (`src/commands/searchEntries.ts`)

```typescript
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export async function searchEntriesCommand() {
  const query = await vscode.window.showInputBox({
    prompt: 'Search Jules entries',
    placeHolder: 'Enter search term...'
  });

  if (!query) return;

  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) return;

  const julesPath = path.join(workspaceFolder.uri.fsPath, '.Jules');
  const results: vscode.QuickPickItem[] = [];

  // Search in palette.md
  const palettePath = path.join(julesPath, 'palette.md');
  if (fs.existsSync(palettePath)) {
    const content = fs.readFileSync(palettePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      if (line.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          label: line.substring(0, 80),
          description: 'palette.md',
          detail: `Line ${index + 1}`
        });
      }
    });
  }

  // Search in agents.md
  const agentsPath = path.join(julesPath, 'agents.md');
  if (fs.existsSync(agentsPath)) {
    const content = fs.readFileSync(agentsPath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      if (line.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          label: line.substring(0, 80),
          description: 'agents.md',
          detail: `Line ${index + 1}`
        });
      }
    });
  }

  if (results.length === 0) {
    vscode.window.showInformationMessage('No results found');
    return;
  }

  const selected = await vscode.window.showQuickPick(results);
  if (selected) {
    vscode.window.showInformationMessage(`Found: ${selected.label}`);
  }
}
```

---

## Implementation Steps

### Step 1: Update `package.json`

Add the following to your `package.json`:

```json
{
  "name": "jules",
  "displayName": "Jules - Learning & Agent Manager",
  "description": "Integrate Jules learning entries and agent information into VS Code",
  "version": "0.0.1",
  "engines": {
    "vscode": "^1.80.0"
  },
  "categories": ["Other"],
  "activationEvents": [
    "onView:julesExplorer",
    "onCommand:jules.addEntry"
  ],
  "main": "./out/extension.js",
  "contributes": {
    "views": {
      "explorer": [
        {
          "id": "julesExplorer",
          "name": "Jules",
          "icon": "media/jules-icon.svg",
          "contextualTitle": "Jules Learning & Agents"
        }
      ]
    },
    "commands": [
      {
        "command": "jules.addEntry",
        "title": "Jules: Add Learning Entry",
        "icon": "$(add)"
      },
      {
        "command": "jules.search",
        "title": "Jules: Search Entries",
        "icon": "$(search)"
      },
      {
        "command": "jules.refresh",
        "title": "Jules: Refresh",
        "icon": "$(refresh)"
      }
    ],
    "keybindings": [
      {
        "command": "jules.addEntry",
        "key": "ctrl+shift+j",
        "mac": "cmd+shift+j"
      },
      {
        "command": "jules.search",
        "key": "ctrl+shift+f",
        "mac": "cmd+shift+f",
        "when": "view == julesExplorer"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "pretest": "npm run compile && npm run lint",
    "lint": "eslint src --ext ts",
    "test": "node ./out/test/runTest.js"
  },
  "devDependencies": {
    "@types/vscode": "^1.80.0",
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "typescript": "^5.0.0"
  }
}
```

### Step 2: Compile TypeScript

```bash
npm run compile
```

This generates JavaScript files in the `out/` directory.

### Step 3: Create Icon (Optional)

Create `media/jules-icon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="#38bdf8" opacity="0.2"/>
  <text x="50" y="60" font-size="60" text-anchor="middle" fill="#38bdf8">J</text>
</svg>
```

---

## Sideloading the Plugin

### Method 1: Development Mode (Recommended)

```bash
# From the plugin directory
npm run watch

# In another terminal, open VS Code with the extension
code --extensionDevelopmentPath=. /path/to/your/workspace
```

This opens a new VS Code window with your extension loaded in development mode.

### Method 2: Manual Sideload

#### Step 1: Build the Extension

```bash
npm run compile
```

#### Step 2: Package the Extension

```bash
# Install vsce (VS Code Extension CLI)
npm install -g vsce

# Package the extension
vsce package
```

This creates a `.vsix` file.

#### Step 3: Install the VSIX

```bash
# Option A: Via command line
code --install-extension ./jules-0.0.1.vsix

# Option B: Via VS Code UI
# 1. Open VS Code
# 2. Go to Extensions (Ctrl+Shift+X)
# 3. Click "..." menu → "Install from VSIX..."
# 4. Select the .vsix file
```

#### Step 4: Verify Installation

```bash
# List installed extensions
code --list-extensions | grep jules
```

---

## Testing & Debugging

### Debug Mode

1. Open the extension folder in VS Code
2. Press `F5` to start debugging
3. A new VS Code window opens with the extension loaded
4. Set breakpoints in `src/extension.ts`
5. Use the Debug Console to inspect variables

### Test Commands

In the debug window:

```
Ctrl+Shift+P (or Cmd+Shift+P on Mac)
Type: Jules: Add Learning Entry
Press Enter
```

### Troubleshooting

#### Extension Not Showing

```bash
# Check if extension is loaded
code --list-extensions

# Rebuild
npm run compile

# Restart VS Code
```

#### Tree View Not Appearing

1. Check `.Jules` directory exists in workspace
2. Verify `palette.md` and `agents.md` files exist
3. Check Output panel (View → Output → Jules)

#### Commands Not Working

1. Verify `package.json` contributions are correct
2. Check TypeScript compilation errors: `npm run compile`
3. Review Debug Console for error messages

---

## Publishing (Optional)

### Step 1: Create Publisher Account

```bash
# Create account at https://marketplace.visualstudio.com
# Get Personal Access Token (PAT)

# Login to vsce
vsce login <publisher-name>
```

### Step 2: Update Version

In `package.json`:

```json
{
  "version": "0.1.0",
  "publisher": "your-publisher-name"
}
```

### Step 3: Publish

```bash
vsce publish
```

The extension will be available in the VS Code Marketplace.

---

## Advanced Features (Optional)

### Add Settings

In `package.json`:

```json
{
  "contributes": {
    "configuration": {
      "title": "Jules",
      "properties": {
        "jules.autoRefresh": {
          "type": "boolean",
          "default": true,
          "description": "Auto-refresh Jules explorer on file changes"
        },
        "jules.dateFormat": {
          "type": "string",
          "default": "YYYY-MM-DD",
          "description": "Date format for entries"
        }
      }
    }
  }
}
```

### Add Syntax Highlighting

Create `syntaxes/jules.tmLanguage.json`:

```json
{
  "scopeName": "text.jules",
  "patterns": [
    {
      "match": "^## \\d{4}-\\d{2}-\\d{2}",
      "name": "meta.date.jules"
    },
    {
      "match": "^\\*\\*Learning:\\*\\*",
      "name": "keyword.learning.jules"
    },
    {
      "match": "^\\*\\*Action:\\*\\*",
      "name": "keyword.action.jules"
    }
  ]
}
```

### Add Webview Panel

Create a custom UI panel for viewing entries:

```typescript
export function openJulesPanel(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'julesPanel',
    'Jules Dashboard',
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  panel.webview.html = getWebviewContent();
}

function getWebviewContent() {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: var(--vscode-font-family); }
        .entry { padding: 10px; border: 1px solid #ccc; margin: 5px 0; }
      </style>
    </head>
    <body>
      <h1>Jules Dashboard</h1>
      <div id="entries"></div>
    </body>
    </html>
  `;
}
```

---

## Quick Reference

### File Structure

```
vscode-jules-plugin/
├── src/
│   ├── extension.ts
│   ├── commands/
│   ├── providers/
│   └── utils/
├── package.json
├── tsconfig.json
└── README.md
```

### Key Commands

```bash
npm run compile          # Compile TypeScript
npm run watch           # Watch for changes
npm run lint            # Lint code
vsce package            # Package extension
vsce publish            # Publish to marketplace
code --install-extension ./jules.vsix  # Install VSIX
```

### Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Add Entry | Ctrl+Shift+J | Cmd+Shift+J |
| Search | Ctrl+Shift+F | Cmd+Shift+F |
| Command Palette | Ctrl+Shift+P | Cmd+Shift+P |

---

## Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Extension Manifest Reference](https://code.visualstudio.com/api/references/extension-manifest)
- [Tree View API](https://code.visualstudio.com/api/extension-guides/tree-view)
- [Webview API](https://code.visualstudio.com/api/extension-guides/webview)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

---

## Next Steps

1. Generate the extension scaffold with `yo code`
2. Copy the provided code snippets into your project
3. Update `package.json` with the configuration
4. Run `npm run compile`
5. Press `F5` to test in development mode
6. Iterate and add more features as needed
7. Package with `vsce package` when ready
8. Sideload the `.vsix` file into VS Code

Happy coding with Jules!
