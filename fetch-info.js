import fetch from 'node-fetch';

async function main() {
  const videoId = 'LTs35_dt9Ec';
  const apis = [
    'https://inv.thepixora.com',
    'https://invidious.f5.si',
    'https://inv.nadeko.net',
    'https://invidious.tiekoetter.com',
    'https://yt.artemislena.eu'
  ];

  for (const api of apis) {
    try {
      console.log(`Checking details for ${videoId} using ${api}...`);
      const res = await fetch(`${api}/api/v1/videos/${videoId}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 6000
      });
      if (res.ok) {
        const data = await res.json();
        console.log(`SUCCESS! Title: "${data.title}"`);
        if (data.formatStreams) {
          console.log(`Available formats:`, data.formatStreams.map(s => `${s.quality} (${s.container})`));
          console.log(`Details:`, JSON.stringify(data.formatStreams.slice(0, 3), null, 2));
        }
        break;
      } else {
        console.log(`HTTP ${res.status}`);
      }
    } catch(e) {
      console.log(`Error: ${e.message}`);
    }
  }
}

main();
