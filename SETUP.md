# Website Template - Setup Guide

Complete guide to customize and deploy your website.

## 1. Local Development

### Clone & Install

```bash
git clone https://github.com/egecrew/website-template.git
cd website-template
npm install
npm run dev
```

Visit `http://localhost:5173`

## 2. Customize Your Site

### Update Business Info

Edit `src/App.jsx`:

```jsx
// Line 18 - Business name
<div className="logo">YourBusinessName</div>

// Line 24-26 - Navigation links (adjust as needed)

// Line 32-35 - Hero section
<h1>Your Business Title</h1>
<p>Your tagline here</p>

// Line 45-46 - About section
<h1>About Your Business</h1>
<p>Your business description...</p>
```

### Add Services

In services section (line 55-75), customize:

```jsx
<div className="service-card">
  <div className="service-icon">🎯</div>
  <h3>Service Name</h3>
  <p>Service description</p>
</div>
```

### Update Contact Info

In contact section (line 104-115):

```jsx
<p>+90 (252) YOUR PHONE</p>
<p>your.email@business.com</p>
<p>Your Address, Bodrum</p>
```

### Change Colors

Edit `src/App.css`:

**Find these lines and change colors:**

```css
/* Purple (default) */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to your brand color */
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

**Common color combinations:**

| Theme | Color 1 | Color 2 |
|-------|---------|---------|
| Blue | #0066ff | #0044aa |
| Green | #00aa44 | #008822 |
| Orange | #ff9900 | #cc6600 |
| Red | #ff3333 | #cc0000 |
| Teal | #00ccaa | #009988 |

### Add Images

1. **Hero Image** - Create `public/hero.jpg`
2. **Gallery** - Create `public/gallery/1.jpg`, `2.jpg`, etc.
3. **Favicon** - Replace `public/favicon.svg`

Then update `src/App.jsx`:

```jsx
// Hero section - add background image
<section className="hero" style={{ backgroundImage: 'url(/hero.jpg)' }}>

// Gallery - replace placeholders with real images
<div className="gallery-item">
  <img src="/gallery/1.jpg" alt="Project 1" />
</div>
```

## 3. Forms & Submissions

### Option A: Formspree (No code needed)

1. Go to https://formspree.io
2. Create account
3. Create form (get form ID)
4. Update `src/App.jsx` form action:

```jsx
<form className="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option B: Email API (Backend)

If you have a backend, connect form to your API:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  
  const response = await fetch('https://your-api.com/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  
  if (response.ok) {
    setSubmitted(true)
  }
}
```

## 4. Deploy to Vercel

### Option A: Git Push (Recommended)

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/egecrew/website-template.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import GitHub repo
   - Click "Deploy"
   - Done! 🎉

3. **Auto-deploy on push**
   - Every push to GitHub = auto-deploy to Vercel
   - No manual steps needed

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option C: Vercel GitHub Integration

1. Authorize Vercel with GitHub
2. Every push auto-deploys
3. Preview URLs for PRs

## 5. Custom Domain

### Step 1: Buy Domain

- GoDaddy, Namecheap, or any registrar
- Example: `yourbusiness.com`

### Step 2: Point to Vercel

In Vercel dashboard:
1. Project Settings → Domains
2. Add custom domain: `yourbusiness.com`
3. Follow DNS setup instructions
4. Update domain registrar's nameservers

### Step 3: Wait for DNS

DNS propagation: 24-48 hours typically.

## 6. Email Setup (Zoho Mail)

### Option A: Vercel Environment Variables

Store email config in Vercel:

```bash
vercel env add
```

Add:
```
VITE_BUSINESS_EMAIL=your.email@yourbusiness.com
VITE_MAIL_SERVER=zoho-smtp.com
```

### Option B: Zoho Mail Direct

In contact form, submit to Zoho:

```jsx
<form action="https://mail.zoho.com/..." method="POST">
```

## 7. Analytics (Optional)

Add Google Analytics:

```jsx
// In src/main.jsx, add:
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

Replace `GA_ID` with your Google Analytics ID.

## 8. SEO

### Meta Tags

Update `index.html`:

```html
<meta name="description" content="Your business description">
<meta name="keywords" content="keyword1, keyword2, keyword3">
<meta property="og:title" content="Your Business">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://yoursite.com/image.jpg">
```

### Sitemap

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourbusiness.com/</loc>
    <lastmod>2026-03-16</lastmod>
  </url>
</urlset>
```

## 9. Performance Checklist

- [ ] Compress images (TinyPNG, ImageOptim)
- [ ] Enable caching (Vercel default)
- [ ] Add favicon
- [ ] Update meta tags
- [ ] Test on mobile
- [ ] Check page speed (PageSpeed Insights)

## 10. Next Steps

1. Customize with your brand
2. Add images
3. Setup form submissions
4. Deploy to Vercel
5. Buy custom domain
6. Setup Zoho Mail
7. Monitor analytics

---

## Support

Questions? Issues?
- Check Vite docs: https://vitejs.dev
- Vercel docs: https://vercel.com/docs
- React docs: https://react.dev

Good luck! 🚀
