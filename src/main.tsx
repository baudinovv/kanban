import { createRoot } from 'react-dom/client'
import App from './1__App/App';
import { StrictMode } from 'react';

import "./index.css"


createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
