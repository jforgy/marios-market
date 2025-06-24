import React, {useEffect} from 'react';
import GoogleSheetTable from '../components/PicksByTeam';
import TradesTable from '../components/TradeTable';
import './Pages.css';

function HomePage() {
  useEffect(() => {
    document.title = 'Draft Picks';
  }, []);
  return (
    <div className="page-container">
      <section className="page-section">
        
        <div className="component-container">
          <GoogleSheetTable />
        </div>
        
        <div className="component-container">
          <TradesTable />
        </div>
      </section>
    </div>
  );
}

export default HomePage;