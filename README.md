# nTunz Frontend

This is the frontend application for the nTunz platform.

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_SENTRY_DSN=YOUR_ACTUAL_SENTRY_DSN_HERE
   ```
4. Start the development server: `npm start`

## Deployment

The frontend is automatically deployed to Netlify when changes are pushed to the main branch of the Git repository. No manual steps are required for deployment.

## Environment Variables

Make sure the following environment variables are set in your Netlify project settings:

- `REACT_APP_API_URL`: Set this to your Heroku backend URL (e.g., https://your-app-name.herokuapp.com)
- `REACT_APP_SENTRY_DSN`: Set this to your Sentry DSN if you're using Sentry for error tracking

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production

## Notes

- The application uses Redux for state management and React Router for routing.
- API calls are made using Axios, with the base URL set from the REACT_APP_API_URL environment variable.
- Make sure the backend CORS settings allow requests from your Netlify domain.
- To deploy changes, simply push your commits to the main branch of the Git repository.
