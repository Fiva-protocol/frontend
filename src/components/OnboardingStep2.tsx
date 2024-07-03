// src/components/OnboardingStep2.js
import React from 'react';
import './Onboarding.css';
import './CommonButton.css';
import onboardingImage from '../assets/videos/onboardingThemeVideo.mp4';

const OnboardingStep2 = ({ nextStep }) => {
  return (
    <div className="onboarding">
      <video src={onboardingImage} className="onboarding-image" autoPlay muted loop playsInline />
      <h1>Secure & Transparent</h1>
      <p>All functionalities are available on <strong>TESTNET</strong>. Please use the Tonkeeper testnet wallet to interact with the app.</p>
      <div className="progress-indicator">
        <span></span>
        <span className="active"></span>
        <span></span>
      </div>
      <button className="button" onClick={nextStep}>Next</button>
    </div>
  );
};

export default OnboardingStep2;
