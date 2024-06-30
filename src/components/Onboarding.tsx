// src/components/Onboarding.js
import React, { useState } from 'react';
import OnboardingStep1 from './OnboardingStep1';
import OnboardingStep2 from './OnboardingStep2';
import OnboardingStep3 from './OnboardingStep3';
import './Onboarding.css';

const Onboarding = ({ navigateToConverter }: { navigateToConverter: () => void }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigateToConverter();
    }
  };

  return (
    <>
      {step === 1 && <OnboardingStep1 nextStep={nextStep} />}
      {step === 2 && <OnboardingStep2 nextStep={nextStep} />}
      {step === 3 && <OnboardingStep3 nextStep={nextStep} />}
    </>
  );
};

export default Onboarding;
