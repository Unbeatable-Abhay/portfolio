# agents.md — Abhay Chauhan Portfolio

This file is the single source of truth for this project. Both Claude and Antigravity (or any other AI agent working on this repo) must read this file before making any change and follow it strictly. If a requested change conflicts with this file, flag the conflict rather than silently deviating. If this file is updated, treat the update as final and binding from that point forward.

---

## 1. Project Overview

**What this is:** A personal portfolio website for Abhay Chauhan, a 2nd-year B.Tech CSE-AI student at NIET, Greater Noida, showcasing his projects, skills, and background.

**Primary goals (in order of importance):**
1. Support internship/job applications — must look professional and credible to recruiters
2. General professional presence/networking
3. Serve as a portfolio piece in itself (the build quality reflects on the developer)

**Audience:** Recruiters, hiring managers, hackathon organizers, fellow developers, general visitors via shared link or `is-a.dev` domain.

**Non-goals:** This is NOT a blog, NOT a CMS admin panel, NOT a multi-user application. It is a static, content-driven single-page site.

---

## 2. Tech Stack (exact, no substitutions without explicit user approval)

| Layer | Choice | Notes |
|---|---|---|
| Framework | React 18.x | Functional components + hooks only. No class components. |
| Build tool | Vite | Default React+Vite template as base |
| Styling | Tailwind CSS 3.x | Utility-first. No separate CSS files except `index.css` for Tailwind directives + font-face/base setup |
| Animation | Framer Motion | All scroll/hover/transition animation goes through this, not raw CSS transitions/keyframes |
| Icons | lucide-react | If icons are needed, use this library — do not introduce a second icon library |
| Routing | None | This is a single-page scroll site. No React Router. |
| State management | React built-in (useState/useContext) only | No Redux/Zustand/etc. — unnecessary for this app's complexity |
| Package manager | npm | Do not switch to yarn/pnpm |

**Do not add any other dependency without explicit user approval first**, including UI component libraries (no shadcn/ui, no MUI, no Chakra). The design system in this file is the styling source of truth.

---

## 3. Hosting & Deployment

- **Host:** Render (Static Site)
- **Source:** GitHub repository, auto-deploy on push to `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Environment variables:** None required for v1 (no backend, no API keys needed client-side)
- **Domain:** Initially `<app-name>.onrender.com`. A custom subdomain will later be registered via [is-a.dev](https://github.com/is-a-dev/register) pointing a CNAME record at the Render URL. This is a later phase — do not build any domain-specific logic now.

---

## 4. Folder/File Architecture

Standard Vite structure, content strictly separated from presentation:

```
/
├── agents.md                  # this file
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── resume.pdf             # downloadable resume (added when ready)
├── src/
│   ├── main.jsx
│   ├── App.jsx                 # composes sections in order, nothing else
│   ├── index.css                # Tailwind directives + @font-face/base styles only
│   ├── data/
│   │   ├── bio.json
│   │   ├── skills.json
│   │   └── projects.json
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Contact.jsx
│   │   └── ui/
│   │       ├── ProjectCard.jsx
│   │       ├── SkillChip.jsx
│   │       └── Button.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   └── hooks/
│       └── useScrollAnimation.js   # only if shared animation logic is needed across sections
```

**Rules:**
- A component in `sections/` represents one full page section and is composed only in `App.jsx`.
- A component in `ui/` is a small reusable piece used by one or more sections — it must not import from `data/` directly; data is passed down as props from the section that owns it.
- A component in `layout/` is structural (navbar, theme toggle) and persists across the whole page, not tied to a single scroll section.
- No component should exceed roughly 150 lines. If a section component grows beyond that, extract sub-pieces into `ui/`.

---

## 5. Content Data Schema

All user-facing content lives in `src/data/*.json`. **No project, skill, or bio text may be hardcoded inside a component.** Components read from these files (imported directly, since this is a static site with no runtime CMS).

### `bio.json`
```json
{
  "name": "Abhay Chauhan",
  "taglines": [
    "B.Tech CSE-AI student building full-stack projects",
    "Backend Developer & AI-ML Enthusiast"
  ],
  "email": "abhaychauhan4206@gmail.com",
  "socials": {
    "github": "https://github.com/Unbeatable-Abhay",
    "linkedin": "https://linkedin.com/in/unbeatableabhay4206"
  },
  "about": "2nd-year B.Tech CSE-AI student at NIET, Greater Noida, passionate about building practical tools using Python and Flask, with a strong interest in automation and AI-integrated systems. Learns by building — taking ideas from concept to deployed product. Looking to contribute to real-world software projects while growing in a professional environment.",
  "education": {
    "institution": "Noida Institute of Engineering and Technology (NIET)",
    "degree": "B.Tech, Computer Science Engineering (AI)",
    "year": "2nd Year",
    "location": "Greater Noida, Uttar Pradesh, India"
  },
  "resumeUrl": "/resume.pdf",
  "photoUrl": "/profile-cutout.png"
}
```
Note: phone number is intentionally excluded from all public-facing content per explicit instruction. Do not add it back without explicit user approval.

**Photo field rules:**
- `photoUrl` must point to a background-removed (transparent) PNG placed in `public/`.
- This field is swappable exactly like every other content field — changing the photo means replacing the file and/or updating this string, never touching component code.
- If `photoUrl` is empty or the file is missing, the Hero must degrade gracefully (e.g. render just the glow shape with no broken image icon, or omit the photo slot entirely) — never show a broken-image placeholder.
- Until a real photo is provided, use a simple placeholder silhouette shape in its place — do not generate or fabricate a depiction of a real person.

### `skills.json`
```json
{
  "categories": [
    { "name": "Languages", "skills": ["Python", "JavaScript", "HTML", "CSS"] },
    { "name": "Frameworks & Libraries", "skills": ["Flask", "React", "LangChain", "LangGraph", "discord.py", "SQLAlchemy"] },
    { "name": "AI / ML Tools", "skills": ["Groq", "Ollama", "Replicate", "Tavily", "LangChain Agents"] },
    { "name": "Tools & Platforms", "skills": ["Git", "GitHub", "Render", "Replit", "VS Code", "PyCharm"] },
    { "name": "Concepts", "skills": ["REST APIs", "Data Structures & Algorithms"] }
  ]
}
```

### `projects.json`
```json
{
  "projects": [
    {
      "id": "dash",
      "title": "Dash",
      "description": "Personal infrastructure monitoring dashboard integrating Render, Tavily, cron-job.org, and GitHub APIs. Includes a Monitor tab with cron job drift graphs, PWA support, and light/dark themes.",
      "techStack": ["Flask", "React", "Vite", "Render API", "Tavily", "cron-job.org API", "GitHub API"],
      "githubUrl": "https://github.com/Unbeatable-Abhay/dash",
      "liveUrl": "https://dash-mvip.onrender.com",
      "imageUrl": "",
      "featured": true,
      "visible": true,
      "order": 1
    },
    {
      "id": "gov-awareness",
      "title": "Gov Awareness",
      "description": "AI-powered platform helping Indian citizens discover government schemes and understand their legal rights, with a ReAct agent (LangGraph + Groq LLaMA 3.3 70B + Tavily web search).",
      "techStack": ["React", "Flask", "LangChain", "LangGraph", "Tavily", "Groq LLaMA 3.3 70B"],
      "githubUrl": "https://github.com/Unbeatable-Abhay/gov_awareness",
      "liveUrl": "https://gov-project-front.onrender.com",
      "imageUrl": "",
      "featured": true,
      "visible": true,
      "order": 2
    },
    {
      "id": "beru-bot",
      "title": "Beru Bot",
      "description": "AI-powered Discord bot for automated text and video content generation (Groq + Replicate), with a custom web dashboard featuring a Bento-style asymmetric grid UI and dark/light theme toggle.",
      "techStack": ["Flask", "Discord API", "Groq", "Replicate"],
      "githubUrl": "https://github.com/Unbeatable-Abhay/beru_bot",
      "liveUrl": "https://beru-bot-t7c6.onrender.com",
      "imageUrl": "",
      "featured": true,
      "visible": true,
      "order": 3
    },
    {
      "id": "sync",
      "title": "SYNC",
      "description": "Student team-builder platform prototype — helps students find and connect with project teammates, with college email verification and profile pages. Pitched at Imperia hackathon with a warm minimal UI.",
      "techStack": ["Flask", "HTML", "CSS"],
      "githubUrl": "https://github.com/Unbeatable-Abhay/SYNC",
      "liveUrl": "",
      "imageUrl": "",
      "featured": false,
      "visible": true,
      "order": 4
    },
    {
      "id": "warehouse-management",
      "title": "Warehouse Management System",
      "description": "Flask-based inventory tracking system built as a DSA academic project — implements hash maps, binary search, and a linked-list stack for undo functionality.",
      "techStack": ["Python", "Flask"],
      "githubUrl": "https://github.com/Unbeatable-Abhay/warehoue_manager",
      "liveUrl": "",
      "imageUrl": "",
      "featured": false,
      "visible": true,
      "order": 5
    },
    {
      "id": "tic-tac-toe",
      "title": "Tic Tac Toe",
      "description": "PLACEHOLDER — details to be confirmed.",
      "techStack": [],
      "githubUrl": "https://github.com/Unbeatable-Abhay/Tic_Tac_Toe",
      "liveUrl": "",
      "imageUrl": "",
      "featured": false,
      "visible": false,
      "order": 6
    },
    {
      "id": "birthday-wisher",
      "title": "Birthday Wisher",
      "description": "PLACEHOLDER — automation project that sends birthday wishes. Details to be confirmed.",
      "techStack": [],
      "githubUrl": "https://github.com/Unbeatable-Abhay/birthday_wisher",
      "liveUrl": "https://birthday-wisher-t2uz.onrender.com",
      "imageUrl": "",
      "featured": false,
      "visible": false,
      "order": 7
    },
    {
      "id": "discord-bot",
      "title": "Discord Bot",
      "description": "PLACEHOLDER — standalone Discord bot project. Details to be confirmed.",
      "techStack": ["discord.py"],
      "githubUrl": "https://github.com/Unbeatable-Abhay/discord_bot",
      "liveUrl": "",
      "imageUrl": "",
      "featured": false,
      "visible": false,
      "order": 8
    }
  ]
}
```

**Schema rules:**
- `visible: false` → project must NOT render anywhere, including in counts/totals.
- `order` controls display sequence ascending; ties broken by array order.
- `featured: true` MAY receive visually distinct treatment (e.g., larger card) but this is optional polish, not required for v1.
- Empty string/array = "no data yet." Components must handle this gracefully (e.g., hide the live-demo button if `liveUrl` is `""`, don't render a broken tag list if `techStack` is `[]`).
- Never invent a description, tech stack, or link for a project. If a field is empty or marked PLACEHOLDER, leave it as-is and surface it to the user — do not fabricate plausible-sounding content.

---

## 6. Design System

### Theme
- Dark mode (default) and light mode, toggle persisted in `localStorage`, initial value falls back to `prefers-color-scheme` media query if no stored preference exists.
- Toggle lives in the Navbar (top-right convention).
- **Toggle style:** Sun/Moon icon swap (lucide-react `Sun`/`Moon` icons), animated transition between the two via Framer Motion (`motion.div` with scale/rotation), not a simple sliding pill toggle. Must include an `aria-label` reflecting current state for accessibility.
- Theme switch must animate smoothly (no jarring snap) — transition background/text color over ~300ms.
- **CRITICAL: theme must apply globally, not per-component.** The theme state (dark/light) lives in one place — `ThemeContext` — and every single component that renders any color (backgrounds, text, borders, glows, shadows) must consume its colors from the shared design tokens (Tailwind theme extension / CSS variables) rather than hardcoding a color locally. There must be no component, section, or card that fails to respond when the toggle is flipped. When implementing or testing the toggle, verify ALL of: Navbar, Hero (including the photo's glow/shadow color), About, Skills (chips), Projects (cards), Contact, and the page background itself all switch together, in the same instant, with no section left in the wrong theme.

### Navbar style
- **Glassmorphic sticky navbar:** translucent background with backdrop blur (e.g. `bg-background/80 backdrop-blur-md`), rather than a solid opaque background. Must remain legible and on-brand in both dark and light mode — re-check blur/opacity values per theme, since a blur tuned for dark mode may look washed out or too faint in light mode.
- Bottom border using the secondary accent tint at low opacity (e.g. `border-accent-secondary/10`) rather than a hard neutral border, to keep it feeling premium rather than utilitarian.
- This applies to the Navbar specifically — it is not a general "glassmorphism everywhere" directive. Other surfaces (cards, sections) still follow the solid background-color system described below unless explicitly changed here.

### Colors
| Token | Dark mode | Light mode |
|---|---|---|
| Background | `#0a0a0f` | `#fafafa` |
| Text (primary) | `#f5f5f7` | `#0a0a0f` (near-black) |
| Accent (primary) | Violet, `violet-500` range (`#8b5cf6`) | same |
| Accent (secondary/tint) | Lighter violet/lavender, used for subtle backgrounds/borders/hover | same |

Accent color is used sparingly — for CTAs, links, key headings, hover glows. It must not flood large surface areas; the design should still read as minimal.

### Typography
- **Headings:** Space Grotesk (bold weights)
- **Body:** Inter
- Both loaded via Google Fonts or self-hosted — agent's choice on method, but font names/weights must not change without approval.
- Type scale: hero heading should be large and confident (roughly 4–6rem desktop, scaled down responsively). Clear visual hierarchy between hero / section headings / body text. Generous line-height on body copy.

### Motion principles
- Scroll-triggered entrance: fade + slight upward slide (Framer Motion `whileInView`) for sections and cards as they enter viewport.
- Skill chips: staggered fade/slide-in animation, grouped by category, on scroll into view.
- Hover states (project cards, buttons): subtle lift and/or glow — restrained and premium-feeling, not bouncy or playful.
- Tagline in Hero: typewriter effect (see Page/Section Structure → Hero for full detail).
- All animation durations: 400–600ms max for discrete interactions (hover, entrance). The persistent background animation (below) is the one deliberate exception, since it is a slow ambient effect, not an interaction response.
- Theme toggle transition: smooth, no flash/snap.

### Animated background (global)
- A persistent, ambient animated background runs behind the ENTIRE page — not just the Hero — and remains visible (scrolling underneath/behind all sections) for the full length of the scroll.
- **Technique:** a small number (2–4) of large, soft-edged, blurred violet gradient blobs (CSS `radial-gradient` shapes, heavily blurred), slowly drifting/morphing position over a long duration (think 15–30+ second loops per blob) using CSS `@keyframes` or Framer Motion's `animate` with infinite repeat. Motion should be slow, ambient, and barely-there — felt more than seen — never distracting from foreground content.
- **Layering:** the animated background sits behind all content (`position: fixed` or absolutely positioned within a full-height wrapper, `z-index` below all sections), with sections/content rendered on top with normal/transparent backgrounds so the blobs remain visible through them.
- **Performance:** use `transform`/`opacity` animations only (GPU-accelerated), never animate `top`/`left`/`width`/`height` directly, to avoid layout thrashing. Respect `prefers-reduced-motion`: if the user's system requests reduced motion, the background should remain static (no animation) rather than forcing motion on them.
- **Theme responsiveness:** blob color/opacity must be tuned per theme — likely lower opacity and possibly slightly different tone in light mode so the effect stays subtle rather than overwhelming a light background.
- This is a separate concern from the Hero's photo-specific gradient mask/scrim — the ambient background blobs run page-wide and independently of the Hero photo treatment.

**Implementation deviations approved 2026-07-17:**
- Uses three blobs (within the 2–4 spec range) with independent opacity scales: light mode `bg-accent/4`, `bg-accent/3`, `bg-accent/2`; dark mode `bg-accent/8`, `bg-accent/6`, `bg-accent/4`.
- Drift uses custom `x`/`y` coordinate arrays (e.g. `[0, 60, -30, 0]`) over 20–32s loop durations via Framer Motion `animate`, satisfying the transform-only performance rule.
- **Open verification item:** `prefers-reduced-motion` handling has not yet been confirmed against the running build. Must be checked before this section ships — animation should fall back to static when the OS setting requests it, per the original spec requirement above. Do not mark this deviation fully closed until confirmed.

---

## 7. Page / Section Structure

Single-page scroll, in this exact order:

1. **Navbar** (sticky/fixed)
   - ~~Logo/name on left~~ — **removed per explicit user decision, 2026-07-17.** Original spec called for `bio.json.name` displayed here, but this duplicated the Hero's large name heading directly below it, so it was dropped. **Resolved layout (approved 2026-07-17):** desktop nav links moved to the left slot in the logo's place, theme toggle remains on the right; mobile hamburger drawer contains links only, no name/logo.
   - Smooth-scroll links to: About, Skills, Projects, Contact
   - Sun/Moon icon theme toggle on right (see Design System → Theme for style)
   - Glassmorphic translucent/blurred background (see Design System → Navbar style)
   - Collapses to hamburger menu on mobile (must be fully functional, not just visually present)

2. **Hero**
   - Two-column split layout at rest, but the photo is large and bleeds toward/behind the text rather than sitting in a small isolated box (see photo treatment below)
   - **Left column (or overlaid on the photo, depending on viewport):** small secondary line "Hi, my name is" → large primary heading with name (Space Grotesk, largest text on the page) → typewriter-animated tagline (see below) → short intro → CTA buttons (e.g. "Get in touch", resume download)
   - **Tagline animation:** typewriter effect — types out each tagline from `bio.json.taglines` character by character with a blinking cursor, pauses briefly once fully typed, deletes it character by character, then types the next tagline. Loops continuously through all taglines. This is the required animation style — not a simple cross-fade/opacity transition.
   - **Photo treatment:** large photo (not a small cutout), edges fading into the page background via a CSS gradient mask/vignette (radial or linear `mask-image`/`-webkit-mask-image`, NOT a hard-edged cutout, NOT a glow blob behind a silhouette). The photo should feel like part of the scene rather than a floating object placed on top of it.
   - **Text-over-photo readability:** wherever hero text overlays the photo, a dark gradient/scrim layer must sit between the photo and the text (e.g. a linear-gradient from transparent to the background color, positioned over the side/area where text sits) to guarantee contrast. This scrim must adapt with the theme toggle — in light mode the gradient direction/color must still guarantee readable contrast against the photo, not just look correct in dark mode.

   **Implementation deviations approved 2026-07-17 (Hero photo, fix round after initial photo was too dark):**
   - Radial mask: `radial-gradient(circle at 60% 45%, black 65%, transparent 95%)` — keeps the inner 65% of the portrait fully solid/visible, fades only the outer band (65%–95%) into the page background. Applied identically to the real photo and the silhouette fallback.
   - Scrim is conditionally rendered: hidden entirely on desktop (`md:hidden`) since the two-column layout keeps hero text clear of the photo at that breakpoint, per the "wherever text overlays the photo" condition already in the spec above. A bottom-to-top scrim (`from-background via-background/50 to-transparent`) remains active below `md`, where the layout stacks and text can sit over the image.
   - Social links (GitHub, LinkedIn, email)

3. **About**
   - Bio text from `bio.json`
   - Education block

4. **Skills**
   - Grouped by category from `skills.json`
   - Rendered as animated tag/chip lists (NOT progress bars, NOT percentage-based — this was an explicit decision)
   - Staggered entrance animation per chip on scroll into view

5. **Projects**
   - Card grid, data-driven from `projects.json`, respecting `visible` and `order`
   - Each card: title, description, tech stack tags, GitHub link, live demo link (if present)
   - Cards where `featured: true` may receive a visually distinct treatment (e.g. spanning a wider grid column, a subtle accent border, or a small "featured" label) to highlight Abhay's strongest work — this is optional polish, not required for v1, but should reuse the `featured` field already present in the schema rather than introducing a new one
   - Gracefully handle missing `imageUrl`/`liveUrl`/empty `techStack` (no broken image icons, no dead buttons)

   **Implementation deviations approved 2026-07-17 (`ProjectCard.jsx`):**
   - Featured cards span `lg:col-span-2` on large screens, with a `Star`-icon badge (filled, accent color), custom border opacity (`border-accent/20 dark:border-accent/15`), and a hover-scaling glow shadow (`shadow-accent/5` → `shadow-accent/10`).
   - Text wrapper uses `pr-16` to prevent overlap with the absolute-positioned badge.
   - Card padding: `p-6 md:p-8`. Tech stack tags: pill-shaped, `bg-accent-secondary/10 border-accent-secondary/20`.
   - Card scroll-trigger uses `-100px` viewport margin for stagger consistency with earlier sections.

6. **Contact**
   - Email (mailto link), GitHub, LinkedIn — direct links only
   - **No contact form** — this was an explicit decision to avoid third-party form-service dependency and reliability concerns
   - Resume download link/button (from `bio.json.resumeUrl`)

   **Implementation deviations approved 2026-07-17 (`Contact.jsx`):**
   - Four links (email, GitHub, LinkedIn, resume) rendered as a single-column stack of cards, `max-w-md`, `p-4` internal padding, on both mobile and desktop.
   - Social link display text strips the `https://` protocol (shown as `github.com/...`, `linkedin.com/...`) for visual neatness — underlying `href` must still resolve to the full URL from `bio.json.socials`; confirm on click-test.
   - Entrance animation: `staggerChildren: 0.12s`, each card slides up (`y: 15`) over `400ms` — at the floor of the standard 400–600ms range.
   - Added Lucide `ArrowUpRight` hover-indicator icon (translate-based micro-animation), additive within the already-approved `lucide-react` library.

**Responsiveness is a hard requirement.** Every section must work cleanly on mobile, including the hamburger nav. Test breakpoints at minimum: mobile (~375px), tablet (~768px), desktop (~1280px+).

---

## 8. Coding Conventions (STRICT)

- **Components:** Functional components only, named with PascalCase, one component per file, file name matches component name.
- **Props:** Destructure props in the function signature. Provide sensible defaults where a prop might be absent.
- **Data access:** Only section-level components (`sections/*.jsx`) import from `src/data/*.json`. They pass data down to `ui/*.jsx` components as props. UI components never import data files directly.
- **Styling:** Tailwind utility classes only, inline in JSX. No inline `style={{}}` objects except for truly dynamic values that can't be expressed as a class (rare — flag if this seems needed). No separate `.css` files per component.
- **Custom design tokens** (colors, fonts) must be defined once in `tailwind.config.js` and referenced via Tailwind class names (e.g. `bg-background`, `text-accent`) — never hardcode hex values directly in component JSX.
- **Animation:** All animation via Framer Motion (`motion.div`, `whileInView`, `whileHover`, etc.). No raw CSS `@keyframes` or `transition` properties for anything user-facing, except: (1) the theme-toggle color transition, which may use Tailwind's `transition-colors`, and (2) `scroll-behavior: smooth` on `html` (added `agents.md` 2026-07-17), used for anchor-link navigation (e.g. "Get in touch" → Contact section) — this is native browser scroll behavior, not a `transition`/`@keyframes` animation, so it falls outside what this rule was written to prevent.
- **Naming:** camelCase for variables/functions, PascalCase for components, kebab-case for non-component file names if any (e.g. data files).
- **No inline magic numbers** for spacing/sizing where a Tailwind scale value exists — use the scale, don't hardcode arbitrary pixel values.
- **Accessibility:** All interactive elements (nav links, buttons, theme toggle, hamburger menu) must be keyboard-navigable and have appropriate `aria-label`s where the visual label alone isn't sufficient (e.g. icon-only buttons).
- **External links:** Any link using `target="_blank"` (GitHub, LinkedIn, or any future external link) must also include `rel="noopener noreferrer"`. Standing rule — apply automatically, no need to flag as a deviation each time.
- **Theme implementation:** Theme state must be managed in a single `ThemeContext` (React Context + `useState`/`useEffect`, persisted to `localStorage`). Every component consumes theme-aware colors via Tailwind classes mapped to CSS variables that change with a `dark`/root class — never via component-local conditional logic like `isDark ? '#000' : '#fff'` scattered across files. A single source of truth for the active theme, applied at the root, must cascade to every descendant automatically through CSS, not through prop-drilling a boolean into every component.
- **Comments:** Use comments sparingly, only where logic is non-obvious. Don't narrate obvious JSX structure.

---

## 9. Explicit Dos and Don'ts

**DO:**
- Keep all content in `src/data/*.json` — adding a project, hiding one, or editing bio text should never require touching component code.
- Handle missing/placeholder data gracefully everywhere (empty arrays, empty strings, `visible: false`).
- Follow the design system exactly as specified (colors, fonts, spacing, motion timing) — consistency between sections matters more than any individual section looking "extra cool."
- Keep the site fully static — no backend, no database, no server-side code of any kind.
- Ask/flag rather than guess when a decision in this file seems ambiguous for a specific implementation detail.

**DON'T:**
- **Never hallucinate or alter any personal information about Abhay.** This includes (but is not limited to): name, bio/about text, education details, project descriptions, tech stacks, links, skills, contact info, and any other fact tied to him as a person. If a piece of information is unknown, missing, or unclear, it must be left blank, marked as a placeholder, or explicitly flagged to the user — never invented, assumed, "filled in plausibly," or guessed at, even partially. This includes not paraphrasing personal facts in a way that changes their meaning (e.g. inflating scope, changing dates, or implying involvement that wasn't stated). Any edit that touches personal information must come directly from what the user has explicitly provided, and only that.
- Don't add a backend, database, authentication system, or contact form/third-party form service. This is explicitly out of scope.
- Don't hardcode any project, skill, or bio content directly into a component — it must come from the JSON data files.
- Don't invent content for placeholder/empty fields (e.g., don't write a fake description for Tic Tac Toe, Birthday Wisher, or Discord Bot — they are intentionally hidden/incomplete).
- Don't include Abhay's phone number, or any reference to a "Hero" company internship, anywhere in the site content. This has been explicitly excluded.
- Don't add Class X/XII education history to the site — only the current B.Tech/NIET entry belongs on the public-facing page.
- Don't introduce new dependencies, libraries, or architectural patterns (routing, state management libraries, CSS frameworks beyond Tailwind, UI component libraries) without explicit user approval first.
- Don't change the color palette, fonts, or core layout structure without explicit user approval — this file is the design source of truth.
- Don't write deployment-specific (Render) logic into the application code itself — deployment config stays at the infra level (build command, publish directory), not in app source.
- Don't build anything related to the `is-a.dev` domain integration yet — that is an explicitly later phase.

---

## 10. Open Items / Known Placeholders

These are intentionally incomplete and should remain so until the user provides more information. Agents must not fill these in independently:

- **Tic Tac Toe, Birthday Wisher, Discord Bot** projects: currently `visible: false` with placeholder descriptions and partial/no tech stack. Do not enable or flesh out until user provides details.
- **Resume PDF**: `bio.json.resumeUrl` points to `/resume.pdf`, but the actual file has not yet been added to `public/`. Site should not break if this file is temporarily missing, but should not ship to production without it.
- **Profile photo**: `bio.json.photoUrl` points to `/profile-cutout.png`, but no real background-removed photo has been provided yet. A placeholder silhouette shape is used in its place in the meantime. Do not generate, fabricate, or hallucinate an image of a real person — wait for the user to supply the actual photo.
- **Project screenshots**: `imageUrl` fields are currently empty across all projects. To be added later — UI must already support this gracefully (no broken image placeholders if empty).

---

*Last updated: 2026-07-17 — added approved implementation deviations for the animated background (Section 6) and `ProjectCard.jsx` featured-card treatment (Section 7.5), logged during build review. One open verification item remains (see Section 6: `prefers-reduced-motion` confirmation). Any future change to stack, design system, or content strategy must be reflected here first, before implementation.*
