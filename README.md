# Niranjan — Portfolio

My personal portfolio: **[tgvenomyt.github.io/website](https://tgvenomyt.github.io/website/)**

Data scientist & AI builder. This site showcases my real projects — an AI email command
center with a scikit-learn spam classifier, a real-time AI phone agent, a production
client website, and more — every card links to actual code.

## Built with

- **Vanilla HTML, CSS & JavaScript** — no frameworks, no build step
- **Notion-style UI**: app window with sidebar, topbar, page icon & properties,
  callouts, to-do blocks, toggles, a gallery-view project database, a skills
  table, code blocks, web-bookmark cards with live site previews, and Notion's
  pastel tag palette
- **Old-paper background**: layered SVG turbulence textures, stains, and a
  burnt-edge vignette behind the floating app window
- Collapsible sidebar (drawer on mobile), copy-email & share with Notion-style
  toasts, live "Edited" IST clock, typed-in code-block lines
- Live stats pulled from the GitHub API
- Fully responsive and accessible — skip link, `prefers-reduced-motion`, focus rings

## Run locally

```bash
git clone https://github.com/TGvenomYT/website.git
cd website
python3 -m http.server 8001
```

Then open `http://localhost:8001`.
