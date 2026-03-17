#!/usr/bin/env node
/**
 * Stitch SDK UI Generation for Deniz Restaurant
 * Generates modern UI components using Google's Stitch SDK
 */

import { stitch } from '@google/stitch-sdk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'stitch-designs');

// Restaurant context for design generation
const RESTAURANT_CONTEXT = {
  name: "Deniz Restaurant",
  location: "Bodrum, Turkey",
  cuisine: "Mediterranean seafood",
  rating: "4.8/5 stars",
  reviews: "1043+ reviews",
  phone: "+90 252 363 76 74",
  address: "Çarşı, Belediye Meydanı No 4, 48400 Bodrum/Muğla",
  hours: "08:00 - 00:00",
  tagline: "Bodrum'un Kalbinde, Denizin Tadında",
  colors: {
    primary: "#1a365d",  // Ocean deep blue
    secondary: "#d4af37", // Gold/sand
    accent: "#4299e1"     // Ocean light
  }
};

// Design prompts for different sections
const DESIGN_PROMPTS = [
  {
    id: "hero",
    name: "Hero Section",
    prompt: `Create a stunning hero section for a Mediterranean seafood restaurant called "${RESTAURANT_CONTEXT.name}" in ${RESTAURANT_CONTEXT.location}.

Design requirements:
- Modern, elegant design with ocean-inspired aesthetics
- Full-width hero with beautiful seafood or coastal imagery
- Restaurant name "${RESTAURANT_CONTEXT.name}" prominently displayed
- Turkish tagline: "${RESTAURANT_CONTEXT.tagline}"
- Stats showing: 4.8 star Google rating, 1043+ reviews
- Primary CTA button "Rezervasyon Yap" (Make Reservation) in gold
- Color palette: Deep ocean blue (#1a365d), gold accents (#d4af37), light blue (#4299e1)
- Typography: Elegant serif for headings (Playfair Display), clean sans-serif for body (Inter)
- Navigation with Turkish links: Hakkımızda, Lezzetlerimiz, Galeri, Rezervasyon
- Subtle wave patterns or coastal design elements`,
    deviceType: "DESKTOP"
  },
  {
    id: "menu-section",
    name: "Menu/Services Section",
    prompt: `Design a menu/services section for "${RESTAURANT_CONTEXT.name}", a Turkish Mediterranean restaurant in Bodrum.

Show 6 menu category cards in a 3x2 grid:
1. Deniz Ürünleri (Seafood) - Fresh daily catch and grilled fish
2. Meze & Salatalar (Starters) - Traditional Mediterranean appetizers  
3. İçecekler (Beverages) - Local Turkish wines and drinks
4. Tatlılar (Desserts) - Homemade Turkish sweets
5. Özel Günler (Special Events) - Private dining and celebrations
6. Deniz Manzarası (Sea View) - Scenic waterfront dining

Design style:
- Cards with elegant hover effects and shadows
- Each card has an icon or illustration
- Deep blue headers (#1a365d), gold accents (#d4af37)
- Section title: "Özel Lezzetlerimiz" (Our Special Flavors)
- Decorative divider below title
- Clean, appetizing presentation`,
    deviceType: "DESKTOP"
  },
  {
    id: "contact-form",
    name: "Contact/Reservation Form",
    prompt: `Create a reservation and contact section for "${RESTAURANT_CONTEXT.name}" Turkish restaurant.

Two-column layout:
LEFT COLUMN - Contact Information:
- Address icon with: Çarşı, Belediye Meydanı No 4, 48400 Bodrum/Muğla
- Phone icon with: +90 252 363 76 74
- Clock icon with hours: Her Gün 08:00 - 00:00
- Star icon with: 4.8/5 Google - 1043 yorum

RIGHT COLUMN - Reservation Form:
- Form title: "Rezervasyon Yap"
- Fields: Adınız Soyadınız, E-posta, Telefon, Tarih, Kişi Sayısı, Mesajınız (textarea)
- Submit button: "Rezervasyon Gönder" with gold background

Design:
- Section header: "Bize Ulaşın" with decorative divider
- Ocean blue and cream/sand color scheme
- Contact cards with soft shadows
- Clean, elegant form styling
- Success feedback indicator`,
    deviceType: "DESKTOP"
  },
  {
    id: "gallery",
    name: "Photo Gallery",
    prompt: `Design a photo gallery section for "${RESTAURANT_CONTEXT.name}" seafood restaurant in Bodrum.

Requirements:
- Section header: "Atmosferimizi Keşfedin" (Discover Our Atmosphere)
- Subtitle: "Bodrum'un en güzel deniz manzarasıyla yemek keyfi"
- 4-column masonry or grid layout
- 6-8 image placeholders for:
  - Restaurant interior shots
  - Grilled seafood dishes
  - Sunset sea views
  - Elegant table settings
- Hover effects: Zoom and caption reveal
- Caption examples: "Şık İç Mekan", "Taze Deniz Ürünleri", "Deniz Manzarası"
- Color scheme: Ocean blue overlays, gold text accents
- Optional: Lightbox pattern for full-screen viewing`,
    deviceType: "DESKTOP"
  },
  {
    id: "footer",
    name: "Footer",
    prompt: `Create a footer for "${RESTAURANT_CONTEXT.name}" Turkish restaurant website.

Three-column layout on dark gradient (ocean blue to black):

COLUMN 1 - About:
- Logo: Lobster emoji + "Deniz Restaurant"
- Brief tagline about Mediterranean seafood in Bodrum
- Category badge: "Yemek & İçecek"

COLUMN 2 - Contact:
- Phone: +90 252 363 76 74
- Address: Belediye Meydanı, Bodrum
- Email link (optional)

COLUMN 3 - Hours:
- "Her Gün Açık"
- "08:00 - 00:00"

FOOTER BOTTOM:
- Copyright: © 2026 Deniz Restaurant
- Text: "Tüm hakları saklıdır"
- Location: Bodrum, Türkiye with Turkish flag

Design:
- Gold accents for links and highlights (#d4af37)
- Subtle wave pattern or texture in background
- Light text on dark background for readability`,
    deviceType: "DESKTOP"
  }
];

async function ensureOutputDir() {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  } catch (error) {
    // Directory exists
  }
}

async function downloadFile(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const buffer = await response.arrayBuffer();
    const filepath = path.join(OUTPUT_DIR, filename);
    await fs.writeFile(filepath, Buffer.from(buffer));
    return filepath;
  } catch (error) {
    console.error(`   ⚠️ Download failed for ${filename}: ${error.message}`);
    return null;
  }
}

async function generateDesign(projectId, design) {
  console.log(`\n🎨 Generating: ${design.name} (${design.deviceType})`);
  console.log(`   Prompt: ${design.prompt.substring(0, 80)}...`);
  
  try {
    // Use raw callTool with uppercase deviceType (API requirement)
    const result = await stitch.callTool('generate_screen_from_text', {
      projectId: projectId,
      prompt: design.prompt,
      deviceType: design.deviceType
    });
    
    // Extract screen data from response
    const outputComponent = result.outputComponents?.[0];
    const screen = outputComponent?.design?.screens?.[0];
    
    if (!screen) {
      throw new Error('No screen generated in response');
    }
    
    console.log(`   ✅ Generated! Screen ID: ${screen.id}`);
    console.log(`   📐 Dimensions: ${screen.width}x${screen.height}`);
    
    // Download HTML and screenshot
    const htmlUrl = screen.htmlCode?.downloadUrl;
    const imageUrl = screen.screenshot?.downloadUrl;
    
    let htmlPath = null;
    let imagePath = null;
    
    if (htmlUrl) {
      htmlPath = await downloadFile(htmlUrl, `${design.id}.html`);
      if (htmlPath) console.log(`   📄 HTML: ${htmlPath}`);
    }
    
    if (imageUrl) {
      imagePath = await downloadFile(imageUrl, `${design.id}.png`);
      if (imagePath) console.log(`   🖼️  Screenshot: ${imagePath}`);
    }
    
    // Save raw response data
    await fs.writeFile(
      path.join(OUTPUT_DIR, `${design.id}.json`),
      JSON.stringify(result, null, 2)
    );
    
    // Extract suggestions if any
    const suggestions = result.outputComponents
      ?.filter(c => c.suggestion)
      .map(c => c.suggestion) || [];
    
    return {
      id: design.id,
      name: design.name,
      screenId: screen.id,
      title: screen.title,
      dimensions: `${screen.width}x${screen.height}`,
      theme: screen.theme,
      htmlPath,
      imagePath,
      htmlUrl,
      imageUrl,
      suggestions,
      success: true
    };
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);
    return {
      id: design.id,
      name: design.name,
      error: error.message,
      success: false
    };
  }
}

async function main() {
  console.log('🌊 Stitch SDK - Deniz Restaurant UI Generation');
  console.log('='.repeat(60));
  
  // Check for API key
  if (!process.env.STITCH_API_KEY) {
    console.error('❌ STITCH_API_KEY environment variable not set');
    process.exit(1);
  }
  
  console.log('✅ STITCH_API_KEY found');
  
  await ensureOutputDir();
  
  // Verify connection
  console.log('\n🔧 Testing connection...');
  const tools = await stitch.listTools();
  console.log(`   ✅ Connected! ${tools.tools.length} tools available`);
  
  // List existing projects
  console.log('\n📋 Checking existing projects...');
  const projects = await stitch.projects();
  console.log(`   Found ${projects.length} projects`);
  
  let projectId;
  const existingProject = projects.find(p => p.data?.title === 'Deniz Restaurant UI');
  
  if (existingProject) {
    projectId = existingProject.id;
    console.log(`   ♻️ Using existing project: ${projectId}`);
  } else {
    console.log('\n📦 Creating new project...');
    const newProject = await stitch.createProject('Deniz Restaurant UI');
    projectId = newProject.id;
    console.log(`   ✅ Created project: ${projectId}`);
  }
  
  // Generate all designs
  console.log('\n' + '='.repeat(60));
  console.log('🎨 Starting UI Generation');
  console.log('='.repeat(60));
  
  const results = [];
  for (const design of DESIGN_PROMPTS) {
    const result = await generateDesign(projectId, design);
    results.push(result);
    
    // Delay between requests to avoid rate limiting
    if (DESIGN_PROMPTS.indexOf(design) < DESIGN_PROMPTS.length - 1) {
      console.log('   ⏳ Waiting 5s before next generation...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  // Save results manifest
  const manifest = {
    generated: new Date().toISOString(),
    projectId,
    restaurant: RESTAURANT_CONTEXT,
    designs: results,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length
  };
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Generation Summary');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\n📁 Generated files:');
    for (const r of successful) {
      console.log(`   ${r.name}:`);
      if (r.htmlPath) console.log(`      HTML: ${r.htmlPath}`);
      if (r.imagePath) console.log(`      PNG:  ${r.imagePath}`);
      console.log(`      Size: ${r.dimensions}`);
    }
  }
  
  if (failed.length > 0) {
    console.log('\n⚠️ Failed designs:');
    for (const r of failed) {
      console.log(`   - ${r.name}: ${r.error}`);
    }
  }
  
  console.log(`\n📄 Manifest: ${path.join(OUTPUT_DIR, 'manifest.json')}`);
  console.log(`🌐 Project ID: ${projectId}`);
}

main().catch(console.error);
