import React, {useEffect} from 'react';
import StandingsTable from '../components/StandingsTable';
import LastUpdatedTable from '../components/LastUpdatedTable';
import './Pages.css';

function StandingsPage() {
  useEffect(() => {
    document.title='Standings';
  },[]);


  return (
    <div className="page-container">
      <section className="page-section">
        <h1 className="page-title">Standings</h1>
        <div className="page-description">
          View current standings and adjustment information.
        </div>
        
        <div className="component-container">
          <StandingsTable />
        </div>
        
        <div className="component-container">
          <LastUpdatedTable />
        </div>
      </section>
    </div>
  );
}

export default StandingsPage;