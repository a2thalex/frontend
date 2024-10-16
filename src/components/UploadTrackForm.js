import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadTrack } from '../utils/api';
import styles from './UploadTrackForm.module.css';

const UploadTrackForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [coverArtFile, setCoverArtFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('genre', genre);
    formData.append('description', description);
    formData.append('audio', audioFile);
    formData.append('coverArt', coverArtFile);

    try {
      const response = await uploadTrack(formData);
      setMessage('Track uploaded successfully!');
      // Redirect to homepage after successful upload
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage('Error uploading track. Please try again.');
      console.error('Error uploading track:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className={styles.input}
      />
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist"
        required
        className={styles.input}
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre(s) (comma-separated)"
        required
        className={styles.input}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className={styles.textarea}
      ></textarea>
      <input
        type="file"
        onChange={(e) => setAudioFile(e.target.files[0])}
        accept="audio/*"
        required
        className={styles.fileInput}
      />
      <input
        type="file"
        onChange={(e) => setCoverArtFile(e.target.files[0])}
        accept="image/*"
        required
        className={styles.fileInput}
      />
      <button type="submit" disabled={isLoading} className={styles.submitButton}>
        {isLoading ? 'Uploading...' : 'Upload Track'}
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default UploadTrackForm;
