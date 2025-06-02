
export enum PropertyType {
  APARTMENT = "Apartment",
  HOUSE = "House",
  CONDO = "Condo",
  TOWNHOUSE = "Townhouse",
}

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  // sqft: number; // Removed
  imageUrl: string;
  thumbnailUrl: string;
  description: string;
  propertyType: PropertyType;
  amenities: string[];
  listedDate: string; 
  latitude?: number;
  longitude?: number;
  agent: {
    name: string;
    phone: string;
    email: string;
    avatarUrl: string;
  };
  galleryImageUrls?: string[]; // Added for image gallery
}