import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrack, fetchTrackFeedback } from '../redux/actions/trackActions';
import { submitFeedback } from '../redux/actions/feedbackActions';
import LoadingIndicator from '../components/LoadingIndicator';
import FeedbackForm from '../components/FeedbackForm';
import styles from './TrackPage.module.css';

const TrackPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { track, feedback, loading, error } = useSelector(state => state.tracks);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchTrack(id));
    dispatch(fetchTrackFeedback(id));
  }, [dispatch, id]);

  const handleSubmitFeedback = (content) => {
    dispatch(submitFeedback(id, content));
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!track) return <div className={styles.error}>Track not found</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{track.title}</h1>
      <p className={styles.artist}>By {track.artist.name}</p>
      
      {track.audioUrl && (
        <div className={styles.audioPlayer}>
          <audio controls src={track.audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {track.description && <p className={styles.description}>{track.description}</p>}

      <h2 className={styles.subtitle}>Feedback</h2>
      {feedback && feedback.length > 0 ? (
        <ul className={styles.feedbackList}>
          {feedback.map(item => (
            <li key={item.id} className={styles.feedbackItem}>
              <p className={styles.feedbackContent}>{item.content}</p>
              <p className={styles.feedbackAuthor}>- {item.user.username}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback available for this track.</p>
      )}

      {isAuthenticated && (
        <div className={styles.feedbackFormContainer}>
          <h3>Leave Feedback</h3>
          <FeedbackForm onSubmit={handleSubmitFeedback} />
        </div>
      )}
    </div>
  );
};

export default TrackPage;
