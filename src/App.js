import { useState } from 'react';
import './App.css';

function App() {
  const [log, setLog] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = (action) => {
    const time = new Date().toLocaleTimeString();
    const logEntry = `${time} - ${action}`; // Use standard hyphen
    setLog(prev => [...prev, logEntry]);

    // Simulated event tracking request
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ event: action, timestamp: time }),
      headers: { 'Content-Type': 'application/json' }
    }).then(() => {
      console.log('Event sent to API:', action);
    }).catch(err => {
      console.error('API Error:', err);
    });
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleExportCSV = () => {
    if (log.length === 0) return;

    const header = 'Index,Timestamp, Event';
    const rows = log.map((entry, idx) => `${idx + 1},"${entry.time}","${entry.event}"`);
    const csvContent = 'data:text/csv;charset=utf-8,' + [header, ...rows].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'interaction_log.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <div className="top-bar">
        <h1>User Interaction Tracker</h1>
        <button className="toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <p>This simple app logs interactions like button clicks and typing.</p>

      <div className="actions">
        <button onClick={() => handleClick('Clicked Button A')}>Click A</button>
        <button onClick={() => handleClick('Clicked Button B')}>Click B</button>
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => handleClick(`Typed: ${e.target.value}`)}
        />
      </div>

      <div className="log-box">
        <div className="log-header">
          <h2>Event Log ({log.length} events)</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            {log.length > 0 && (
              <>
                <button
                  className="clear-btn"
                  onClick={() => {
                    const confirmClear = window.confirm("Are you sure you want to clear the log?");
                    if (confirmClear) {
                      setLog([]);
                    }
                  }}
                >
                  🗑️ Clear Log
                </button>
                <button
                  className="clear-btn"
                  onClick={handleExportCSV}
                >
                  📄 Export CSV
                </button>
              </>
            )}
          </div>
        </div>
        <ul>
          {log.slice().reverse().map((entry, idx) => (
            <li key={idx}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
