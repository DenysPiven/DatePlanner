(function () {
  'use strict';

  const SESSION_KEY = 'dateplanner_inbox_session';

  const loginScreen = document.getElementById('loginScreen');
  const inboxScreen = document.getElementById('inboxScreen');
  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('passwordInput');
  const loginError = document.getElementById('loginError');
  const listEl = document.getElementById('list');
  const statusEl = document.getElementById('status');
  const refreshBtn = document.getElementById('refreshBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  let privateKey = null;

  function getSessionPassword() {
    try {
      return sessionStorage.getItem(SESSION_KEY) || '';
    } catch {
      return '';
    }
  }

  function setSessionPassword(password) {
    try {
      if (password) sessionStorage.setItem(SESSION_KEY, password);
      else sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* private mode */
    }
  }

  function showLogin() {
    privateKey = null;
    loginScreen.style.display = '';
    inboxScreen.style.display = 'none';
    loginError.hidden = true;
    loginError.textContent = 'Невірний пароль';
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

  function deviceSummary(device) {
    if (!device || typeof device !== 'object') return '—';
    const parts = [
      device.uaData && device.uaData.mobile != null
        ? (device.uaData.mobile ? '📱 mobile' : '💻 desktop')
        : device.touchPoints > 0
          ? '📱 touch'
          : '💻',
      device.uaData && device.uaData.platform ? device.uaData.platform : device.platform,
      device.screen ? `екран ${device.screen}` : '',
      device.viewport ? `viewport ${device.viewport}` : '',
      device.pixelRatio ? `@${device.pixelRatio}x` : '',
      device.language || '',
      device.timezone || '',
      device.connection && device.connection.type ? device.connection.type : '',
      device.hardwareConcurrency ? `${device.hardwareConcurrency} cores` : '',
      device.deviceMemoryGb != null ? `${device.deviceMemoryGb} GB` : '',
      device.darkMode ? 'dark' : 'light'
    ].filter(Boolean);
    return parts.join(' · ');
  }

  function deviceDetails(device) {
    if (!device || typeof device !== 'object') return '';
    const lines = [
      device.userAgent ? `UA: ${device.userAgent}` : '',
      device.languages ? `Мови: ${device.languages}` : '',
      device.vendor ? `Vendor: ${device.vendor}` : '',
      device.connection
        ? `Мережа: ${[
            device.connection.type,
            device.connection.downlink != null ? `${device.connection.downlink} Mbps` : '',
            device.connection.rtt != null ? `rtt ${device.connection.rtt}ms` : '',
            device.connection.saveData ? 'save-data' : ''
          ]
            .filter(Boolean)
            .join(', ')}`
        : '',
      device.webdriver ? '⚠️ webdriver / automation' : '',
      `online: ${device.online ? 'yes' : 'no'} · cookies: ${device.cookieEnabled ? 'yes' : 'no'}`
    ].filter(Boolean);
    return lines.join('\n');
  }

  function cardHtml(app, index) {
    const device = app.device;
    const details = deviceDetails(device);
    return `
      <article class="inbox-card">
        <div class="inbox-card__top">
          <a class="inbox-card__insta" href="https://instagram.com/${(app.instagram || '').replace(/^@/, '')}" target="_blank" rel="noopener">
            ${app.instagram || '—'}
          </a>
          <span class="inbox-card__time">${formatWhen(app.submittedAt)}</span>
        </div>
        <div class="inbox-card__row"><span>Коли</span>${app.when || '—'}</div>
        <div class="inbox-card__row"><span>Про себе</span>${app.whyMe || '—'}</div>
        <div class="inbox-card__row"><span>Про нього</span>${app.about || '—'}</div>
        <div class="inbox-card__row"><span>Фільтри</span>${app.filters || [app.smoking, app.alcohol].filter(Boolean).join(' · ') || '—'}</div>
        <div class="inbox-card__row"><span>План</span>${app.plan || '—'}</div>
        <div class="inbox-card__row"><span>Пристрій</span>${deviceSummary(device)}</div>
        ${
          details
            ? `<details class="inbox-card__device"><summary>Деталі пристрою</summary><pre>${details.replace(/</g, '&lt;')}</pre></details>`
            : ''
        }
        <div class="inbox-card__meta">#${index + 1}</div>
      </article>
    `;
  }

  async function load() {
    statusEl.textContent = 'Завантаження…';
    listEl.innerHTML = '';
    refreshBtn.disabled = true;

    try {
      if (!privateKey) throw new Error('locked');

      const res = await fetch(STORAGE.url, {
        headers: { 'X-Mantle-Key': STORAGE.key },
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);

      const data = await res.json();
      const sealed = Array.isArray(data) ? data.filter((item) => item && item.v === 1) : [];

      const apps = [];
      for (const item of sealed) {
        try {
          apps.push(await AppCrypto.decryptApplication(privateKey, item));
        } catch {
          /* skip corrupt / foreign items */
        }
      }

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

  async function tryLogin(raw) {
    loginError.hidden = true;

    if (typeof INBOX_AUTH === 'undefined' || typeof AppCrypto === 'undefined') {
      loginError.hidden = false;
      loginError.textContent = 'Помилка конфігу';
      return false;
    }

    const okHash = await AppCrypto.verifyPassword(raw);
    if (!okHash) {
      loginError.hidden = false;
      loginError.textContent = 'Невірний пароль';
      passwordInput.value = '';
      passwordInput.focus();
      return false;
    }

    try {
      privateKey = await AppCrypto.unlockPrivateKey(raw);
    } catch {
      loginError.hidden = false;
      loginError.textContent = 'Невірний пароль';
      passwordInput.value = '';
      passwordInput.focus();
      return false;
    }

    setSessionPassword(AppCrypto.normalizePass(raw));
    showInbox();
    return true;
  }

  async function resumeSession() {
    const saved = getSessionPassword();
    if (!saved) return false;
    try {
      const okHash = await AppCrypto.verifyPassword(saved);
      if (!okHash) {
        setSessionPassword('');
        return false;
      }
      privateKey = await AppCrypto.unlockPrivateKey(saved);
      showInbox();
      return true;
    } catch {
      setSessionPassword('');
      return false;
    }
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    tryLogin(passwordInput.value);
  });

  logoutBtn.addEventListener('click', () => {
    setSessionPassword('');
    showLogin();
  });

  refreshBtn.addEventListener('click', load);

  console.log(
    '%cСюди не дивись 👀\nТут тільки для адміна.\nЗа цікавість ніс відірвуть.\nВсе одно нічого тут не знайдеш.',
    'color:#ff6b9d;font-size:14px;font-weight:700;line-height:1.5'
  );

  inboxScreen.style.display = 'none';

  resumeSession().then((ok) => {
    if (!ok) showLogin();
  });
})();
