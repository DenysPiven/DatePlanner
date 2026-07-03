# DatePlanner

Personal date invitation page. She shares the link; he answers the questionnaire and leaves Instagram.

Live: https://denyspiven.github.io/DatePlanner/

## Applications (inbox)

Every application is saved to online storage.

**Open this page to see them:**

https://denyspiven.github.io/DatePlanner/inbox.html

Inbox password is **not** stored in plaintext. Applications are encrypted;
opening `config.js` in Network only shows hashes/keys, not the password or readable applications.

To change the password, regenerate `INBOX_AUTH` in `js/config.js` (ask the agent).

## Local dev

```bash
python3 -m http.server 8080
```

## License

MIT
