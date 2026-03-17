#!/usr/bin/env node
/**
 * Generate a "Daily Specials" section using Stitch SDK
 * Using raw callTool with UPPERCASE deviceType parameter (the fix!)
 */

import { stitch } from '@google/stitch-sdk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '..', 'stitch-designs');

async function generateSpecialsSection() {
  console.log('🎨 Generating Daily Specials section with Stitch SDK...');
  console.log('📋 Using UPPERCASE deviceType: DESKTOP (the fix!)\n');
  
  const projectId = '5670372511067729208';
  console.log(`📁 Using project: ${projectId}`);
  
  // Design prompt for Daily Specials section
  const prompt = `
Design a "Günün Önerileri" (Daily Specials) section for Deniz Restaurant, a Mediterranean seafood restaurant in Bodrum, Turkey.

Requirements:
- Turkish language content
- Ocean blue (#1a365d) and gold (#d4af37) color scheme
- Three featured dish cards with:
  - Placeholder image area
  - Dish name in Turkish
  - Short description
  - Price in Turkish Lira (₺)
  - "Sipariş Ver" (Order) button
- Section header with decorative gold divider
- Featured dishes:
  1. "Günün Balığı" - Today's fresh catch, ₺450
  2. "Karides Güveç" - Shrimp casserole, ₺380
  3. "Akdeniz Mezze Tabağı" - Mediterranean meze platter, ₺280
- Modern, elegant typography (Playfair Display for headings, Inter for body)
- Subtle hover effects on cards
- Fully responsive grid layout
- Premium restaurant aesthetic matching Bodrum coastal vibes
`;

  try {
    console.log('🚀 Calling Stitch API with raw callTool...');
    console.log('✅ Using UPPERCASE deviceType: "DESKTOP"\n');
    
    // Use raw callTool with UPPERCASE deviceType - this is the fix!
    const result = await stitch.callTool("generate_screen_from_text", {
      projectId: projectId,
      prompt: prompt.trim(),
      deviceType: "DESKTOP"  // UPPERCASE - the fix!
    });
    
    console.log('✅ Screen generated successfully!');
    
    const screen = result.outputComponents[0].design.screens[0];
    const screenId = screen.name?.split('/').pop() || screen.id;
    console.log(`   Screen ID: ${screenId}`);
    
    // Get HTML and image URLs
    const htmlUrl = screen.htmlCode?.downloadUrl;
    const imageUrl = screen.screenshot?.downloadUrl;
    
    console.log('\n📥 Downloading assets...');
    
    // Download HTML
    if (htmlUrl) {
      const htmlResponse = await fetch(htmlUrl);
      const htmlContent = await htmlResponse.text();
      const htmlPath = path.join(outputDir, 'daily-specials.html');
      await fs.writeFile(htmlPath, htmlContent);
      console.log(`   ✓ HTML saved: daily-specials.html (${htmlContent.length} bytes)`);
    }
    
    // Download image
    if (imageUrl) {
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = await imageResponse.arrayBuffer();
      const imagePath = path.join(outputDir, 'daily-specials.png');
      await fs.writeFile(imagePath, Buffer.from(imageBuffer));
      console.log(`   ✓ Screenshot saved: daily-specials.png (${imageBuffer.byteLength} bytes)`);
    }
    
    // Save metadata
    const metadata = {
      id: 'daily-specials',
      name: 'Daily Specials Section',
      screenId: screenId,
      generatedAt: new Date().toISOString(),
      prompt: prompt.trim(),
      deviceType: 'DESKTOP',
      dimensions: `${screen.width}x${screen.height}`,
      theme: screen.theme,
      htmlUrl,
      imageUrl,
      success: true
    };
    
    const metadataPath = path.join(outputDir, 'daily-specials.json');
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`   ✓ Metadata saved: daily-specials.json`);
    
    console.log('\n🎉 Daily Specials section generated successfully!');
    console.log(`\n📂 Files created in: ${outputDir}`);
    console.log('\n--- Generated Screen Details ---');
    console.log(`Dimensions: ${screen.width}x${screen.height}`);
    console.log(`Theme: ${JSON.stringify(screen.theme)}`);
    
    return metadata;
    
  } catch (error) {
    console.error('\n❌ Error generating design:', error.message);
    console.error('\nFull error:', error);
    throw error;
  }
}

// Run
generateSpecialsSection().catch(console.error);
