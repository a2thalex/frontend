import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/actions/authActions';
import LoadingIndicator from '../components/LoadingIndicator';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await dispatch(register(username, email, password));
        if (result.type === 'REGISTER_SUCCESS') {
          navigate('/');
        } else if (result.error) {
          setErrors({ ...errors, general: result.error });
        }
      } catch (error) {
        setErrors({ ...errors, general: 'An unexpected error occurred' });
      }
    }
  };

  if (loading) return <LoadingIndicator />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      {error && <p className={styles.error}>{error}</p>}
      {errors.general && <p className={styles.error}>{errors.general}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <span className={styles.fieldError}>{errors.username}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}
        </div>
        <button type="submit" className={styles.submitButton}>Register</button>
      </form>
      <p className={styles.loginLink}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
