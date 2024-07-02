import { useState, useEffect } from 'react';
import axios from 'axios';

const useTonUsdtPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get('https://tonapi.io/v2/rates?tokens=ton&currencies=usd');
        const fetchedPrice = response.data.rates.TON.prices.USD;
        setPrice(fetchedPrice);
      } catch (err) {
        setError('Error fetching TON/USDT price');
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  return { price, loading, error };
};

export default useTonUsdtPrice;
