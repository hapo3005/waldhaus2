# Waldhaus2 Design System

## Design read
Waldhaus2 is a premium, calm and highly usable digital guest experience for a holiday home in the Eifel. It should feel attractive to younger guests, obvious to first-time users and comfortably readable and operable for people of every age.

The product is not a dark luxury app and not a generic SaaS dashboard. Its strongest identity comes from the Eifel Linen & Forest palette, real local photography, simple navigation and a warm hospitality tone.

## Non-negotiable product rule
**Preserve proven structure.** The guest journey and the visual structures approved after PR #14 must not be broadly rearranged for style alone. Improvements should be surgical: typography, contrast, spacing, photography, states and responsive details. A redesign needs a clear usability benefit, not merely a different aesthetic.

## Core palette
- Linen Background `#F1EEE5`
- Warm Ivory `#FBF9F4`
- Forest Green `#1F3A30`
- Deep Forest `#13261F`
- Primary Ink `#1F2521`
- Muted Ink `#4B554E`
- Soft Sage `#DDE2D8`
- Warm Gold `#D6A65A`
- Warm White `#F8F5ED`

Gold is an accent, never body text on light backgrounds. Forest is the primary brand/action color. Photography carries most of the emotional color.

## Typography and readability
- Ordinary important text should normally render at **16px or larger**.
- Secondary labels may be smaller only when they are not required to understand or operate the interface.
- Small body copy should not be faded merely to create hierarchy; hierarchy comes from size, spacing and weight first.
- Target strong contrast rather than minimum-pass contrast. Muted Ink on Ivory is deliberately around the AAA range.
- Line height for reading text should generally be about 1.55–1.7.

## Layout principles
1. Preserve the guest journey: **Heute → Aufenthalt → Entdecken → Haus → Abreise**.
2. Keep the restored Aufenthalt timeline/card composition unless a concrete usability problem requires change.
3. Keep Haus and Abreise scannable and card-based where the cards improve recognition.
4. Use generous spacing and clear section rhythm instead of adding decorative UI.
5. Use real photography for real places whenever imagery claims to show a named location.
6. Keep dark Forest areas as anchors; ordinary information mostly lives on Linen / Ivory.

## Interaction and motion
- Frequent navigation should feel immediate.
- Motion is feedback, not decoration.
- Press feedback may use subtle scaling around `.98`.
- UI transitions should generally stay under 250ms.
- No bounce or continuous decorative motion.
- Respect `prefers-reduced-motion`.

## Universal design
Accessibility is the default product, never a separate senior mode.

- Important controls target roughly 44–48px minimum hit areas.
- Mobile navigation labels remain clearly readable.
- Focus states must remain obvious.
- Information must never depend on color alone.
- Photo cards require reliable dark overlays behind light text.
- Respect `prefers-contrast: more` and `prefers-reduced-transparency`.

## Quality gate before merge
For visual work, verify: no useful text became smaller or lower contrast; Aufenthalt did not lose its approved composition; named-place imagery is genuine; mobile hit targets remain comfortable; the change creates an obvious benefit rather than novelty.
