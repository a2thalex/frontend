import React from 'react';
import styles from './LoadingIndicator.module.css';

const LoadingIndicator = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.spinner} data-testid="spinner"></div>
    <p>Loading...</p>
  </div>
);

export default LoadingIndicator;
