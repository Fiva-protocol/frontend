// src/components/OnboardingStep3.js
import React from 'react';
import './Onboarding.css';
import './CommonButton.css';
import onboardingImage from '../assets/icons/onboardingImage.svg';

const OnboardingStep3 = ({ nextStep }) => {
  return (
    <div className="onboarding">
      <img src={onboardingImage} alt="Onboarding" className="onboarding-image" />
      <h1>Get Free Test Tokens</h1>
      <p>Explore all features risk-free. Claim your free test tokens and start your DeFi journey today.</p>
      <div className="progress-indicator">
        <span></span>
        <span></span>
        <span className="active"></span>
      </div>
      <button className="button next-button" onClick={nextStep}>Next</button>
    </div>
  );
};

export default OnboardingStep3;
