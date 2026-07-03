(function () {
  'use strict';

  const TOTAL_STEPS = 8;
  const SWIPE_ORDER = ['food', 'activity', 'vibe'];

  const state = {
    step: 0,
    info: {},
    likes: { food: [], activity: [], vibe: [] },
    datetime: {},
    place: null,
    swipers: {}
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const progressBar = $('#progressBar');
  const stepLabel = $('#stepLabel');
  const toast = $('#toast');

  let map = null;
  let markers = [];

  /** Apply Ukrainian questionnaire strings to the DOM. */
  function applyLocale() {
    $('#brand').textContent = UI.brand;
    $('#welcomeTitle').textContent = UI.welcomeTitle;
    $('#welcomeText').textContent = UI.welcomeText;
    $('#welcomeFeatures').innerHTML = UI.welcomeFeatures.map((t) => `<li>${t}</li>`).join('');
    $('#startBtn').textContent = UI.start;

    $('#aboutTitle').textContent = UI.aboutYou;
    $('#aboutSub').textContent = UI.aboutYouSub;
    $('#labelUserName').textContent = UI.yourName;
    $('#labelPartnerName').textContent = UI.partnerName;
    $('#labelInstagram').textContent = UI.instagram;
    $('#labelTelegram').textContent = UI.telegram;
    $('#labelCity').textContent = UI.city;
    $('#infoNextBtn').textContent = UI.next;

    $('#foodTitle').textContent = UI.foodTitle;
    $('#foodSub').textContent = UI.foodSub;
    $('#activityTitle').textContent = UI.activityTitle;
    $('#activitySub').textContent = UI.activitySub;
    $('#vibeTitle').textContent = UI.vibeTitle;
    $('#vibeSub').textContent = UI.vibeSub;

    $('#whenTitle').textContent = UI.whenTitle;
    $('#whenSub').textContent = UI.whenSub;
    $('#labelDate').textContent = UI.date;
    $('#labelTime').textContent = UI.time;
    $('#datetimeNextBtn').textContent = UI.next;

    $('#whereTitle').textContent = UI.whereTitle;
    $('#whereSub').textContent = UI.whereSub;
    $('#placeNextBtn').textContent = UI.next;

    $('#planReadyTitle').textContent = UI.planReady;
    $('#messageLabel').textContent = UI.messageLabel;
    $('#copyBtn').textContent = UI.copyPlan;
    $('#telegramBtn').textContent = UI.openTelegram;
    $('#restartBtn').textContent = UI.restart;
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('toast--visible');
    setTimeout(() => toast.classList.remove('toast--visible'), 2500);
  }

  function goToStep(n) {
    $$('.step').forEach((el) => el.classList.remove('step--active'));
    const target = document.querySelector(`[data-step="${n}"]`);
    if (target) target.classList.add('step--active');

    state.step = n;
    progressBar.style.width = `${((n + 1) / TOTAL_STEPS) * 100}%`;
    stepLabel.textContent = n === 0 ? UI.welcome : UI.step(n, TOTAL_STEPS - 1);

    if (n === 6) initMapStep();
    if (n === 7) renderSummary();
  }

  function initCitySelect() {
    const select = $('#citySelect');
    Object.entries(CITIES).forEach(([id, city]) => {
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = city.name;
      select.appendChild(opt);
    });
  }

  function initDateDefaults() {
    const dateInput = $('#dateInput');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = new Date().toISOString().split('T')[0];
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  class SwipeStack {
    constructor(containerId, category, counterId, onComplete) {
      this.container = document.getElementById(containerId);
      this.category = category;
      this.counterEl = document.getElementById(counterId);
      this.onComplete = onComplete;
      this.cards = [...SWIPE_CARDS[category]];
      this.index = 0;
      this.currentEl = null;
      this.drag = { active: false, startX: 0, startY: 0, x: 0, y: 0 };
      this.render();
    }

    render() {
      this.container.innerHTML = '';
      if (this.index >= this.cards.length) {
        this.onComplete();
        return;
      }

      const card = this.cards[this.index];
      const el = document.createElement('div');
      el.className = 'swipe-card';
      el.innerHTML = `
        <div class="swipe-card__bg" style="background:${card.gradient}"></div>
        <div class="swipe-card__overlay"></div>
        <div class="swipe-card__stamp swipe-card__stamp--yes">${UI.swipeYes}</div>
        <div class="swipe-card__stamp swipe-card__stamp--no">${UI.swipeNo}</div>
        <div class="swipe-card__content">
          <div class="swipe-card__emoji">${card.emoji}</div>
          <div class="swipe-card__title">${card.title}</div>
          <div class="swipe-card__desc">${card.desc}</div>
        </div>
      `;
      this.container.appendChild(el);
      this.currentEl = el;
      this.bindEvents(el);
      this.updateCounter();
    }

    updateCounter() {
      this.counterEl.textContent = `${this.index + 1} / ${this.cards.length}`;
    }

    bindEvents(el) {
      const onStart = (e) => {
        const pt = e.touches ? e.touches[0] : e;
        this.drag = { active: true, startX: pt.clientX, startY: pt.clientY, x: 0, y: 0 };
        el.style.cursor = 'grabbing';
      };

      const onMove = (e) => {
        if (!this.drag.active) return;
        e.preventDefault();
        const pt = e.touches ? e.touches[0] : e;
        this.drag.x = pt.clientX - this.drag.startX;
        this.drag.y = pt.clientY - this.drag.startY;
        const rot = this.drag.x * 0.08;
        el.style.transform = `translate(${this.drag.x}px, ${this.drag.y}px) rotate(${rot}deg)`;

        const yesStamp = el.querySelector('.swipe-card__stamp--yes');
        const noStamp = el.querySelector('.swipe-card__stamp--no');
        yesStamp.style.opacity = Math.min(Math.max(this.drag.x / 80, 0), 1);
        noStamp.style.opacity = Math.min(Math.max(-this.drag.x / 80, 0), 1);
      };

      const onEnd = () => {
        if (!this.drag.active) return;
        this.drag.active = false;
        el.style.cursor = 'grab';
        if (Math.abs(this.drag.x) > 100) {
          this.swipe(this.drag.x > 0 ? 'right' : 'left');
        } else {
          el.classList.add('swipe-card--animating');
          el.style.transform = '';
          el.querySelector('.swipe-card__stamp--yes').style.opacity = 0;
          el.querySelector('.swipe-card__stamp--no').style.opacity = 0;
          setTimeout(() => el.classList.remove('swipe-card--animating'), 350);
        }
      };

      el.addEventListener('mousedown', onStart);
      el.addEventListener('touchstart', onStart, { passive: true });
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchend', onEnd);
    }

    swipe(direction) {
      const card = this.cards[this.index];
      if (direction === 'right') {
        state.likes[this.category].push(card.id);
      }

      const el = this.currentEl;
      el.classList.add('swipe-card--animating');
      const offX = direction === 'right' ? 400 : -400;
      el.style.transform = `translate(${offX}px, ${this.drag.y}px) rotate(${offX * 0.05}deg)`;
      el.style.opacity = '0';

      setTimeout(() => {
        this.index++;
        this.render();
      }, 300);
    }
  }

  function initSwipers() {
    SWIPE_ORDER.forEach((cat, i) => {
      const stepNum = i + 2;
      const containerMap = { food: 'foodSwipe', activity: 'activitySwipe', vibe: 'vibeSwipe' };
      const counterMap = { food: 'foodCounter', activity: 'activityCounter', vibe: 'vibeCounter' };

      state.swipers[cat] = new SwipeStack(
        containerMap[cat],
        cat,
        counterMap[cat],
        () => goToStep(stepNum + 1)
      );
    });
  }

  function handleSwipeButtons(e) {
    const btn = e.target.closest('[data-swipe]');
    if (!btn) return;
    const cat = SWIPE_ORDER[state.step - 2];
    if (cat && state.swipers[cat]) {
      state.swipers[cat].swipe(btn.dataset.swipe);
    }
  }

  function getCity() {
    return CITIES[state.info.city] || CITIES.kyiv;
  }

  function scorePlace(place) {
    const allLikes = [...state.likes.food, ...state.likes.activity, ...state.likes.vibe];
    return place.tags.filter((t) => allLikes.includes(t)).length;
  }

  function initMapStep() {
    const city = getCity();
    const places = [...city.places].sort((a, b) => scorePlace(b) - scorePlace(a));

    const list = $('#placesList');
    list.innerHTML = '';

    places.forEach((place, i) => {
      const card = document.createElement('div');
      card.className = 'place-card' + (i === 0 ? ' place-card--active' : '');
      card.dataset.id = place.id;
      card.innerHTML = `
        <div class="place-card__name">${place.name}</div>
        <div class="place-card__type">${place.type}</div>
      `;
      card.addEventListener('click', () => selectPlace(place, card));
      list.appendChild(card);
    });

    if (!state.place) state.place = places[0];
    $('#placeNextBtn').disabled = !state.place;

    if (map) {
      map.remove();
      map = null;
    }

    setTimeout(() => {
      map = L.map('map', { zoomControl: false }).setView(city.center, city.zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);

      markers = [];
      places.forEach((place) => {
        const marker = L.marker([place.lat, place.lng]).addTo(map);
        marker.bindPopup(`<b>${place.name}</b><br>${place.type}`);
        marker.on('click', () => {
          const card = list.querySelector(`[data-id="${place.id}"]`);
          selectPlace(place, card);
        });
        markers.push({ place, marker });
      });

      highlightMarker(state.place);
      map.invalidateSize();
    }, 150);
  }

  function selectPlace(place, cardEl) {
    state.place = place;
    $$('.place-card').forEach((c) => c.classList.remove('place-card--active'));
    if (cardEl) cardEl.classList.add('place-card--active');
    $('#placeNextBtn').disabled = false;
    highlightMarker(place);
    if (map) map.setView([place.lat, place.lng], 15);
  }

  function highlightMarker(place) {
    markers.forEach(({ place: p, marker }) => {
      if (p.id === place.id) marker.openPopup();
    });
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  function pickLabels(likes, labelMap, fallback) {
    if (!likes.length) return fallback;
    return likes.map((id) => labelMap[id] || id).join(', ');
  }

  function buildPlanDescription() {
    const food = pickLabels(state.likes.food, FOOD_LABELS, UI.planFallbackFood);
    const activity = pickLabels(state.likes.activity, ACTIVITY_LABELS, UI.planFallbackActivity);
    const vibe = state.likes.vibe[0] || 'cozy';
    const template = DATE_PLAN_TEMPLATES[vibe] || DATE_PLAN_TEMPLATES.default;

    return template
      .replace('{food}', food.toLowerCase())
      .replace('{activity}', activity.toLowerCase())
      .replace('{time}', state.datetime.time || '19:00');
  }

  function buildMessage() {
    const { partnerName, userName, instagram, telegram } = state.info;
    const food = pickLabels(state.likes.food, FOOD_LABELS, '—');
    const activity = pickLabels(state.likes.activity, ACTIVITY_LABELS, '—');
    const vibe = pickLabels(state.likes.vibe, VIBE_LABELS, '—');
    const dateFormatted = formatDate(state.datetime.date);
    const time = state.datetime.time;
    const place = state.place;
    const city = getCity();
    const plan = buildPlanDescription();
    const mapsUrl = `https://www.google.com/maps?q=${place.lat},${place.lng}`;

    let msg = `${UI.messageGreeting(partnerName)}\n\n`;
    msg += `${UI.messageIntro}\n\n`;
    msg += `📅 ${dateFormatted}, о ${time}\n`;
    msg += `📍 ${place.name} (${city.name})\n`;
    msg += `🗺 ${mapsUrl}\n\n`;
    msg += `🍽 Їжа: ${food}\n`;
    msg += `🎯 Активність: ${activity}\n`;
    msg += `✨ Атмосфера: ${vibe}\n\n`;
    msg += `💡 План вечора:\n${plan}\n\n`;
    msg += `${UI.messageWaiting}\n`;
    msg += `— ${userName}`;

    if (instagram) {
      const insta = instagram.startsWith('@') ? instagram : `@${instagram}`;
      msg += `\n\n📸 Instagram: ${insta}`;
    }

    return msg;
  }

  function renderSummary() {
    const { partnerName } = state.info;
    $('#summarySubtitle').textContent = UI.planFor(partnerName);

    const food = pickLabels(state.likes.food, FOOD_LABELS, '—');
    const activity = pickLabels(state.likes.activity, ACTIVITY_LABELS, '—');
    const vibe = pickLabels(state.likes.vibe, VIBE_LABELS, '—');
    const dateFormatted = formatDate(state.datetime.date);

    $('#summaryCard').innerHTML = `
      <div class="summary__row">
        <span class="summary__row-icon">📅</span>
        <div><span class="summary__row-label">${UI.summaryDate}</span>${dateFormatted}, ${state.datetime.time}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">📍</span>
        <div><span class="summary__row-label">${UI.summaryPlace}</span>${state.place.name}, ${getCity().name}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">🍽</span>
        <div><span class="summary__row-label">${UI.summaryFood}</span>${food}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">🎯</span>
        <div><span class="summary__row-label">${UI.summaryActivity}</span>${activity}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">✨</span>
        <div><span class="summary__row-label">${UI.summaryVibe}</span>${vibe}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">💡</span>
        <div><span class="summary__row-label">${UI.summaryPlan}</span>${buildPlanDescription()}</div>
      </div>
    `;

    $('#messageText').value = buildMessage();
    $('#copyHint').textContent = '';
  }

  function normalizeTelegram(handle) {
    if (!handle) return '';
    return handle.replace(/^@/, '').trim();
  }

  async function copyMessage() {
    const text = $('#messageText').value;
    try {
      await navigator.clipboard.writeText(text);
      showToast(UI.toastCopied);
      $('#copyHint').textContent = UI.copyHint;
    } catch {
      $('#messageText').select();
      document.execCommand('copy');
      showToast(UI.toastCopied);
    }
  }

  function openTelegram() {
    const text = encodeURIComponent($('#messageText').value);
    const username = normalizeTelegram(state.info.telegram);

    copyMessage();

    setTimeout(() => {
      if (username) {
        window.open(`https://t.me/${username}`, '_blank');
        showToast(UI.toastTelegramOpen);
      } else {
        window.open(`https://t.me/share/url?text=${text}`, '_blank');
        showToast(UI.toastTelegramShare);
      }
    }, 400);
  }

  function restart() {
    state.info = {};
    state.likes = { food: [], activity: [], vibe: [] };
    state.datetime = {};
    state.place = null;
    SWIPE_ORDER.forEach((cat) => {
      state.swipers[cat] = new SwipeStack(
        { food: 'foodSwipe', activity: 'activitySwipe', vibe: 'vibeSwipe' }[cat],
        cat,
        { food: 'foodCounter', activity: 'activityCounter', vibe: 'vibeCounter' }[cat],
        () => goToStep(SWIPE_ORDER.indexOf(cat) + 3)
      );
    });
    $('#infoForm').reset();
    initDateDefaults();
    goToStep(0);
  }

  function bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-action="next"]')) goToStep(state.step + 1);
    });

    document.addEventListener('click', handleSwipeButtons);

    $('#infoForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      state.info = {
        userName: fd.get('userName').trim(),
        partnerName: fd.get('partnerName').trim(),
        instagram: fd.get('instagram').trim(),
        telegram: fd.get('telegram').trim(),
        city: fd.get('city')
      };
      goToStep(2);
    });

    $('#datetimeForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      state.datetime = { date: fd.get('date'), time: fd.get('time') };
      goToStep(6);
    });

    $$('#timeChips .chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        $$('#timeChips .chip').forEach((c) => c.classList.remove('chip--active'));
        chip.classList.add('chip--active');
        $('#timeInput').value = chip.dataset.time;
      });
    });

    $('#copyBtn').addEventListener('click', copyMessage);
    $('#telegramBtn').addEventListener('click', openTelegram);
    $('#restartBtn').addEventListener('click', restart);
  }

  function init() {
    applyLocale();
    initCitySelect();
    initDateDefaults();
    initSwipers();
    bindEvents();
    goToStep(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
