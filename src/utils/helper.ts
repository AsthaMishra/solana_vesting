import BN from 'bn.js';

/**
 * Converts a JavaScript Date to a BN representing Unix time in seconds.
 * @param date - A JavaScript Date object
 * @returns BN - BigNumber representation of Unix time in seconds
 */
export function toUnixBN(date: Date): BN {
  const seconds = Math.floor(date.getTime() / 1000);
  return new BN(seconds);
}