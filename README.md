# DatePlanner (Vechir)

Mobile-first date planner questionnaire. **Questionnaire UI is in Ukrainian**; code, docs, and comments are in English.

Static site — runs on GitHub Pages with no build step.

## Features

- Basic info: name, recipient name, Instagram, Telegram, city
- Tinder-style swipe cards: food, activities, vibe
- Date & time picker
- Meeting place on map (Leaflet + OpenStreetMap)
- Generated date plan message — copy or open Telegram

## Cities

Kyiv, Lviv, Odesa — with curated meeting spots. Places are ranked by swipe answers.

## Live demo

```
https://denyspiven.github.io/DatePlanner/
```

## Local dev

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Project structure

```
├── index.html
├── css/style.css
├── js/
│   ├── i18n.js   # Ukrainian UI strings (questionnaire)
│   ├── data.js   # Swipe cards & places (Ukrainian)
│   └── app.js    # App logic (English comments)
└── README.md
```

## GitHub Pages setup

**Settings → Pages → Source: Deploy from a branch** → `main` / `/` (root)

## Stack

- Vanilla HTML / CSS / JavaScript
- [Leaflet](https://leafletjs.com/) + OpenStreetMap
- 100% client-side

## License

MIT
