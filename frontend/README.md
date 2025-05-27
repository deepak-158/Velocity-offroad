# VELOCITY OFFROAD - Frontend

This is the frontend for the VELOCITY OFFROAD racing team website. It's built with React and TypeScript.

## 🚀 Live Website

**🌐 [Visit the Live Website](https://velocityoffroad.netlify.app/)**

**📂 [GitHub Repository](https://github.com/deepak-158/Velocity-offroad.git)**

## Data Management Approach

This project uses static JSON files for data management:

- Data is stored in JSON files in the `src/data/` directory
- All data access is handled through the `dataService.ts` service
- To update data, edit the JSON files directly and rebuild the application

### Updating Data

To update the website data:

1. Modify the JSON files in `src/data/`:
   - `members.json` - Team member information
   - `projects.json` - Project information

2. After updating the files, rebuild and redeploy the application

For development purposes, you can use the utility functions in `src/utils/dataUpdater.ts`.

## Project Structure

- `src/components/` - React components
- `src/data/` - JSON data files
- `src/services/` - Service layer for data access
- `src/utils/` - Utility functions

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

## Deployment

The application is deployed on **Netlify** at: **https://velocityoffroad.netlify.app/**

### Deployment Process:

1. Build the project using `npm run build-netlify`
2. The build automatically deploys to Netlify when pushed to the main branch
3. Netlify handles form submissions and file uploads through Netlify Forms

### Build Command:
```bash
npm run build-netlify
```

This custom build command:
- Creates an optimized production build
- Copies data files to the build directory
- Prepares the app for Netlify deployment with form handling

## Contact Form Features

The contact form includes:
- **Text Fields**: Name, email, phone, subject, message
- **Media Upload**: Support for images, videos, PDFs, and Word documents
- **Smart Submission**: Uses FormData for file uploads, URL encoding for text-only submissions
- **Netlify Integration**: Seamless form handling through Netlify Forms
- **File Validation**: Accepts common file types with size guidance
- **User Feedback**: Clear success/error messages and file selection feedback

## Learn More

For more information about React, visit the [React documentation](https://reactjs.org/).

## Connecting to Backend

1. **Ensure the backend server is running** (on port 5000)
   ```
   cd ../backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```
   npm start
   ```

## Features

- **Public Pages**
  - Home page
  - About page
  - Team members
  - Projects showcase
  - Contact form with media upload functionality
  - Interactive map integration
  - Gallery and events showcase
