import React from 'react';
import './reset.css';
import {ProtectedPage} from "./pages/Protected";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <ProtectedPage/>
        </BrowserRouter>
    </div>
  );
}

export default App;
