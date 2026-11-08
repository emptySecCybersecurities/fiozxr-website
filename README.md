# fiozxr-website

Animated portfolio site and motion-graphics opener for **fiozxrrahman**, plus the agent skills collection behind the work.

## Contents

| Path | What it is |
|---|---|
| `index.html` | Single-file animated portfolio site. Kinetic-typography hero, scroll reveals, marquee, micro-interactions. No build step — open directly in a browser. |
| `video/index.html` | Source of the motion opener (GSAP timeline, deterministic, autoplay + loop). Open in a browser; `?debug=1` shows a scrubber. |
| `video/motion-opener.mp4` | Rendered 18s opener: 1920×1080, 30fps, H.264. |
| `agent-skills/` | 27 agent skills (SKILL.md format) for building animations, motion graphics, and video — installable by opencode, Claude Code, and other agents. |

## The site — `index.html`

One self-contained HTML file. Highlights:

- **Animated intro lockup** — "fiozxrrahman" rises out of a mask with a popping gradient dot over drifting orbs, then hands off to the hero (skipped under reduced motion)
- **Auth0 login** — universal login integration; profile chip with avatar + logout when signed in (requires filling in `AUTH0` in the script)
- **Kinetic typography hero** — masked word-by-word rise, gradient accent, screen-reader aware (`aria-label` + hidden fragments)
- **Scroll reveals** — IntersectionObserver-driven, transform/opacity only
- **Micro-interactions** — hover lift/glow cards, press feedback, underlined nav, gated behind `(hover: hover)`
- **Reduced motion** — fully honored (`prefers-reduced-motion`)

### Enabling Auth0

1. Create a tenant + SPA application in the [Auth0 dashboard](https://manage.auth0.com)
2. Add `http://localhost:8000` (or your live URL) to **Allowed Callback URLs** and **Allowed Logout URLs**
3. In `index.html`, set `AUTH0.domain` and `AUTH0.clientId` (near the top of the script). Optional: `AUTH0.audience`
4. Open the site — "Log in" appears in the nav; after login the profile chip replaces it

Until configured, the login UI stays hidden and the site works as before.

## The video — `video/motion-opener.mp4`

18-second brand opener, three acts:

1. "creative developer" eyebrow with pulsing dot over drifting gradient orbs
2. "I build **motion** into everything" rising from masks (the site's signature move) with camera push-through and a light sweep
3. Lockup "fiozxrrahman" + gradient dot pop with bloom

Rendered deterministically (30fps frames → ffmpeg). No audio track — a code-synthesized score can be added.

## Agent skills — `agent-skills/`

Skill collection for AI coding agents. Each skill is a folder with a `SKILL.md` (plus references/scripts where relevant).

| Skill | Purpose |
|---|---|
| `animate` | Emil Kowalski's S-rank animation build skill — decision chain, easing/duration tables, reduced-motion |
| `kinetic-typography` | Animated text: reveals, stagger, variable-font, text-on-path |
| `micro-interaction` | UI motion: hover/press, toggles, toasts, drawers, layout animation |
| `60fps-animation` | Fixing janky CSS animation, transform-only motion |
| `accessible-animation` | Reduced-motion and accessibility patterns |
| `ascii-animation` | Terminal/ASCII art animation, image-to-ASCII |
| `glassmorphism` | Frosted-glass UI and animated glass panels |
| `gsap-web` | GSAP + ScrollTrigger + Lenis web motion |
| `lottie-animation` | Lottie/dotLottie integration and control |
| `page-transition-animation` | View Transitions API + Framer Motion route transitions |
| `svg-animation` | SVG draw-on, morph, path motion |
| `bang-motion` | Cinematic browser motion graphics (HTML+CSS+GSAP → MP4) |
| `javascript-animation` | Zero-asset canvas films, deterministic frame rendering |
| `soundtrack` | Code-synthesized music synchronised to cuts |
| `remotion-*` (13) | Official Remotion skills: create, render, markup, captions, maps, studio, upgrade, etc. |

### Installing

Copy any skill folder into the skills directory of your agent, e.g.:

```bash
mkdir -p ~/.agents/skills && cp -r agent-skills/animate ~/.agents/skills/
```

opencode auto-loads `~/.agents/skills/<name>/SKILL.md`; Claude Code uses `~/.claude/skills/`.

## License

Site and video: MIT. Skills retain their own licenses (see each folder).
