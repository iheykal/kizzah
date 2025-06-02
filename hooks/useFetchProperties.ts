import { useEffect, useState } from 'react';
import { Property } from '../types.ts';

export const useFetchProperties = (): Property[] => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch('https://kizzah.onrender.com/api/properties')
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error('Error fetching properties:', err));
  }, []);

  return properties;
};
