/**
 * Color Contrast Checker for WCAG Compliance
 * Run this script to validate color combinations
 */

import { getContrastRatio, meetsWCAGAA, meetsWCAGAAA } from './accessibility';

// Define color palette in RGB
const colors = {
  // Primary colors
  'primary-yellow': [255, 214, 0] as [number, number, number],
  'black': [0, 0, 0] as [number, number, number],
  'white': [255, 255, 255] as [number, number, number],
  
  // Grays
  'gray-700': [55, 65, 81] as [number, number, number],
  'gray-600': [75, 85, 99] as [number, number, number],
  'gray-500': [107, 114, 128] as [number, number, number],
  'gray-400': [156, 163, 175] as [number, number, number],
  
  // Backgrounds
  'bg-primary-50': [255, 252, 240] as [number, number, number],
  'bg-primary-100': [255, 249, 224] as [number, number, number],
};

// Test combinations that are used in the app
const combinations = [
  { name: 'Primary Yellow on Black', fg: colors['primary-yellow'], bg: colors.black },
  { name: 'Black on Primary Yellow', fg: colors.black, bg: colors['primary-yellow'] },
  { name: 'Gray-700 on White', fg: colors['gray-700'], bg: colors.white },
  { name: 'Gray-600 on White', fg: colors['gray-600'], bg: colors.white },
  { name: 'Gray-500 on White (muted)', fg: colors['gray-500'], bg: colors.white },
  { name: 'Black text on Primary-50', fg: colors.black, bg: colors['bg-primary-50'] },
  { name: 'Gray-700 on Primary-100', fg: colors['gray-700'], bg: colors['bg-primary-100'] },
];

export function validateColorContrasts() {
  console.group('🎨 Color Contrast Validation (WCAG 2.1)');
  
  let allPass = true;
  
  combinations.forEach(({ name, fg, bg }) => {
    const ratio = getContrastRatio(fg, bg);
    const passAA = meetsWCAGAA(ratio, false);
    const passAAA = meetsWCAGAAA(ratio, false);
    const passAALarge = meetsWCAGAA(ratio, true);
    const passAAALarge = meetsWCAGAAA(ratio, true);
    
    const status = passAA ? '✅' : '❌';
    const level = passAAA ? 'AAA' : passAA ? 'AA' : 'FAIL';
    
    console.log(`${status} ${name}: ${ratio.toFixed(2)}:1 (${level})`);
    
    if (passAA) {
      console.log(`   Normal text: ${passAA ? '✓ AA' : '✗ AA'} ${passAAA ? '✓ AAA' : ''}`);
      console.log(`   Large text: ${passAALarge ? '✓ AA' : '✗ AA'} ${passAAALarge ? '✓ AAA' : ''}`);
    } else {
      console.warn(`   ⚠️  Does not meet WCAG AA standards (needs 4.5:1, got ${ratio.toFixed(2)}:1)`);
      allPass = false;
    }
    console.log('');
  });
  
  console.groupEnd();
  
  return allPass;
}

// Export for use in tests
export const colorContrastResults = {
  combinations,
  validate: validateColorContrasts
};
