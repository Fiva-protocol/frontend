import { useEffect, useState } from "react";
import { usePoolReserves } from '../pools/usePoolReserves';
import usePtUsdtPrice from './usePtUsdtPrice';
import useYtUsdtPrice from './useYtUsdtPrice ';
import { useTsTonUsdtPrice } from "./useTsTonUsdtPrice";
import { fromNano } from "@ton/core";
import { formatNumberWithSpaces } from "../../utils/numberUtils"; // Import the utility function

const tsTONAddress = "kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf";

const cache: { [key: string]: { tvl: string, timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useTvlCalculation = (jettonAddress: string) => {
  const [tvl, setTvl] = useState<string>('0.00');
  const poolReserves = usePoolReserves(tsTONAddress, jettonAddress);
  const { tsTonPrice, loading: tsTonLoading, error: tsTonError } = useTsTonUsdtPrice();
  const { ptPrice, loading: ptLoading, error: ptError } = usePtUsdtPrice();
  const { ytPrice, loading: ytLoading, error: ytError } = useYtUsdtPrice();

  useEffect(() => {
    const fetchTvl = async () => {
      if (!poolReserves || tsTonLoading || ptLoading || ytLoading || tsTonError || ptError || ytError) return;

      const cacheKey = `${jettonAddress}_${tsTONAddress}`;
      const now = Date.now();

      // Check if cached value exists and is still valid
      if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_DURATION)) {
        setTvl(cache[cacheKey].tvl);
        return;
      }

      const { reserve1: tsTonReserve, reserve2: jettonReserve } = poolReserves;
      const tsTonReserveInUsdt = (Number(fromNano(tsTonReserve)) * (tsTonPrice || 0));
      const jettonReserveInUsdt = jettonAddress === "EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK" 
        ? (Number(fromNano(jettonReserve)) * (ptPrice || 0)) 
        : (Number(fromNano(jettonReserve)) * (ytPrice || 0));

      const totalTvl = tsTonReserveInUsdt + jettonReserveInUsdt;
      const formattedTvl = formatNumberWithSpaces(totalTvl);

      // Update cache
      cache[cacheKey] = {
        tvl: formattedTvl,
        timestamp: now
      };

      setTvl(formattedTvl);
    };

    fetchTvl();
  }, [poolReserves, tsTonPrice, ptPrice, ytPrice, tsTonLoading, ptLoading, ytLoading, tsTonError, ptError, ytError, jettonAddress]);

  return tvl;
};
