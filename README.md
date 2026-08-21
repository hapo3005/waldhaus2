# Waldhaus 2

Waldhaus2 is the optimized successor to the original `Waldhaus`: a focused mobile-first guest experience and lightweight owner workspace for the holiday homes in Kerschenbach / Eifel.

## Product principle

Reuse what already worked in the original Waldhaus, simplify it, and only add functionality that is useful for the small Kerschenbach owner group. Waldhaus2 is deliberately not being expanded into a generic vacation-rental SaaS at this stage.

## Guest experience

- time-aware home screen without fake guest data
- live Kerschenbach weather via Open-Meteo with a neutral unavailable state
- arrival and stay guidance
- curated Kerschenbach / Stadtkyll / Kronenburg guide, including verified food recommendations
- digital housebook
- interactive checkout checklist with local persistence
- installable PWA shell and offline cache for local app files
- responsive desktop/mobile navigation
- reduced-motion accessibility support and keyboard focus states

## Modes

The normal GitHub Pages URL is the guest-facing Waldhaus and does not expose an owner/demo switch.

- Guest: `/waldhaus2/`
- Owner workspace: `/waldhaus2/?owner=1`
- Presentation/demo mode with example data and sales content: `/waldhaus2/?demo=1`

The query-string owner mode is currently only a UX separation for this static prototype, **not authentication**. Real authentication, central storage and tenant isolation are production infrastructure for a later validated phase.

## Owner workspace

- monthly occupancy view
- upcoming stays
- open inquiries
- manual stay entry
- overlap protection
- source labels (Direkt / Booking / Airbnb / Privat)
- house-name and visual-mood customization

Normal mode removes old demo seed rows automatically. Demo rows are created only in explicit `?demo=1` presentation mode.

## Architecture

There is intentionally no build step. `index.html`, `styles.css`, `app.js`, `owner-ops.js` and `owner-ops.css` form the static app shell. Production multi-user auth, owner CMS, central database, tenant isolation, media management, channel synchronization, payments and analytics are not faked in the static version.

## Local preview

Serve the folder through any static HTTP server (service workers do not run on `file://`).
