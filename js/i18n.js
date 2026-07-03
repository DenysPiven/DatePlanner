/**
 * Ukrainian questionnaire copy (user-facing UI only).
 */
const UI = {
  brand: (name) => name,
  welcome: 'Знайомство',
  step: (n, total) => `${n} / ${total}`,

  start: 'Хочу на побачення',
  next: 'Далі',
  swipeYes: 'ТАК',
  swipeNo: 'НІ',

  aboutHerTitle: 'Трохи про мене',
  aboutHerSub: 'Гортай фото — так зрозумієш, чи ми на одній хвилі',

  priorityTitle: 'Що для мене важливо',
  prioritySub: 'Свайп вправо — якщо це про тебе. Вліво — якщо ні',

  foodTitle: 'Що поїсти?',
  foodSub: 'Обери, що тобі заходить',
  activityTitle: 'Чим зайнятись?',
  activitySub: 'Як проведемо час у Вінниці',

  whenTitle: 'Коли зручно?',
  whenSub: 'Обери день і час — я подивлюсь, чи підходить',
  date: 'Дата',
  time: 'Час',

  whereTitle: 'Куди підемо Вінницею?',
  whereSub: 'Обери місце з фото — або на карті',

  applyTitle: 'Залишити заявку',
  applySub: 'Без телефону і соцмереж. Якщо підійдеш — я напишу тобі в Тіндері',
  yourName: "Твоє ім'я (як у Тіндері)",
  note: 'Кілька слів про себе (необовʼязково)',
  notePlaceholder: 'Наприклад: люблю кіно і довгі прогулянки…',
  submit: 'Надіслати заявку',
  submitting: 'Надсилаю…',

  doneTitle: 'Заявку надіслано',
  doneText: 'Я подивлюсь відповіді і сама вирішу, з ким піти. Якщо відгукнусь — напишу тобі в Тіндері.',
  doneHint: 'Можеш закрити сторінку',

  summaryPriorities: 'Що відгукнулось',
  summaryFood: 'Їжа',
  summaryActivity: 'Активність',
  summaryWhen: 'Коли',
  summaryPlace: 'Місце',

  toastSent: '✅ Заявку надіслано',
  toastError: 'Не вдалось надіслати. Спробуй ще раз',
  ageCity: (age, city) => `${age} · ${city}`
};
