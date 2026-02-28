#!/usr/bin/env node

/**
 * create-geenius-app — Scaffold a new Geenius AI app from the template.
 *
 * Usage:
 *   npx create-geenius-app
 *   node bin/create-geenius-app.mjs
 */

import { createInterface } from 'node:readline/promises';
import { stdin, stdout, argv } from 'node:process';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = resolve(__dirname, '..', 'template');

// ── Helpers ──────────────────────────────────────────────────────

function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

async function copyDir(src, dest, replacements) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = join(src, entry.name);
        const destPath = join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath, replacements);
        } else {
            let finalDestPath = destPath;

            // npm strips .gitignore, so we store it as 'gitignore' and rename it here
            if (entry.name === 'gitignore') {
                finalDestPath = join(dest, '.gitignore');
            }

            let content = await fs.readFile(srcPath, 'utf-8');

            // Replace placeholders
            for (const [key, value] of Object.entries(replacements)) {
                content = content.replaceAll(key, value);
            }

            await fs.writeFile(finalDestPath, content);
        }
    }
}

// ── Main ─────────────────────────────────────────────────────────

async function main() {
    const rl = createInterface({ input: stdin, output: stdout });

    console.log('');
    console.log('  ✨  create-geenius-app');
    console.log('  ─────────────────────────────────────────');
    console.log('  Scaffold a new AI app from the Geenius boilerplate.');
    console.log('');

    // 1. App name
    const rawName = argv[2] || await rl.question('  App name (e.g. "my-ai-app"): ');
    const appSlug = slugify(rawName);
    if (!appSlug) {
        console.error('  ❌ Invalid app name.');
        process.exit(1);
    }

    // 2. Display name
    const defaultDisplayName = appSlug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    const appDisplayName = await rl.question(`  Display name [${defaultDisplayName}]: `) || defaultDisplayName;

    // 3. Description
    const appDescription = await rl.question('  Short description: ') || `An AI-powered ${appDisplayName} application.`;

    // 4. Accent color
    console.log('');
    console.log('  Accent color presets:');
    console.log('    1. Cyber Cyan   (#06b6d4)');
    console.log('    2. Neon Purple  (#8b5cf6)');
    console.log('    3. Emerald      (#10b981)');
    console.log('    4. Rose         (#f43f5e)');
    console.log('    5. Amber        (#f59e0b)');
    console.log('    6. Custom hex');
    console.log('');
    const colorChoice = await rl.question('  Pick accent color [1]: ') || '1';

    const COLOR_MAP = {
        '1': '#06b6d4',
        '2': '#8b5cf6',
        '3': '#10b981',
        '4': '#f43f5e',
        '5': '#f59e0b',
    };

    let accentColor = COLOR_MAP[colorChoice];
    if (!accentColor) {
        accentColor = colorChoice.startsWith('#') ? colorChoice : `#${colorChoice}`;
    }

    rl.close();

    // 5. Target directory
    const targetDir = resolve(process.cwd(), appSlug);

    console.log('');
    console.log(`  📁 Creating ${appSlug} at ${targetDir}`);
    console.log('');

    // 6. Copy template with replacements
    const replacements = {
        '{{APP_NAME}}': appDisplayName,
        '{{APP_SLUG}}': appSlug,
        '{{APP_DESCRIPTION}}': appDescription,
        '{{ACCENT_COLOR}}': accentColor,
        '{{YEAR}}': new Date().getFullYear().toString(),
    };

    await copyDir(TEMPLATE_DIR, targetDir, replacements);
    console.log('  ✅ Template files copied.');

    // 7. Install dependencies
    console.log('  📦 Installing dependencies...');
    try {
        execSync('pnpm install', { cwd: join(targetDir, 'web'), stdio: 'inherit' });
    } catch {
        console.log('  ⚠️  pnpm not found, trying npm...');
        try {
            execSync('npm install', { cwd: join(targetDir, 'web'), stdio: 'inherit' });
        } catch {
            console.log('  ⚠️  Could not auto-install. Run `cd web && npm install` manually.');
        }
    }

    // 8. Print next steps
    console.log('');
    console.log('  ─────────────────────────────────────────');
    console.log(`  🎉 ${appDisplayName} is ready!`);
    console.log('  ─────────────────────────────────────────');
    console.log('');
    console.log('  Next steps:');
    console.log(`    cd ${appSlug}/web`);
    console.log('    npx convex dev          # Start Convex backend');
    console.log('    npm run dev             # Start Vite dev server');
    console.log('');
    console.log('  Setup auth keys:');
    console.log('    node generateKeys.mjs');
    console.log('');
    console.log('  Setup Stripe products:');
    console.log('    bash scripts/setup-stripe-products.sh');
    console.log('');
}

main().catch(err => {
    console.error('  ❌ Error:', err.message);
    process.exit(1);
});
