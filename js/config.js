/**
 * Profile & delivery settings — edit this file for your page.
 *
 * EMAIL: set appsScriptUrl after deploying email-worker.gs (see that file).
 * FormSubmit is NOT used (activation links break).
 *
 * Backup: ntfyTopic — open https://ntfy.sh/<topic> on your phone.
 */
const PROFILE = {
  name: 'Аня',
  age: 23,
  city: 'Вінниця',
  tagline: 'Шукаю того, з ким захочеться залишитись на другу каву',
  bio: 'Люблю живі розмови і вечірні прогулянки. Без ігор і тиску. Нижче — коротко про тебе і приблизний план вечора; варіанти з міткою «мені заходить» — те, що мені ближче.',

  /** Shown in emails / notifications */
  applicationEmail: 'pivden2000@gmail.com',

  /**
   * Google Apps Script web app URL (from Deploy → Web app).
   * Paste here after deploying email-worker.gs — emails go to pivden2000@gmail.com.
   * Example: 'https://script.google.com/macros/s/XXXX/exec'
   */
  appsScriptUrl: '',

  /**
   * Optional: access key from https://web3forms.com
   * (enter pivden2000@gmail.com, paste key from their email)
   */
  web3formsKey: '',

  /**
   * Instant notifications (works now, no setup).
   * Open: https://ntfy.sh/dateplanner-pivden2000
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
