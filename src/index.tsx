import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Realtime } from "ably/promises";
import { AblyProvider } from 'ably/react';
import AreaChart from './AreaChart';

const client = new Realtime({ key: import.meta.env.VITE_ABLY_API_KEY_CLIENT || '' });

function App() {
  return (
    <AblyProvider client={client}>
      <Router>
        <div className='main-content'>
          <Routes>
            <Route path={'/'} element={<AreaChart />} />
          </Routes>
        </div>
      </Router>
    </AblyProvider>
  );
}

const rootElement = document.getElementById('root') as HTMLElement;
const documentRoot = ReactDOM.createRoot(rootElement);
documentRoot.render(
  <App />,
);
