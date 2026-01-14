/**
 * Google Apps Script for TEDI Onboarding Form
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Copy this code into the script editor
 * 4. Update SPREADSHEET_ID below with your Google Sheets ID
 * 5. Deploy as Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click "Deploy"
 * 6. Copy the Web App URL and add it to your .env file as VITE_GOOGLE_SCRIPT_URL
 */

// Replace with your Google Sheets ID (found in the URL)
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Registrations';

// Simple GET handler for testing
function doGet(e) {
  try {
    // Test if we can access the spreadsheet
    if (SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID_HERE') {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'SPREADSHEET_ID is not configured in the script'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheetName = ss.getName();

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'ok',
        message: 'Google Apps Script is working and can access the spreadsheet!',
        spreadsheetName: sheetName,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Error accessing spreadsheet: ' + error.toString(),
        spreadsheetId: SPREADSHEET_ID
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    // Log the incoming request for debugging
    Logger.log('Received POST request');
    Logger.log('Post data: ' + e.postData.contents);

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    Logger.log('Parsed data: ' + JSON.stringify(data));

    // Validate SPREADSHEET_ID
    if (SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID_HERE') {
      throw new Error('SPREADSHEET_ID is not configured. Please update it in the script.');
    }

    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet if it doesn't exist
    if (!sheet) {
      Logger.log('Creating new sheet: ' + SHEET_NAME);
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers
      sheet.appendRow([
        'Timestamp',
        'Onboarding Aeg',
        'Projekti Nimi',
        'Klient',
        'Töövõtja',
        'Projektijuht',
        'Figma Liikmed',
        'Koosoleku Osalejad',
        'Frontend Raamistik',
        'TEDI Kasutamise Küsimused'
      ]);
      sheet.getRange('A1:J1').setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Add new row with all data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.onboardingTime || '',
      data.projectName || '',
      data.client || '',
      data.contractor || '',
      data.projectManager || '',
      data.figmaMembers || '',
      data.meetingParticipants || '',
      data.frontendFramework || '',
      data.tediUsageQuestions || ''
    ];

    Logger.log('Appending row: ' + JSON.stringify(rowData));
    sheet.appendRow(rowData);

    // Auto-resize columns
    sheet.autoResizeColumns(1, 10);

    Logger.log('Data saved successfully');

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully',
        timestamp: timestamp.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error occurred: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString(),
        details: error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify setup
function testSetup() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log('Spreadsheet opened successfully: ' + ss.getName());

  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Timestamp',
      'Onboarding Aeg',
      'Projekti Nimi',
      'Klient',
      'Töövõtja',
      'Projektijuht',
      'Figma Liikmed',
      'Koosoleku Osalejad',
      'Frontend Raamistik',
      'TEDI Kasutamise Küsimused'
    ]);
    Logger.log('Created new sheet: ' + SHEET_NAME);
  } else {
    Logger.log('Sheet already exists: ' + SHEET_NAME);
  }
}
