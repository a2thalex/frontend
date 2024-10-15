import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Assuming we have these actions, we'll need to create them later if they don't exist
import { fetchFeaturedTracks, fetchFeaturedArtists } from '../redux/actions/dataActions';

const HomePage = () => {
  const dispatch = useDispatch();
  const { featuredTracks, featuredArtists } = useSelector(state => state.data);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchFeaturedTracks());
    dispatch(fetchFeaturedArtists());
  }, [dispatch]);

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
      <ul>
        {featuredTracks.map(track => (
          <li key={track.id}>
            <Link to={`/tracks/${track.id}`}>{track.title}</Link>
          </li>
        ))}
      </ul>

      <h2>Featured Artists</h2>
      <ul>
        {featuredArtists.map(artist => (
          <li key={artist.id}>
            <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
