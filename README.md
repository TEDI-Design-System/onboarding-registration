# TEDI Onboarding Registration Form

A React-based registration form for the TEDI onboarding process that submits data directly to Google Sheets. Built with Vite and TEDI Design System components.

## Features

- Simple registration form with 4 fields:
  - Nimi (Name)
  - Email
  - Projekt (Project)
  - Projektimeeskond, kellele vaja Figma litsentse (Team members needing Figma license)
- Built with TEDI Design System components
- Direct integration with Google Sheets
- Responsive design
- Form validation
- Deployable to GitHub Pages

## Prerequisites

- Node.js (v18 or higher)
- npm
- Google account with access to Google Sheets and Google Apps Script

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Google Sheets Integration

#### Step 1: Create a Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet for TEDI Onboarding registrations
3. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```

#### Step 2: Deploy Google Apps Script
1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Copy the contents of `google-apps-script.js` into the editor
4. Update the `SPREADSHEET_ID` constant with your spreadsheet ID
5. Click "Deploy" > "New deployment"
6. Settings:
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click "Deploy"
8. Copy the Web App URL (it will look like: `https://script.google.com/macros/s/.../exec`)

#### Step 3: Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and add your Google Apps Script Web App URL:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
   ```

### 3. Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment to GitHub Pages

### Initial Setup

1. Create a new repository on GitHub
2. Initialize git in your project (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Add your GitHub repository as remote:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/tedi-onboarding.git
   ```
4. Push to GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Deploy

1. Update `vite.config.js` with your repository name:
   ```javascript
   base: '/your-repo-name/',
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

3. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages"
   - Source: Select "gh-pages" branch
   - Click "Save"

Your form will be available at: `https://YOUR_USERNAME.github.io/tedi-onboarding/`

### Environment Variables for GitHub Pages

For GitHub Pages deployment, you need to set the environment variable during build:

1. Create a `.env.production` file:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
   ```

2. Or set it in your GitHub Actions workflow if using CI/CD.

**Security Note:** Environment variables prefixed with `VITE_` are exposed in the client-side code. Since this is a public form, this is acceptable. However, never include sensitive credentials.

## Testing the Google Sheets Connection

After deploying the Google Apps Script:

1. Open the Apps Script editor
2. Select the `testSetup` function from the dropdown
3. Click "Run"
4. Check the execution log to verify the setup
5. Check your Google Sheet - it should have a new sheet named "Registrations" with headers

## Configuration

### Updating Content

All frequently updated content (dates and links) is centralized in `content.config.js` in the project root. This makes it easy to maintain without touching the application code.

#### Onboarding Dates

To update the available onboarding session dates:

```javascript
export const ONBOARDING_DATES = [
  {
    id: 'date1',
    label: 'Teisipäev, 20. jaanuar 2026 kell 10:00',
    value: 'Teisipäev, 20. jaanuar 2026 kell 10:00'
  },
  // Add or modify dates as needed
];
```

#### TEDI Links

To update TEDI related links:

```javascript
export const TEDI_LINKS = [
  {
    url: 'https://tedi.ee',
    label: 'TEDI avalehekülg'
  },
  // Add or modify links as needed
];
```

## Project Structure

```
tedi-onboarding/
├── src/
│   ├── App.tsx              # Main form component
│   ├── App.css              # Styles
│   └── main.tsx             # Entry point
├── .env.example             # Environment variable template
├── content.config.js        # Content configuration (dates, links)
├── google-apps-script.js    # Google Apps Script code
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies
```

## Troubleshooting

### Form submission not working
- Verify the Google Apps Script is deployed as "Anyone" can access
- Check that the Web App URL in `.env` is correct
- Open browser console to see any error messages
- Verify the Google Apps Script has the correct Spreadsheet ID

### CORS errors
- The form uses `mode: 'no-cors'` which is necessary for Google Apps Script
- This means we can't read the response, but the data will still be saved

### Deployment issues
- Ensure the `base` path in `vite.config.js` matches your repository name
- Verify GitHub Pages is enabled in repository settings
- Check that the `gh-pages` branch exists after running `npm run deploy`

## License

This project is part of the TEDI Design System initiative.

## Support

For issues related to TEDI Design System components, visit:
- [TEDI Design System Documentation](https://tedi.tehik.ee/)
- [TEDI Design System GitHub](https://github.com/TEHIK-EE/tedi-design-system)
