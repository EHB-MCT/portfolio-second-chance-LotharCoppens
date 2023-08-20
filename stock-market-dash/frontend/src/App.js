import React from 'react';
import RealTimeStocks from './components/RealTimeStocks';
//import HistoricalData from './components/HistoricalData';
import Watchlist from './components/Watchlist';

function App() {
  return (
    <div className="App">
      <h1>Real-time Stock Market Dashboard</h1>
      <RealTimeStocks />
      <Watchlist />
    </div>
  );
}

export default App;
