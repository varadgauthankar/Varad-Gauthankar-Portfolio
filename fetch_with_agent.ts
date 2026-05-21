import fetch from 'node-fetch';

async function tryFetch(ua: string) {
  const url = 'https://www.behance.net/gallery/249794309/PRYSM-Wired-to-Wonder';
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': ua,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    console.log(`UA [${ua.substring(0, 30)}...]: Status ${res.status}`);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  } catch (err: any) {
    console.log(`UA [${ua.substring(0, 30)}...]: Error ${err.message}`);
  }
  return null;
}

async function main() {
  const uas = [
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/605.1.15'
  ];
  
  for (const ua of uas) {
    const html = await tryFetch(ua);
    if (html) {
      console.log('Successfully fetched! Size:', html.length);
      const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i);
      const twitterImageMatch = html.match(/<meta[^>]*name="twitter:image"[^>]*content="([^"]+)"/i);
      if (ogImageMatch) {
         console.log('Found og:image URL:', ogImageMatch[1]);
      }
      if (twitterImageMatch) {
         console.log('Found twitter:image URL:', twitterImageMatch[1]);
      }
      
      const cdnMatches = Array.from(html.matchAll(/https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/[a-zA-Z0-9_\-\/.]+/g));
      const urls = Array.from(new Set(cdnMatches.map(m => m[0])));
      console.log('Found Behance Project modules:');
      urls.slice(0, 5).forEach((u, idx) => console.log(`${idx+1}: ${u}`));
      break;
    }
  }
}

main();
