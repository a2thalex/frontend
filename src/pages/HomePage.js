import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeaturedTracks, fetchFeaturedArtists } from '../redux/actions/dataActions';
import LoadingIndicator from '../components/LoadingIndicator';
import styles from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { featuredTracks, featuredArtists, loading, error } = useSelector(state => state.data);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchFeaturedTracks());
    dispatch(fetchFeaturedArtists());
  }, [dispatch]);

  if (loading) return <LoadingIndicator />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to nTunz</h1>
      
      {!isAuthenticated && (
        <div className={styles.cta}>
          <h2>Join nTunz today!</h2>
          <Link to="/register" className={styles.ctaButton}>Sign Up Now</Link>
        </div>
      )}

      <section className={styles.featuredSection}>
        <h2>Featured Tracks</h2>
        {featuredTracks && featuredTracks.length > 0 ? (
          <ul className={styles.list}>
            {featuredTracks.map(track => (
              <li key={track.id} className={styles.listItem}>
                <Link to={`/tracks/${track.id}`}>{track.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No featured tracks available at the moment.</p>
        )}
      </section>

      <section className={styles.featuredSection}>
        <h2>Featured Artists</h2>
        {featuredArtists && featuredArtists.length > 0 ? (
          <ul className={styles.list}>
            {featuredArtists.map(artist => (
              <li key={artist.id} className={styles.listItem}>
                <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No featured artists available at the moment.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
