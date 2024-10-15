const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/optimized');

async function optimizeImages() {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    const files = await fs.readdir(inputDir);

    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);

        await sharp(inputPath)
          .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toFile(outputPath);

        console.log(`Optimized: ${file}`);
      }
    }

    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();
