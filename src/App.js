import { useState } from 'react';
import './App.css';

function App() {
  const [log, setLog] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = (action) => {
    const time = new Date().toLocaleTimeString();
    setLog(prev => [...prev, `${time} — ${action}`]);
  };
  

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <div className="top-bar">
        <h1>🔍 User Interaction Tracker</h1>
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
    <h2>📋 Event Log</h2>
    {log.length > 0 && (
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

    )}
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
