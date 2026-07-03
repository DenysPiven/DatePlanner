# DatePlanner

Personal date invitation page for Tinder. She shares the link; he fills the questionnaire and leaves an application. She decides who to meet.

**Questionnaire UI is in Ukrainian.** Code and docs are in English.

Live: https://denyspiven.github.io/DatePlanner/

## Flow

1. Her photos & story
2. Value dilemmas — **this or that** (one pick per pair)
3. Food & activities — **knockout tournament** (one winner each)
4. Date & time
5. Places in **Vinnytsia** — tournament, one place
6. Application: **Instagram only**

## Customize

Edit `js/config.js`:

- `name`, `age`, `tagline`, `photos` — replace stock photos with yours (`images/profile/…`)
- `applicationEmail` — FormSubmit delivers applications to your email (confirm once)

Without `applicationEmail`, applications are only saved in the browser (`localStorage`) — set the email to receive them.

## Local dev

```bash
python3 -m http.server 8080
```

## Stack

Vanilla HTML / CSS / JS, Leaflet, GitHub Pages (branch `main`).

## License

MIT
