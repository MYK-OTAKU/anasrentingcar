const fs = require('fs');
const path = require('path');

// Créer le logo principal (PNG)
const logoSvg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#fbbf24;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#gradient)"/>
  <circle cx="256" cy="256" r="200" fill="#0a0a0a"/>
  <text x="256" y="310" font-family="Arial, sans-serif" font-weight="bold" font-size="180" fill="url(#gradient)" text-anchor="middle">YR</text>
  <rect x="140" y="340" width="232" height="8" rx="4" fill="url(#gradient)"/>
  <text x="256" y="385" font-family="Arial, sans-serif" font-weight="600" font-size="36" fill="#fbbf24" text-anchor="middle">LOCATION</text>
</svg>`;

// Créer l'icône claire (32x32)
const iconLightSvg = `<svg width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#fbbf24;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#gradient)"/>
  <circle cx="256" cy="256" r="180" fill="#f5f5f5"/>
  <text x="256" y="320" font-family="Arial, sans-serif" font-weight="bold" font-size="160" fill="url(#gradient)" text-anchor="middle">YR</text>
</svg>`;

// Créer l'icône sombre (32x32)
const iconDarkSvg = `<svg width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#fbbf24;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#gradient)"/>
  <circle cx="256" cy="256" r="180" fill="#0a0a0a"/>
  <text x="256" y="320" font-family="Arial, sans-serif" font-weight="bold" font-size="160" fill="url(#gradient)" text-anchor="middle">YR</text>
</svg>`;

// Créer l'icône Apple (180x180)
const appleIconSvg = `<svg width="180" height="180" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#fbbf24;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#gradient)"/>
  <circle cx="256" cy="256" r="180" fill="#0a0a0a"/>
  <text x="256" y="320" font-family="Arial, sans-serif" font-weight="bold" font-size="160" fill="url(#gradient)" text-anchor="middle">YR</text>
</svg>`;

console.log('Note: Les fichiers SVG ont été créés. Pour générer les PNG, utilisez un outil comme imagemagick ou sharp.');
console.log('Commande pour créer les PNG avec ImageMagick:');
console.log('  convert -background none public/logo.svg -resize 512x512 public/logo.png');
console.log('  convert -background none public/icon.svg -resize 32x32 public/icon-light-32x32.png');
console.log('  convert -background none public/icon.svg -resize 32x32 public/icon-dark-32x32.png');
console.log('  convert -background none public/icon.svg -resize 180x180 public/apple-icon.png');
