import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'; // Add this import statement


const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [inputSymbol, setInputSymbol] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = 'QQ0OM443G5VF3246'; // Replace with your Alpha Vantage API key

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${inputSymbol}&apikey=${apiKey}`
      );
      const stockData = {
        id: inputSymbol,
        symbol: inputSymbol,
        name: response.data['Global Quote']['01. symbol'],
        price: response.data['Global Quote']['05. price'],
      };
      setWatchlist(prevWatchlist => [...prevWatchlist, stockData]);
      setInputSymbol('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeStockFromWatchlist = id => {
    const updatedWatchlist = watchlist.filter(stock => stock.id !== id);
    setWatchlist(updatedWatchlist);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <h2>Watchlist</h2>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <TextField
          label="Enter Stock Symbol"
          value={inputSymbol}
          onChange={e => setInputSymbol(e.target.value)}
          variant="outlined"
          size="small"
          style={{ marginRight: '10px' }}
        />
        <IconButton
          edge="end"
          aria-label="add"
          onClick={fetchData}
          disabled={isLoading || inputSymbol.trim() === ''}
        >
          <AddIcon />
        </IconButton>
      </div>
      <List>
        {watchlist.map(stock => (
          <ListItem key={stock.id}>
            <ListItemText primary={stock.name} secondary={`Symbol: ${stock.symbol}, Price: ${stock.price}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => removeStockFromWatchlist(stock.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Watchlist;
