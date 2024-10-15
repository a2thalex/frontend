import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styles from './ArtistSignupPage.module.css';

const ArtistSignupPage = () => {
  const [step, setStep] = useState(1);
  const [artistInfo, setArtistInfo] = useState({
    name: '',
    email: '',
    password: '',
    genre: '',
    bio: '',
  });
  const [platforms, setPlatforms] = useState({
    spotify: false,
    youtubeMusic: false,
    appleMusic: false,
  });

  const handleInputChange = (e) => {
    setArtistInfo({ ...artistInfo, [e.target.name]: e.target.value });
  };

  const handlePlatformToggle = (platform) => {
    setPlatforms({ ...platforms, [platform]: !platforms[platform] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would dispatch an action to register the artist and import their content
    console.log('Artist info:', artistInfo);
    console.log('Platforms:', platforms);
    // Move to the next step or finish the process
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finish the signup process
      // You would typically dispatch an action here to handle the signup process
      console.log('Signup process completed');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <FormattedMessage id="app.artistSignup.title" defaultMessage="Join nTunz as an Artist" />
      </h1>
      <div className={styles.stepIndicator}>
        <span className={step >= 1 ? styles.activeStep : ''}>1</span>
        <span className={step >= 2 ? styles.activeStep : ''}>2</span>
        <span className={step === 3 ? styles.activeStep : ''}>3</span>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        {step === 1 && (
          <>
            <h2><FormattedMessage id="app.artistSignup.step1" defaultMessage="Step 1: Basic Information" /></h2>
            <input
              type="text"
              name="name"
              value={artistInfo.name}
              onChange={handleInputChange}
              placeholder="Artist Name"
              required
            />
            <input
              type="email"
              name="email"
              value={artistInfo.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={artistInfo.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </>
        )}
        {step === 2 && (
          <>
            <h2><FormattedMessage id="app.artistSignup.step2" defaultMessage="Step 2: Artist Profile" /></h2>
            <input
              type="text"
              name="genre"
              value={artistInfo.genre}
              onChange={handleInputChange}
              placeholder="Genre"
              required
            />
            <textarea
              name="bio"
              value={artistInfo.bio}
              onChange={handleInputChange}
              placeholder="Bio"
              required
            />
          </>
        )}
        {step === 3 && (
          <>
            <h2><FormattedMessage id="app.artistSignup.step3" defaultMessage="Step 3: Import Your Music" /></h2>
            <p><FormattedMessage id="app.artistSignup.importInstructions" defaultMessage="Select the platforms you want to import your music from:" /></p>
            <div className={styles.platformToggle}>
              <label>
                <input
                  type="checkbox"
                  checked={platforms.spotify}
                  onChange={() => handlePlatformToggle('spotify')}
                />
                Spotify
              </label>
            </div>
            <div className={styles.platformToggle}>
              <label>
                <input
                  type="checkbox"
                  checked={platforms.youtubeMusic}
                  onChange={() => handlePlatformToggle('youtubeMusic')}
                />
                YouTube Music
              </label>
            </div>
            <div className={styles.platformToggle}>
              <label>
                <input
                  type="checkbox"
                  checked={platforms.appleMusic}
                  onChange={() => handlePlatformToggle('appleMusic')}
                />
                Apple Music
              </label>
            </div>
          </>
        )}
        <button type="submit" className={styles.submitButton}>
          {step < 3 ? (
            <FormattedMessage id="app.artistSignup.nextStep" defaultMessage="Next Step" />
          ) : (
            <FormattedMessage id="app.artistSignup.finish" defaultMessage="Finish Signup" />
          )}
        </button>
      </form>
      <p className={styles.loginPrompt}>
        <FormattedMessage
          id="app.artistSignup.loginPrompt"
          defaultMessage="Already have an account? {loginLink}"
          values={{
            loginLink: (
              <Link to="/login">
                <FormattedMessage id="app.artistSignup.login" defaultMessage="Log in here" />
              </Link>
            ),
          }}
        />
      </p>
    </div>
  );
};

export default ArtistSignupPage;
