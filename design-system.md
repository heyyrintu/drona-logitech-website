# Drona Logitech Design System

## Brand character

**Daylight Deco.** The website treats logistics as modern infrastructure with the refinement of a 1930s transport terminal. Its visual language is architectural and editorial: monumental geometric type, narrow labels, ordered grids, stepped cornices, double keylines, diamonds, chevrons, and restrained sunburst fans.

The system is light-first. Ivory and parchment carry the interface; charcoal is reserved for text; red lacquer signals action; amber and brass draw routes, frames, and highlights. It should feel precise, optimistic, and premium rather than theatrical or gothic.

## Color

| Token | Value | Use |
| --- | --- | --- |
| Warm Paper | `#FFFCF7` | Main page, navigation, card and input surfaces |
| Parchment | `#F7F0E3` | Alternate bands, heroes, footer, CTA bands |
| Pale Inlay | `#F6E7D4` | Hovered panels and framed wells |
| Ink | `#171418` | Headings and high-emphasis text |
| Muted Ink | `#534C46` | Body copy |
| Signal Red | `#DE1C1C` | Primary actions and one enamel feature plate |
| Ember Red | `#941217` | Hover/pressed states and accessible red text |
| Logistics Amber | `#FEA418` | Golden fills and motion highlights |
| Brass | `#8A5A00` | Accessible labels, rules, keylines and icons |

Ivory/parchment should occupy roughly 80% of a page, ink 15%, and red/amber 5%. Yellow is never used for body copy. Dark colors must not become full-page or full-width surfaces.

## Typography

- **Jost**, weights 300–700, handles body copy, navigation, UI labels, card titles, and supporting headings. Its geometric construction recalls Futura without compromising readability.
- **Poiret One** is reserved for large page titles, section titles, statistics, and closing statements via `.deco-display`. It is never used for small copy.
- Display headings are uppercase with deliberate tracking and compact line height.
- Body copy is 16–18px with 1.7–1.8 line height and a 65–75 character measure.
- Eyebrows and labels are 9–11px uppercase with 0.2–0.32em tracking.

## Geometry

- Corners remain square; genuine discs are permitted only for status/medallion semantics.
- The lozenge (a square rotated 45 degrees) is the recurring unit mark for bullets, status points, icon frames, and route stations.
- Chevrons indicate movement through the supply chain.
- Panels use brass hairlines and opposing corner brackets instead of soft shadows or glass blur.
- Double keylines frame major hero diagrams and feature plates.
- Stepped triple rules form header/footer cornices.
- Sunburst fans appear only in heroes, feature plates, and the closing CTA. They remain pale enough that text never crosses a busy field.

## Surfaces and depth

- `.surface-hall`: parchment-to-ivory architectural hero with subtle brass rays and a restrained red glow.
- `.deco-panel` / `.glass-panel`: warm-paper face, brass hairline, Deco corner brackets, pale inlay hover.
- `.night-surface`: retained as a compatibility class but now resolves to a light parchment field.
- `.grid-texture-light`: very low-contrast vertical fluting.
- Depth comes from one hard offset tint or an inset keyline, never dark glass, blurred neon, or heavy drop shadow.

## Components

- **Header:** sticky ivory entablature with a brass lower rule, red active marker, light mobile drawer, and red quote plaque.
- **Logo:** temporary DL lozenge and tracked wordmark; isolated so official artwork can replace it later.
- **Buttons:** rectangular plaques, uppercase labels, visible inset keyline, 44px minimum height. Primary is red; secondary is paper with a brass frame; amber is reserved for a highlighted conversion action.
- **Cards:** warm paper, square corners, thin brass construction lines, generous internal spacing, and no translucent blur.
- **Statistics:** one continuous ruled register rather than floating tiles.
- **Forms:** ivory input wells with ink text, brass border and red focus state.
- **FAQ:** native `details`/`summary`; the framed plus rotates on open.
- **Footer:** parchment facade with stepped brass cornice and ink text—never a dark closing block.

## Signature chain frieze

Five logistics stations sit on one brass spine inside a double-keyline paper plate. A golden packet moves between stations and briefly changes each node from brass to red. The horizontal Chain Rail repeats the same motif beneath the services introduction.

This is the primary visual metaphor: one accountable route through every link of the chain. It is code-native, static-export safe, and informative without requiring imagery.

## Motion

- Interaction transitions: 180–300ms, limited to color, border, and small directional movement.
- Section reveals: 500ms with a short stagger.
- Chain packet: slow 5s loop.
- No fixed backgrounds, parallax, floating glass, or large animated glows.
- With `prefers-reduced-motion: reduce`, reveals, marquees, packets, pulses, and float motion stop while all information remains visible.

## Accessibility and responsive behavior

- Body and label colors meet WCAG AA on paper/parchment surfaces.
- Bright amber is used as fill or decoration; accessible brass is used for small text.
- Every interactive element has a 2px red/brass focus outline with offset.
- State is never color alone: active navigation also has a rule, FAQ state rotates, and mobile navigation uses a lozenge.
- Touch targets are at least 44px and multi-column layouts stack below tablet.
- Decorative geometry is `aria-hidden`; heading order and landmark semantics are preserved.

## Logo handoff

Until the official logo is supplied, the wordmark uses a double-keyline DL lozenge beside tracked uppercase type. The asset remains isolated in `components/Logo.jsx`, so the official mark can replace it without changing the header or footer.
