import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingIndicator from './components/LoadingIndicator';
import { useAnalytics } from './hooks/useAnalytics';
import useFeatureFlag from './hooks/useFeatureFlag';
import { messages } from './i18n/messages';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ArtistPage = lazy(() => import('./pages/ArtistPage'));
const TrackPage = lazy(() => import('./pages/TrackPage'));

function App() {
  const [locale, setLocale] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const enableDarkMode = useFeatureFlag('enableDarkMode');
  useAnalytics();

  useEffect(() => {
    if (enableDarkMode && darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode, enableDarkMode]);

  const handleLanguageChange = (e) => {
    setLocale(e.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <ErrorBoundary>
        <div className="App">
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Header />
          <select 
            value={locale} 
            onChange={handleLanguageChange} 
            aria-label="Select language"
            className="language-selector"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
          {enableDarkMode && (
            <button onClick={toggleDarkMode} className="dark-mode-toggle">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          )}
          <main id="main-content">
            <Suspense fallback={<LoadingIndicator />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/artists/:id" element={<ArtistPage />} />
                <Route path="/tracks/:id" element={<TrackPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </ErrorBoundary>
    </IntlProvider>
  );
}

export default App;
