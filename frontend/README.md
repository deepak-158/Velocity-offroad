# Racing Club Frontend

This is the frontend for the Racing Club website. It's built with React and TypeScript.

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

To deploy the application, build it using `npm run build` and then deploy the contents of the `build` directory to your web hosting service.

Popular deployment options include:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

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
  - Contact information
