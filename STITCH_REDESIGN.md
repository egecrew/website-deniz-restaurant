# Deniz Restaurant - Stitch SDK Redesign

## Overview

This website was redesigned using **Google's Stitch SDK** to generate UI components from text prompts. The Stitch SDK generates complete HTML/CSS designs with screenshots, which were then adapted into React components.

## What is Stitch SDK?

Stitch is Google's AI-powered UI generation tool that:
- Takes text prompts describing UI components
- Generates complete HTML with Tailwind CSS styling
- Produces high-resolution screenshots of the designs
- Supports desktop, mobile, and tablet form factors
- Uses MCP (Model Context Protocol) for tool integration

## Generated Designs

Using the Stitch SDK, we generated 5 complete UI sections:

| Section | Prompt | Screenshot |
|---------|--------|------------|
| Hero | Mediterranean seafood restaurant hero with ocean theme | hero.png |
| Menu | 6-card grid of menu categories | menu-section.png |
| Contact | Two-column reservation form with contact info | contact-form.png |
| Gallery | 4-column photo gallery with hover effects | gallery.png |
| Footer | Three-column dark footer | footer.png |

### Generation Statistics
- **Project ID:** 5670372511067729208
- **Screens Generated:** 5
- **Total Generation Time:** ~2 minutes
- **Output Format:** HTML + PNG screenshots

## Design System (Extracted from Stitch)

### Colors
```css
--primary: #d4af37      /* Gold - CTAs, accents */
--brand-blue: #1a365d   /* Deep ocean - headers, footer */
--ocean-mid: #2c5282    /* Medium blue - gradients */
--ocean-light: #4299e1  /* Light blue - links, focus */
--background-light: #f8f7f6  /* Off-white - sections */
```

### Typography
- **Headlines:** Playfair Display (serif, elegant)
- **Body:** Inter (sans-serif, modern)
- **Font Scale:** 0.875rem → 6rem

### Components (Stitch Patterns)
1. **Gold Divider** - Gradient line with decorative ✻ symbol
2. **Glass Effect** - Frosted glass with backdrop blur
3. **Card Hover** - Gold shadow + border on interaction
4. **Wave Mask** - SVG wave transition between sections
5. **Rating Bars** - Horizontal progress bars for reviews

## Stitch vs Manual CSS Comparison

### Before (Manual CSS)
```css
/* 20KB of hand-written CSS */
.hero {
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #4299e1 100%);
  /* ... 50+ lines of styling */
}
```

### After (Stitch-Generated)
```html
<!-- Stitch outputs semantic HTML with Tailwind classes -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-b from-ocean/60 via-ocean/40 to-ocean/80 z-10" />
  <!-- ... clean, consistent structure -->
</section>
```

### Key Differences

| Aspect | Manual CSS | Stitch SDK |
|--------|-----------|------------|
| **Design Consistency** | Varies | Unified design system |
| **Color Palette** | Custom variables | Generated from prompt |
| **Typography** | Manual selection | AI-matched to theme |
| **Layout** | Custom grid | Tailwind-based |
| **Shadows/Effects** | Hand-tuned | Design-system consistent |
| **Time to Design** | Hours | Minutes |
| **Iteration** | Manual edits | Re-prompt |

## How to Generate New Designs

```javascript
import { stitch } from '@google/stitch-sdk';

// Create/get project
const project = stitch.project('deniz-restaurant-ui');

// Generate a screen
const result = await stitch.callTool('generate_screen_from_text', {
  projectId: project.id,
  prompt: 'Create a hero section for Mediterranean restaurant...',
  deviceType: 'DESKTOP'
});

// Get HTML and screenshot
const htmlUrl = result.outputComponents[0].design.screens[0].htmlCode.downloadUrl;
const imageUrl = result.outputComponents[0].design.screens[0].screenshot.downloadUrl;
```

## Files Generated

```
stitch-designs/
├── hero.html           # Hero section HTML
├── hero.png            # Hero screenshot
├── hero.json           # Full API response
├── menu-section.html   # Menu grid HTML
├── menu-section.png    # Menu screenshot
├── contact-form.html   # Contact section HTML
├── contact-form.png    # Contact screenshot
├── gallery.html        # Gallery HTML
├── gallery.png         # Gallery screenshot
├── footer.html         # Footer HTML
├── footer.png          # Footer screenshot
└── manifest.json       # Generation manifest
```

## Deployment

The redesigned site is deployed to Vercel:
- **URL:** https://deniz-restaurant.egecrew.com
- **Build:** `npm run build`
- **Output:** `dist/`

## Credits

- **Design Generation:** Google Stitch SDK
- **Implementation:** React + Vite
- **Styling:** CSS Custom Properties (extracted from Stitch Tailwind)
- **Original Content:** Deniz Restaurant, Bodrum

---

*Generated: March 17, 2026*
*Stitch API Version: 0.0.3*
