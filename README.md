# onurcan-portfolio

Personal portfolio site for Onurcan Genç — Offensive Security & AI Red Team Researcher.

## Stack
- Hugo (static site generator)
- Pure CSS (no framework)
- Netlify deployment
- Data-driven via YAML files

## File Structure

```
hugo-portfolio/
├── config.toml              # Site config & params
├── netlify.toml             # Netlify build + CVE redirects
├── content/
│   └── _index.md            # Homepage entry
├── layouts/
│   ├── index.html           # Main page layout (assembles partials)
│   └── partials/
│       ├── head.html
│       ├── nav.html
│       ├── hero.html
│       ├── stats.html
│       ├── cves.html
│       ├── projects.html
│       ├── experience.html
│       ├── ctf.html
│       ├── certs.html
│       ├── blog_section.html
│       ├── about.html
│       ├── contact.html
│       └── footer.html
├── static/
│   └── css/
│       └── style.css        # All styles
└── data/
    ├── cves.yaml            # CVE records
    ├── projects.yaml        # GitHub projects
    ├── experience.yaml      # Work history
    └── site_data.yaml       # CTF, certs, tools, blog posts
```

## Setup

```bash
# Install Hugo (if not installed)
brew install hugo  # macOS
# or: https://gohugo.io/installation/

# Clone and run locally
cd hugo-portfolio
hugo server -D

# Build for production
hugo --minify
```

## Deployment (Netlify)

1. Push to GitHub
2. Connect repo in Netlify
3. Build command: `hugo --minify`
4. Publish directory: `public`

The `netlify.toml` handles:
- Hugo build settings
- CVE reference URL redirects (`/posts/*` → `blog.onurcangenc.com.tr`)
- SPA fallback

## Updating Content

All content is in `data/` — no HTML editing needed:

- **New CVE** → add entry to `data/cves.yaml`
- **New project** → add entry to `data/projects.yaml`
- **New job** → add entry to `data/experience.yaml`
- **New blog post** → add entry to `data/site_data.yaml` under `blog_posts`
- **New cert** → add entry to `data/site_data.yaml` under `certs`

## CV Link

Currently `cv_link` in `config.toml` points to email. Replace with a direct PDF link:
```toml
cv_link = "https://onurcangenc.com.tr/cv/onurcan-genc-cv.pdf"
```
Then place your CV at `static/cv/onurcan-genc-cv.pdf`.
