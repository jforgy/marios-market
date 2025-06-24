import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StandingsPage from './pages/Standings';
import TournamentPage from './pages/TournamentPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/standings" element={<StandingsPage />} />
            <Route path="/tournament" element={<TournamentPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;