import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import store from './redux/store';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

console.log('Environment:', process.env.NODE_ENV);
console.log('PUBLIC_URL:', process.env.PUBLIC_URL);

const sentryDsn = process.env.REACT_APP_SENTRY_DSN;
if (sentryDsn && sentryDsn !== 'YOUR_ACTUAL_SENTRY_DSN_HERE') {
  console.log('Initializing Sentry');
  Sentry.init({
    dsn: sentryDsn,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
} else {
  console.warn('Valid Sentry DSN not found. Error tracking is disabled.');
}

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
console.log('Registering service worker');
serviceWorkerRegistration.register({
  onSuccess: (registration) => {
    console.log('Service worker registration successful', registration);
  },
  onUpdate: (registration) => {
    console.log('Service worker update available', registration);
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
