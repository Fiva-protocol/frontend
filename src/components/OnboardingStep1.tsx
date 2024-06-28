// src/components/OnboardingStep1.js
import React from 'react';
import './Onboarding.css';
import './CommonButton.css';
import onboardingImage from '../assets/icons/onboardingImage.svg';

const OnboardingStep1 = ({ nextStep }) => {
  return (
    <div className="onboarding">
      <img src={onboardingImage} alt="Onboarding" className="onboarding-image" />
      <h1>Welcome to Fiva</h1>
      <p>Discover the future of decentralized finance. Manage, trade, and earn on your assets seamlessly.</p>
      <div className="progress-indicator">
        <span className="active"></span>
        <span></span>
        <span></span>
      </div>
      <button className="button next-button" onClick={nextStep}>Next</button>
    </div>
  );
};

export default OnboardingStep1;
