(function () {
  'use strict';

  const listEl = document.getElementById('list');
  const statusEl = document.getElementById('status');
  const refreshBtn = document.getElementById('refreshBtn');

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
    } catch (err) {
      console.error(err);
      statusEl.textContent = 'Не вдалось завантажити. Онови сторінку.';
    } finally {
      refreshBtn.disabled = false;
    }
  }

  refreshBtn.addEventListener('click', load);
  load();
})();
