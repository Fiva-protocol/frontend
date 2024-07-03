import { useTvlCalculation } from './useTvlCalculation';
import { formatNumberWithSpaces } from '../../utils/numberUtils';

const ptAddress = "EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK";
const ytAddress = "EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW";

const cache: { [key: string]: { tvl: string, timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useCombinedTvlCalculation = () => {
  const tvlPT = useTvlCalculation(ptAddress);
  const tvlYT = useTvlCalculation(ytAddress);

  const cacheKey = 'combinedTvl';
  const now = Date.now();

  // Check if cached value exists and is still valid
  if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_DURATION)) {
    return cache[cacheKey].tvl;
  }

  const combinedTvl = tvlPT && tvlYT 
    ? parseFloat(tvlPT.replace(/\s+/g, '')) + parseFloat(tvlYT.replace(/\s+/g, '')) 
    : 0;

  const formattedCombinedTvl = formatNumberWithSpaces(combinedTvl);

  // Update cache
  cache[cacheKey] = {
    tvl: formattedCombinedTvl,
    timestamp: now
  };

  return formattedCombinedTvl;
};
