# Technical Documentation

This document provides a technical overview of the CCI Department Choice Guidance System.

## Architecture
The application is a web-based, client-side application built using:
- **Frontend**: Standard HTML5, CSS3, and Vanilla JavaScript.
- **Backend**: An Express.js server (in `server.js`) that serves the static files.

## Scoring Logic & User Experience
The assessment logic resides in `src/js/app.js`. It processes the user's answers from the `src/data/questions.js` file and calculates department compatibility scores. 
- **Loading Animation System**: Integrated within `src/js/app.js` to provide a smooth user experience using loading overlays and progress bars during simulated processing tasks and screen transitions.

## Data Management
- **Questions**: Defined in `src/data/questions.js`. The questions array structures each question along with specific scoring weights for different departments (CS, SWE, IT, IS, ISC, STAT).
- **Departments**: Defined in `src/data/departments.js`. To update department descriptions or metadata, modify this file.

## Admin Dashboard
The dashboard interface is located at `public/dashboard.html` and utilizes the script in `src/js/dashboard.js`. It features:
- **Overview & Analytics**: Displays overall assessment metrics (Total Assessments, Average Completion, Department Distribution).
- **Recent Activity & Student Records**: Lists recent actions and a table of top-matching department scores for mock student records.
- **Implementation Note**: Currently driven by mock data in `dashboard.js`. This can be extended to integrate real API calls for production use.
