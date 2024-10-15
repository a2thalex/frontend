import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Assuming we have these actions, we'll need to create them later if they don't exist
import { fetchArtist, fetchArtistTracks } from '../redux/actions/artistActions';

const ArtistPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { artist, tracks, loading, error } = useSelector(state => state.artist);

  useEffect(() => {
    dispatch(fetchArtist(id));
    dispatch(fetchArtistTracks(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!artist) return <div>Artist not found</div>;

  return (
    <div>
      <h1>{artist.name}</h1>
      <p>{artist.bio}</p>
      
      <h2>Tracks</h2>
      {tracks.length === 0 ? (
        <p>No tracks available</p>
      ) : (
        <ul>
          {tracks.map(track => (
            <li key={track.id}>
              <Link to={`/tracks/${track.id}`}>{track.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArtistPage;
