# Data Management Guide

This guide is designed for administrators who need to update the assessment content without needing to understand the underlying code.

## How to Update Content

### 1. Update Questions
Questions are stored in `src/data/questions.js`.
1.  Open `src/data/questions.js`.
2.  Locate the question object you wish to change.
3.  Edit the `text` field for the question or the `options` and their associated `weight` values for each department.
4.  Ensure the JSON structure remains intact (e.g., maintain commas and braces).

### 2. Update Department Information
Department data is stored in `src/data/departments.js`.
1.  Open `src/data/departments.js`.
2.  Locate the department object you wish to change.
3.  Update the `name`, `description`, or other metadata fields as needed.

## Important Note
After making changes to these files, please restart the server or refresh your browser to see the updates in the application. Always ensure that the JSON format is correct before saving your changes to avoid application errors.
