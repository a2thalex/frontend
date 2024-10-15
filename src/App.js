import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingIndicator from './components/LoadingIndicator';
import { useAnalytics } from './hooks/useAnalytics';
import useFeatureFlag from './hooks/useFeatureFlag';
import { messages } from './i18n/messages';
import { checkAuth } from './redux/actions/authActions';
import './styles/global.css';
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
  const dispatch = useDispatch();
  useAnalytics();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (enableDarkMode && darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode, enableDarkMode]);

  const handleLanguageChange = (newLocale) => {
    setLocale(newLocale);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <ErrorBoundary>
        <div className="App">
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Header 
            locale={locale}
            onLanguageChange={handleLanguageChange}
            darkMode={darkMode}
            onDarkModeToggle={toggleDarkMode}
            enableDarkMode={enableDarkMode}
          />
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
          <Footer />
        </div>
      </ErrorBoundary>
    </IntlProvider>
  );
}

export default App;
