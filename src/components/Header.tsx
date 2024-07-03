
import './Header.css';
import logo from '../assets/icons/fivaLogo.svg';
import { TonConnectButton } from '@tonconnect/ui-react';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      {/* <p className="testnet-info">Available on <strong>TESTNET</strong></p> */}
      <TonConnectButton />
    </header>
  );
};

export default Header;
