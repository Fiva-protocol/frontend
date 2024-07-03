import { useState, useEffect } from 'react';
import axios from 'axios';

const cache: { [key: string]: { price: number, timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const useTonUsdtPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const cacheKey = 'tonUsdtPrice';
      const now = Date.now();

      // Check if cached value exists and is still valid
      if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_DURATION)) {
        setPrice(cache[cacheKey].price);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://tonapi.io/v2/rates?tokens=ton&currencies=usd');
        const fetchedPrice = response.data.rates.TON.prices.USD;

        // Update cache
        cache[cacheKey] = {
          price: fetchedPrice,
          timestamp: now
        };

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
