import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const sourceDir = './public/photos';
const targetDir = './public/photos/thumbnails';

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

try {
  const files = fs.readdirSync(sourceDir);
  console.log(`Found ${files.length} items in ${sourceDir}`);

  files.forEach(file => {
    const filePath = path.join(sourceDir, file);
    const stat = fs.statSync(filePath);

    // Skip directories and check if it's an image file
    if (stat.isFile() && /\.(jpe?g|png)$/i.test(file)) {
      const targetPath = path.join(targetDir, file);

      // Check if optimized version already exists and is newer than source
      let shouldConvert = true;
      if (fs.existsSync(targetPath)) {
        const sourceMtime = stat.mtimeMs;
        const targetMtime = fs.statSync(targetPath).mtimeMs;
        if (targetMtime > sourceMtime) {
          shouldConvert = false;
        }
      }

      if (shouldConvert) {
        console.log(`Optimizing: ${file}...`);
        try {
          // Use ImageMagick 'convert' tool to resize to max width 800px and compress to quality 80%
          execSync(`convert "${filePath}" -resize "800x>" -quality 80 "${targetPath}"`);
          const origSize = (stat.size / 1024 / 1024).toFixed(2);
          const newSize = (fs.statSync(targetPath).size / 1024).toFixed(1);
          console.log(`  Success: ${origSize}MB -> ${newSize}KB`);
        } catch (err) {
          console.error(`  Failed to optimize ${file}:`, err.message);
          // If convert fails, fallback to copying the file so it doesn't break references
          fs.copyFileSync(filePath, targetPath);
        }
      } else {
        console.log(`Skipping (already optimized): ${file}`);
      }
    }
  });

  console.log('Image optimization process completed successfully!');
} catch (err) {
  console.error('Error during image optimization:', err);
}
