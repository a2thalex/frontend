import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { logout } from '../redux/actions/authActions';
import { useAnalytics } from '../hooks/useAnalytics';
import styles from './Header.module.css';

const Header = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
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

  return (
    <header className={styles.header} role="banner">
      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        <Link to="/" className={styles.logo} aria-label="nTunz Home" onClick={() => handleNavClick('home')}>nTunz</Link>
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
                <button onClick={handleLogout} className={styles.navLink} aria-label="Logout">
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
    </header>
  );
};

export default Header;
