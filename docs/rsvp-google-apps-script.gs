const SHEET_NAME = 'RSVP';

function safeValue(value) {
  const text = String(value || '').trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function doPost(event) {
  try {
    const data = JSON.parse(event.postData.contents);
    const expectedSecret = PropertiesService.getScriptProperties().getProperty('RSVP_SHARED_SECRET');

    if (!expectedSecret || data.secret !== expectedSecret) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const nombre = safeValue(data.nombre);
    const mensaje = safeValue(data.mensaje);
    const asistencia = String(data.asistencia || '');
    const allowed = ['Sí, voy', 'Todavía no sé', 'No puedo ir'];

    if (nombre.length < 2 || nombre.length > 100 || mensaje.length > 500 || !allowed.includes(asistencia)) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
      sheet.appendRow([new Date(), nombre, asistencia, mensaje]);
    } finally {
      lock.releaseLock();
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
