import { useState, useEffect } from 'react';
import axios from 'axios';

const useTonstakersApy = () => {
  const [apy, setApy] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApy = async () => {
      try {
        const response = await axios.get('https://tonapi.io/v2/staking/pool/0%3Aa45b17f28409229b78360e3290420f13e4fe20f90d7e2bf8c4ac6703259e22fa', {
          headers: {
            'accept': 'application/json'
          }
        });
        const apyValue = response.data.pool.apy;
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
