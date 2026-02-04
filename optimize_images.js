import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');

async function processImages() {
    const files = fs.readdirSync(publicDir);
    let totalSaved = 0;

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const filePath = path.join(publicDir, file);
            const originalSize = fs.statSync(filePath).size;

            const buffer = await sharp(filePath)
                .jpeg({ quality: 80, mozjpeg: true }) // Good compression for photos
                .toBuffer();

            fs.writeFileSync(filePath, buffer);

            const newSize = buffer.length;
            const saved = originalSize - newSize;
            totalSaved += saved;

            console.log(`Optimized ${file}: ${(saved / 1024).toFixed(2)} KB saved`);
        }
    }

    console.log(`Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

processImages().catch(console.error);
