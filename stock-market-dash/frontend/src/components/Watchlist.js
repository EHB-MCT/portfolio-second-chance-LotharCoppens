import React, { useState } from 'react';
import axios from 'axios';
import { Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Typography, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Watchlist = () => {
  // State variables
  const [watchlist, setWatchlist] = useState([]);
  const [inputSymbol, setInputSymbol] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isApiLimited, setIsApiLimited] = useState(false); // State to track API limit

  // Replace with your Alpha Vantage API key (API Key usage with limit so could show no data)
  const apiKey = 'TSQT8M1RTVEYZ4YH';

  // Function to fetch stock data from Alpha Vantage API
  const fetchData = async () => {
    setIsLoading(true);
    setIsApiLimited(false); // Reset the API limit message

    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${inputSymbol}&apikey=${apiKey}`
      );

      const globalQuote = response.data['Global Quote'];

      if (globalQuote) {
        // Find stock in watchlist to get previous price
        const stockFound = watchlist.find(stock => stock.id === inputSymbol);
        const prevPrice = stockFound ? stockFound.price : 0;

        // Create stock data object
        const stockData = {
          id: inputSymbol,
          symbol: inputSymbol,
          name: globalQuote['01. symbol'],
          price: parseFloat(globalQuote['05. price']),
          prevPrice: parseFloat(prevPrice),
        };

        // Update watchlist with new stock data
        setWatchlist(prevWatchlist => [...prevWatchlist, stockData]);
        setInputSymbol('');
      } else {
        setIsApiLimited(true); // Set API limit message
        console.error('API response is missing data for symbol:', inputSymbol);
      }
    } catch (error) {
      console.error(error);
      setIsApiLimited(true); // Set API limit message
    } finally {
      setIsLoading(false);
    }
  };

  // Function to remove a stock from watchlist
  const removeStockFromWatchlist = id => {
    const updatedWatchlist = watchlist.filter(stock => stock.id !== id);
    setWatchlist(updatedWatchlist);
  };

  return (
    <Container component={Paper} elevation={3} sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Watchlist
      </Typography>
      {isApiLimited && ( // Display API limit message if true
        <Typography variant="body2" color="error" gutterBottom>
          API usage limit reached. Please try again later.
        </Typography>
      )}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <TextField
          label="Enter Stock Symbol"
          value={inputSymbol}
          onChange={e => setInputSymbol(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ marginRight: '10px' }}
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
            <ListItemText
              primary={stock.name}
              secondary={`Symbol: ${stock.symbol}, Price: ${stock.price.toFixed(2)}, Change: ${
                stock.price >= stock.prevPrice ? '+' : '-'
              }${Math.abs(stock.price - stock.prevPrice).toFixed(2)}`}
              primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                },
              }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => removeStockFromWatchlist(stock.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Watchlist;
