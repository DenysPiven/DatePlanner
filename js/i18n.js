/**
 * Ukrainian questionnaire copy (user-facing UI only).
 */
const UI = {
  welcome: 'Знайомство',
  step: (n, total) => `${n} / ${total}`,
  progress: (pct, left) => {
    if (left <= 0) return `${pct}%`;
    const word =
      left === 1 ? 'крок' : left >= 2 && left <= 4 ? 'кроки' : 'кроків';
    return `${pct}% · ще ${left} ${word}`;
  },
  progressDone: 'Готово',

  start: 'Далі',
  continue: 'Продовжити',
  next: 'Далі',
  or: 'або',
  recommended: 'мені заходить',
  pickAtLeastOne: 'Обери хоча б один варіант',

  whenTitle: 'Коли зручно?',
  whenSub: 'Обери день і час — план уже є',
  date: 'Дата',
  time: 'Час',

  applyTitle: 'Залишити заявку',
  applySub: 'Лише Instagram. Відповім протягом 48 годин, якщо підійдеш',
  instagram: 'Твій Instagram',
  instagramPlaceholder: '@username',
  whyMe: 'Про себе',
  whyMePlaceholder: 'Коротко про себе…',
  whyMeRequired: 'Напиши кілька слів про себе',
  submit: 'Надіслати заявку',
  submitting: 'Надсилаю…',

  matchTitle: 'It\'s a match!',
  matchSub: 'Тепер чекай повідомлення або напиши першою',

  doneTitle: 'Заявку надіслано',
  doneText: 'Я напишу тобі в Instagram протягом 48 годин. Або напиши мені сама:',
  doneInstagram: '@pivden2000',
  doneHint: 'Можеш закрити сторінку',

  summaryWhen: 'Коли',
  summaryPlan: 'План',
  summaryAbout: 'Про тебе',
  summaryFilters: 'Фільтри',
  summaryWhy: 'Про себе',

  toastSent: '✅ Заявку надіслано',
  toastError: 'Не вдалось надіслати. Спробуй ще раз або напиши в Instagram',
  toastInstagram: 'Вкажи Instagram',
  ageCity: (age, city, instagram) => {
    const parts = [];
    if (age) parts.push(String(age));
    if (city) parts.push(city);
    if (instagram) parts.push('@' + String(instagram).replace(/^@/, ''));
    return parts.join(' · ');
  }
};
