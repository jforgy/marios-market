import React from 'react';
import TournamentStandings from '../components/TournamentStandings';
import TournamentTable from '../components/TournamentTable';
import './Pages.css';

function TournamentPage() {
  return (
    <div className="page-container">
      <section className="page-section">
        <h1 className="page-title">In Season Tournament - Standings</h1>
        <div className="page-description">
        </div>
        
        <div className="component-container">
          <TournamentStandings />
        </div>
      </section>
      <section className="page-section">
        <h1 className="page-title">In Season Tournament - Weekly Stats</h1>
        <div className="page-description">
        </div>
        
        <div className="component-container">
          <TournamentTable />
        </div>
      </section>
    </div>
  );
}

export default TournamentPage;