import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtist, fetchArtistTracks } from '../redux/actions/artistActions';
import LoadingIndicator from '../components/LoadingIndicator';
import styles from './ArtistPage.module.css';

const ArtistPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { artist, tracks, loading, error } = useSelector(state => state.artists);

  useEffect(() => {
    dispatch(fetchArtist(id));
    dispatch(fetchArtistTracks(id));
  }, [dispatch, id]);

  if (loading) return <LoadingIndicator />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!artist) return <div className={styles.error}>Artist not found</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{artist.name}</h1>
      {artist.bio && <p className={styles.bio}>{artist.bio}</p>}
      
      <h2 className={styles.subtitle}>Tracks</h2>
      {tracks && tracks.length > 0 ? (
        <ul className={styles.trackList}>
          {tracks.map(track => (
            <li key={track.id} className={styles.trackItem}>
              <Link to={`/tracks/${track.id}`} className={styles.trackLink}>{track.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tracks available for this artist.</p>
      )}
    </div>
  );
};

export default ArtistPage;
