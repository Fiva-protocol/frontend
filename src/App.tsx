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
import Admin from './components/Admin';
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
    navigate('/test-tokens');
  };

  return (
    <>
      
      <div className="min-h-screen items-center mx-auto justify-center">
      <Header />
        <div className="container flex-grow mx-auto w-12/12 md:w-5/12">
        <Routes>
          <Route path="/onboarding" element={<Onboarding navigateToBalance={navigateToBalance} />} />
          <Route path="/dashboard" element={<><Dashboard /></>} />
          <Route path="/test-tokens" element={<><TestTokens /></>} />
          <Route path="/balance" element={<><Balance /></>} />
          <Route path="/market" element={<><Market /></>} />
          <Route path="/converter" element={<><Converter /></>} />
          <Route path="/" element={<Navigate to="/onboarding" />} />
          <Route path="/admin-ui" element={<><Admin /></>} />
        </Routes>
        </div>
        <Footer />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default App;
