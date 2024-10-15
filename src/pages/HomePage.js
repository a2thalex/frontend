import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeaturedTracks, fetchFeaturedArtists } from '../redux/actions/dataActions';
import LoadingIndicator from '../components/LoadingIndicator';
import styles from './HomePage.module.css';
import heroBackgroundImage from '../assets/hero-background.jpg';

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

  const trendingGenres = ['Hip Hop', 'Electronic', 'Rock', 'Pop', 'R&B'];

  return (
    <div className={styles.container}>
      <section className={styles.hero} style={{ backgroundImage: `url(${heroBackgroundImage})` }}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Discover Your Sound</h1>
          <p className={styles.heroSubtitle}>Connect with artists, share your music, and explore new tracks</p>
          {!isAuthenticated && (
            <Link to="/register" className={styles.ctaButton}>Join nTunz Today</Link>
          )}
        </div>
      </section>

      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Featured Tracks</h2>
        <div className={styles.cardGrid}>
          {featuredTracks && featuredTracks.length > 0 ? (
            featuredTracks.map(track => (
              <div key={track.id} className={styles.card}>
                <img src={track.coverArt || '/default-cover.jpg'} alt={track.title} className={styles.cardImage} />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{track.title}</h3>
                  <p className={styles.cardArtist}>{track.artist}</p>
                  <Link to={`/tracks/${track.id}`} className={styles.cardLink}>Listen Now</Link>
                </div>
              </div>
            ))
          ) : (
            <p>No featured tracks available at the moment.</p>
          )}
        </div>
      </section>

      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Featured Artists</h2>
        <div className={styles.cardGrid}>
          {featuredArtists && featuredArtists.length > 0 ? (
            featuredArtists.map(artist => (
              <div key={artist.id} className={styles.card}>
                <img src={artist.profilePicture || '/default-artist.jpg'} alt={artist.name} className={styles.cardImage} />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{artist.name}</h3>
                  <p className={styles.cardGenre}>{artist.genre}</p>
                  <Link to={`/artists/${artist.id}`} className={styles.cardLink}>View Profile</Link>
                </div>
              </div>
            ))
          ) : (
            <p>No featured artists available at the moment.</p>
          )}
        </div>
      </section>

      <section className={styles.trendingSection}>
        <h2 className={styles.sectionTitle}>Trending Genres</h2>
        <div className={styles.genreGrid}>
          {trendingGenres.map(genre => (
            <Link key={genre} to={`/genres/${genre.toLowerCase()}`} className={styles.genreCard}>
              {genre}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
