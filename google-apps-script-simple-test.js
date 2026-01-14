/**
 * SIMPLE TEST SCRIPT - No spreadsheet access needed
 *
 * Use this to test if basic deployment works.
 * If this works, then the problem is with spreadsheet access.
 */

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Simple test works! Deployment is configured correctly.',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'POST works! Data received.',
        receivedData: data,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
