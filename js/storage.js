/**
 * Application store: active inbox + trash.
 * Format v2: { v: 2, active: [sealed...], trash: [sealed...] }
 * Legacy: plain array of sealed items → migrated to active.
 */
(function (global) {
  'use strict';

  function newId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function emptyStore() {
    return { v: 2, active: [], trash: [] };
  }

  function ensureIds(list) {
    return (list || []).map((item) => {
      if (!item || typeof item !== 'object') return item;
      if (!item.id) item.id = newId();
      return item;
    });
  }

  function migrate(data) {
    if (!data) return emptyStore();
    if (Array.isArray(data)) {
      return {
        v: 2,
        active: ensureIds(data.filter((item) => item && item.v === 1)),
        trash: []
      };
    }
    if (data.v === 2) {
      return {
        v: 2,
        active: ensureIds(data.active || []),
        trash: ensureIds(data.trash || [])
      };
    }
    return emptyStore();
  }

  async function loadStore() {
    const res = await fetch(STORAGE.url, {
      headers: { 'X-Mantle-Key': STORAGE.key },
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('load failed');
    const data = await res.json();
    return migrate(data);
  }

  async function saveStore(store) {
    const payload = {
      v: 2,
      active: (store.active || []).slice(0, 200),
      trash: (store.trash || []).slice(0, 200)
    };
    const res = await fetch(STORAGE.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Mantle-Key': STORAGE.key
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('save failed');
  }

  async function addSealed(sealed) {
    const store = await loadStore();
    const item = Object.assign({}, sealed, { id: sealed.id || newId() });
    store.active.unshift(item);
    await saveStore(store);
    return item.id;
  }

  async function moveToTrash(id) {
    const store = await loadStore();
    const idx = store.active.findIndex((item) => item && item.id === id);
    if (idx === -1) throw new Error('not found');
    const [item] = store.active.splice(idx, 1);
    store.trash.unshift(item);
    await saveStore(store);
  }

  async function restoreFromTrash(id) {
    const store = await loadStore();
    const idx = store.trash.findIndex((item) => item && item.id === id);
    if (idx === -1) throw new Error('not found');
    const [item] = store.trash.splice(idx, 1);
    store.active.unshift(item);
    await saveStore(store);
  }

  global.AppStorage = {
    loadStore,
    saveStore,
    addSealed,
    moveToTrash,
    restoreFromTrash
  };
})(window);
