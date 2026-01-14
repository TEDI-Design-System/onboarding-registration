# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TEDI Onboarding Registration Form - A React-based multi-step registration form that submits data to Google Sheets. Built with Vite, using the TEDI Design System components for a consistent UI that aligns with Estonia's national design system.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview

# Deploy to GitHub Pages (builds and pushes to gh-pages branch)
npm run deploy
```

## Architecture

### Multi-Step Form Flow

The application uses a stepper pattern with 4 steps:
1. **Onboarding Time Selection** - User selects meeting time
2. **Project Info** - Project name, client, contractor, project manager (required fields)
3. **Access & Licenses** - Dynamic lists for Figma licenses and meeting participants
4. **Additional Info** - Frontend framework and questions

The stepper is built using TEDI Design System's `Stepper` and `Step` components, with navigation validated at each step before proceeding.

### State Management Pattern

Form state is centralized using two custom hooks:
- **`useFormData`** ([src/hooks/useFormData.js](src/hooks/useFormData.js)) - Manages scalar form fields, validation errors, and provides a curried `handleChange` function
- **`useDynamicList`** ([src/hooks/useDynamicList.js](src/hooks/useDynamicList.js)) - Manages arrays of items (Figma members, meeting participants) with add/remove/update operations

### Component Structure

Components are organized by form step:
- Each step is a separate component in [src/components/](src/components/)
- `FigmaLicenseList.jsx` and `MeetingParticipantsList.jsx` are reusable list components with add/remove functionality
- `ThankYouPage.jsx` is shown post-submission

### Configuration Management

**Content updates are centralized in [content.config.js](content.config.js)** at the project root:
- `ONBOARDING_DATES` - Meeting time options
- `TEDI_LINKS` - External links shown in the UI

These are exported and imported into [src/constants/](src/constants/) barrel exports for use in components. This pattern keeps frequently updated content separate from application code.

## Google Sheets Integration

The form submits to Google Sheets via Google Apps Script:
1. Deploy [google-apps-script.js](google-apps-script.js) as a Web App in Google Apps Script
2. Set `VITE_GOOGLE_SCRIPT_URL` in `.env` with the deployed Web App URL
3. Update `SPREADSHEET_ID` in the script with your target Google Sheet

The form uses `mode: 'no-cors'` for submission, which is necessary for cross-origin requests to Google Apps Script.

## Deployment Configuration

The project is configured for GitHub Pages deployment:
- Update `base` in [vite.config.js](vite.config.js) to match your repository name
- Run `npm run deploy` to build and push to `gh-pages` branch
- Environment variables prefixed with `VITE_` are bundled into the client code

## TEDI Design System Usage

This project uses two TEDI packages:
- `@tedi-design-system/core` - Core design tokens and styles
- `@tedi-design-system/react` - React component library
  - Components from `/tedi` namespace (Button, Alert, etc.)
  - Community components from `/community` namespace (Stepper, Step)

Import the base stylesheet: `import '@tedi-design-system/react/index.css'`

Documentation: https://tedi.tehik.ee/
