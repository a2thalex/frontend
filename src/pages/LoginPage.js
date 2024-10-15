import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { login } from '../redux/actions/authActions';
import LoadingIndicator from '../components/LoadingIndicator';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);
  const intl = useIntl();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = intl.formatMessage({ id: 'app.login.emailRequired', defaultMessage: 'Email is required' });
    if (!password) newErrors.password = intl.formatMessage({ id: 'app.login.passwordRequired', defaultMessage: 'Password is required' });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await dispatch(login(email, password));
      if (result.type === 'LOGIN_SUCCESS') {
        navigate('/');
      }
    }
  };

  if (loading) return <LoadingIndicator />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <FormattedMessage id="app.login.title" defaultMessage="Login" />
      </h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">
            <FormattedMessage id="app.login.email" defaultMessage="Email" />:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">
            <FormattedMessage id="app.login.password" defaultMessage="Password" />:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
        </div>
        <button type="submit" className={styles.submitButton}>
          <FormattedMessage id="app.login.submit" defaultMessage="Login" />
        </button>
      </form>
      <p className={styles.registerLink}>
        <FormattedMessage 
          id="app.login.registerPrompt" 
          defaultMessage="Don't have an account? {registerLink}"
          values={{
            registerLink: (
              <Link to="/register">
                <FormattedMessage id="app.login.registerLink" defaultMessage="Register here" />
              </Link>
            ),
          }}
        />
      </p>
    </div>
  );
};

export default LoginPage;
