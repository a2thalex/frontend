import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { logout } from '../redux/actions/authActions';
import { useAnalytics } from '../hooks/useAnalytics';
import styles from './Header.module.css';

const Header = ({ locale, onLanguageChange, darkMode, onDarkModeToggle, enableDarkMode }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();

  const handleLogout = () => {
    dispatch(logout());
    trackEvent('logout', 'user', 'logout_success');
    navigate('/');
  };

  const handleNavClick = (destination) => {
    trackEvent('navigation', 'user', `navigate_to_${destination}`);
  };

  const handleLanguageChange = (e) => {
    onLanguageChange(e.target.value);
  };

  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerContent}>
        <div className={styles.brandContainer}>
          <Link to="/" className={styles.logoLink} aria-label="nTunz Home" onClick={() => handleNavClick('home')}>
            <svg className={styles.logo} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="var(--primary-color)"/>
              <path d="M12 28V12L28 20L12 28Z" fill="var(--on-background)"/>
            </svg>
            <span className={styles.brandName}>nTunz</span>
          </Link>
          <p className={styles.brandMessage}>Discover. Create. Connect.</p>
        </div>
        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink} onClick={() => handleNavClick('home')}>
                <FormattedMessage id="app.header.home" defaultMessage="Home" />
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className={styles.navItem}>
                  <Link to="/profile" className={styles.navLink} onClick={() => handleNavClick('profile')}>
                    <FormattedMessage id="app.header.profile" defaultMessage="Profile" />
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <button onClick={handleLogout} className={styles.logoutButton} aria-label="Logout">
                    <FormattedMessage id="app.header.logout" defaultMessage="Logout" />
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={styles.navItem}>
                  <Link to="/login" className={styles.navLink} onClick={() => handleNavClick('login')}>
                    <FormattedMessage id="app.header.login" defaultMessage="Login" />
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link to="/register" className={styles.navLink} onClick={() => handleNavClick('register')}>
                    <FormattedMessage id="app.header.register" defaultMessage="Register" />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className={styles.headerControls}>
          <select 
            value={locale} 
            onChange={handleLanguageChange} 
            aria-label="Select language"
            className={styles.languageSelector}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
          {enableDarkMode && (
            <button onClick={onDarkModeToggle} className={styles.darkModeToggle}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
