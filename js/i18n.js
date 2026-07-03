/**
 * Ukrainian questionnaire copy (user-facing UI only).
 * Code, docs, and comments elsewhere are in English.
 */
const UI = {
  brand: '✨ Vechir',
  welcome: 'Ласкаво просимо',
  step: (n, total) => `Крок ${n} з ${total}`,

  welcomeTitle: 'Планер побачення',
  welcomeText: 'Заповни анкету зі свайпами, обери місце на карті — і отримай готовий план, який можна одразу надіслати в Telegram.',
  welcomeFeatures: [
    '🍕 Обери їжу та активності',
    '📍 Місце зустрічі на карті',
    '📋 Готове повідомлення для ЛС'
  ],
  start: 'Почати',

  aboutYou: 'Про тебе',
  aboutYouSub: 'Базова інформація для персоналізації плану',
  yourName: "Твоє ім'я",
  partnerName: "Ім'я (кому надсилаєш план)",
  instagram: 'Instagram',
  telegram: 'Telegram (кому написати)',
  city: 'Місто',
  next: 'Далі',

  foodTitle: 'Що їсти?',
  foodSub: 'Свайп вправо — так, вліво — ні',
  activityTitle: 'Чим зайнятись?',
  activitySub: 'Обери, що подобається',
  vibeTitle: 'Яка атмосфера?',
  vibeSub: 'Як має відчуватись вечір',
  swipeYes: 'ТАК',
  swipeNo: 'НІ',

  whenTitle: 'Коли зустрінемось?',
  whenSub: 'Обери дату та час побачення',
  date: 'Дата',
  time: 'Час',

  whereTitle: 'Де зустрінемось?',
  whereSub: 'Обери місце на карті або зі списку',

  planReady: 'План готовий!',
  planFor: (name) => `План побачення для ${name}`,
  messageLabel: 'Повідомлення для Telegram',
  copyPlan: '📋 Скопіювати план',
  openTelegram: '✈️ Написати в Telegram',
  restart: 'Почати спочатку',

  summaryDate: 'Дата та час',
  summaryPlace: 'Місце',
  summaryFood: 'Їжа',
  summaryActivity: 'Активність',
  summaryVibe: 'Атмосфера',
  summaryPlan: 'План',

  toastCopied: '✅ План скопійовано!',
  copyHint: 'Тепер відкрий Telegram і встав у повідомлення',
  toastTelegramOpen: '✈️ Відкрито чат — встав план',
  toastTelegramShare: '✈️ Обери кому надіслати',

  messageGreeting: (name) => `Привіт, ${name}! 💫`,
  messageIntro: 'Я склав для нас план побачення:',
  messageWaiting: 'Чекаю на тебе! 🌸',

  planFallbackFood: 'смачну вечерю',
  planFallbackActivity: 'прогулянку'
};
