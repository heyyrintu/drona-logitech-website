# Drona Logitech Daylight Art Deco Redesign Plan

## Objective

Rebrand and redesign the complete Drona Logitech website as a light-first Art Deco logistics experience. Preserve the existing services, industries, clients, blog, FAQ, company information, routes, SEO safety, and contact configuration while replacing the former dark terminal treatment with a sunlit editorial system.

The visual direction combines the references' monumental typography and disciplined architecture with transport-age geometry: ivory paper, parchment fields, lacquer red, warm brass, stepped rules, lozenges, fans, and asymmetric editorial grids. Near-black is reserved for readable type and small contrast details; no large dark surface is part of the primary theme.

## Audience and primary journey

The site serves manufacturing, pharmaceutical, automotive, FMCG, and retail decision-makers evaluating an integrated logistics partner. The primary journey is: understand the offer, establish operational credibility, inspect a relevant service or industry page, and request a quote.

## Route coverage

- Home, About, Services, Industries, Clients, Blog, Contact, and Not Found.
- Six service detail pages and three industry detail pages.
- Blog index and both current articles.
- Crawler surfaces: metadata, JSON-LD, robots, sitemap, RSS, manifest, and llms.txt.

## Implementation sequence

1. Replace inverted dark tokens with semantic light ramps and accessible red/brass accents.
2. Update global typography, paper textures, Deco frames, buttons, focus states, hero fans, panels, and reduced-motion behavior.
3. Rework the shared header, typographic wordmark, footer, page heroes, cards, forms, FAQs, and conversion bands for the light system.
4. Apply the system to the homepage and every listing/detail route without changing operational content.
5. Refresh temporary social artwork for the light brand direction.
6. Verify responsive behavior, static export, brand/configuration safety, and the Coolify Docker image.

## Acceptance checklist

- [ ] Every page is light-first: ivory/parchment surfaces dominate and no large noir band remains.
- [ ] Art Deco is expressed through typography, framing, stepped rules, lozenges, fans, and editorial composition—not color alone.
- [ ] Signal red and logistics amber remain recognizable brand accents with readable contrast.
- [ ] The public brand reads Drona Logitech and no legacy brand/domain is shipped.
- [ ] Every existing content route builds and retains its source content.
- [ ] Header navigation, mobile menu, FAQs, CTAs, and contact states are keyboard accessible.
- [ ] Motion respects `prefers-reduced-motion`; layouts work on mobile, tablet, and desktop.
- [ ] An unconfigured build is non-indexable and exposes no old contact endpoints.
- [ ] A configured build restores canonical URLs, sitemap output, and contact delivery.
- [ ] The production static build and Docker health check succeed.
