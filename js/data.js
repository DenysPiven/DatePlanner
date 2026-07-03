/**
 * Questionnaire content — Ukrainian UI.
 * Questions girls care about come first; places are Vinnytsia-only with photos.
 */

/** Priority questions (what she wants to know about him). */
const PRIORITY_CARDS = [
  {
    id: 'serious',
    title: 'Серйозні наміри',
    desc: 'Шукаю не «просто поговорити», а людину для реальних зустрічей',
    photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&q=80'
  },
  {
    id: 'plans',
    title: 'Вмієш планувати',
    desc: 'Сам пропонуєш ідеї побачення, а не лише «ну куди хочеш?»',
    photo: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=900&q=80'
  },
  {
    id: 'respect',
    title: 'Повага до кордонів',
    desc: 'Без тиску, без ревнощів з першого дня, без «ти повинна»',
    photo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80'
  },
  {
    id: 'messages',
    title: 'Нормальне спілкування',
    desc: 'Пишеш змістовно, не зникаєш після «привіт» і не сиплеш тільки мемами',
    photo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80'
  },
  {
    id: 'listen',
    title: 'Вмієш слухати',
    desc: 'Цікавишся мною, а не лише розповідаєш про себе',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=900&q=80'
  },
  {
    id: 'humor',
    title: 'Почуття гумору',
    desc: 'Можемо сміятись разом — без образ і токсичних жартів',
    photo: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=900&q=80'
  },
  {
    id: 'present',
    title: 'Живе спілкування',
    desc: 'На побаченні в телефоні не сидиш — дивишся в очі',
    photo: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&q=80'
  },
  {
    id: 'own_life',
    title: 'Маєш своє життя',
    desc: 'Хобі, друзі, цілі — не шукаєш «рятівницю від нудьги»',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80'
  }
];

const SWIPE_CARDS = {
  food: [
    {
      id: 'cafe',
      title: 'Кавʼярня',
      desc: 'Кава, десерт і спокійна розмова',
      photo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80'
    },
    {
      id: 'restaurant',
      title: 'Ресторан',
      desc: 'Повноцінна вечеря у красивому місці',
      photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80'
    },
    {
      id: 'sushi',
      title: 'Суші',
      desc: 'Японська кухня на двох',
      photo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&q=80'
    },
    {
      id: 'pizza',
      title: 'Піца / стрітфуд',
      desc: 'Невимушено і смачно',
      photo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80'
    },
    {
      id: 'ukrainian',
      title: 'Українська кухня',
      desc: 'Домашнє, ситне, своє',
      photo: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&q=80'
    },
    {
      id: 'wine',
      title: 'Вино / коктейлі',
      desc: 'Келих і довга розмова',
      photo: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80'
    },
    {
      id: 'dessert',
      title: 'Солодке',
      desc: 'Тортик, морозиво, вафлі',
      photo: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=80'
    }
  ],
  activity: [
    {
      id: 'walk',
      title: 'Прогулянка',
      desc: 'Набережна, парк, центр міста',
      photo: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80'
    },
    {
      id: 'cinema',
      title: 'Кіно',
      desc: 'Фільм і обговорення після',
      photo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&q=80'
    },
    {
      id: 'photo',
      title: 'Фотолокації',
      desc: 'Красиві місця Вінниці',
      photo: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=900&q=80'
    },
    {
      id: 'museum',
      title: 'Музей / виставка',
      desc: 'Культура без нудьги',
      photo: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=900&q=80'
    },
    {
      id: 'games',
      title: 'Настільні ігри',
      desc: 'Кафе з іграми, легкий вайб',
      photo: 'https://images.unsplash.com/photo-1611195974226-ef063636b101?w=900&q=80'
    },
    {
      id: 'live',
      title: 'Жива музика',
      desc: 'Концерт, бар з музикою',
      photo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80'
    },
    {
      id: 'fountain',
      title: 'Фонтан Roshen',
      desc: 'Класика вечірньої Вінниці',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/ROSHEN_Vinnitsa_2008_G1.jpg/960px-ROSHEN_Vinnitsa_2008_G1.jpg'
    }
  ]
};

const LABELS = {
  priority: {
    serious: 'Серйозні наміри',
    plans: 'Вміє планувати',
    respect: 'Повага до кордонів',
    messages: 'Нормальне спілкування',
    listen: 'Вміє слухати',
    humor: 'Почуття гумору',
    present: 'Живе спілкування',
    own_life: 'Має своє життя'
  },
  food: {
    cafe: 'Кавʼярня',
    restaurant: 'Ресторан',
    sushi: 'Суші',
    pizza: 'Піца / стрітфуд',
    ukrainian: 'Українська кухня',
    wine: 'Вино / коктейлі',
    dessert: 'Солодке'
  },
  activity: {
    walk: 'Прогулянка',
    cinema: 'Кіно',
    photo: 'Фотолокації',
    museum: 'Музей / виставка',
    games: 'Настільні ігри',
    live: 'Жива музика',
    fountain: 'Фонтан Roshen'
  }
};

/** Vinnytsia meeting spots — real city photos (Wikimedia Commons). */
const VINNYTSIA = {
  name: 'Вінниця',
  center: [49.2331, 28.4682],
  zoom: 13,
  places: [
    {
      id: 'roshen',
      name: 'Фонтан Roshen',
      type: 'Набережна · вечірнє шоу',
      lat: 49.2328,
      lng: 28.4594,
      tags: ['fountain', 'walk', 'photo', 'romantic'],
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/ROSHEN_Vinnitsa_2008_G1.jpg/960px-ROSHEN_Vinnitsa_2008_G1.jpg'
    },
    {
      id: 'naberezhna',
      name: 'Набережна Південного Бугу',
      type: 'Прогулянка біля води',
      lat: 49.2315,
      lng: 28.4620,
      tags: ['walk', 'photo', 'talk'],
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Vinnytsia_on_the_banks_of_Southern_Bug.jpg/960px-Vinnytsia_on_the_banks_of_Southern_Bug.jpg'
    },
    {
      id: 'fountain_park',
      name: 'Парк фонтанів',
      type: 'Парк · вечір',
      lat: 49.2320,
      lng: 28.4605,
      tags: ['walk', 'photo', 'cozy'],
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Vinnytsia_Fountain_park_1.jpg/960px-Vinnytsia_Fountain_park_1.jpg'
    },
    {
      id: 'night_center',
      name: 'Вечірній центр',
      type: 'Прогулянка · вогні міста',
      lat: 49.2326,
      lng: 28.4679,
      tags: ['walk', 'photo', 'romantic'],
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Vinnytsia_in_Night.jpg/960px-Vinnytsia_in_Night.jpg'
    },
    {
      id: 'soborna',
      name: 'Вулиця Соборна',
      type: 'Кавʼярні · центр',
      lat: 49.2335,
      lng: 28.4710,
      tags: ['cafe', 'walk', 'dessert'],
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Vinnytsia%2C_Soborna_St_02.jpg/960px-Vinnytsia%2C_Soborna_St_02.jpg'
    },
    {
      id: 'soborna_night',
      name: 'Соборна ввечері',
      type: 'Вечірня прогулянка',
      lat: 49.2332,
      lng: 28.4705,
      tags: ['walk', 'romantic', 'photo'],
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Vinnytsia%2C_Soborna_St_at_Night_01.jpg/960px-Vinnytsia%2C_Soborna_St_at_Night_01.jpg'
    },
    {
      id: 'bridge',
      name: 'Міст на Соборній',
      type: 'Фотолокація',
      lat: 49.2325,
      lng: 28.4650,
      tags: ['photo', 'walk'],
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Vinnytsia%2C_Soborna_.st_Bridge.jpg/960px-Vinnytsia%2C_Soborna_.st_Bridge.jpg'
    },
    {
      id: 'tower',
      name: 'Водонапірна вежа',
      type: 'Панорама · фото',
      lat: 49.2348,
      lng: 28.4655,
      tags: ['photo', 'walk', 'adventure'],
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/%D0%92%D0%BE%D0%B4%D0%BE%D0%BD%D0%B0%D0%BF%D1%96%D1%80%D0%BD%D0%B0_%D0%B2%D0%B5%D0%B6%D0%B0_%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F.jpg/960px-%D0%92%D0%BE%D0%B4%D0%BE%D0%BD%D0%B0%D0%BF%D1%96%D1%80%D0%BD%D0%B0_%D0%B2%D0%B5%D0%B6%D0%B0_%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F.jpg'
    },
    {
      id: 'restaurant_center',
      name: 'Вечеря в центрі',
      type: 'Ресторан / кафе',
      lat: 49.2320,
      lng: 28.4700,
      tags: ['restaurant', 'wine', 'cafe'],
      photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80'
    },
    {
      id: 'cinema_place',
      name: 'Кінотеатр (центр)',
      type: 'Кіно',
      lat: 49.2310,
      lng: 28.4685,
      tags: ['cinema', 'fun'],
      photo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&q=80'
    }
  ]
};
