import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks } from '../redux/actions/trackActions';
import LoadingIndicator from '../components/LoadingIndicator';
import AudioPlayer from '../components/AudioPlayer';
import styles from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { tracks, loading, error } = useSelector(state => state.tracks);

  useEffect(() => {
    dispatch(fetchTracks());
  }, [dispatch]);

  if (loading) return <LoadingIndicator />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1>Welcome to nTunz</h1>
      <section className={styles.featuredTracks}>
        <h2>Featured Tracks</h2>
        <div className={styles.trackList}>
          {tracks.map(track => (
            <div key={track._id} className={styles.trackItem}>
              <img src={track.coverArt} alt={track.title} className={styles.coverArt} />
              <div className={styles.trackInfo}>
                <h3>{track.title}</h3>
                <p>{track.artist}</p>
                <AudioPlayer audioUrl={track.audioUrl} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
