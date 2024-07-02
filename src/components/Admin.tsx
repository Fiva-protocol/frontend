import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import '../App.css';
import Header from './Header';
import Mint from './Mint';
import MintFiva from './converter/MintYTPT';

function Admin() {
    return (
        <TonConnectUIProvider
            manifestUrl="https://raw.githubusercontent.com/Fiva-protocol/contracts-2/main/manifest/manifest.json"
            uiPreferences={{ theme: THEME.LIGHT }}
        >
            <div className="app">
                <Header />
                <div className="main">
                    <div className="xl:w-1/2 lg:w-3/4 md:w-10/12 sm:w-11/12">
                        <Mint />
                        <MintFiva/>
                    </div>
                </div>
            </div>
        </TonConnectUIProvider>
    );
}

export default Admin;
