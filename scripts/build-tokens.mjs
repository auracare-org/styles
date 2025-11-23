#!/usr/bin/env node
/**
 * Build CSS design tokens from import.json (Figma Tokens export)
 * - Generates colors.css, spacing.css, typography.css, and updates index.css imports
 * - Keeps naming aligned with existing tokens in src/lib/styles/tokens
 */

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const tokensDir = path.join(repoRoot, 'src', 'lib', 'styles', 'tokens');
const importJsonPath = path.join(repoRoot, 'import.json');

/** Utilities **/
const ensureDir = (p) => fs.mkdirSync(p, { recursive: true });
const writeFile = (p, contents) => fs.writeFileSync(p, contents.trimStart() + '\n', 'utf8');

function readImportJson() {
  if (!fs.existsSync(importJsonPath)) {
    throw new Error(`import.json not found at ${importJsonPath}`);
  }
  const raw = fs.readFileSync(importJsonPath, 'utf8');
  return JSON.parse(raw);
}

/**
 * Convert object path to CSS variable name using our conventions.
 * Example: ['bg','button','primary','default'] => --color-bg-button-primary-default
 */
function toColorVarName(parts) {
  return `--color-${parts.join('-')}`;
}

/** Map font weight name to numeric value */
function mapFontWeight(name) {
  const n = String(name).toLowerCase();
  if (n === 'thin') return 100;
  if (n === 'extralight' || n === 'extra light' || n === 'ultralight') return 200;
  if (n === 'light') return 300;
  if (n === 'regular' || n === 'normal') return 400;
  if (n === 'medium') return 500;
  if (n === 'semibold' || n === 'semi bold' || n === 'demibold') return 600;
  if (n === 'bold') return 700;
  if (n === 'extrabold' || n === 'extra bold' || n === 'ultrabold') return 800;
  if (n === 'black' || n === 'heavy') return 900;
  // Fallback: try parse int or default 400
  const parsed = parseInt(name, 10);
  return Number.isFinite(parsed) ? parsed : 400;
}

/** Simple pretty formatter for CSS var lines */
const line = (name, value) => `\t${name}: ${value};`;

/** Resolve token reference like {fontSize.6} to CSS var name */
function tokenKeyToVarName(ref) {
  // strip braces
  const key = ref.replace(/[{}]/g, '');
  // map segments
  const segs = key.split('.');
  const map = {
    fontFamilies: 'font-family',
    fontWeights: 'font-weight',
    fontSize: 'font-size',
    lineHeights: 'line-height',
    letterSpacing: 'letter-spacing',
    paragraphSpacing: 'paragraph-spacing',
    paragraphIndent: 'paragraph-indent',
    textCase: 'text-case',
    textDecoration: 'text-decoration'
  };
  const first = segs.shift();
  const prefix = map[first] ?? first;
  return `--${prefix}-${segs.join('-')}`;
}

function valueToCss(value, unit = 'px') {
  if (typeof value === 'string') return value; // already contains unit or keyword
  if (typeof value === 'number') return `${value}${unit}`;
  return String(value);
}

function buildColors(tokens) {
  const lines = [
    '/**',
    ' * Color Design Tokens',
    ' * Generated from import.json — do not edit manually',
    ' */',
    '',
    ':root {'
  ];

  // bg, text, border, icons
  const sections = ['bg', 'text', 'border', 'icons'];
  for (const section of sections) {
    const sec = tokens[section];
    if (!sec) continue;

    function walk(obj, parts) {
      for (const [k, v] of Object.entries(obj)) {
        if (v && typeof v === 'object' && '$type' in v && '$value' in v) {
          const name = toColorVarName([section, ...parts, k]);
          lines.push(line(name, String(v.$value)));
        } else if (v && typeof v === 'object') {
          walk(v, [...parts, k]);
        }
      }
    }
    walk(sec, []);
    lines.push('');
  }

  lines.push('}');
  lines.push('');
  return lines.join('\n');
}

function buildSpacing(tokens) {
  const lines = [
    '/**',
    ' * Spacing Design Tokens',
    ' * Generated from import.json — do not edit manually',
    ' */',
    '',
    ':root {'
  ];

  const sp = tokens.spacing;
  if (sp && typeof sp === 'object') {
    for (const [key, v] of Object.entries(sp)) {
      if (v && typeof v === 'object' && '$value' in v) {
        lines.push(line(`--spacing-${key}`, valueToCss(v.$value)));
      }
    }
  }
  lines.push('');

  // Border radius tokens
  const br = tokens['border radius'];
  if (br && typeof br === 'object') {
    for (const [key, v] of Object.entries(br)) {
      if (v && typeof v === 'object' && '$value' in v) {
        lines.push(line(`--border-radius-${key}`, valueToCss(v.$value)));
      }
    }
  }

  lines.push('}');
  lines.push('');
  return lines.join('\n');
}

function buildTypography(tokens) {
  const lines = [
    '/**',
    ' * Typography Design Tokens',
    ' * Generated from import.json — do not edit manually',
    ' */',
    '',
    ':root {'
  ];

  // Base families
  if (tokens.fontFamilies) {
    for (const [name, v] of Object.entries(tokens.fontFamilies)) {
      const val = (v && typeof v === 'object') ? v.$value : v;
      lines.push(line(`--font-family-${name}`, String(val)));
    }
    lines.push('');
  }

  // Base weights (map to numeric)
  if (tokens.fontWeights) {
    for (const [name, v] of Object.entries(tokens.fontWeights)) {
      const val = (v && typeof v === 'object') ? v.$value : v;
      const numeric = mapFontWeight(val);
      lines.push(line(`--font-weight-${name}`, String(numeric)));
    }
    lines.push('');
  }

  // Sizes
  if (tokens.fontSize) {
    for (const [name, v] of Object.entries(tokens.fontSize)) {
      const val = (v && typeof v === 'object') ? v.$value : v;
      lines.push(line(`--font-size-${name}`, valueToCss(val)));
    }
    lines.push('');
  }

  // Line heights
  if (tokens.lineHeights) {
    for (const [name, v] of Object.entries(tokens.lineHeights)) {
      const val = (v && typeof v === 'object') ? v.$value : v;
      lines.push(line(`--line-height-${name}`, valueToCss(val)));
    }
    lines.push('');
  }

  // Letter spacing
  if (tokens.letterSpacing) {
    for (const [name, v] of Object.entries(tokens.letterSpacing)) {
      const val = (v && typeof v === 'object') ? v.$value : v;
      lines.push(line(`--letter-spacing-${name}`, String(val)));
    }
    lines.push('');
  }

  // Paragraph spacing / indent
  if (tokens.paragraphSpacing) {
    for (const [name, v] of Object.entries(tokens.paragraphSpacing)) {
      const val = (v && typeof v === 'object') ? v.$value : v;
      lines.push(line(`--paragraph-spacing-${name}`, valueToCss(val)));
    }
    lines.push('');
  }
  if (tokens.paragraphIndent) {
    for (const [name, v] of Object.entries(tokens.paragraphIndent)) {
      const val = (v && typeof v === 'object') ? v.$value : v;
      lines.push(line(`--paragraph-indent-${name}`, valueToCss(val)));
    }
    lines.push('');
  }

  // Text case / decoration enums
  if (tokens.textCase) {
    for (const [name, v] of Object.entries(tokens.textCase)) {
      const val = (v && typeof v === 'object') ? v.$value : v;
      lines.push(line(`--text-case-${name}`, String(val)));
    }
    lines.push('');
  }
  if (tokens.textDecoration) {
    for (const [name, v] of Object.entries(tokens.textDecoration)) {
      const val = (v && typeof v === 'object') ? v.$value : v;
      lines.push(line(`--text-decoration-${name}`, String(val)));
    }
    lines.push('');
  }

  // Composite typography styles (Heading 1, etc.) -> reference base vars with var()
  const compositeEntries = Object.entries(tokens).filter(([k, v]) => {
    return v && typeof v === 'object' && v.$type === 'typography' && v.$value;
  });
  for (const [name, v] of compositeEntries) {
    const composite = v.$value;
    const normName = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '');

    for (const [prop, ref] of Object.entries(composite)) {
      const varName = tokenKeyToVarName(String(ref));
      lines.push(line(`--typography-${normName}-${prop.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}`, `var(${varName})`));
    }
    lines.push('');
  }

  lines.push('}');
  lines.push('');
  return lines.join('\n');
}

function updateIndexCss() {
  const p = path.join(tokensDir, 'index.css');
  const contents = `/**
 * Design Tokens Index
 * Aggregates all design token files (generated by build-tokens.mjs)
 */

@import './colors.css';
@import './spacing.css';
@import './typography.css';
`;
  writeFile(p, contents);
}

function main() {
  ensureDir(tokensDir);
  const json = readImportJson();
  const tokenRoot = json['Tokens/Mode 1'] || json;

  const colors = buildColors(tokenRoot);
  const spacing = buildSpacing(tokenRoot);
  const typography = buildTypography(tokenRoot);

  writeFile(path.join(tokensDir, 'colors.css'), colors);
  writeFile(path.join(tokensDir, 'spacing.css'), spacing);
  writeFile(path.join(tokensDir, 'typography.css'), typography);
  updateIndexCss();

  console.log('✅ Tokens built to src/lib/styles/tokens');
}

main();

