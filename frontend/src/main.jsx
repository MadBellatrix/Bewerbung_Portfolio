
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Landingpage from './pages/landingpage/Landingpage.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Landingpage />
    </BrowserRouter>
  </StrictMode>,
)
