import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CommissionPage from './components/CommissionPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/commission" element={<CommissionPage />} />
      </Routes>
    </Router>
  );
};

export default App;