import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import AreaChart from './AreaChart';

function App() {
  return (
    <Router basename={`${process.env.BASE_URL}`}>
      <div className='main-content'>
        <Routes>
          <Route path={'/'} element={<AreaChart />} />
        </Routes>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById('root') as HTMLElement;
const documentRoot = ReactDOM.createRoot(rootElement);
documentRoot.render(
  <App />,
);
