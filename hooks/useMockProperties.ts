import { Property } from '../types.ts';

// Clean, mock-disabled version of useMockProperties

const generateProperties = (): Property[] => {
  // Return an empty array (no mock data, using real backend instead)
  return [];
};

export const useMockProperties = (): Property[] => {
  return generateProperties();
};
