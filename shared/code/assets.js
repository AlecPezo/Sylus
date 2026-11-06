// Copies the logo and background picture from images/ into the output folder
// with a proper file extension, so the page can show them when opened from disk.

const fs = require('node:fs');
const path = require('node:path');

// Works out an image's type from its first bytes, so a file saved without an extension still works.
function imageExtension(data) {
  const start = data.subarray(0, 12);
  if (start[0] === 0x89 && start.toString('latin1', 1, 4) === 'PNG') return 'png';
  if (start[0] === 0xff && start[1] === 0xd8) return 'jpg';
  if (start.toString('latin1', 0, 4) === 'RIFF' && start.toString('latin1', 8, 12) === 'WEBP') return 'webp';
  if (start.toString('latin1', 0, 3) === 'GIF') return 'gif';
  if (/<svg[\s>]/i.test(data.subarray(0, 1000).toString('utf8'))) return 'svg';
  return null;
}

// The pictures in images/, by name without extension.
const PICTURES = {
  logo: /^pacifica[ _-]?logo$/i,
  background: /^(sylus[ _-]?)?background$/i,               // Sylus: sylus-background (or plain background)
  entryBackground: /^(index|entry)[ _-]?background$/i,     // Index: index-background (or entry-background)
};

// Finds a picture in `dir` whose name (without extension) matches `pattern`.
// Returns { name, data, ext }, or null if there's none or it isn't safe to show.
function findImage(dir, pattern) {
  if (!fs.existsSync(dir)) return null;
  const name = fs.readdirSync(dir).find(f => pattern.test(f.replace(/\.\w+$/, '')));
  if (!name) return null;
  const data = fs.readFileSync(path.join(dir, name));
  const ext = imageExtension(data);
  if (!ext) {
    console.warn(`Skipped ${name}: not a picture this page can show`);
    return null;
  }
  // An SVG must not carry scripts; it's shown as a picture, never run.
  if (ext === 'svg' && /<script|\son\w+=/i.test(data.toString('utf8'))) {
    console.warn(`Skipped ${name}: the SVG contains scripts`);
    return null;
  }
  return { name, data, ext };
}

// Copies a picture to `outDir` as `<outName>.<ext>` and returns that file name.
function copyImage(dir, pattern, outDir, outName) {
  const image = findImage(dir, pattern);
  if (!image) return null;
  const out = `${outName}.${image.ext}`;
  fs.writeFileSync(path.join(outDir, out), image.data);
  return out;
}

function copyAssets(imagesDir, outDir) {
  return {
    logo: copyImage(imagesDir, PICTURES.logo, outDir, 'logo'),
    background: copyImage(imagesDir, PICTURES.background, outDir, 'background'),
  };
}

module.exports = { copyAssets, findImage, PICTURES };
