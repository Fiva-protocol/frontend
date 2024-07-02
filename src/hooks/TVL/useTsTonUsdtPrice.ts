import { useEffect, useState } from "react";
import useTonUsdtPrice from "./useTonUsdtPrice";
import { useFivaData } from "../useFivaData";

export const useTsTonUsdtPrice = () => {
  const { price: tonPrice, loading: tonLoading, error: tonError } = useTonUsdtPrice();
  const { index, date } = useFivaData();
  const [tsTonPrice, setTsTonPrice] = useState<number | null>(null);

  useEffect(() => {
    if (tonPrice !== null && index !== null) {
      const indexValue = Number(index) / 1000; // Adjust the index value
      setTsTonPrice(tonPrice * indexValue);
    }
  }, [tonPrice, index]);

  const loading = tonLoading || index === null;
  const error = tonError || (index === null ? "Error fetching index" : null);

  return { tsTonPrice, loading, error, date };
};
