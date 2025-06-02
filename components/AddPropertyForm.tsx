
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Property, PropertyType } from '../types.ts';
import { Button } from './ui/Button.tsx';
import { Input } from './ui/Input.tsx';
import { Select } from './ui/Select.tsx';
import { Textarea } from './ui/Textarea.tsx';
import { XMarkIcon, TrashIcon, PlusIcon } from './ui/Icons.tsx';

interface PropertyFormProps {
  isVisible: boolean;
  mode: 'add' | 'edit';
  initialData?: Property | null;
  onSubmit: (property: Property) => void;
  onClose: () => void;
}

const propertyTypeOptions = Object.values(PropertyType).map(type => ({ value: type, label: type }));

export const AddPropertyForm: React.FC<PropertyFormProps> = ({ 
  isVisible, 
  mode, 
  initialData, 
  onSubmit, 
  onClose 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Address fields
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState(''); // Using stateVal to avoid conflict
  // zipCode state removed

  const [price, setPrice] = useState<number | ''>('');
  const [bedrooms, setBedrooms] = useState<number | ''>('');
  const [bathrooms, setBathrooms] = useState<number | ''>('');
  const [propertyType, setPropertyType] = useState<PropertyType>(PropertyType.APARTMENT);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  
  // State for gallery images
  const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);
  const [newGalleryImageUrl, setNewGalleryImageUrl] = useState('');

  const formTitleId = "property-form-title";

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setAddress(initialData.address);
      setCity(initialData.city);
      setStateVal(initialData.state);
      // initialData.zipCode is not set to state anymore
      setPrice(initialData.price);
      setBedrooms(initialData.bedrooms !== undefined ? Math.floor(initialData.bedrooms) : '');
      setBathrooms(initialData.bathrooms !== undefined ? Math.floor(initialData.bathrooms) : '');
      setPropertyType(initialData.propertyType);
      setDescription(initialData.description);
      setImageUrl(initialData.imageUrl);
      setThumbnailUrl(initialData.thumbnailUrl || '');
      setCurrentGalleryImages(initialData.galleryImageUrls || []);
    } else {
      // Reset form fields
      setAddress('');
      setCity('');
      setStateVal('');
      // zipCode state reset removed
      setPrice('');
      setBedrooms('');
      setBathrooms('');
      setPropertyType(PropertyType.APARTMENT);
      setDescription('');
      setImageUrl('');
      setThumbnailUrl('');
      setCurrentGalleryImages([]);
      setNewGalleryImageUrl('');
    }
  }, [mode, initialData, isVisible]); 

  const handleAnimationEnd = () => {
    if (!isVisible && modalRef.current) {
      // App.tsx's onClose now handles unmounting after animation
    }
  };

  const handleAddGalleryImage = () => {
    if (newGalleryImageUrl.trim() !== '' && !currentGalleryImages.includes(newGalleryImageUrl.trim())) {
      try {
        new URL(newGalleryImageUrl.trim());
        setCurrentGalleryImages(prev => [...prev, newGalleryImageUrl.trim()]);
        setNewGalleryImageUrl('');
      } catch (_) {
        alert("Please enter a valid URL for the gallery image.");
      }
    } else if (currentGalleryImages.includes(newGalleryImageUrl.trim())) {
      alert("This image URL is already in the gallery.");
    } else {
        alert("Image URL cannot be empty.");
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setCurrentGalleryImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleBedroomsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setBedrooms('');
    } else {
      const parsedInt = parseInt(val, 10);
      if (!Number.isNaN(parsedInt) && parsedInt >= 0) {
        setBedrooms(parsedInt);
      }
    }
  };

  const handleBathroomsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setBathrooms('');
    } else {
      const parsedInt = parseInt(val, 10);
      if (!Number.isNaN(parsedInt) && parsedInt >= 0) {
        setBathrooms(parsedInt);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Removed zipCode from validation
    if (!address || !city || !stateVal || price === '' || bedrooms === '' || bathrooms === '' || !description || !imageUrl) {
      alert('Please fill in all required fields, including full address details (Street, City, State).');
      return;
    }

    let propertyData: Property;

    if (mode === 'add') {
      propertyData = {
        id: `new-prop-${Date.now()}`,
        address: address,
        city: city,
        state: stateVal,
        zipCode: '', // Set zipCode to empty string
        price: Number(price),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        propertyType,
        description,
        amenities: [], 
        imageUrl,
        thumbnailUrl: thumbnailUrl || imageUrl,
        listedDate: new Date().toISOString().split('T')[0],
        agent: { 
          name: "Ilyaas Abdirahman",
          phone: "0610251014",
          email: "Ilyaas@gmail.com",
          avatarUrl: "https://i.postimg.cc/CL0KXF2C/DOCUMENT-1.jpg",
        },
        galleryImageUrls: currentGalleryImages,
      };
    } else { 
      if (!initialData) {
        console.error("Cannot edit without initial data");
        return;
      }
      propertyData = {
        ...initialData, 
        address: address,
        city: city,
        state: stateVal,
        zipCode: '', // Set zipCode to empty string
        price: Number(price),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        propertyType,
        description,
        imageUrl,
        thumbnailUrl: thumbnailUrl || imageUrl,
        galleryImageUrls: currentGalleryImages,
      };
    }
    onSubmit(propertyData);
  };
  
  const modalClasses = `fixed inset-0 flex items-center justify-center p-4 z-50 ${
    isVisible ? 'modal-enter-active' : 'modal-leave-active'
  }`;

  const formTitle = mode === 'edit' ? "Edit Listing" : "Create New Listing";

  const labelStyling = "block text-slate-700 dark:text-slate-300 font-semibold text-sm mb-2";
  const fieldStyling = "block w-full rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/60 placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-slate-100 text-base py-2.5 px-4 shadow-sm hover:border-slate-400 dark:hover:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:shadow-2xl focus:bg-white dark:focus:bg-slate-700 transition-all duration-250 ease-in-out";


  return (
    <div 
      ref={modalRef}
      className={modalClasses}
      onClick={onClose} 
      onAnimationEnd={handleAnimationEnd}
      role="dialog"
      aria-modal="true"
      aria-labelledby={formTitleId}
      aria-hidden={!isVisible}
    >
      <div className="modal-backdrop fixed inset-0 bg-black" />
      <div 
        className="modal-content-wrapper bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto relative p-6 md:p-10 border border-slate-200 dark:border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 dark:hover:text-red-400 bg-transparent hover:bg-red-100 dark:hover:bg-red-700/30 rounded-full p-2 transition-all duration-300 ease-out z-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transform hover:rotate-90 hover:scale-110"
          aria-label={`Close ${formTitle.toLowerCase()} form`}
        >
          <XMarkIcon className="w-7 h-7" />
        </button>

        <h2 id={formTitleId} className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-8 md:mb-10 text-center anim-fadeInUp" style={{animationDelay: '0s'}}>{formTitle}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          {/* Address Fields Group */}
          <div className="anim-fadeInUp" style={{animationDelay: '0.1s'}}>
            <label htmlFor="address" className={labelStyling}>Street Address</label>
            <Input id="address" value={address} onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} required placeholder="e.g., 123 Main St" className={fieldStyling} />
          </div>
          
          {/* Adjusted grid for City and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-8">
            <div className="anim-fadeInUp" style={{animationDelay: '0.15s'}}>
              <label htmlFor="city" className={labelStyling}>City</label>
              <Input id="city" value={city} onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)} required placeholder="e.g., Springfield" className={fieldStyling} />
            </div>
            <div className="anim-fadeInUp" style={{animationDelay: '0.2s'}}>
              <label htmlFor="stateVal" className={labelStyling}>State/Province</label>
              <Input id="stateVal" value={stateVal} onChange={(e: ChangeEvent<HTMLInputElement>) => setStateVal(e.target.value)} required placeholder="e.g., CA" className={fieldStyling} />
            </div>
            {/* Zip Code Input Removed */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-8">
            <div className="anim-fadeInUp" style={{animationDelay: '0.3s'}}>
              <label htmlFor="price" className={labelStyling}>Price (per month)</label>
              <Input id="price" type="number" value={price === '' ? '' : Number(price)} onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value === '' ? '' : Number(e.target.value))} required placeholder="e.g., 2500" className={fieldStyling}/>
            </div>
            <div className="anim-fadeInUp" style={{animationDelay: '0.35s'}}>
              <label htmlFor="propertyType" className={labelStyling}>Property Type</label>
              <Select 
                id="propertyType" 
                options={propertyTypeOptions} 
                value={propertyType} 
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setPropertyType(e.target.value as PropertyType)} 
                required 
                className={fieldStyling}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-8">
            <div className="anim-fadeInUp" style={{animationDelay: '0.4s'}}>
              <label htmlFor="bedrooms" className={labelStyling}>Bedrooms</label>
              <Input id="bedrooms" type="number" min="0" value={bedrooms} onChange={handleBedroomsChange} required placeholder="e.g., 2" className={fieldStyling}/>
            </div>
            <div className="anim-fadeInUp" style={{animationDelay: '0.45s'}}>
              <label htmlFor="bathrooms" className={labelStyling}>Bathrooms</label>
              <Input id="bathrooms" type="number" step="1" min="0" value={bathrooms} onChange={handleBathroomsChange} required placeholder="e.g., 2" className={fieldStyling}/>
            </div>
          </div>

          <div className="anim-fadeInUp" style={{animationDelay: '0.5s'}}>
            <label htmlFor="description" className={labelStyling}>Description</label>
            <Textarea id="description" value={description} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} required placeholder="Describe the property..." rows={5} className={fieldStyling}/>
          </div>
          
          <div className="anim-fadeInUp" style={{animationDelay: '0.55s'}}>
            <label htmlFor="imageUrl" className={labelStyling}>Main Image URL</label>
            <Input id="imageUrl" type="url" value={imageUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)} placeholder="https://example.com/main-image.jpg" required className={fieldStyling} />
          </div>

          <div className="anim-fadeInUp" style={{animationDelay: '0.6s'}}>
            <label htmlFor="thumbnailUrl" className={labelStyling}>Thumbnail URL (optional)</label>
            <Input id="thumbnailUrl" type="url" value={thumbnailUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => setThumbnailUrl(e.target.value)} placeholder="Uses Main Image URL if blank" className={fieldStyling}/>
          </div>

          {/* Gallery Images Management Section */}
          <div className="space-y-4 p-4 border border-slate-300 dark:border-slate-600 rounded-lg anim-fadeInUp" style={{animationDelay: '0.65s'}}>
            <h3 className={`${labelStyling} text-lg mb-3`}>Gallery Images</h3>
            {currentGalleryImages.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {currentGalleryImages.map((url, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-100 dark:bg-slate-700 p-2 rounded">
                    <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate flex-grow mr-2"
                        title={url}
                    >
                        {url.length > 50 ? `${url.substring(0, 47)}...` : url}
                    </a>
                    <Button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(index)}
                      variant="danger"
                      size="sm"
                      className="px-2 py-1"
                      aria-label={`Remove gallery image ${index + 1}`}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {currentGalleryImages.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">No gallery images yet.</p>}
            
            <div className="flex items-end space-x-2 mt-3">
              <Input
                id="newGalleryImageUrl"
                type="url"
                value={newGalleryImageUrl}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewGalleryImageUrl(e.target.value)}
                placeholder="Enter new image URL"
                className={`${fieldStyling} flex-grow`}
                containerClassName="flex-grow"
              />
              <Button
                type="button"
                onClick={handleAddGalleryImage}
                variant="secondary"
                size="md"
                className="whitespace-nowrap" 
                leftIcon={<PlusIcon className="w-4 h-4" />}
              >
                Add Image
              </Button>
            </div>
          </div>


          <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4 space-y-3 sm:space-y-0 pt-8 md:pt-10 border-t border-slate-300 dark:border-slate-600 mt-10 md:mt-12">
            <Button 
              type="button" 
              onClick={onClose}
              className="py-3 px-6 text-base md:text-lg font-medium bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200 border-0 shadow-md hover:shadow-lg active:shadow-sm w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="py-3 px-8 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl active:shadow-md anim-subtleShineOnHover w-full sm:w-auto"
            >
              {mode === 'edit' ? 'Save Changes' : 'Submit Listing'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
