
import React, { useRef } from 'react';
import { Property } from '../types.ts';
import { XMarkIcon, BedIcon, BathIcon, MapPinIcon, PriceTagIcon, EmailIcon, WhatsAppIcon } from './ui/Icons.tsx';
import { Button } from './ui/Button.tsx';

interface PropertyModalProps {
  property: Property;
  isVisible: boolean;
  onClose: () => void;
  onShowFullscreenImage: (images: string[], startIndex: number) => void;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
};

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, isVisible, onClose, onShowFullscreenImage }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleAnimationEnd = () => {
    if (!isVisible && modalRef.current) {
      // App.tsx's onClose now handles unmounting after animation
    }
  };

  const allImages = [property.imageUrl, ...(property.galleryImageUrls || [])];
  const uniqueImages = Array.from(new Set(allImages.filter(Boolean))) as string[];

  const handleMainImageClick = () => {
    const mainImageIndex = uniqueImages.indexOf(property.imageUrl);
    if (property.imageUrl && mainImageIndex !== -1) {
      onShowFullscreenImage(uniqueImages, mainImageIndex);
    } else if (uniqueImages.length > 0) {
      onShowFullscreenImage(uniqueImages, 0);
    }
  };

  const handleThumbnailClick = (imgUrl: string) => {
    const thumbnailIndex = uniqueImages.indexOf(imgUrl);
    if (thumbnailIndex !== -1) {
      onShowFullscreenImage(uniqueImages, thumbnailIndex);
    }
  };
  
  const modalClasses = `fixed inset-0 flex items-center justify-center p-4 z-50 ${
    isVisible ? 'modal-enter-active' : 'modal-leave-active'
  }`;

  const displayAddress = `${property.address}, ${property.city}, ${property.state}${property.zipCode ? ` ${property.zipCode}` : ''}`;

  return (
    <div 
      ref={modalRef}
      className={modalClasses}
      onClick={onClose} 
      onAnimationEnd={handleAnimationEnd}
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
      aria-hidden={!isVisible}
    >
      <div className="modal-backdrop fixed inset-0 bg-black" />
      <div 
        className="modal-content-wrapper bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()} 
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 bg-white/70 hover:bg-red-100/80 rounded-full p-2 transition-all duration-300 ease-out z-20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transform hover:rotate-90 hover:scale-110"
          aria-label="Close property details"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>

        <div 
          className="relative w-full h-80 md:h-[500px] bg-gray-800 rounded-t-xl overflow-hidden cursor-pointer group"
          onClick={handleMainImageClick}
          role="button"
          aria-label="View image fullscreen"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { handleMainImageClick(); }}}
        >
           <img 
             src={property.imageUrl}
             alt={`View of ${property.address}`} 
             className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-105" 
           />
           <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
             <h2 id="property-modal-title" className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg anim-fadeInUp" style={{animationDelay: '0.1s'}}>{formatPrice(property.price)}<span className="text-xl font-normal">/mo</span></h2>
             <p className="text-lg md:text-xl text-gray-100 flex items-center drop-shadow-md anim-fadeInUp" style={{animationDelay: '0.2s'}}>
               <MapPinIcon className="w-5 h-5 md:w-6 md:h-6 mr-2.5 flex-shrink-0" /> 
               {displayAddress}
             </p>
           </div>
        </div>
        
        <div className="p-6 md:p-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-4 text-gray-700 mb-8 pb-8 border-b border-gray-200">
            {[
              { icon: BedIcon, label: `${property.bedrooms} bed${property.bedrooms !== 1 ? 's' : ''}`, delay: '0.3s' },
              { icon: BathIcon, label: `${property.bathrooms} bath${property.bathrooms !== 1 ? 's' : ''}`, delay: '0.35s' },
              { icon: PriceTagIcon, label: property.propertyType, delay: '0.4s' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-col sm:flex-row items-center p-3 rounded-lg transition-all duration-300 ease-out hover:bg-sky-50/70 hover:shadow-md hover:scale-[1.03] group anim-fadeInUp" 
                style={{animationDelay: item.delay}}
                role="group"
                aria-label={item.label}
              >
                <item.icon className="w-7 h-7 sm:w-6 sm:h-6 mr-0 sm:mr-3 mb-1 sm:mb-0 text-blue-600 transition-all duration-200 ease-out group-hover:text-blue-500 group-hover:scale-110" aria-hidden="true" />
                <span className="text-base md:text-lg font-medium group-hover:text-sky-700 transition-colors duration-200 text-center sm:text-left">{item.label}</span>
              </div>
            ))}
          </div>

          {uniqueImages.length > 1 && (
            <div className="mb-8 anim-fadeInUp" style={{animationDelay: '0.45s'}}>
              <h3 className="text-2xl font-bold text-sky-800 mb-5">Gallery</h3>
              <div className="flex space-x-3 overflow-x-auto pb-4 -mx-1 px-1">
                {uniqueImages.map((imgUrl, index) => (
                  <button
                    key={imgUrl || `gallery-img-${index}`}
                    onClick={() => handleThumbnailClick(imgUrl)}
                    className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden transition-all duration-300 ease-out border-2 border-gray-300 hover:border-blue-500 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95 hover:ring-2 hover:ring-blue-300/50"
                    aria-label={`View image ${index + 1} of ${uniqueImages.length} fullscreen`}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Gallery image ${index + 1} for ${property.address}`} 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            <div className="lg:col-span-2">
              <div className="anim-fadeInUp" style={{animationDelay: '0.5s'}}>
                <h3 className="text-2xl font-bold text-sky-800 mb-5">Description</h3>
                <div className="bg-white p-6 rounded-lg shadow-md font-serif"> {/* Container with white background and serif font */}
                  {/* Ensure prose paragraph text is dark for readability */}
                  {/* Tailwind's prose utilities can sometimes be specific, so adding text-gray-900 to the prose-p target is key */}
                  <div className="prose prose-slate max-w-none prose-p:text-gray-900 prose-p:leading-relaxed prose-headings:text-sky-700 prose-headings:font-semibold prose-headings:mb-2 prose-headings:mt-4 whitespace-pre-line">{property.description}</div>
                </div>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div className="mt-8 anim-fadeInUp" style={{animationDelay: '0.55s'}}>
                  <h3 className="text-2xl font-bold text-sky-800 mb-5">Amenities</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700" role="list">
                    {property.amenities.map((amenity, index) => (
                      <li 
                        key={amenity} 
                        className="flex items-center group p-1.5 rounded-md transition-all duration-250 ease-out hover:bg-green-50/80 hover:shadow-sm hover:translate-x-1 anim-fadeInUp" 
                        style={{animationDelay: `${0.6 + index * 0.05}s`}}
                        role="listitem"
                      >
                        <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 transition-transform duration-200 ease-out group-hover:scale-125 group-hover:text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        <span className="font-medium">{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-1 anim-fadeInUp group" style={{animationDelay: '0.6s'}}>
              <div className="sticky top-6 bg-gradient-to-br from-sky-100 via-cyan-50 to-teal-50 p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02]">
                <h3 
                  className="text-3xl font-bold text-sky-700 mb-8 text-center transform transition-all duration-300 ease-out hover:text-sky-500 hover:scale-105 hover:-translate-y-1 hover:drop-shadow-md"
                >
                  Laxiriir
                </h3>
                <div className="flex flex-col items-center mb-6">
                  <img 
                    src={property.agent.avatarUrl} 
                    alt={property.agent.name} 
                    className="w-28 h-28 rounded-full mb-5 object-cover shadow-lg border-4 border-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:ring-4 hover:ring-sky-300 hover:animate-softGlowPulse" 
                  />
                  <div className="text-center">
                    <p className="font-bold text-sky-800 text-xl inline-block transform transition-all duration-300 ease-out hover:text-blue-600 hover:scale-110 hover:-translate-y-1.5 hover:drop-shadow-lg">{property.agent.name}</p>
                  </div>
                </div>
                <a 
                  href={`https://wa.me/252610251014`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-green-700 hover:text-green-800 mb-4 transition-all group transform duration-300 ease-out hover:scale-110 hover:-translate-y-1 hover:drop-shadow-md hover:bg-white/50 rounded-lg p-2 -m-2"
                  aria-label={`WhatsApp ${property.agent.name}`}
                >
                  <WhatsAppIcon className="w-6 h-6 mr-3.5 text-green-600 group-hover:text-green-700 transition-colors group-hover:scale-110 group-hover:rotate-[-5deg]" aria-hidden="true" />
                  <span className="group-hover:underline font-semibold text-base">{property.agent.phone}</span>
                </a>
                <a 
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center text-sky-600 hover:text-sky-700 mb-8 transition-all group transform duration-300 ease-out hover:scale-110 hover:-translate-y-1 hover:drop-shadow-md hover:bg-white/50 rounded-lg p-2 -m-2"
                  aria-label={`Email ${property.agent.name}`}
                >
                  <EmailIcon className="w-6 h-6 mr-3.5 text-sky-500 group-hover:text-sky-600 transition-colors group-hover:scale-110 group-hover:rotate-[-5deg]" aria-hidden="true" />
                  <span className="group-hover:underline font-semibold text-base">{property.agent.email}</span>
                </a>
                {/* Request Info Button Removed */}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 text-right">
            <Button variant="secondary" onClick={onClose} size="lg">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
