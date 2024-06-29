// src/components/OnboardingStep1.js
import './Onboarding.css';
import './CommonButton.css';
import onboardingImage from '../assets/videos/onboardingThemeVideo.mp4';

const OnboardingStep1 = ({ nextStep }) => {
    return (
        <div className="onboarding">
            <video src={onboardingImage} className="onboarding-image" autoPlay muted loop playsInline />
            <h1>Welcome to Fiva</h1>
            <p>Discover the future of decentralized finance. Manage, trade, and earn on your assets seamlessly.</p>
            <div className="progress-indicator">
                <span className="active"></span>
                <span></span>
                <span></span>
            </div>
            <button className="button" onClick={nextStep}>
                Next
            </button>
        </div>
    );
};

export default OnboardingStep1;
