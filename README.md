# nTunz Frontend

This is the frontend application for nTunz, a platform for discovering and sharing music.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installing

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ntunz-frontend.git
   cd ntunz-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run build:staging`: Builds the app for staging environment
- `npm run eject`: Ejects from Create React App
- `npm run lint`: Runs ESLint to check for code style issues
- `npm run format`: Runs Prettier to format code
- `npm run cypress:open`: Opens the Cypress Test Runner
- `npm run cypress:run`: Runs Cypress tests in headless mode
- `npm run test:e2e`: Runs end-to-end tests
- `npm run optimize-images`: Optimizes images in the public/images directory

## Environments

- Development: `npm start`
- Staging: `npm run start:staging`
- Production: The production build is automatically deployed via Netlify

## Feature Flags

Feature flags are managed in `src/config/featureFlags.json`. To use a feature flag in a component:

```javascript
import useFeatureFlag from '../hooks/useFeatureFlag';

function MyComponent() {
  const isFeatureEnabled = useFeatureFlag('myFeatureFlag');
  // ...
}
```

## Internationalization

The app supports multiple languages. To add a new language:

1. Add translations to `src/i18n/messages.js`
2. Update the language selector in `src/App.js`

## Testing

- Run unit tests: `npm test`
- Run end-to-end tests: `npm run test:e2e`

## Deployment

The app is automatically deployed to Netlify when changes are pushed to the main branch. The `netlify.toml` file contains the configuration for both staging and production environments.

## Built With

- [React](https://reactjs.org/) - The web framework used
- [Redux](https://redux.js.org/) - State Management
- [React Router](https://reactrouter.com/) - Routing
- [Axios](https://github.com/axios/axios) - HTTP client
- [React-Intl](https://formatjs.io/docs/react-intl/) - Internationalization
- [Cypress](https://www.cypress.io/) - End-to-end testing

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
