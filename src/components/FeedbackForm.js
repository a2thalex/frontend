import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FeedbackForm.module.css';

const FeedbackForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
      setError('');
    } else {
      setError('Feedback cannot be empty');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your feedback here..."
        rows="4"
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" className={styles.submitButton}>Submit Feedback</button>
    </form>
  );
};

FeedbackForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FeedbackForm;
