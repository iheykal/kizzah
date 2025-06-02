
import React from 'react';
import { Property } from '../types.ts';
import { BedIcon, BathIcon, MapPinIcon, TrashIcon } from './ui/Icons.tsx'; 
import { Button } from './ui/Button.tsx';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
  isAdminLoggedIn: boolean; // Added to control admin actions
  onOpenEditForm?: (property: Property) => void; // Optional: only for admin
  onDeleteProperty?: (propertyId: string) => void; // Optional: only for admin
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
};

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onViewDetails, 
  isAdminLoggedIn,
  onOpenEditForm,
  onDeleteProperty
}) => {

  const handleDelete = () => {
    if (onDeleteProperty && window.confirm(`Are you sure you want to delete the property at ${property.address}? This action cannot be undone.`)) {
      onDeleteProperty(property.id);
    }
  };

  const displayAddress = `${property.address}, ${property.city}, ${property.state}${property.zipCode ? ` ${property.zipCode}` : ''}`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] flex flex-col group">
      <div className="relative overflow-hidden">
        <div 
          onClick={() => onViewDetails(property)} 
          className="cursor-pointer w-full h-56 bg-gray-200" 
          role="button"
          aria-label={`View details for ${property.address}`}
          tabIndex={0} 
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onViewDetails(property);}}
        >
          <img 
            src={property.imageUrl} 
            alt={`Rental at ${property.address}`} 
            className="w-full h-full object-cover transition-transform duration-350 ease-in-out group-hover:scale-110"
          />
        </div>
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md transition-all duration-200 ease-in-out group-hover:bg-blue-700 group-hover:scale-105 group-hover:shadow-lg animate-subtlePulseOnLoad">
          Kiro
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-2xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">{formatPrice(property.price)}
            <span className="text-sm font-normal text-gray-500">/mo</span>
          </h3>
          <p className="text-sm text-gray-600 flex items-center mt-1.5">
            <MapPinIcon className="w-4 h-4 mr-1.5 text-gray-400 transition-colors duration-200 group-hover:text-blue-500" />
            {displayAddress}
          </p>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-700 mb-4 border-t border-b border-gray-200 py-3.5">
          <div className="flex items-center">
            <BedIcon className="w-5 h-5 mr-1.5 text-blue-500 transition-colors duration-200 group-hover:text-blue-600" />
            <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <BathIcon className="w-5 h-5 mr-1.5 text-blue-500 transition-colors duration-200 group-hover:text-blue-600" />
            <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mb-1">Type: <span className="font-medium text-gray-600">{property.propertyType}</span></p>
        <p className="text-xs text-gray-500">Listed: <span className="font-medium text-gray-600">{new Date(property.listedDate).toLocaleDateString()}</span></p>
        
        <div className="mt-auto pt-5 flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
          <Button onClick={() => onViewDetails(property)} className="w-full sm:flex-1" size="md" aria-label={`View details for property at ${property.address}`}>
            View Details
          </Button>
          {isAdminLoggedIn && onOpenEditForm && (
            <Button 
              onClick={() => onOpenEditForm(property)} 
              variant="secondary" 
              className="w-full sm:flex-1" 
              size="md" 
              aria-label={`Edit property at ${property.address}`}
            >
              Edit
            </Button>
          )}
        </div>
        {isAdminLoggedIn && onDeleteProperty && (
          <div className="mt-2">
            <Button
              onClick={handleDelete}
              variant="danger"
              size="sm"
              className="w-full"
              leftIcon={<TrashIcon className="w-4 h-4" />}
              aria-label={`Delete property at ${property.address}`}
            >
              Delete Listing
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
