# Shutong Zhong's academic homepage

A static academic website focused on human musculoskeletal modeling, reinforcement learning, and exoskeleton control. Built with semantic HTML, responsive CSS, and a small vanilla JavaScript enhancement layer.

## Preview

Run `python -m http.server 8765 --bind 127.0.0.1` in the repository, then open `http://127.0.0.1:8765/`. Opening `index.html` directly also works.

## Update content

- `index.html`: biography, current research, publications, projects, photography, and contact information.
- `assets/css/site.css`: layout, colors, responsive behavior, and print styling.
- `assets/js/site.js`: mobile navigation, active-section tracking, and keyboard-accessible image galleries.
- `cv/`: the existing English and Chinese CVs. The PDFs have not been revised as part of the homepage refresh.
- `video/`: original project videos; `video/web/` contains smaller playback copies. Cover images are extracted from the original videos.

The current research section describes ongoing directions, without adding unverified publications, experimental results, or human-subject outcomes. Previous publication titles, venues, and resource links are retained from the original site. Replace or supplement these with new verified work when available.

## Hosting

GitHub Pages can serve the repository root directly. No dependency installation or compilation is required.

`node scripts/build.mjs` collects the referenced public assets into `dist/` for static hosting. `.openai/hosting.json` identifies the private Sites review copy; it does not change the GitHub Pages domain or deployment settings.

The original site used the Strata template by [HTML5 UP](https://html5up.net). Attribution and the original license are retained.

NYU logo: unmodified university artwork, [NYU short color on Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Nyu_short_color.svg), attributed there to New York University and its identity downloads. Used to identify academic affiliation.
