import './App.css';
import Coin from './Coin';
import axios from 'axios';
import { useState, useEffect } from 'react';



function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(response => {
      setCoins(response.data);
    })
    .catch(error => console.log(error))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="coin-app">
     <div className="coin-search">
      <h1 className="coin-text">Search a Currency</h1>
      <form>
        <input type="text" placeholder="Search..." className="coin-input" onChange={handleChange}/>
      </form>
     </div>
     <div id='headers'>
      <h3>Coin Name</h3>
      <div id='data'>
        <h3>Coin Price</h3>
        <h3>Coin Volume</h3>
        <h3>Price Change</h3>
        <h3>Market Cap</h3>
      </div>
     </div>
     {filteredCoins.map(coin => {
      return (
        <Coin 
          key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          volume={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          marketcap={coin.total_volume}
        />
      );
     })}
    </div>
  );
}

export default App;
