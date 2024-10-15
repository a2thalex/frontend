import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Assuming we have these actions, we'll need to create them later if they don't exist
import { fetchTrack, fetchTrackFeedback } from '../redux/actions/trackActions';
import FeedbackForm from '../components/FeedbackForm';

const TrackPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { track, feedback, loading, error } = useSelector(state => state.track);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchTrack(id));
    dispatch(fetchTrackFeedback(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!track) return <div>Track not found</div>;

  return (
    <div>
      <h1>{track.title}</h1>
      <p>Artist: {track.artist.name}</p>
      
      <audio controls>
        <source src={track.audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <h2>Feedback</h2>
      {feedback.length === 0 ? (
        <p>No feedback yet</p>
      ) : (
        <ul>
          {feedback.map(item => (
            <li key={item.id}>
              <p>{item.content}</p>
              <small>By: {item.user.username}</small>
            </li>
          ))}
        </ul>
      )}

      {isAuthenticated && <FeedbackForm trackId={id} />}
    </div>
  );
};

export default TrackPage;
