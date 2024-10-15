import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtist, fetchArtistTracks } from '../redux/actions/artistActions';

const ArtistPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { artist, artistLoading, artistError } = useSelector(state => state.artist);
  const { tracks, tracksLoading, tracksError } = useSelector(state => state.artistTracks);

  useEffect(() => {
    dispatch(fetchArtist(id));
    dispatch(fetchArtistTracks(id));
  }, [dispatch, id]);

  if (artistLoading || tracksLoading) return <div>Loading...</div>;
  if (artistError) return <div>Error loading artist: {artistError}</div>;
  if (tracksError) return <div>Error loading tracks: {tracksError}</div>;
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
