#!/usr/bin/env node
/**
 * Simple icon generator using React Native CLI
 * This creates a basic icon from text/emoji that can be used as a placeholder
 */

const fs = require('fs');
const path = require('path');

// Create a simple icon using SVG
const createSVGIcon = (size, filename) => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${Math.floor(size * 0.125)}" fill="url(#bg)"/>
  
  <!-- Paper background -->
  <rect x="${Math.floor(size * 0.125)}" y="${Math.floor(size * 0.166)}" width="${Math.floor(size * 0.75)}" height="${Math.floor(size * 0.667)}" rx="${Math.floor(size * 0.0625)}" fill="#ffffff" fill-opacity="0.95"/>
  
  <!-- Header line -->
  <rect x="${Math.floor(size * 0.208)}" y="${Math.floor(size * 0.291)}" width="${Math.floor(size * 0.583)}" height="${Math.floor(size * 0.01)}" fill="#e5e7eb"/>
  
  <!-- Task 1 (completed) -->
  <rect x="${Math.floor(size * 0.208)}" y="${Math.floor(size * 0.396)}" width="${Math.floor(size * 0.0625)}" height="${Math.floor(size * 0.0625)}" rx="${Math.floor(size * 0.016)}" fill="#22c55e"/>
  <path d="M${Math.floor(size * 0.224)} ${Math.floor(size * 0.427)} L${Math.floor(size * 0.239)} ${Math.floor(size * 0.442)} L${Math.floor(size * 0.255)} ${Math.floor(size * 0.412)}" stroke="white" stroke-width="${Math.floor(size * 0.01)}" fill="none" stroke-linecap="round"/>
  <rect x="${Math.floor(size * 0.313)}" y="${Math.floor(size * 0.416)}" width="${Math.floor(size * 0.417)}" height="${Math.floor(size * 0.01)}" fill="#9ca3af"/>
  <rect x="${Math.floor(size * 0.313)}" y="${Math.floor(size * 0.427)}" width="${Math.floor(size * 0.417)}" height="${Math.floor(size * 0.005)}" fill="#9ca3af"/>
  
  <!-- Task 2 (pending) -->
  <rect x="${Math.floor(size * 0.208)}" y="${Math.floor(size * 0.5)}" width="${Math.floor(size * 0.0625)}" height="${Math.floor(size * 0.0625)}" rx="${Math.floor(size * 0.016)}" fill="none" stroke="#9ca3af" stroke-width="${Math.floor(size * 0.008)}"/>
  <rect x="${Math.floor(size * 0.313)}" y="${Math.floor(size * 0.52)}" width="${Math.floor(size * 0.5)}" height="${Math.floor(size * 0.01)}" fill="#374151"/>
  
  <!-- Task 3 (pending) -->
  <rect x="${Math.floor(size * 0.208)}" y="${Math.floor(size * 0.604)}" width="${Math.floor(size * 0.0625)}" height="${Math.floor(size * 0.0625)}" rx="${Math.floor(size * 0.016)}" fill="none" stroke="#9ca3af" stroke-width="${Math.floor(size * 0.008)}"/>
  <rect x="${Math.floor(size * 0.313)}" y="${Math.floor(size * 0.625)}" width="${Math.floor(size * 0.375)}" height="${Math.floor(size * 0.01)}" fill="#374151"/>
  
  <!-- Plus icon (add task) -->
  <circle cx="${Math.floor(size * 0.792)}" cy="${Math.floor(size * 0.792)}" r="${Math.floor(size * 0.083)}" fill="#4f46e5"/>
  <rect x="${Math.floor(size * 0.771)}" y="${Math.floor(size * 0.75)}" width="${Math.floor(size * 0.042)}" height="${Math.floor(size * 0.083)}" fill="white" rx="${Math.floor(size * 0.005)}"/>
  <rect x="${Math.floor(size * 0.75)}" y="${Math.floor(size * 0.771)}" width="${Math.floor(size * 0.083)}" height="${Math.floor(size * 0.042)}" fill="white" rx="${Math.floor(size * 0.005)}"/>
</svg>`;
  
  return svg;
};

// Icon sizes for Android
const androidSizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,  
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};

// Create directories and SVG files
Object.entries(androidSizes).forEach(([folder, size]) => {
  const folderPath = path.join('android', 'app', 'src', 'main', 'res', folder);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  
  // Create SVG content
  const svgContent = createSVGIcon(size, `ic_launcher_${size}.svg`);
  
  // Save SVG file (can be converted to PNG manually)
  const svgPath = path.join(folderPath, `ic_launcher_${size}.svg`);
  fs.writeFileSync(svgPath, svgContent);
  
  console.log(`Created ${folder}/ic_launcher_${size}.svg (${size}x${size})`);
});

console.log('\n✅ SVG icons created for all Android densities!');
console.log('\n📝 To convert to PNG:');
console.log('1. Open each SVG file in an image editor or online converter');
console.log('2. Export as PNG with the same dimensions');
console.log('3. Save as ic_launcher.png and ic_launcher_round.png in each folder');
console.log('\n🌐 Online SVG to PNG converters:');
console.log('- https://svgtopng.com/');
console.log('- https://convertio.co/svg-png/');
console.log('- https://cloudconvert.com/svg-to-png');
console.log('\nOr use ImageMagick: convert icon.svg icon.png');
