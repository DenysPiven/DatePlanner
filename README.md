# DatePlanner

Personal date invitation. She shares the link; he answers a **branching** questionnaire and leaves Instagram.

Live: https://denyspiven.github.io/DatePlanner/

## Flow (why this order)

1. Her photos + short bio  
2. **About him** — lifestyle, free time (filter vibe first)  
3. **Duration** — early (30–60 min … 4h+)  
4. **Talk topics** — what they discuss at the table  
5. **Venue** — cafe / restaurant / pizza / sushi  
6. Drink or meal detail (branch)  
7. **After** — park, embankment, active, another place, or “as it goes”  
8. Specific spot in Vinnytsia (if not “as it goes”)  
9. **When**  
10. Instagram only  

Options with `recommended: true` show a **«мені заходить»** badge (her preferences). Edit in `js/data.js`.

## Where applications go

To **`PROFILE.applicationEmail`** in `js/config.js` (email via [FormSubmit](https://formsubmit.co)).

1. Set your email in `applicationEmail`
2. Submit one test application
3. Open the **Confirm your email** letter from FormSubmit and confirm once
4. After that, every application arrives in that inbox (subject: `Заявка на побачення: @instagram`)

## Customize

- `js/config.js` — name, photos, bio, **`applicationEmail`**
- `js/data.js` — questions (`multi: true` = checkboxes + Next; otherwise tap one option)

## Local dev

```bash
python3 -m http.server 8080
```

## License

MIT
