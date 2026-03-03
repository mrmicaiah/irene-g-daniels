# Irene Daniels Website Engine

**Site:** [irenegdaniels.com](https://www.irenegdaniels.com)  
**Repository:** `irene-g-daniels`  
**Last Updated:** March 2026

---

## Quick Reference

### Tech Stack
- **Generator:** Eleventy (11ty) v2.0.1
- **Hosting:** GitHub Pages (auto-deploy on push to main)
- **Images:** Cloudinary (account: dxzw1zwez)
- **Newsletter:** Courier (list: irene-daniels)
- **Domain:** irenegdaniels.com via GoDaddy

### Brand Colors (Grounded Grace)
| Role | Hex | Usage |
|------|-----|-------|
| Foundation | #5C6B54 | Headers, footers, grounding elements |
| Primary | #C27878 | Buttons, links, key accents |
| Secondary | #5C6B54 | Subtle highlights |
| Accent | #C9A227 | Hover states, special callouts |
| Background | #FAF8F5 | Main background |
| Text | #3D3D3D | Body text |

### Fonts
- **Headings:** Cormorant Garamond (serif)
- **Body:** Open Sans (sans-serif)

---

## Site Structure

```
src/
├── _data/
│   └── site.json          # Global site data
├── _includes/
│   ├── base.njk           # Main HTML template
│   ├── header.njk         # Navigation
│   ├── footer.njk         # Footer
│   └── post.njk           # Blog post template
├── assets/
│   ├── css/style.css      # All styles
│   └── js/main.js         # Mobile menu, smooth scroll
├── blog/
│   └── *.md               # Blog posts (Markdown)
├── images/                # Local images (if any)
├── index.njk              # Homepage
├── about.njk              # About page
├── books.njk              # Books page
├── blog.njk               # Blog listing
└── connect.njk            # Contact/connect page
```

---

## Common Upgrade Scenarios

### Add a New Blog Post

1. Create a new Markdown file in `src/blog/`:

```markdown
---
layout: post.njk
title: "Your Post Title"
date: 2026-03-03
excerpt: "Short description for listing pages."
---

Your content here in Markdown...
```

2. Push to GitHub — it auto-deploys.

**Claude Tool:** `Productivity:github_push_file`
- repo: `irene-g-daniels`
- path: `src/blog/your-post-slug.md`
- content: (the markdown above)

---

### Add a New Book

1. Upload book cover to Cloudinary
2. Update `src/books.njk` — duplicate the existing book-feature div
3. Add cover image URL, title, subtitle, description, Amazon link

**Example book block:**
```html
<div class="book-feature">
  <div class="book-cover">
    <img src="CLOUDINARY_URL_HERE" alt="Book Title cover">
  </div>
  <div class="book-info">
    <span class="book-status">Available Now</span>
    <h3>Book Title</h3>
    <p class="book-subtitle">Subtitle Here</p>
    <p class="book-description">Description...</p>
    <a href="AMAZON_LINK" target="_blank" class="btn btn-primary">Buy Now on Amazon</a>
  </div>
</div>
```

---

### Update Site-Wide Information

Edit `src/_data/site.json`:

```json
{
  "name": "Irene Grace Daniels",
  "shortName": "Irene D.",
  "tagline": "Faith without the filter. Life without the pretense.",
  "url": "https://www.irenegdaniels.com",
  "email": "momsoffthehook@untitledpublishers.com",
  "description": "Author of faith-based books...",
  "colors": { ... },
  "social": {
    "blogs": [ ... ]
  },
  "currentYear": 2026
}
```

This data is available in all templates via `{{ site.name }}`, `{{ site.tagline }}`, etc.

---

### Add a New External Link/Blog

Update the `social.blogs` array in `site.json`:

```json
"blogs": [
  {
    "name": "The Hot Mess",
    "url": "https://the-hot-mess.untitledpublishers.com"
  },
  {
    "name": "New Blog Name",
    "url": "https://new-blog-url.com"
  }
]
```

Then update `src/index.njk` in the "More from Irene" section with the new blog card.

---

### Upload New Images

**Cloudinary Account:** dxzw1zwez

1. Upload via Cloudinary dashboard OR
2. Use `Productivity:cloudinary_upload` tool

**Image URL format:**
```
https://res.cloudinary.com/dxzw1zwez/image/upload/v{version}/{filename}
```

**Common transformations:**
- Favicon: `w_32,h_32,c_fill`
- Thumbnail: `w_400,h_400,c_fill`
- Book cover: Full size, no transform needed

---

### Change Colors/Fonts

1. Update `src/_data/site.json` colors object
2. Update CSS variables in `src/assets/css/style.css`:

```css
:root {
  --foundation: #5C6B54;
  --primary: #C27878;
  --secondary: #5C6B54;
  --accent: #C9A227;
  --background: #FAF8F5;
  --text: #3D3D3D;
  --white: #FFFFFF;
}
```

---

### Add a New Page

1. Create new `.njk` file in `src/`:

```njk
---
layout: base.njk
title: Page Title
description: Page description for SEO
---

<section class="page-hero">
  <div class="container">
    <h1>Page Title</h1>
    <p>Subtitle</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <!-- Your content -->
  </div>
</section>
```

2. Add link to navigation in `src/_includes/header.njk`

---

### Update Newsletter Form

Forms submit to Courier. Current config:
- Action: `https://email-bot-server.micaiah-tasks.workers.dev/api/subscribe`
- List ID: `irene-daniels`
- Source tracking: `website-footer`

To change, update the form in `src/index.njk` and `src/connect.njk`.

---

## Deployment

**Automatic:** Push to `main` branch triggers GitHub Actions workflow.

**Manual trigger:** Go to Actions tab → "Build and Deploy 11ty Site" → "Run workflow"

**Build process:**
1. Checkout code
2. Install npm dependencies
3. Run `npm run build` (eleventy)
4. Deploy `_site/` folder to GitHub Pages

---

## File Reference

### Key Templates

| File | Purpose |
|------|---------|
| `src/_includes/base.njk` | Main HTML wrapper, head, body |
| `src/_includes/header.njk` | Navigation bar |
| `src/_includes/footer.njk` | Site footer |
| `src/_includes/post.njk` | Blog post template |
| `src/assets/css/style.css` | All CSS styles |
| `src/assets/js/main.js` | Mobile menu toggle |

### CSS Classes to Know

| Class | Usage |
|-------|-------|
| `.container` | Max-width wrapper |
| `.section` | Standard section padding |
| `.section-alt` | Alternate background section |
| `.hero` | Hero section styling |
| `.page-hero` | Interior page headers |
| `.btn` | Button base |
| `.btn-primary` | Foundation color button |
| `.btn-secondary` | Outlined button |
| `.btn-accent` | Accent color button |
| `.book-feature` | Book display grid |
| `.blog-card` | Blog/link card |
| `.newsletter-form` | Email signup form |

---

## Troubleshooting

**Build fails?**
- Check GitHub Actions logs
- Common issues: invalid Nunjucks syntax, missing closing tags

**Images not showing?**
- Verify Cloudinary URL is correct
- Check for typos in filename

**Styles not updating?**
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache

**Newsletter not working?**
- Verify Courier list exists
- Check API endpoint URL

---

## Future Upgrade Ideas

- [ ] Add speaking/events page when ready
- [ ] Add reader resources/downloads section
- [ ] Add reading order page when multiple books exist
- [ ] Add testimonials/reviews section to books page
- [ ] Consider adding fiction book category to books page

---

## Support

**Domain:** GoDaddy (Irene's account)  
**Cloudinary:** Shared Untitled Publishers account  
**GitHub:** UntitledPublishers organization  
**Email System:** Courier via Micaiah's infrastructure

For technical issues, create a task in the Productivity system or message Micaiah.
