/**
 * Hybrid encryption for applications.
 * Public key encrypts on submit; private key unlocks only with inbox password.
 */
(function (global) {
  'use strict';

  function normalizePass(value) {
    return String(value || '')
      .trim()
      .replace(/\s+/g, '')
      .toLowerCase();
  }

  function bufToB64(buf) {
    const bytes = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf;
    let s = '';
    bytes.forEach((b) => {
      s += String.fromCharCode(b);
    });
    return btoa(s);
  }

  function b64ToBuf(b64) {
    const s = atob(b64);
    const bytes = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i);
    return bytes.buffer;
  }

  async function sha256Hex(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  async function verifyPassword(password) {
    const hash = await sha256Hex('dateplanner-inbox-v1:' + normalizePass(password));
    return hash === INBOX_AUTH.passwordHash;
  }

  async function deriveWrapKey(password) {
    const baseKey = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(normalizePass(password)),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: b64ToBuf(INBOX_AUTH.salt),
        iterations: 100000,
        hash: 'SHA-256'
      },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
  }

  async function unlockPrivateKey(password) {
    const aesKey = await deriveWrapKey(password);
    const enc = new Uint8Array(b64ToBuf(INBOX_AUTH.wrappedPrivateKey));
    const tag = new Uint8Array(b64ToBuf(INBOX_AUTH.tag));
    const combined = new Uint8Array(enc.length + tag.length);
    combined.set(enc, 0);
    combined.set(tag, enc.length);

    const privBuf = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: b64ToBuf(INBOX_AUTH.iv) },
      aesKey,
      combined
    );
    const privJwk = JSON.parse(new TextDecoder().decode(privBuf));
    return crypto.subtle.importKey(
      'jwk',
      privJwk,
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      false,
      ['decrypt']
    );
  }

  async function getPublicKey() {
    return crypto.subtle.importKey(
      'jwk',
      INBOX_AUTH.publicKey,
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      false,
      ['encrypt']
    );
  }

  async function encryptApplication(payload) {
    const aesKey = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt']
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const plaintext = new TextEncoder().encode(JSON.stringify(payload));
    const data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, plaintext);
    const rawAes = await crypto.subtle.exportKey('raw', aesKey);
    const pubKey = await getPublicKey();
    const wrappedKey = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, pubKey, rawAes);

    return {
      v: 1,
      wrappedKey: bufToB64(wrappedKey),
      iv: bufToB64(iv),
      data: bufToB64(data)
    };
  }

  async function decryptApplication(privateKey, item) {
    if (!item || item.v !== 1) throw new Error('unsupported item');
    const rawAes = await crypto.subtle.decrypt(
      { name: 'RSA-OAEP' },
      privateKey,
      b64ToBuf(item.wrappedKey)
    );
    const aesKey = await crypto.subtle.importKey(
      'raw',
      rawAes,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: b64ToBuf(item.iv) },
      aesKey,
      b64ToBuf(item.data)
    );
    return JSON.parse(new TextDecoder().decode(plain));
  }

  global.AppCrypto = {
    normalizePass,
    verifyPassword,
    unlockPrivateKey,
    encryptApplication,
    decryptApplication
  };
})(window);
