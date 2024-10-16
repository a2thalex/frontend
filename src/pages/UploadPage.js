import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UploadTrackForm from '../components/UploadTrackForm';
import styles from './UploadPage.module.css';

const UploadPage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Your Track</h1>
      <UploadTrackForm />
    </div>
  );
};

export default UploadPage;
