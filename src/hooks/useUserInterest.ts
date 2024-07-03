import { useEffect, useState, useCallback } from 'react';
import { Address, OpenedContract } from '@ton/core';
import { useTonClient } from './useTonClient';
import { Master } from '../contracts/Master';
import { User } from '../contracts/User';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonAddress } from '@tonconnect/ui-react';

const masterContractAddress = Address.parse('EQAHmEAgPST8XV4GN6r6E4NesuLs7lDbzsSW1ougMxItut9S');

// Simple in-memory cache
const cache: { [key: string]: bigint | null } = {};

export function useUserInterest() {
  const client = useTonClient();
  const userAddress = useTonAddress();
  const [userInterest, setUserInterest] = useState<bigint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const masterContract = useAsyncInitialize(async () => {
    if (!client) return null;
    const contract = new Master(masterContractAddress);
    return client.open(contract) as OpenedContract<Master>;
  }, [client]);

  const fetchUserInterest = useCallback(async () => {
    if (!masterContract || !client || !userAddress) return;

    // Cache key based on user address
    const cacheKey = userAddress;
    if (cache[cacheKey]) {
      setUserInterest(cache[cacheKey]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userContractAddress = await masterContract.getWalletAddress(Address.parse(userAddress));
      console.log(userContractAddress.toString());
      const userContract = new User(userContractAddress);
      const openedUserContract = client.open(userContract) as OpenedContract<User>;
      const interest = await openedUserContract.getInterest();
      
      // Store the result in the cache
      cache[cacheKey] = interest;
      setUserInterest(interest);
    } catch (err) {
      setError('Failed to fetch user interest');
    } finally {
      setLoading(false);
    }
  }, [masterContract, client, userAddress]);

  useEffect(() => {
    fetchUserInterest();
  }, [fetchUserInterest]);

  return { userInterest, loading, error };
}
