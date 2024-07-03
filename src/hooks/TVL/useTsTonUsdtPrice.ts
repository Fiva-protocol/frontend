import { useEffect, useState } from "react";
import useTonUsdtPrice from "./useTonUsdtPrice";
import { useFivaData } from "../useFivaData";

const cache: { [key: string]: { price: number, timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useTsTonUsdtPrice = () => {
  const { price: tonPrice, loading: tonLoading, error: tonError } = useTonUsdtPrice();
  const { index, date } = useFivaData();
  const [tsTonPrice, setTsTonPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchTsTonPrice = async () => {
      const cacheKey = 'tsTonPrice';
      const now = Date.now();

      // Check if cached value exists and is still valid
      if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_DURATION)) {
        setTsTonPrice(cache[cacheKey].price);
        return;
      }

      if (tonPrice !== null && index !== null) {
        const indexValue = Number(index) / 1000; // Adjust the index value
        const calculatedTsTonPrice = tonPrice * indexValue;

        // Update cache
        cache[cacheKey] = {
          price: calculatedTsTonPrice,
          timestamp: now
        };

        setTsTonPrice(calculatedTsTonPrice);
      }
    };

    fetchTsTonPrice();
  }, [tonPrice, index]);

  const loading = tonLoading || index === null;
  const error = tonError || (index === null ? "Error fetching index" : null);

  return { tsTonPrice, loading, error, date };
};
