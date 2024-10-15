import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../redux/actions/userActions';
import LoadingIndicator from '../components/LoadingIndicator';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    if (!editedUser.username) newErrors.username = 'Username is required';
    if (!editedUser.email) newErrors.email = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(updateUserProfile(editedUser));
      setIsEditing(false);
    }
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!user) return <div className={styles.error}>User not found</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={editedUser.username || ''}
              onChange={handleInputChange}
            />
            {errors.username && <span className={styles.fieldError}>{errors.username}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedUser.email || ''}
              onChange={handleInputChange}
            />
            {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={editedUser.bio || ''}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelButton}>Cancel</button>
        </form>
      ) : (
        <div className={styles.profileInfo}>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio || 'No bio provided'}</p>
          <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
