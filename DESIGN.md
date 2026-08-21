# Waldhaus2 Design System

## Design read
Waldhaus2 is a premium, calm and highly usable digital guest experience for a holiday home in the Eifel. The product should feel modern enough for younger guests, obvious enough for first-time users and comfortably readable and operable for people of every age.

The design is intentionally **not** a dashboard, not a dark luxury app and not a collection of equal cards. It should feel closer to a well-designed hospitality product with an editorial travel layer.

## Design dials
- Design variance: **5/10** — controlled asymmetry and visual rhythm without experimentation that harms orientation.
- Motion intensity: **3/10** — quiet, purposeful feedback only.
- Visual density: **4/10** — enough information to be useful, with generous breathing room.

## Core palette
- Linen Background `#F1EEE5`
- Warm Ivory `#FBF9F4`
- Forest Green `#1F3A30`
- Deep Forest `#13261F`
- Primary Ink `#1F2521`
- Muted Ink `#59625B`
- Soft Sage `#DDE2D8`
- Warm Gold `#D6A65A`
- Warm White `#F8F5ED`

Gold is an accent, never a body-text color on light backgrounds. Forest is the primary brand/action color. Photography carries most of the emotional color.

## Typography
Body/UI: `Avenir Next`, `Segoe UI Variable`, `Segoe UI`, sans-serif.

Display/editorial headings: `Iowan Old Style`, `Palatino Linotype`, `Palatino`, `Georgia`, serif. The serif is justified by the hospitality / Eifel / editorial character and should remain concentrated in large headings rather than ordinary UI text.

Important information text should normally render at **16px or larger** with generous line height. Small labels may be smaller when they are genuinely secondary and never the only carrier of important information.

## Layout principles
1. Prefer hierarchy over containers. Not every item gets a card.
2. One visually dominant idea per section.
3. Group related actions into shared surfaces with dividers rather than repeated floating cards.
4. Use photography as a primary storytelling layer in Discover and selected homepage features.
5. Keep dark Forest surfaces as anchors; most ordinary content lives on Linen / Ivory.
6. Preserve the simple guest journey: Heute → Aufenthalt → Entdecken → Haus → Abreise.

## Interaction and motion
- Frequent navigation should feel immediate.
- Button press feedback uses a subtle `scale(.97)` and lasts roughly 120–160ms.
- Hover and state changes animate only the properties that change.
- UI transitions should generally stay under 300ms.
- Entrances use ease-out; on-screen movement uses ease-in-out.
- No bounce or decorative continuous motion.
- `prefers-reduced-motion` removes non-essential motion.

## Universal design
Accessibility is part of the default product, not a special senior mode.

- Strong text/background contrast is maintained across ordinary states.
- Important controls target roughly 44–48px minimum hit areas; mobile navigation is larger.
- Focus states must remain clearly visible.
- Information must never depend on color alone.
- Photo cards require dark overlays behind text.
- `prefers-contrast: more` strengthens secondary contrast.
- `prefers-reduced-transparency` removes glass effects where supported.

## Preserve
Future redesigns should preserve the useful existing product substance: verified local content, guest journey, owner usefulness, real photography, swipe behavior, offline/PWA capability and the Eifel Linen & Forest identity. Improve by simplifying and refining, not by rebuilding for novelty.
