(function () {
  'use strict';

  const SESSION_KEY = 'dateplanner_inbox_ok';

  const loginScreen = document.getElementById('loginScreen');
  const inboxScreen = document.getElementById('inboxScreen');
  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('passwordInput');
  const loginError = document.getElementById('loginError');
  const listEl = document.getElementById('list');
  const statusEl = document.getElementById('status');
  const refreshBtn = document.getElementById('refreshBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  function normalizePass(value) {
    return String(value || '')
      .trim()
      .replace(/\s+/g, '')
      .toLowerCase();
  }

  function isAuthed() {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  }

  function setAuthed(on) {
    try {
      if (on) sessionStorage.setItem(SESSION_KEY, '1');
      else sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* private mode — ignore */
    }
  }

  function showLogin() {
    loginScreen.style.display = '';
    inboxScreen.style.display = 'none';
    loginError.hidden = true;
    passwordInput.value = '';
  }

  function showInbox() {
    loginScreen.style.display = 'none';
    inboxScreen.style.display = '';
    load();
  }

  function formatWhen(iso) {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleString('uk-UA', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return iso;
    }
  }

  function cardHtml(app, index) {
    return `
      <article class="inbox-card">
        <div class="inbox-card__top">
          <a class="inbox-card__insta" href="https://instagram.com/${(app.instagram || '').replace(/^@/, '')}" target="_blank" rel="noopener">
            ${app.instagram || '—'}
          </a>
          <span class="inbox-card__time">${formatWhen(app.submittedAt)}</span>
        </div>
        <div class="inbox-card__row"><span>Коли</span>${app.when || '—'}</div>
        <div class="inbox-card__row"><span>Про нього</span>${app.about || '—'}</div>
        <div class="inbox-card__row"><span>План</span>${app.plan || '—'}</div>
        <div class="inbox-card__meta">#${index + 1}</div>
      </article>
    `;
  }

  async function load() {
    statusEl.textContent = 'Завантаження…';
    listEl.innerHTML = '';
    refreshBtn.disabled = true;

    try {
      const res = await fetch(STORAGE.url, {
        headers: { 'X-Mantle-Key': STORAGE.key },
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);

      const data = await res.json();
      const apps = Array.isArray(data) ? data : [];

      if (!apps.length) {
        statusEl.textContent = 'Поки немає заявок';
        return;
      }

      statusEl.textContent = `Всього: ${apps.length}`;
      listEl.innerHTML = apps.map(cardHtml).join('');
    } catch {
      statusEl.textContent = 'Не вдалось завантажити. Онови сторінку.';
    } finally {
      refreshBtn.disabled = false;
    }
  }

  function tryLogin(raw) {
    console.log('[Inbox] tryLogin');
    console.log('[Inbox] INBOX_PASSWORD typeof=', typeof INBOX_PASSWORD, 'raw=', INBOX_PASSWORD);
    console.log('[Inbox] input typeof=', typeof raw, 'raw=', JSON.stringify(raw));
    console.log('[Inbox] input charCodes=', Array.from(String(raw || '')).map((c) => c.charCodeAt(0)));

    if (typeof INBOX_PASSWORD === 'undefined') {
      console.error('[Inbox] INBOX_PASSWORD is undefined — config.js not loaded?');
      loginError.hidden = false;
      loginError.textContent = 'Помилка конфігу (див. консоль)';
      return false;
    }

    const expected = normalizePass(INBOX_PASSWORD);
    const got = normalizePass(raw);
    console.log('[Inbox] expected=', JSON.stringify(expected), 'got=', JSON.stringify(got));
    console.log('[Inbox] match=', got === expected);

    if (!expected || got !== expected) {
      console.warn('[Inbox] password mismatch');
      loginError.hidden = false;
      loginError.textContent = 'Невірний пароль';
      passwordInput.value = '';
      passwordInput.focus();
      return false;
    }

    console.log('[Inbox] password ok → show inbox');
    setAuthed(true);
    showInbox();
    return true;
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('[Inbox] form submit');
    tryLogin(passwordInput.value);
  });

  logoutBtn.addEventListener('click', () => {
    setAuthed(false);
    showLogin();
  });

  refreshBtn.addEventListener('click', load);

  // Start: hide inbox until auth
  console.log('[Inbox] init', {
    hasPasswordConst: typeof INBOX_PASSWORD !== 'undefined',
    passwordValue: typeof INBOX_PASSWORD !== 'undefined' ? INBOX_PASSWORD : null,
    hasStorage: typeof STORAGE !== 'undefined',
    authed: isAuthed()
  });

  inboxScreen.style.display = 'none';

  if (isAuthed()) showInbox();
  else showLogin();
})();
