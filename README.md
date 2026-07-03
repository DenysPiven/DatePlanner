# DatePlanner

Personal date invitation page for Tinder. She shares the link; he fills the questionnaire and leaves an application. She decides who to meet.

**Questionnaire UI is in Ukrainian.** Code and docs are in English.

Live: https://denyspiven.github.io/DatePlanner/

## Flow

1. Her photos & story
2. Questions she cares about (intentions, respect, communication…)
3. Food & activities (photo cards)
4. Date & time
5. Places in **Vinnytsia** (photos + map)
6. Application: name + optional note — **no contacts, no Telegram**

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
