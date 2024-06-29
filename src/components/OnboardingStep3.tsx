// src/components/OnboardingStep3.js
import React from 'react';
import './Onboarding.css';
import './CommonButton.css';
import onboardingImage from '../assets/videos/onboardingThemeVideo.mp4';

const OnboardingStep3 = ({ nextStep }) => {
  return (
    <div className="onboarding">
      <video src={onboardingImage} className="onboarding-image" autoPlay muted loop playsInline />
      <h1>Get Free Test Tokens</h1>
      <p>Explore all features risk-free. Claim your free test tokens and start your DeFi journey today.</p>
      <div className="progress-indicator">
        <span></span>
        <span></span>
        <span className="active"></span>
      </div>
      <button className="button" onClick={nextStep}>Next</button>
    </div>
  );
};

export default OnboardingStep3;
