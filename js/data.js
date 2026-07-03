/**
 * Date questionnaire tree (Ukrainian UI).
 *
 * Order (why):
 * 1. About him — she filters vibe before logistics
 * 2. Duration — early; some want 30–60 min, some 4h+
 * 3. Talk topics — what happens when they sit down
 * 4. Venue — cafe / restaurant / pizza / sushi
 * 5. Drink or food detail — depends on venue
 * 6. After — walk, active, elsewhere, or see how it goes
 * 7. When — only after the plan shape is clear
 * 8. Instagram
 *
 * Options with recommended: true are her preferred answers (highlighted).
 */

const QUESTIONS = {
  /* —— About him (multi: checkboxes + Next) —— */
  lifestyle: {
    id: 'lifestyle',
    multi: true,
    next: 'energy',
    title: 'Який ти більше?',
    sub: 'Можна кілька варіантів',
    options: [
      {
        id: 'home',
        title: 'Домашній',
        desc: 'Кіно, серіали, спокій вдома',
        photo: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=80'
      },
      {
        id: 'city',
        title: 'Міський',
        desc: 'Кавʼярні, прогулянки, тусовки в місті',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Vinnytsia_in_Night.jpg/960px-Vinnytsia_in_Night.jpg',
        recommended: true
      },
      {
        id: 'travel',
        title: 'Мандрівник',
        desc: 'Поїздки, нові місця, спонтанність',
        photo: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80',
        recommended: true
      },
      {
        id: 'mixed',
        title: 'По-різному',
        desc: 'І вдома затишно, і вийти хочеться',
        photo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80',
        recommended: true
      }
    ]
  },

  energy: {
    id: 'energy',
    multi: true,
    next: 'smoking',
    title: 'Як проводиш вільний час?',
    sub: 'Можна кілька варіантів',
    options: [
      {
        id: 'sport',
        title: 'Спорт / рух',
        desc: 'Зал, пробіжки, активність',
        photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80'
      },
      {
        id: 'creative',
        title: 'Творчість',
        desc: 'Музика, фото, щось руками',
        photo: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=80',
        recommended: true
      },
      {
        id: 'social',
        title: 'Друзі',
        desc: 'Зустрічі, розмови, компанії',
        photo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80',
        recommended: true
      },
      {
        id: 'chill',
        title: 'Просто відпочинок',
        desc: 'Без планів, як піде',
        photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&q=80'
      }
    ]
  },

  /* —— Critical filters —— */
  smoking: {
    id: 'smoking',
    title: 'Куріння?',
    sub: 'Важливо знати на березі',
    options: [
      {
        id: 'no_smoke',
        title: 'Не курю',
        desc: 'Зовсім',
        photo: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80',
        recommended: true,
        next: 'alcohol'
      },
      {
        id: 'sometimes_smoke',
        title: 'Іноді',
        desc: 'Рідко, не залежність',
        photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&q=80',
        next: 'alcohol'
      },
      {
        id: 'smoke',
        title: 'Курю',
        desc: 'Регулярно',
        photo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80',
        next: 'alcohol'
      }
    ]
  },

  alcohol: {
    id: 'alcohol',
    title: 'Алкоголь?',
    sub: 'Теж важливо',
    options: [
      {
        id: 'no_alc',
        title: 'Не пʼю',
        desc: 'Тверезий спосіб життя',
        photo: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&q=80',
        recommended: true,
        next: 'duration'
      },
      {
        id: 'sometimes_alc',
        title: 'Іноді',
        desc: 'За настроєм, без фанатизму',
        photo: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80',
        recommended: true,
        next: 'duration'
      },
      {
        id: 'often_alc',
        title: 'Люблю випити',
        desc: 'Часто за келихом',
        photo: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900&q=80',
        next: 'duration'
      }
    ]
  },

  /* —— Duration early —— */
  duration: {
    id: 'duration',
    title: 'Скільки часу на побачення?',
    sub: 'Хтось любить коротко, хтось — на весь вечір',
    options: [
      {
        id: '30m',
        title: '30–60 хв',
        desc: 'Кава і познайомитись',
        photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80',
        next: 'topics'
      },
      {
        id: '1_2h',
        title: '1–2 години',
        desc: 'Комфортний мінімум',
        photo: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=900&q=80',
        recommended: true,
        next: 'topics'
      },
      {
        id: '2_4h',
        title: '2–4 години',
        desc: 'Нормальний вечір без поспіху',
        photo: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=900&q=80',
        recommended: true,
        next: 'topics'
      },
      {
        id: '4h',
        title: '4+ години',
        desc: 'Якщо зайде — можна довше',
        photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&q=80',
        next: 'topics'
      }
    ]
  },

  /* —— What they talk about at the table (multi) —— */
  topics: {
    id: 'topics',
    multi: true,
    next: 'venue',
    title: 'Про що цікаво говорити?',
    sub: 'Сядемо — і про що? Можна кілька',
    options: [
      {
        id: 'life',
        title: 'Життя і плани',
        desc: 'Хто ми, куди йдемо',
        photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=900&q=80',
        recommended: true
      },
      {
        id: 'humor',
        title: 'Жарти і легкий вайб',
        desc: 'Сміх важливіший за серйозність',
        photo: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=900&q=80',
        recommended: true
      },
      {
        id: 'travel_talk',
        title: 'Подорожі',
        desc: 'Місця, враження, мрії',
        photo: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80',
        recommended: true
      },
      {
        id: 'movies',
        title: 'Кіно / музика / серіали',
        desc: 'Що дивимось і слухаємо',
        photo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&q=80'
      },
      {
        id: 'work',
        title: 'Робота і хобі',
        desc: 'Чим займаємось щодня',
        photo: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80'
      },
      {
        id: 'deep',
        title: 'Глибші теми',
        desc: 'Почуття, цінності, сенси',
        photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&q=80'
      }
    ]
  },

  /* —— Where —— */
  venue: {
    id: 'venue',
    title: 'Куди підемо?',
    sub: 'Одне місце на старт',
    options: [
      {
        id: 'cafe',
        title: 'Кафе',
        desc: 'Легко сісти і поговорити',
        photo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80',
        recommended: true,
        next: 'drink'
      },
      {
        id: 'restaurant',
        title: 'Ресторан',
        desc: 'Повноцінна вечеря',
        photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80',
        next: 'meal_style'
      },
      {
        id: 'pizza',
        title: 'Піцерія',
        desc: 'Невимушено і смачно',
        photo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80',
        recommended: true,
        next: 'after'
      },
      {
        id: 'sushi',
        title: 'Суші',
        desc: 'На двох, спокійний темп',
        photo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&q=80',
        next: 'after'
      }
    ]
  },

  drink: {
    id: 'drink',
    title: 'Що візьмемо?',
    sub: 'У кафе',
    options: [
      {
        id: 'coffee',
        title: 'Кава',
        desc: 'Класика для розмови',
        photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80',
        recommended: true,
        next: 'after'
      },
      {
        id: 'tea',
        title: 'Чай',
        desc: 'Спокійніше',
        photo: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=900&q=80',
        next: 'after'
      },
      {
        id: 'dessert_drink',
        title: 'Кава + десерт',
        desc: 'Якщо хочеться довше посидіти',
        photo: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=80',
        recommended: true,
        next: 'after'
      }
    ]
  },

  meal_style: {
    id: 'meal_style',
    title: 'Яка вечеря?',
    sub: 'У ресторані',
    options: [
      {
        id: 'light',
        title: 'Легка',
        desc: 'Без переїдання, більше розмови',
        photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80',
        recommended: true,
        next: 'after'
      },
      {
        id: 'hearty',
        title: 'Ситна',
        desc: 'Повноцінні страви',
        photo: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80',
        next: 'after'
      },
      {
        id: 'wine',
        title: 'З вином',
        desc: 'Келих і довша розмова',
        photo: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80',
        recommended: true,
        next: 'after'
      }
    ]
  },

  /* —— After the venue —— */
  after: {
    id: 'after',
    title: 'А після?',
    sub: 'Приблизний план — далі як піде',
    options: [
      {
        id: 'park',
        title: 'Прогулянка в парку',
        desc: 'Спокійно, свіже повітря',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Vinnytsia_Fountain_park_1.jpg/960px-Vinnytsia_Fountain_park_1.jpg',
        recommended: true,
        next: 'place'
      },
      {
        id: 'embankment',
        title: 'Набережна / фонтан',
        desc: 'Класика вечірньої Вінниці',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/ROSHEN_Vinnitsa_2008_G1.jpg/960px-ROSHEN_Vinnitsa_2008_G1.jpg',
        recommended: true,
        next: 'place'
      },
      {
        id: 'active',
        title: 'Щось активніше',
        desc: 'Не лише сидіти',
        photo: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&q=80',
        next: 'place'
      },
      {
        id: 'another',
        title: 'Ще одне місце',
        desc: 'Бар, десерт, інша точка',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Vinnytsia%2C_Soborna_St_at_Night_01.jpg/960px-Vinnytsia%2C_Soborna_St_at_Night_01.jpg',
        next: 'place'
      },
      {
        id: 'flow',
        title: 'Як піде',
        desc: 'Без жорсткого плану',
        photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&q=80',
        recommended: true,
        next: 'when'
      }
    ]
  },

  /* Specific spot only if they chose a concrete after-plan */
  place: {
    id: 'place',
    title: 'Куди саме у Вінниці?',
    sub: 'Орієнтир для зустрічі',
    options: [
      {
        id: 'roshen',
        title: 'Фонтан Roshen',
        desc: 'Набережна',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/ROSHEN_Vinnitsa_2008_G1.jpg/960px-ROSHEN_Vinnitsa_2008_G1.jpg',
        recommended: true,
        next: 'when'
      },
      {
        id: 'naberezhna',
        title: 'Набережна Бугу',
        desc: 'Прогулянка біля води',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Vinnytsia_on_the_banks_of_Southern_Bug.jpg/960px-Vinnytsia_on_the_banks_of_Southern_Bug.jpg',
        recommended: true,
        next: 'when'
      },
      {
        id: 'soborna',
        title: 'Соборна',
        desc: 'Центр · кафе поруч',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Vinnytsia%2C_Soborna_St_02.jpg/960px-Vinnytsia%2C_Soborna_St_02.jpg',
        recommended: true,
        next: 'when'
      },
      {
        id: 'tower',
        title: 'Водонапірна вежа',
        desc: 'Панорама · фото',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/%D0%92%D0%BE%D0%B4%D0%BE%D0%BD%D0%B0%D0%BF%D1%96%D1%80%D0%BD%D0%B0_%D0%B2%D0%B5%D0%B6%D0%B0_%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F.jpg/960px-%D0%92%D0%BE%D0%B4%D0%BE%D0%BD%D0%B0%D0%BF%D1%96%D1%80%D0%BD%D0%B0_%D0%B2%D0%B5%D0%B6%D0%B0_%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F.jpg',
        next: 'when'
      }
    ]
  }
};
