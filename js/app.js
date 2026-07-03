(function () {
  'use strict';

  const TOTAL_STEPS = 9;
  const SWIPE_STEPS = {
    2: { key: 'priority', cards: () => PRIORITY_CARDS, container: 'prioritySwipe', counter: 'priorityCounter' },
    3: { key: 'food', cards: () => SWIPE_CARDS.food, container: 'foodSwipe', counter: 'foodCounter' },
    4: { key: 'activity', cards: () => SWIPE_CARDS.activity, container: 'activitySwipe', counter: 'activityCounter' }
  };

  const state = {
    step: 0,
    storyIndex: 0,
    introIndex: 0,
    likes: { priority: [], food: [], activity: [] },
    datetime: {},
    place: null,
    applicant: {},
    swipers: {}
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const progressBar = $('#progressBar');
  const stepLabel = $('#stepLabel');
  const toast = $('#toast');

  let map = null;
  let markers = [];
  let introTimer = null;

  function applyLocale() {
    $('#brand').textContent = PROFILE.name;
    $('#startBtn').textContent = UI.start;
    $('#aboutHerTitle').textContent = UI.aboutHerTitle;
    $('#aboutHerSub').textContent = UI.aboutHerSub;
    $('#storyNext').textContent = UI.next;
    $('#priorityTitle').textContent = UI.priorityTitle;
    $('#prioritySub').textContent = UI.prioritySub;
    $('#foodTitle').textContent = UI.foodTitle;
    $('#foodSub').textContent = UI.foodSub;
    $('#activityTitle').textContent = UI.activityTitle;
    $('#activitySub').textContent = UI.activitySub;
    $('#whenTitle').textContent = UI.whenTitle;
    $('#whenSub').textContent = UI.whenSub;
    $('#labelDate').textContent = UI.date;
    $('#labelTime').textContent = UI.time;
    $('#datetimeNextBtn').textContent = UI.next;
    $('#whereTitle').textContent = UI.whereTitle;
    $('#whereSub').textContent = UI.whereSub;
    $('#placeNextBtn').textContent = UI.next;
    $('#applyTitle').textContent = UI.applyTitle;
    $('#applySub').textContent = UI.applySub;
    $('#labelName').textContent = UI.yourName;
    $('#labelNote').textContent = UI.note;
    $('#noteInput').placeholder = UI.notePlaceholder;
    $('#submitBtn').textContent = UI.submit;
    $('#doneTitle').textContent = UI.doneTitle;
    $('#doneText').textContent = UI.doneText;
    $('#doneHint').textContent = UI.doneHint;
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

    if (n === 0) {
      stepLabel.textContent = UI.welcome;
      startIntroCarousel();
    } else {
      stopIntroCarousel();
      stepLabel.textContent = UI.step(n, TOTAL_STEPS - 1);
    }

    if (n === 1) renderStory();
    if (n === 6) initMapStep();
    if (n === 7) renderPreview();
  }

  /* —— Intro gallery —— */
  function renderIntro() {
    const photos = PROFILE.photos;
    const gallery = $('#introGallery');
    gallery.innerHTML = photos.map((p, i) => `
      <div class="intro__slide${i === 0 ? ' intro__slide--active' : ''}" style="background-image:url('${p.src}')"></div>
    `).join('');

    $('#introDots').innerHTML = photos.map((_, i) =>
      `<button type="button" class="intro__dot${i === 0 ? ' intro__dot--active' : ''}" data-intro="${i}"></button>`
    ).join('');

    $('#introMeta').textContent = UI.ageCity(PROFILE.age, PROFILE.city);
    $('#introTitle').textContent = PROFILE.name;
    $('#introTagline').textContent = PROFILE.tagline;
    updateIntroCaption(0);

    $$('#introDots .intro__dot').forEach((dot) => {
      dot.addEventListener('click', () => showIntroSlide(Number(dot.dataset.intro)));
    });
  }

  function updateIntroCaption(i) {
    const photo = PROFILE.photos[i];
    $('#introText').textContent = photo ? photo.text : '';
  }

  function showIntroSlide(i) {
    state.introIndex = i;
    $$('.intro__slide').forEach((el, idx) => {
      el.classList.toggle('intro__slide--active', idx === i);
    });
    $$('.intro__dot').forEach((el, idx) => {
      el.classList.toggle('intro__dot--active', idx === i);
    });
    updateIntroCaption(i);
  }

  function startIntroCarousel() {
    stopIntroCarousel();
    introTimer = setInterval(() => {
      const next = (state.introIndex + 1) % PROFILE.photos.length;
      showIntroSlide(next);
    }, 3500);
  }

  function stopIntroCarousel() {
    if (introTimer) {
      clearInterval(introTimer);
      introTimer = null;
    }
  }

  /* —— Story about her —— */
  function renderStory() {
    const photos = PROFILE.photos;
    const i = state.storyIndex;
    const photo = photos[i];
    $('#storyStack').innerHTML = `
      <div class="story-card">
        <div class="story-card__photo" style="background-image:url('${photo.src}')"></div>
        <div class="story-card__body">
          <div class="story-card__caption">${photo.caption}</div>
          <p class="story-card__text">${photo.text}</p>
        </div>
      </div>
    `;
    $('#storyCounter').textContent = `${i + 1} / ${photos.length}`;
    $('#storyPrev').disabled = i === 0;
    $('#storyNext').textContent = i === photos.length - 1 ? UI.next : '→';
  }

  function storyNext() {
    if (state.storyIndex < PROFILE.photos.length - 1) {
      state.storyIndex++;
      renderStory();
    } else {
      goToStep(2);
    }
  }

  function storyPrev() {
    if (state.storyIndex > 0) {
      state.storyIndex--;
      renderStory();
    }
  }

  /* —— Swipe stacks —— */
  class SwipeStack {
    constructor(stepNum) {
      const cfg = SWIPE_STEPS[stepNum];
      this.stepNum = stepNum;
      this.key = cfg.key;
      this.container = document.getElementById(cfg.container);
      this.counterEl = document.getElementById(cfg.counter);
      this.cards = [...cfg.cards()];
      this.index = 0;
      this.currentEl = null;
      this.drag = { active: false, startX: 0, startY: 0, x: 0, y: 0 };
      this.render();
    }

    render() {
      this.container.innerHTML = '';
      if (this.index >= this.cards.length) {
        goToStep(this.stepNum + 1);
        return;
      }

      const card = this.cards[this.index];
      const el = document.createElement('div');
      el.className = 'swipe-card';
      el.innerHTML = `
        <div class="swipe-card__bg" style="background-image:url('${card.photo}')"></div>
        <div class="swipe-card__overlay"></div>
        <div class="swipe-card__stamp swipe-card__stamp--yes">${UI.swipeYes}</div>
        <div class="swipe-card__stamp swipe-card__stamp--no">${UI.swipeNo}</div>
        <div class="swipe-card__content">
          <div class="swipe-card__title">${card.title}</div>
          <div class="swipe-card__desc">${card.desc}</div>
        </div>
      `;
      this.container.appendChild(el);
      this.currentEl = el;
      this.bindEvents(el);
      this.counterEl.textContent = `${this.index + 1} / ${this.cards.length}`;
    }

    bindEvents(el) {
      const onStart = (e) => {
        const pt = e.touches ? e.touches[0] : e;
        this.drag = { active: true, startX: pt.clientX, startY: pt.clientY, x: 0, y: 0 };
      };

      const onMove = (e) => {
        if (!this.drag.active) return;
        e.preventDefault();
        const pt = e.touches ? e.touches[0] : e;
        this.drag.x = pt.clientX - this.drag.startX;
        this.drag.y = pt.clientY - this.drag.startY;
        el.style.transform = `translate(${this.drag.x}px, ${this.drag.y}px) rotate(${this.drag.x * 0.08}deg)`;
        el.querySelector('.swipe-card__stamp--yes').style.opacity = Math.min(Math.max(this.drag.x / 80, 0), 1);
        el.querySelector('.swipe-card__stamp--no').style.opacity = Math.min(Math.max(-this.drag.x / 80, 0), 1);
      };

      const onEnd = () => {
        if (!this.drag.active) return;
        this.drag.active = false;
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
      if (direction === 'right') state.likes[this.key].push(card.id);

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
    Object.keys(SWIPE_STEPS).forEach((step) => {
      state.swipers[step] = new SwipeStack(Number(step));
    });
  }

  function handleSwipeButtons(e) {
    const btn = e.target.closest('[data-swipe]');
    if (!btn) return;
    const swiper = state.swipers[state.step];
    if (swiper) swiper.swipe(btn.dataset.swipe);
  }

  /* —— Places —— */
  function scorePlace(place) {
    const all = [...state.likes.food, ...state.likes.activity, ...state.likes.priority];
    return place.tags.filter((t) => all.includes(t)).length;
  }

  function initMapStep() {
    const places = [...VINNYTSIA.places].sort((a, b) => scorePlace(b) - scorePlace(a));
    const list = $('#placesList');
    list.innerHTML = '';

    places.forEach((place, i) => {
      const card = document.createElement('div');
      card.className = 'place-card' + (i === 0 ? ' place-card--active' : '');
      card.dataset.id = place.id;
      card.innerHTML = `
        <div class="place-card__photo" style="background-image:url('${place.photo}')"></div>
        <div class="place-card__body">
          <div class="place-card__name">${place.name}</div>
          <div class="place-card__type">${place.type}</div>
        </div>
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
      map = L.map('map', { zoomControl: false }).setView(VINNYTSIA.center, VINNYTSIA.zoom);
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

  /* —— Application —— */
  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  function pickLabels(likes, map) {
    if (!likes.length) return '—';
    return likes.map((id) => map[id] || id).join(', ');
  }

  function buildApplicationPayload() {
    return {
      name: state.applicant.name,
      note: state.applicant.note || '',
      priorities: pickLabels(state.likes.priority, LABELS.priority),
      food: pickLabels(state.likes.food, LABELS.food),
      activity: pickLabels(state.likes.activity, LABELS.activity),
      date: state.datetime.date,
      time: state.datetime.time,
      place: state.place.name,
      placeType: state.place.type,
      city: VINNYTSIA.name,
      submittedAt: new Date().toISOString()
    };
  }

  function renderPreview() {
    const food = pickLabels(state.likes.food, LABELS.food);
    const activity = pickLabels(state.likes.activity, LABELS.activity);
    const priorities = pickLabels(state.likes.priority, LABELS.priority);
    const dateFormatted = formatDate(state.datetime.date);

    $('#previewCard').innerHTML = `
      <div class="preview-place" style="background-image:url('${state.place.photo}')">
        <div class="preview-place__label">${state.place.name}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">📅</span>
        <div><span class="summary__row-label">${UI.summaryWhen}</span>${dateFormatted}, ${state.datetime.time}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">📍</span>
        <div><span class="summary__row-label">${UI.summaryPlace}</span>${state.place.name}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">💗</span>
        <div><span class="summary__row-label">${UI.summaryPriorities}</span>${priorities}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">🍽</span>
        <div><span class="summary__row-label">${UI.summaryFood}</span>${food}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">🎯</span>
        <div><span class="summary__row-label">${UI.summaryActivity}</span>${activity}</div>
      </div>
    `;
  }

  function saveLocal(payload) {
    const key = 'vechir_applications';
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.unshift(payload);
    localStorage.setItem(key, JSON.stringify(list.slice(0, 50)));
  }

  async function sendApplication(payload) {
    saveLocal(payload);

    const email = (PROFILE.applicationEmail || '').trim();
    if (!email) return true;

    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        _subject: `Заявка на побачення: ${payload.name}`,
        name: payload.name,
        note: payload.note,
        priorities: payload.priorities,
        food: payload.food,
        activity: payload.activity,
        when: `${payload.date} ${payload.time}`,
        place: `${payload.place} (${payload.city})`,
        submittedAt: payload.submittedAt
      })
    });

    return res.ok;
  }

  async function handleApply(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    state.applicant = {
      name: fd.get('name').trim(),
      note: fd.get('note').trim()
    };

    const btn = $('#submitBtn');
    btn.disabled = true;
    btn.textContent = UI.submitting;

    try {
      const payload = buildApplicationPayload();
      const ok = await sendApplication(payload);
      if (!ok) throw new Error('send failed');
      showToast(UI.toastSent);
      goToStep(8);
    } catch {
      showToast(UI.toastError);
      btn.disabled = false;
      btn.textContent = UI.submit;
    }
  }

  function initDateDefaults() {
    const dateInput = $('#dateInput');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = new Date().toISOString().split('T')[0];
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  function bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-action="next"]')) goToStep(state.step + 1);
    });

    document.addEventListener('click', handleSwipeButtons);

    $('#storyNext').addEventListener('click', storyNext);
    $('#storyPrev').addEventListener('click', storyPrev);

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

    $('#applyForm').addEventListener('submit', handleApply);
  }

  function init() {
    document.title = `${PROFILE.name} · ${PROFILE.city}`;
    applyLocale();
    renderIntro();
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
