<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Casual Brothers Site Notes

## Brand

- Primary green: `#7cff00`.
- Darker green / hover: `#34b300`.
- Black: `#0e0e0e`.
- Subtle gray: `#e6e6e6`.
- White: `#ffffff`.
- Global brand tokens live in `src/app/globals.css`. Prefer using `bg-brand`, `text-brand`, `bg-background`, and the existing brand opacity helpers over hard-coded one-off colors.

## Logos And Assets

- Current website logo for dark backgrounds: `public/images/branding/cb-digital-w.png`.
- SVG version is also available at `public/images/branding/cb-digital-w.svg`, but the PNG is currently used in header/footer to avoid font-rendering ambiguity inside the SVG.
- Favicon: `public/images/branding/cb-icon-01.svg`.
- Standalone icon variants are in `public/images/branding/`.
- Original source branding files are outside the app at `../Branding/Logo Casual Brothers/`.

## Typography

- Body/readable text uses Inter via `next/font/google`.
- Display text uses Montserrat via `next/font/google`.
- `font-display` should be reserved for headings, section titles, stats, short labels, and compact high-impact UI text.
- Do not use `CB-Font-Regular-v1.008-narrow.ttf` globally. It is too strong for large page-wide headings. It remains available at `public/fonts/CB-Font-Regular-v1.008-narrow.ttf` for rare accent use only.
- If changing font setup, remember that Tailwind token indirection may not expose the Next font CSS variable as expected; verify actual computed `font-family` in the browser.

## 3D Mini Game

- The home/About interactive diorama is `src/components/3d/DioramaPlaceholder3D.tsx`.
- It is mounted in the home About section via `src/components/sections/AboutSection.tsx` and in the About page via `src/app/[locale]/about/AboutHero3D.tsx`.
- The canvas wrapper is `src/components/3d/Scene3DWrapper.tsx`.
- Interactive scenes must pass `interactive` to `Scene3DWrapper`; otherwise `pointer-events` are disabled and clicks will not reach the canvas.
- The minigame is intentionally simple: start button, score, timer, clickable meteorites, laser feedback. Keep interaction readable in the home section and avoid HUD positions that sit under the fixed header.

## Verification

- Use `npm run build` as the main production check. It may need network access because Inter/Montserrat are loaded through `next/font/google`.
- `npm run lint` currently reports pre-existing issues outside the brand/minigame work, especially React compiler lint warnings in `src/components/ui/MobileMenu.tsx`. Do not assume a lint failure is caused by a local change without reading the output.
- For visual changes, verify `http://localhost:3000/es` in the browser and check at least the hero and the About minigame section.
