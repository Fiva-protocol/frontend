import { useTvlCalculation } from './useTvlCalculation';
import { formatNumberWithSpaces } from '../../utils/numberUtils';
const ptAddress = "EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK";
const ytAddress = "EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW";

export const useCombinedTvlCalculation = () => {
  const tvlPT = useTvlCalculation(ptAddress);
  const tvlYT = useTvlCalculation(ytAddress);

  const combinedTvl = tvlPT && tvlYT ? parseFloat(tvlPT.replace(/\s+/g, '')) + parseFloat(tvlYT.replace(/\s+/g, '')) : 0;

  return formatNumberWithSpaces(combinedTvl);
};
