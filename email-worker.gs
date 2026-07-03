/**
 * Google Apps Script — emails applications to your Gmail.
 *
 * Setup (once, ~2 minutes):
 * 1. Open https://script.google.com → New project
 * 2. Delete default code, paste THIS file
 * 3. Set YOUR_EMAIL below
 * 4. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL into js/config.js → appsScriptUrl
 */

var YOUR_EMAIL = 'pivden2000@gmail.com';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var subject = 'Заявка на побачення: ' + (data.instagram || '');
    var body = [
      'Instagram: ' + (data.instagram || ''),
      'Коли: ' + (data.when || ''),
      'Про нього: ' + (data.about || ''),
      'План: ' + (data.plan || ''),
      'Lifestyle: ' + (data.lifestyle || ''),
      'Енергія: ' + (data.energy || ''),
      'Тривалість: ' + (data.duration || ''),
      'Теми: ' + (data.topics || ''),
      'Місце: ' + (data.venue || ''),
      'Напій/їжа: ' + (data.drinkOrMeal || ''),
      'Після: ' + (data.after || ''),
      'Точка: ' + (data.place || ''),
      'Місто: ' + (data.city || ''),
      'Час заявки: ' + (data.submittedAt || '')
    ].join('\n');

    MailApp.sendEmail({
      to: YOUR_EMAIL,
      subject: subject,
      body: body
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('DatePlanner email worker OK')
    .setMimeType(ContentService.MimeType.TEXT);
}
