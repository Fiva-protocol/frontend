import { useState, useEffect } from 'react';
import axios from 'axios';

const cache: { apy: number | null, timestamp: number | null } = {
  apy: null,
  timestamp: null
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const useTonstakersApy = () => {
  const [apy, setApy] = useState<number | null>(cache.apy);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApy = async () => {
      const now = Date.now();

      if (cache.apy !== null && cache.timestamp !== null && (now - cache.timestamp < CACHE_DURATION)) {
        setApy(cache.apy);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://tonapi.io/v2/staking/pool/0%3Aa45b17f28409229b78360e3290420f13e4fe20f90d7e2bf8c4ac6703259e22fa', {
          headers: {
            'accept': 'application/json'
          }
        });
        const apyValue = response.data.pool.apy;
        
        // Update the cache
        cache.apy = apyValue;
        cache.timestamp = now;

        setApy(apyValue);
      } catch (err) {
        setError('Failed to fetch APY');
      } finally {
        setLoading(false);
      }
    };

    fetchApy();
  }, []);

  return { apy, loading, error };
};

export default useTonstakersApy;
