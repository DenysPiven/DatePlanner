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
  const tabActive = document.getElementById('tabActive');
  const tabTrash = document.getElementById('tabTrash');

  let privateKey = null;
  let folder = 'active'; // 'active' | 'trash'
  let counts = { active: 0, trash: 0 };

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

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function deviceKind(device) {
    if (device.uaData && device.uaData.mobile != null) {
      return device.uaData.mobile ? '📱 Телефон' : '💻 Компʼютер';
    }
    if (device.touchPoints > 0) return '📱 Touch';
    return '💻 Пристрій';
  }

  function deviceSummary(device) {
    if (!device || typeof device !== 'object') return '—';
    const platform = (device.uaData && device.uaData.platform) || device.platform || '';
    const parts = [deviceKind(device), platform, device.timezone || ''].filter(Boolean);
    return parts.join(' · ');
  }

  function deviceRows(device) {
    if (!device || typeof device !== 'object') return [];

    const network = device.connection
      ? [
          device.connection.type,
          device.connection.downlink != null ? `${device.connection.downlink} Мбіт/с` : '',
          device.connection.rtt != null ? `затримка ${device.connection.rtt} мс` : '',
          device.connection.saveData ? 'економія трафіку' : ''
        ]
          .filter(Boolean)
          .join(' · ')
      : '';

    const hardware = [
      device.hardwareConcurrency ? `${device.hardwareConcurrency} ядер CPU` : '',
      device.deviceMemoryGb != null ? `${device.deviceMemoryGb} ГБ RAM` : '',
      device.touchPoints ? `touch ×${device.touchPoints}` : ''
    ]
      .filter(Boolean)
      .join(' · ');

    const display = [
      device.screen ? `екран ${device.screen}` : '',
      device.availScreen ? `доступно ${device.availScreen}` : '',
      device.viewport ? `вікно ${device.viewport}` : '',
      device.pixelRatio ? `щільність ${device.pixelRatio}×` : '',
      device.colorDepth ? `${device.colorDepth}-bit` : ''
    ]
      .filter(Boolean)
      .join(' · ');

    const rows = [
      ['Тип', deviceKind(device)],
      ['Платформа', (device.uaData && device.uaData.platform) || device.platform || ''],
      ['Залізо', hardware],
      ['Екран', display],
      ['Мова', device.language || ''],
      ['Мови', device.languages || ''],
      ['Часовий пояс', device.timezone || ''],
      [
        'Зсув часу',
        device.timezoneOffsetMin != null
          ? `UTC${device.timezoneOffsetMin <= 0 ? '+' : '-'}${Math.abs(device.timezoneOffsetMin) / 60}`
          : ''
      ],
      ['Мережа', network],
      ['Тема', device.darkMode ? 'темна' : 'світла'],
      ['Анімації', device.reducedMotion ? 'зменшені' : 'звичайні'],
      ['Онлайн', device.online ? 'так' : 'ні'],
      ['Cookies', device.cookieEnabled ? 'так' : 'ні'],
      ['PDF viewer', device.pdfViewer ? 'так' : 'ні'],
      ['Vendor', device.vendor || ''],
      ['Браузер (бренди)', device.uaData && device.uaData.brands ? device.uaData.brands : ''],
      ['Автоматизація', device.webdriver ? '⚠️ так (webdriver)' : 'ні']
    ];

    return rows.filter(([, value]) => value !== '' && value != null);
  }

  function deviceExtraHtml(device) {
    const rows = deviceRows(device);
    if (!rows.length) return '';
    const body = rows
      .map(
        ([label, value]) => `
        <div class="inbox-card__row inbox-card__row--extra">
          <span>${escapeHtml(label)}</span>
          <div class="inbox-card__value">${escapeHtml(value)}</div>
        </div>`
      )
      .join('');
    return `
      <details class="inbox-card__device">
        <summary>Додатково · пристрій і залізо</summary>
        <div class="inbox-card__extra">${body}</div>
      </details>`;
  }

  function updateTabs() {
    tabActive.classList.toggle('inbox-tab--active', folder === 'active');
    tabTrash.classList.toggle('inbox-tab--active', folder === 'trash');
    tabActive.textContent = counts.active ? `Вхідні (${counts.active})` : 'Вхідні';
    tabTrash.textContent = counts.trash ? `Корзина (${counts.trash})` : 'Корзина';
  }

  function cardHtml(app, number) {
    const device = app.device;
    const action =
      folder === 'active'
        ? `<button type="button" class="btn btn--ghost inbox-card__action" data-action="trash" data-id="${escapeHtml(app._id)}">У корзину</button>`
        : `<button type="button" class="btn btn--primary inbox-card__action" data-action="restore" data-id="${escapeHtml(app._id)}">Відновити</button>`;

    return `
      <article class="inbox-card">
        <div class="inbox-card__top">
          <a class="inbox-card__insta" href="https://instagram.com/${(app.instagram || '').replace(/^@/, '')}" target="_blank" rel="noopener">
            ${escapeHtml(app.instagram || '—')}
          </a>
          <span class="inbox-card__time">${formatWhen(app.submittedAt)}</span>
        </div>
        <div class="inbox-card__row"><span>Коли</span><div class="inbox-card__value">${escapeHtml(app.when || '—')}</div></div>
        <div class="inbox-card__row"><span>Про себе</span><div class="inbox-card__value">${escapeHtml(app.whyMe || '—')}</div></div>
        <div class="inbox-card__row"><span>Про нього</span><div class="inbox-card__value">${escapeHtml(app.about || '—')}</div></div>
        <div class="inbox-card__row"><span>Фільтри</span><div class="inbox-card__value">${escapeHtml(app.filters || [app.smoking, app.alcohol].filter(Boolean).join(' · ') || '—')}</div></div>
        <div class="inbox-card__row"><span>План</span><div class="inbox-card__value">${escapeHtml(app.plan || '—')}</div></div>
        <div class="inbox-card__row"><span>Пристрій</span><div class="inbox-card__value">${escapeHtml(deviceSummary(device))}</div></div>
        ${deviceExtraHtml(device)}
        <div class="inbox-card__footer">
          <div class="inbox-card__meta">#${number}</div>
          ${action}
        </div>
      </article>
    `;
  }

  async function decryptList(sealed) {
    const apps = [];
    for (const item of sealed) {
      if (!item || item.v !== 1 || !item.id) continue;
      try {
        const app = await AppCrypto.decryptApplication(privateKey, item);
        app._id = item.id;
        apps.push(app);
      } catch {
        /* skip corrupt */
      }
    }
    return apps;
  }

  async function load() {
    statusEl.textContent = 'Завантаження…';
    listEl.innerHTML = '';
    refreshBtn.disabled = true;

    try {
      if (!privateKey) throw new Error('locked');

      const store = await AppStorage.loadStore();
      counts = { active: store.active.length, trash: store.trash.length };
      updateTabs();

      const sealed = folder === 'trash' ? store.trash : store.active;
      const apps = await decryptList(sealed);

      if (!apps.length) {
        statusEl.textContent =
          folder === 'trash' ? 'Корзина порожня' : 'Поки немає заявок';
        return;
      }

      statusEl.textContent =
        folder === 'trash'
          ? `У корзині: ${apps.length}`
          : `Вхідні: ${apps.length}`;

      listEl.innerHTML = apps
        .map((app, index) => cardHtml(app, apps.length - index))
        .join('');
    } catch {
      statusEl.textContent = 'Не вдалось завантажити. Онови сторінку.';
    } finally {
      refreshBtn.disabled = false;
    }
  }

  async function onListClick(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const id = btn.dataset.id;
    const action = btn.dataset.action;
    if (!id) return;

    btn.disabled = true;
    try {
      if (action === 'trash') await AppStorage.moveToTrash(id);
      if (action === 'restore') await AppStorage.restoreFromTrash(id);
      await load();
    } catch {
      btn.disabled = false;
      statusEl.textContent = 'Не вдалось виконати дію. Спробуй ще раз.';
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

  function setFolder(next) {
    folder = next;
    updateTabs();
    load();
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
  listEl.addEventListener('click', onListClick);
  tabActive.addEventListener('click', () => setFolder('active'));
  tabTrash.addEventListener('click', () => setFolder('trash'));

  console.log(
    '%cСюди не дивись 👀\nТут тільки для адміна.\nЗа цікавість ніс відірвуть.\nВсе одно нічого тут не знайдеш.',
    'color:#ff6b9d;font-size:14px;font-weight:700;line-height:1.5'
  );

  inboxScreen.style.display = 'none';

  resumeSession().then((ok) => {
    if (!ok) showLogin();
  });
})();
