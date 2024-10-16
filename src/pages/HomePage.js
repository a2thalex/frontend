import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeaturedTracks, fetchGenresWithTracks, fetchFeaturedArtistAillusion, fetchRecentTracks } from '../redux/actions/dataActions';
import LoadingIndicator from '../components/LoadingIndicator';
import styles from './HomePage.module.css';
import heroBackgroundImage from '../assets/hero-background.jpg';

const HomePage = () => {
  const dispatch = useDispatch();
  const { featuredTracks, genresWithTracks, featuredArtistAillusion, recentTracks, loading, error } = useSelector(state => state.data);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchFeaturedTracks());
    dispatch(fetchGenresWithTracks());
    dispatch(fetchFeaturedArtistAillusion());
    dispatch(fetchRecentTracks());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingIndicator />
        <p>Loading amazing music content...</p>
      </div>
    );
  }

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

      {error && <div className={styles.error}>Error: {error}</div>}

      <section className={styles.recentTracksSection}>
        <h2 className={styles.sectionTitle}>Recently Uploaded Tracks</h2>
        <div className={styles.trackList}>
          {recentTracks && recentTracks.length > 0 ? (
            recentTracks.map(track => (
              <div key={track._id} className={styles.trackItem}>
                <img src={track.coverArtUrl || '/default-cover.jpg'} alt={track.title} className={styles.trackImage} />
                <div className={styles.trackInfo}>
                  <h4>{track.title}</h4>
                  <p>{track.artist.name}</p>
                  <audio controls src={track.audioUrl} className={styles.audioPlayer}>
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            ))
          ) : (
            <p>No recent tracks available at the moment.</p>
          )}
        </div>
      </section>

      {featuredArtistAillusion && (
        <section className={styles.featuredArtistSection}>
          <h2 className={styles.sectionTitle}>Featured Artist: Aillusion</h2>
          <div className={styles.featuredArtistCard}>
            <img src={featuredArtistAillusion.artist.profilePicture || '/default-artist.jpg'} alt={featuredArtistAillusion.artist.name} className={styles.featuredArtistImage} />
            <div className={styles.featuredArtistContent}>
              <h3 className={styles.featuredArtistName}>{featuredArtistAillusion.artist.name}</h3>
              <p className={styles.featuredArtistBio}>{featuredArtistAillusion.artist.bio || 'No bio available'}</p>
              <Link to={`/artists/${featuredArtistAillusion.artist._id}`} className={styles.featuredArtistLink}>View Profile</Link>
            </div>
          </div>
          <div className={styles.featuredArtistTracks}>
            <h3>Featured Track: IWY</h3>
            <div className={styles.trackList}>
              {featuredArtistAillusion.tracks.map(track => (
                <div key={track._id || track.title} className={styles.trackItem}>
                  <img src={track.coverArt || '/default-cover.jpg'} alt={track.title} className={styles.trackImage} />
                  <div className={styles.trackInfo}>
                    <h4>{track.title}</h4>
                    <audio controls src={track.audioUrl} className={styles.audioPlayer}>
                      Your browser does not support the audio element.
                    </audio>
                    <a href={track.audioUrl} download className={styles.downloadButton}>Download</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Featured Tracks</h2>
        <div className={styles.cardGrid}>
          {featuredTracks && featuredTracks.length > 0 ? (
            featuredTracks.map(track => (
              <div key={track._id || track.title} className={styles.card}>
                <img src={track.coverArt || '/default-cover.jpg'} alt={track.title} className={styles.cardImage} />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{track.title}</h3>
                  <p className={styles.cardArtist}>{track.artist}</p>
                  {track.audioUrl ? (
                    <audio controls src={track.audioUrl} className={styles.audioPlayer}>
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <Link to={`/tracks/${track._id}`} className={styles.cardLink}>Listen Now</Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No featured tracks available at the moment.</p>
          )}
        </div>
      </section>

      <section className={styles.genresSection}>
        <h2 className={styles.sectionTitle}>Explore Genres</h2>
        {genresWithTracks && genresWithTracks.length > 0 ? (
          genresWithTracks.map(genre => (
            <div key={genre.genre} className={styles.genreSection}>
              <h3 className={styles.genreTitle}>{genre.genre}</h3>
              <div className={styles.trackList}>
                {genre.tracks.map(track => (
                  <div key={track._id || track.title} className={styles.trackItem}>
                    <img src={track.coverArt || '/default-cover.jpg'} alt={track.title} className={styles.trackImage} />
                    <div className={styles.trackInfo}>
                      <h4>{track.title}</h4>
                      <p>{track.artist}</p>
                      {track.audioUrl ? (
                        <audio controls src={track.audioUrl} className={styles.audioPlayer}>
                          Your browser does not support the audio element.
                        </audio>
                      ) : (
                        <Link to={`/tracks/${track._id}`} className={styles.listenButton}>Listen Now</Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No genres available at the moment.</p>
        )}
      </section>

      <section className={styles.joinSection}>
        <h2 className={styles.joinTitle}>Are You an Artist?</h2>
        <p className={styles.joinDescription}>Share your music with the world on nTunz</p>
        <Link to="/artist-signup" className={styles.joinButton}>Join as an Artist</Link>
      </section>
    </div>
  );
};

export default HomePage;
