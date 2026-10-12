# TEDI Onboarding Registration Form

Registration form for TEDI onboarding sessions and Figma license requests, published at [onboarding.tedi.ee](https://onboarding.tedi.ee/). Submissions are saved to a Google Sheet through Google Apps Script. Built with Vite, React and [TEDI-READY](https://storybook.tedi.ee/react/) components.

## The form

A four-step form:

1. **Onboardingu aeg**: choose an onboarding session time. Only upcoming sessions are listed; when there are none, the step shows a notice and can be skipped
2. **Projekti info**: project name, client, contractor and project manager (required)
3. **Ligipääsud ja litsentsid**: team members who need a Figma license, and meeting participants
4. **Lisainfo**: front-end framework and questions about using TEDI

## Prerequisites

- Node.js 20.19 or newer
- npm
- A Google account with access to Google Sheets and Google Apps Script

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the Google Sheets integration

1. Create a Google Spreadsheet and copy its ID from the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`.
2. In [Google Apps Script](https://script.google.com/), create a new project and paste in the contents of `google-apps-script.js`.
3. Set the `SPREADSHEET_ID` constant to your spreadsheet ID.
4. Deploy it with **Deploy → New deployment**: type **Web App**, execute as **Me**, access **Anyone**.
5. Copy the Web App URL (`https://script.google.com/macros/s/.../exec`).

To check the setup, run the `testSetup` function in the Apps Script editor. It creates a `Registrations` sheet with headers.

### 3. Configure the environment

```bash
cp .env.example .env
```

Set `VITE_GOOGLE_SCRIPT_URL` in `.env` to the Web App URL.

`VITE_` variables end up in the client-side bundle. That's fine for this public form, but never put credentials in them.

### 4. Run locally

```bash
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run lint
```

## Deployment

Every push to `main` builds the app and deploys it to GitHub Pages at [onboarding.tedi.ee](https://onboarding.tedi.ee/) (`.github/workflows/deploy.yml`). The workflow can also be run manually from the Actions tab.

The build reads the Web App URL from the `VITE_GOOGLE_SCRIPT_URL` repository secret.

## Updating content

Session dates and the links shown after registration live in `content.config.js`, so they can be changed without touching the application code:

```javascript
export const ONBOARDING_DATES = [
  {
    id: 'date1',
    label: 'Teisipäev, 3. veebruar 2026 kell 11:00',
    value: 'Teisipäev, 3. veebruar 2026 kell 11:00',
    date: '2026-02-03T11:00:00+02:00'
  },
];
```

`date` is the session start in Estonian time (`+02:00` in winter, `+03:00` in summer). Sessions that have already started are hidden. When no upcoming sessions are left, the first step shows a notice instead of the time choice, and people can still register. Those rows are saved with `Ootab uut aega` in the session column, so they need a follow-up once a new session is scheduled.

`TEDI_LINKS` in the same file holds the links.

## Project structure

```
├── src/
│   ├── App.tsx              # Stepper, step switching and navigation
│   ├── main.tsx             # Entry point, LabelProvider
│   ├── components/          # One component per step, dynamic lists, thank-you page
│   ├── hooks/               # Form state and dynamic list hooks
│   ├── constants/           # Form defaults, dates and links
│   └── utils/googleSheets.ts
├── content.config.js        # Session dates and links
├── google-apps-script.js    # Apps Script that writes to the sheet
└── .github/workflows/deploy.yml
```

## Troubleshooting

- **Submissions don't arrive:** check that the Apps Script is deployed with access for **Anyone**, that `VITE_GOOGLE_SCRIPT_URL` is correct, and that the script has the right `SPREADSHEET_ID`.
- **No response from the script:** the form posts with `mode: 'no-cors'`, which Google Apps Script requires. The response can't be read, but the data is still saved.

## License

[MIT](LICENSE)

## Support

- [tedi.ee](https://www.tedi.ee/): TEDI documentation
- [TEDI Storybook](https://storybook.tedi.ee/): component usage
- [TEDI on GitHub](https://github.com/TEDI-Design-System)
