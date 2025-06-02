
import React from 'react';
import { Property } from '../types.ts';
import { PropertyCard } from './PropertyCard.tsx';

interface PropertyListProps {
  properties: Property[];
  onViewDetails: (property: Property) => void;
  isAdminLoggedIn: boolean; // Added to control admin actions
  onOpenEditForm?: (property: Property) => void; // Optional: only for admin
  onDeleteProperty?: (propertyId: string) => void; // Optional: only for admin
}

export const PropertyList: React.FC<PropertyListProps> = ({ 
  properties, 
  onViewDetails, 
  isAdminLoggedIn, 
  onOpenEditForm,
  onDeleteProperty
}) => {

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <img src="https://picsum.photos/seed/noresults/300/200" alt="No properties found" className="mx-auto mb-4 rounded-lg opacity-75" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
        <p className="text-gray-500">Try adjusting your filters or searching a different area.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
      {properties.map(property => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          onViewDetails={onViewDetails} 
          isAdminLoggedIn={isAdminLoggedIn}
          onOpenEditForm={onOpenEditForm}
          onDeleteProperty={onDeleteProperty}
        />
      ))}
    </div>
  );
};
