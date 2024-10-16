import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playTrack, pauseTrack, setCurrentTime, setDuration, nextTrack, previousTrack } from '../redux/actions/playerActions';
import styles from './AudioPlayer.module.css';

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, currentTime, duration, queue } = useSelector(state => state.player);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentTrack) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      dispatch(pauseTrack());
    } else {
      dispatch(playTrack());
    }
  };

  const handleTimeUpdate = () => {
    dispatch(setCurrentTime(audioRef.current.currentTime));
  };

  const handleDurationChange = () => {
    dispatch(setDuration(audioRef.current.duration));
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    dispatch(setCurrentTime(seekTime));
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleNext = () => {
    dispatch(nextTrack());
  };

  const handlePrevious = () => {
    dispatch(previousTrack());
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentTrack) return null;

  return (
    <div className={`${styles.audioPlayer} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.mainControls}>
        <img src={currentTrack.coverArt || '/default-cover.jpg'} alt={currentTrack.title} className={styles.coverArt} />
        <div className={styles.trackInfo}>
          <h3>{currentTrack.title}</h3>
          <p>{currentTrack.artist}</p>
        </div>
        <div className={styles.controls}>
          <button onClick={handlePrevious} className={styles.controlButton}>⏮</button>
          <button onClick={handlePlayPause} className={styles.playPauseButton}>
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button onClick={handleNext} className={styles.controlButton}>⏭</button>
        </div>
      </div>
      <div className={styles.progressContainer}>
        <span className={styles.time}>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className={styles.seekBar}
        />
        <span className={styles.time}>{formatTime(duration)}</span>
      </div>
      {isExpanded && (
        <div className={styles.expandedControls}>
          <div className={styles.volumeControl}>
            <span>🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className={styles.volumeBar}
            />
            <span>🔊</span>
          </div>
          <div className={styles.queueList}>
            <h4>Queue</h4>
            {queue.map((track, index) => (
              <div key={index} className={styles.queueItem}>
                <img src={track.coverArt || '/default-cover.jpg'} alt={track.title} />
                <div>
                  <h5>{track.title}</h5>
                  <p>{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <button onClick={() => setIsExpanded(!isExpanded)} className={styles.expandButton}>
        {isExpanded ? '▼' : '▲'}
      </button>
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
      />
    </div>
  );
};

export default AudioPlayer;
