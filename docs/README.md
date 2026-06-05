# Rashmi Rama Sushil — Personal Website

Professional portfolio and blog site. Built in plain HTML/CSS — no frameworks, no build step, instant deployment.

## Structure

```
portfolio_website/
├── index.html            Homepage (latest posts, both sections)
├── about.html            Professional bio + credentials sidebar
├── finance.html          Finance & Markets posts listing
├── for-students.html     IIT Madras Placement Journey landing page
├── projects.html         Quantitative finance projects
├── css/
│   └── style.css         All styles
└── posts/
    ├── commodity-derivatives.html     Finance post 1
    ├── greeks-in-practice.html        Finance post 2
    ├── iit-to-morgan-stanley.html     Finance post 3
    ├── placement-1-journey.html       Placement post 1
    ├── placement-2-background.html    Placement post 2
    ├── placement-3-timeline.html      Placement post 3
    ├── placement-4-coding.html        Placement post 4
    ├── placement-5-ups-downs.html     Placement post 5
    ├── placement-6-prep.html          Placement post 6
    └── placement-7-day0.html          Placement post 7
```

## Deploying to GitHub Pages (free, custom domain optional)

### Step 1 — Create a GitHub repository
1. Go to github.com → New repository
2. Name it: `rashmi-portfolio` (or your preferred name)
3. Set to **Public**
4. Do NOT initialise with README (you'll push your own files)

### Step 2 — Upload files
**Option A — GitHub web interface (simplest):**
1. Open the repository → click "uploading an existing file"
2. Drag the entire `portfolio_website/` folder contents (not the folder itself, the contents)
3. Make sure the folder structure is preserved: `css/style.css`, `posts/`, etc.
4. Commit

**Option B — Git command line:**
```bash
cd /Users/rashmiramasushil/RashmiClaude/portfolio_website
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rashmi-portfolio.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Repository → Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: **main** / root (/)
4. Save

Your site will be live at: `https://YOUR_USERNAME.github.io/rashmi-portfolio/`

This takes 2–3 minutes to propagate after first setup.

### Step 4 — Update LinkedIn
1. LinkedIn → Edit profile → Website → paste your GitHub Pages URL
2. LinkedIn → Featured section → Add link → paste URL with title "Portfolio & Blog"

## Adding new posts

1. Copy any existing post file in `posts/`
2. Update: title, date, category badge class, body content, post-nav links
3. Add a card to `finance.html` (or `for-students.html` for placement posts)
4. Add a card to `index.html` home section
5. Push to GitHub — site updates automatically

## Customisation notes

- **Colours:** All defined as CSS variables at the top of `css/style.css`
- **Navy:** `#0D2B55` | **Gold:** `#b8860b` | **Teal:** `#1e6b50`
- **Finance badge:** `.badge-finance` | **Placement badge:** `.badge-placement`
- **LinkedIn URL:** update in `about.html`, `index.html`, `for-students.html`, `finance.html`, `projects.html`, and all post files
