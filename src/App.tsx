import React from 'react';
import './reset.css';
import {ProtectedPage} from "./pages/Protected";
import {BrowserRouter} from "react-router-dom";
import {createAssetDrawerCall} from "./pages/Assets/root";
import ModalProvider from "./wrappers/modal/ModalProvider";
import {BlockChain} from "./btc";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <ModalProvider>
                <ProtectedPage/>
            </ModalProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
