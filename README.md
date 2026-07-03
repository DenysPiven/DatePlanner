# DatePlanner

Personal date invitation for Tinder. She shares the link; he reads a short intro, answers a **linear branching** questionnaire, leaves Instagram.

Live: https://denyspiven.github.io/DatePlanner/

## Flow

1. Her photos + short bio
2. When (date & time)
3. Cafe **or** restaurant
4. If cafe → coffee **or** tea; if restaurant → light **or** hearty meal
5. Walk — yes **or** no
6. Where exactly (depends on walk)
7. How long
8. Instagram only

## Customize

Edit `js/config.js` (name, photos, bio, `applicationEmail`) and `js/data.js` (questions & branches).

## Local dev

```bash
python3 -m http.server 8080
```

## License

MIT
