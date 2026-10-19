import fs from 'fs';
import path from 'path';

const PRODUCTS_TO_FETCH = [
  { id: 'black-cumin-seeds', query: 'Nigella sativa seeds', filename: 'black-cumin-seeds.jpg' },
  { id: 'chia-seeds', query: 'Chia seeds', filename: 'chia-seeds.jpg' },
  { id: 'flax-seeds', query: 'Flax seeds', filename: 'flax-seeds.jpg' },
  { id: 'asaliya-seeds', query: 'Garden cress seeds', filename: 'asaliya-seeds.jpg' },
  { id: 'dill-seeds', query: 'Dill seeds', filename: 'dill-seeds.jpg' },
  { id: 'bay-leaves', query: 'Bay leaves dried', filename: 'bay-leaves.jpg' },
  { id: 'nutmeg', query: 'Whole nutmeg seed', filename: 'nutmeg.jpg' },
  { id: 'quinoa', query: 'Quinoa grains', filename: 'quinoa.jpg' },
  { id: 'tamarind', query: 'Tamarind pod', filename: 'tamarind.jpg' },
  { id: 'dry-red-chilli', query: 'Dried red chili peppers', filename: 'dry-red-chilli.jpg' },
  { id: 'cardamom', query: 'Green cardamom pods', filename: 'cardamom.jpg' },
  { id: 'ajwain-seeds', query: 'Carom seeds', filename: 'ajwain-seeds.jpg' },
  { id: 'basil-seeds', query: 'Ocimum basilicum seeds', filename: 'basil-seeds.jpg' },
  { id: 'dry-ginger', query: 'Dried ginger root', filename: 'dry-ginger.jpg' },
  { id: 'chickpeas', query: 'Cicer arietinum seeds', filename: 'chickpeas.jpg' },
  { id: 'roasted-gram', query: 'Roasted chana', filename: 'roasted-gram.jpg' },
  { id: 'senna-leaves', query: 'Senna alexandrina', filename: 'senna-leaves.jpg' },
  { id: 'psyllium-husk', query: 'Psyllium seed husk', filename: 'psyllium-husk.jpg' }
];

async function fetchImageFor(item) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(item.query)}&gsrnamespace=6&prop=imageinfo&iiprop=url|mime&format=json`;
  
  const headers = { 'User-Agent': 'ARAgroSpicesBot/1.0 (info@aragrospices.com)' };
  const res = await fetch(url, { headers });
  const data = await res.json();
  
  if (!data.query || !data.query.pages) {
    console.error(`No results for query: ${item.query}`);
    return null;
  }
  
  const pages = Object.values(data.query.pages);
  // Find a jpg or png image
  const candidate = pages.find(p => {
    const mime = p.imageinfo?.[0]?.mime;
    const imgUrl = p.imageinfo?.[0]?.url;
    return (mime === 'image/jpeg' || mime === 'image/png') && imgUrl && !imgUrl.endsWith('.svg') && !imgUrl.endsWith('.tif');
  });

  if (!candidate || !candidate.imageinfo?.[0]?.url) {
    console.error(`No valid jpg/png for ${item.query}`);
    return null;
  }

  const rawUrl = candidate.imageinfo[0].url.split('?')[0];
  console.log(`Found for ${item.id} (${candidate.title}): ${rawUrl}`);

  // Download
  const imgRes = await fetch(rawUrl, { headers });
  if (!imgRes.ok) {
    console.error(`Failed downloading ${rawUrl}: ${imgRes.status}`);
    return null;
  }

  const buffer = Buffer.from(await imgRes.arrayBuffer());
  const destPath = path.join('public', 'images', 'products', item.filename);
  fs.writeFileSync(destPath, buffer);
  console.log(`Saved ${item.filename} (${buffer.length} bytes)`);
  return destPath;
}

async function run() {
  for (const item of PRODUCTS_TO_FETCH) {
    try {
      await fetchImageFor(item);
      // Wait 300ms to be polite to Wikimedia API
      await new Promise(r => setTimeout(r, 300));
    } catch (e) {
      console.error(`Error fetching ${item.id}:`, e.message);
    }
  }
}

run();
