import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/dashboard/Dashboard';
import TestTokens from './components/TestTokens';
import Market from './components/market/Market';
import Swap from './components/swap/Swap';
import Converter from './components/converter/Converter';
import Onboarding from './components/Onboarding';
import Pools from './components/pools/Pools';
import Admin from './components/Admin';
import './App.css';
import PoolsDetails from './components/pools/pools-details/PoolsDetails';
import PageNotFound from './components/page-not-found/PageNotFound';

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

  const navigateToMarket = () => {
    navigate('/market');
  };

  return (
    <>
      <div className="min-h-screen items-center mx-auto justify-center">
        <Header />
        <div className="container flex-grow mx-auto w-12/12 md:w-5/12 pb-20">
          <Routes>
            <Route
              path="*"
              element={
                <>
                  <PageNotFound />
                </>
              }
            />
            <Route path="/onboarding" element={<Onboarding navigateToMarket={navigateToMarket} />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <Dashboard />
                </>
              }
            />
            <Route
              path="/test-tokens"
              element={
                <>
                  <TestTokens />
                </>
              }
            />
            <Route
              path="/pools"
              element={
                <>
                  <Pools />
                </>
              }
            />
            <Route path="/pools/details/pt" element={<PoolsDetails type="pt" />} />
            <Route path="/pools/details/yt" element={<PoolsDetails type="yt" />} />
            <Route
              path="/market"
              element={
                <>
                  <Market />
                </>
              }
            />
            <Route
              path="/swap"
              element={
                <>
                  <Swap />
                </>
              }
            />
            <Route
              path="/swap/pt"
              element={
                <>
                  <Swap />
                </>
              }
            />
            <Route
              path="/swap/yt"
              element={
                <>
                  <Swap />
                </>
              }
            />

            <Route
              path="/converter"
              element={
                <>
                  <Converter />
                </>
              }
            />
            <Route path="/" element={<Navigate to="/onboarding" />} />
            <Route
              path="/admin-ui"
              element={
                <>
                  <Admin />
                </>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default App;
