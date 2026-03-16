# Website Template - Vite + React

Modern, responsive website template for small businesses. Deploy to Vercel in 60 seconds.

## Features

- ⚡ **Vite** - Lightning fast build tool
- ⚛️ **React** - Component-based UI
- 📱 **Responsive** - Works on all devices
- 🎨 **Beautiful Design** - Gradient, smooth animations
- 📧 **Contact Form** - Built-in form handling
- 🔧 **Customizable** - Easy to personalize

## Sections

1. **Header/Nav** - Sticky navigation
2. **Hero** - Eye-catching banner
3. **About** - Business description
4. **Services** - 3 service cards (customizable)
5. **Gallery** - 4 image placeholders
6. **Contact** - Contact info + form
7. **Footer** - Copyright info

## Quick Start

### 1. Setup

```bash
cd website-template
npm install
npm run dev
```

Visit `http://localhost:5173`

### 2. Customize

Edit `src/App.jsx`:
- Business name (logo)
- Hero text
- Services (titles, descriptions)
- Contact info (phone, email, address)

### 3. Deploy to Vercel

```bash
npm run build
vercel deploy
```

Or use Vercel UI:
1. Connect GitHub repo
2. Import project
3. Deploy (automatic on push)

## Build

```bash
npm run build
```

Creates optimized `dist/` folder ready for production.

## Environment

No backend needed. Contact form logs to console.

For real email:
- Use form service (Formspree, Netlify Forms)
- Add backend API
- Connect to email service

## Customization Guide

### Change Business Name

`src/App.jsx` line 18:
```jsx
<div className="logo">Işletmeniz</div>
```

### Add Real Images

Gallery placeholders → real images:
```jsx
<div className="gallery-item">
  <img src="photo1.jpg" alt="Photo 1" />
</div>
```

### Update Contact Info

Find section with:
```jsx
<p>+90 (252) XXX XXXX</p>
<p>info@isletme.com</p>
<p>Bodrum, Muğla</p>
```

Replace with actual contact details.

### Change Colors

Edit `src/App.css`:
- `#667eea` → Primary color (purple)
- `#764ba2` → Secondary color (darker purple)

Example: Change to blue
```css
/* Change from */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* To */
background: linear-gradient(135deg, #0066ff 0%, #0044aa 100%);
```

### Add/Remove Services

In services grid (line 74), duplicate card:
```jsx
<div className="service-card">
  <div className="service-icon">🎯</div>
  <h3>Hizmet 1</h3>
  <p>Açıklamalar ve detaylar</p>
</div>
```

## File Structure

```
website-template/
├── src/
│   ├── App.jsx      # Main component
│   ├── App.css      # Styles
│   └── main.jsx     # Entry point
├── public/          # Static files
├── index.html       # HTML template
├── vite.config.js   # Vite config
└── package.json     # Dependencies
```

## Performance

- **Vite** optimized builds
- **CSS** scoped, minimal
- **No external libraries** - lightweight
- **Production bundle** ~30KB

## Troubleshooting

### Port already in use

```bash
npm run dev -- --port 3000
```

### Images not loading

Make sure images are in `public/` folder or use absolute URLs.

### Styling issues

Clear cache:
```bash
rm -rf node_modules dist
npm install
npm run dev
```

## Next Steps

1. **Add real content** - Replace placeholders
2. **Add images** - Upload to gallery
3. **Setup email** - Connect form to email service
4. **Custom domain** - Point domain to Vercel
5. **Analytics** - Add Google Analytics
6. **SEO** - Update meta tags

## License

Free to use and modify.

---

Built with Vite + React. Deploy anywhere. 🚀
