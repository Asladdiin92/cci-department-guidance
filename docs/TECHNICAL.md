# Technical Documentation

This document provides a technical overview of the CCI Department Choice Guidance System.

## Architecture
The application is a web-based, client-side application built using:
- **Frontend**: Standard HTML5, CSS3, and Vanilla JavaScript.
- **Backend**: An Express.js server (in `server.js`) that serves the static files.

## Scoring Logic
The assessment logic resides in `src/js/app.js`. It processes the user's answers from the `src/data/questions.js` file and calculates department compatibility scores. 

## Data Management
- **Questions**: Defined in `src/data/questions.js`. To update or add questions, modify this file. Follow the existing JSON structure.
- **Departments**: Defined in `src/data/departments.js`. To update department descriptions or metadata, modify this file.

## Admin Dashboard
The dashboard interface is located at `public/dashboard.html` and uses the script in `src/js/dashboard.js`. It is designed to display assessment results and metrics.
