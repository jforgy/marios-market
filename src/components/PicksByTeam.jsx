import React, { useState, useEffect } from 'react';
import '../index.css'
import'./GoogleSheetTable.css'


const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const RANGE = 'Picks%20By%20Team!B1:O19';

function GoogleSheetTable() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.values && result.values.length > 0) {
          const headers = result.values[0];
          const rows = result.values.slice(1);
          
          // Initialize all columns as visible
          const initialVisibility = {};
          headers.forEach(header => {
            initialVisibility[header] = true;
          });
          
          setHeaders(headers);
          setData(rows);
          setVisibleColumns(initialVisibility);
        } else {
          throw new Error('No data found in the spreadsheet');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleColumn = (header) => {
    setVisibleColumns(prev => ({
      ...prev,
      [header]: !prev[header]
    }));
  };

  // Get only the visible headers
  const visibleHeaders = headers.filter(header => visibleColumns[header]);
  
  // Check if at least one column is visible
  const hasVisibleColumns = visibleHeaders.length > 0;

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="google-sheet-table-container">
      <h2>2026 Picks By Team</h2>
      
      <div className="column-toggle-container">
        <div className="toggle-header">
          <h3>Toggle Team:</h3>
          <div className="select-all-buttons">
            <button
              onClick={() => {
                const allVisible = {};
                headers.forEach(header => {
                  allVisible[header] = true;
                });
                setVisibleColumns(allVisible);
              }}
              className="select-all-button"
            >
              Select All
            </button>
            <button
              onClick={() => {
                const allHidden = {};
                headers.forEach(header => {
                  allHidden[header] = false;
                });
                setVisibleColumns(allHidden);
              }}
              className="deselect-all-button"
            >
              Deselect All
            </button>
          </div>
        </div>
        <div className="toggle-buttons">
          {headers.map((header, index) => (
            <button
              key={index}
              onClick={() => toggleColumn(header)}
              className={`toggle-button ${visibleColumns[header] ? 'active' : 'inactive'}`}
            >
              {header}
            </button>
          ))}
        </div>
      </div>
      
      {hasVisibleColumns ? (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {visibleHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {visibleHeaders.map((header, index) => {
                    const headerIndex = headers.indexOf(header);
                    return (
                      <td key={index}>{row[headerIndex] || ''}</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-columns-message">
          Please select at least one column to display
        </div>
      )}
    </div>
  );
}

export default GoogleSheetTable;
