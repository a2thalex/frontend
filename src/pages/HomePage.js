import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeaturedTracks, fetchFeaturedArtists } from '../redux/actions/dataActions';

const HomePage = () => {
  const dispatch = useDispatch();
  const { featuredTracks, featuredArtists, loading, error } = useSelector(state => state.data);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchFeaturedTracks());
    dispatch(fetchFeaturedArtists());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome to nTunz</h1>
      
      {!isAuthenticated && (
        <div>
          <h2>Join nTunz today!</h2>
          <Link to="/register">
            <button>Sign Up Now</button>
          </Link>
        </div>
      )}

      <h2>Featured Tracks</h2>
      {featuredTracks && featuredTracks.length > 0 ? (
        <ul>
          {featuredTracks.map(track => (
            <li key={track.id}>
              <Link to={`/tracks/${track.id}`}>{track.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No featured tracks available at the moment.</p>
      )}

      <h2>Featured Artists</h2>
      {featuredArtists && featuredArtists.length > 0 ? (
        <ul>
          {featuredArtists.map(artist => (
            <li key={artist.id}>
              <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No featured artists available at the moment.</p>
      )}
    </div>
  );
};

export default HomePage;
