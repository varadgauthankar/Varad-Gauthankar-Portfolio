import fs from 'fs';

async function download() {
  const url = 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=85&w=1200';
  const target = './public/photos/prysm_cover.jpg';
  console.log(`Downloading beautiful prysm cover from: ${url}`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(target, buffer);
    console.log(`Successfully saved prysm_cover.jpg (${buffer.length} bytes) to ${target}`);
  } catch (err) {
    console.error('Error downloading image:', err);
  }
}

download();
