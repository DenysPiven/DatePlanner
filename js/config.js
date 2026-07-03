/**
 * Profile & delivery settings — edit this file for your page.
 *
 * Applications are emailed to applicationEmail (FormSubmit).
 * First time: open the "Activate Form" email (check Spam) and click the link.
 * Optional: web3formsKey from https://web3forms.com — more reliable email delivery.
 */
const PROFILE = {
  name: 'Аня',
  age: 23,
  city: 'Вінниця',
  tagline: 'Шукаю того, з ким захочеться залишитись на другу каву',
  bio: 'Люблю живі розмови і вечірні прогулянки. Без ігор і тиску. Нижче — коротко про тебе і приблизний план вечора; варіанти з міткою «мені заходить» — те, що мені ближче.',

  /** Gmail inbox for applications */
  applicationEmail: 'pivden2000@gmail.com',

  /**
   * Access key from https://web3forms.com (enter pivden2000@gmail.com, copy key from email).
   * If set, used as primary email delivery (more reliable than FormSubmit).
   */
  web3formsKey: '',

  /**
   * Instant backup notifications (works even before FormSubmit is activated).
   * Open https://ntfy.sh/dateplanner-pivden2000 on your phone or browser.
   */
  ntfyTopic: 'dateplanner-pivden2000',

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
