import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import TestTokens from './components/TestTokens';
import Balance from './components/Balance';
import Market from './components/Market';
import Converter from './components/Converter';
import Onboarding from './components/Onboarding';
import './App.css';

const manifestUrl = 'https://raw.githubusercontent.com/Fiva-protocol/contracts-2/main/manifest/manifest.json';

const App: React.FC = () => {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <Router>
        <AppRoutes />
      </Router>
    </TonConnectUIProvider>
  );
};

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();

  const navigateToBalance = () => {
    navigate('/balance');
  };

  return (
    <div className="App">
      <div className="content">
        <Routes>
          <Route path="/onboarding" element={<Onboarding navigateToBalance={navigateToBalance} />} />
          <Route path="/dashboard" element={<><Header /><Dashboard /></>} />
          <Route path="/test-tokens" element={<><Header /><TestTokens /></>} />
          <Route path="/balance" element={<><Header /><Balance /></>} />
          <Route path="/market" element={<><Header /><Market /></>} />
          <Route path="/converter" element={<><Header /><Converter /></>} />
          <Route path="/" element={<Navigate to="/onboarding" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
