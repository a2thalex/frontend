# nTunz Frontend

This is the frontend application for the nTunz platform, featuring a modern and responsive design with a vibrant color scheme.

## Features

- Modern, responsive design with a vibrant color scheme
- Hero section showcasing featured content
- Display of featured tracks and artists
- Dark mode toggle for user preference
- Language selection (supports English and Spanish)
- Optimized images for faster loading

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
- `npm run optimize-images`: Optimizes images in the public folder for better performance

## Notes

- The application uses Redux for state management and React Router for routing.
- API calls are made using Axios, with the base URL set from the REACT_APP_API_URL environment variable.
- Make sure the backend CORS settings allow requests from your Netlify domain.
- To deploy changes, simply push your commits to the main branch of the Git repository.
- The dark mode toggle and language selection features are available in the header component.
- Images are optimized using the `optimize-images` script, which should be run before deployment for best performance.

## Customization

- To modify the color scheme, update the CSS variables in `src/styles/global.css`.
- To add or modify features, refer to the components in the `src/components` directory.
- The main layout and routing are handled in `src/App.js`.

For any questions or issues, please refer to the project documentation or contact the development team.
