# Waldhaus 2 — Owner Fest Demo

A polished mobile-first guest app concept for private holiday homes in Kerschenbach / Eifel.

## Demo goal

The product is intentionally presented as more than a website: it accompanies guests before arrival, during the stay, and at checkout — while giving owners a white-label digital guest experience they can customize for their own property.

## Included in this demo

- premium guest home screen
- live weather via Open-Meteo (with graceful demo fallback)
- dynamic arrival/stay presentation
- curated local guide for Kerschenbach / Stadtkyll / Kronenburg
- digital housebook
- interactive checkout checklist with local persistence
- owner sales mode
- live white-label house-name and visual-mood customization
- installable PWA shell + offline cache for local app files
- responsive desktop/mobile navigation
- reduced-motion accessibility support and keyboard focus states

## Architecture

This owner-fest version deliberately has no build step so it is easy to demo and deploy. `index.html`, `styles.css`, and `app.js` form the static app shell. Production multi-user auth, owner CMS, central database, tenant isolation, media management, analytics, and automated content freshness belong to the next product phase rather than being faked in the sales demo.

## Local preview

Serve the folder through any static HTTP server (service workers do not run on `file://`).
