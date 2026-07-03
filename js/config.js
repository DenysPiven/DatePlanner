/**
 * Profile & delivery settings — edit this file for your page.
 *
 * ЗАЯВКИ ПРИХОДЯТЬ НА EMAIL нижче (applicationEmail).
 * Перший раз FormSubmit надішле лист «Confirm your email» — відкрий і підтвердь.
 * Після цього кожна нова заявка падає в цю пошту.
 */
const PROFILE = {
  name: 'Аня',
  age: 23,
  city: 'Вінниця',
  tagline: 'Шукаю того, з ким захочеться залишитись на другу каву',
  bio: 'Люблю живі розмови і вечірні прогулянки. Без ігор і тиску. Нижче — коротко про тебе і приблизний план вечора; варіанти з міткою «мені заходить» — те, що мені ближче.',

  /**
   * Applications are emailed here via FormSubmit.
   * Change to your real inbox. Leave empty only for local testing.
   */
  applicationEmail: 'denys.piven.my@gmail.com',

  photos: [
    {
      src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=80',
      caption: 'Привіт'
    },
    {
      src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80',
      caption: 'Про мене'
    },
    {
      src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=80',
      caption: 'Вінниця'
    }
  ]
};
