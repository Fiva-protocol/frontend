// src/components/OnboardingStep2.js
import React from 'react';
import './Onboarding.css';
import './CommonButton.css';
import onboardingImage from '../assets/icons/onboardingImage.svg';

const OnboardingStep2 = ({ nextStep }) => {
  return (
    <div className="onboarding">
      <img src={onboardingImage} alt="Onboarding" className="onboarding-image" />
      <h1>Secure & Transparent</h1>
      <p>Your assets are protected with top-tier security and full transparency. Trust in the power of decentralised finance.</p>
      <div className="progress-indicator">
        <span></span>
        <span className="active"></span>
        <span></span>
      </div>
      <button className="button next-button" onClick={nextStep}>Next</button>
    </div>
  );
};

export default OnboardingStep2;
