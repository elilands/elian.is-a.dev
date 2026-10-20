import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const brainDir = 'C:\\Users\\elian\\.gemini\\antigravity\\brain\\5dae7132-39d2-4bdf-b82d-c17b52e8d738';
const publicImagesDir = 'C:\\elian.is-a.dev\\public\\images';

async function processImages() {
  const files = fs.readdirSync(brainDir);
  const skyFile = files.find(f => f.startsWith('angelcore_cinematic_sky') && f.endsWith('.jpg'));
  const cloudFile = files.find(f => f.startsWith('angelcore_photoreal_clouds') && f.endsWith('.jpg'));

  if (!skyFile || !cloudFile) {
    console.error('Could not find generated images in brain dir', { skyFile, cloudFile });
    return;
  }

  const skySrc = path.join(brainDir, skyFile);
  const cloudSrc = path.join(brainDir, cloudFile);

  const skyDestWebp = path.join(publicImagesDir, 'celestial-sky.webp');
  const cloudDestPng = path.join(publicImagesDir, 'celestial-clouds-cutout.png');

  // Convert sky to high quality webp
  console.log('Processing photorealistic sky background...');
  await sharp(skySrc)
    .resize(2560, 1440, { fit: 'cover' })
    .webp({ quality: 92 })
    .toFile(skyDestWebp);
  console.log('Saved celestial-sky.webp');

  // Convert cloud image: extract alpha from luminance with feathering for fine vapor
  console.log('Processing photorealistic cloud cutout with soft alpha feathering...');
  const { data, info } = await sharp(cloudSrc)
    .resize(2560, 1440, { fit: 'cover' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const maxVal = Math.max(r, g, b);
    
    // Smooth threshold for pure black background extraction
    if (maxVal <= 10) {
      data[i + 3] = 0; // Pure transparent
    } else if (maxVal < 45) {
      // Smooth feathering of wispy clouds
      const factor = (maxVal - 10) / (45 - 10);
      data[i + 3] = Math.round(255 * factor);
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    }
  })
    .png({ compressionLevel: 8 })
    .toFile(cloudDestPng);

  console.log('Saved celestial-clouds-cutout.png');
}

processImages().catch(err => {
  console.error(err);
  process.exit(1);
});
