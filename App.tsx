import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { PropertyList } from './components/PropertyList.tsx';
import { PropertyModal } from './components/PropertyModal.tsx';
import { AddPropertyForm } from './components/AddPropertyForm.tsx';
import { FullscreenImageViewer } from './components/FullscreenImageViewer.tsx';
import { AboutUsModal } from './components/AboutUsModal.tsx';
import { LoginModal } from './components/LoginModal.tsx';
import { Property } from './types.ts';

interface FullscreenImageInfo {
  images: string[];
  currentIndex: number;
}

const MODAL_ANIMATION_DURATION = 200;
const ADMIN_EMAIL = "123";
const ADMIN_PASSWORD = "123";
const BACKEND_TEST_URL = "http://localhost:5000/api/test";

const App: React.FC = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>(allProperties);
  const [backendMessage, setBackendMessage] = useState<string>('');

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isPropertyModalMounted, setIsPropertyModalMounted] = useState<boolean>(false);
  const [isPropertyModalVisible, setIsPropertyModalVisible] = useState<boolean>(false);

  const [isPropertyFormMounted, setIsPropertyFormMounted] = useState<boolean>(false);
  const [isPropertyFormVisible, setIsPropertyFormVisible] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<'add' | 'edit' | null>(null);
  const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);

  const [fullscreenImageInfo, setFullscreenImageInfo] = useState<FullscreenImageInfo | null>(null);
  const [isFullscreenViewerMounted, setIsFullscreenViewerMounted] = useState<boolean>(false);
  const [isFullscreenViewerVisible, setIsFullscreenViewerVisible] = useState<boolean>(false);

  const [isAboutUsModalMounted, setIsAboutUsModalMounted] = useState<boolean>(false);
  const [isAboutUsModalVisible, setIsAboutUsModalVisible] = useState<boolean>(false);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isLoginModalMounted, setIsLoginModalMounted] = useState<boolean>(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setAllProperties(data);
      })
      .catch((err) => console.error("❌ Error fetching properties:", err));
  }, []);

  useEffect(() => {
    setDisplayedProperties(allProperties);
  }, [allProperties]);

  useEffect(() => {
    if (isPropertyModalVisible || isPropertyFormVisible || isFullscreenViewerVisible || isAboutUsModalVisible || isLoginModalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isPropertyModalVisible, isPropertyFormVisible, isFullscreenViewerVisible, isAboutUsModalVisible, isLoginModalVisible]);

  useEffect(() => {
    fetch(BACKEND_TEST_URL)
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch((err) => console.error("❌ Backend error:", err));
  }, []);

  const handleViewDetails = useCallback((property: Property) => {
    setSelectedProperty(property);
    setIsPropertyModalMounted(true);
    setTimeout(() => setIsPropertyModalVisible(true), 10);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsPropertyModalVisible(false);
    setTimeout(() => {
      setIsPropertyModalMounted(false);
      setSelectedProperty(null);
    }, MODAL_ANIMATION_DURATION);
  }, []);

  const handleOpenAddForm = useCallback(() => {
    if (!isAdminLoggedIn) return;
    setFormMode('add');
    setPropertyToEdit(null);
    setIsPropertyFormMounted(true);
    setTimeout(() => setIsPropertyFormVisible(true), 10);
  }, [isAdminLoggedIn]);

  const handleOpenEditForm = useCallback((property: Property) => {
    if (!isAdminLoggedIn) return;
    setFormMode('edit');
    setPropertyToEdit(property);
    setIsPropertyFormMounted(true);
    setTimeout(() => setIsPropertyFormVisible(true), 10);
  }, [isAdminLoggedIn]);

  const handleClosePropertyForm = useCallback(() => {
    setIsPropertyFormVisible(false);
    setTimeout(() => {
      setIsPropertyFormMounted(false);
      setFormMode(null);
      setPropertyToEdit(null);
    }, MODAL_ANIMATION_DURATION);
  }, []);

  const handlePropertyFormSubmit = useCallback((propertyData: Property) => {
    if (!isAdminLoggedIn) return;
    if (formMode === 'add') {
      setAllProperties(prevProperties => [propertyData, ...prevProperties]);
    } else if (formMode === 'edit' && propertyToEdit) {
      setAllProperties(prevProperties => 
        prevProperties.map(p => p.id === propertyToEdit.id ? { ...p, ...propertyData, id: propertyToEdit.id } : p)
      );
    }
    handleClosePropertyForm();
  }, [formMode, propertyToEdit, handleClosePropertyForm, isAdminLoggedIn]);

  const handleDeleteProperty = useCallback((propertyId: string) => {
    if (!isAdminLoggedIn) return;
    setAllProperties(prev => prev.filter(p => p.id !== propertyId));
  }, [isAdminLoggedIn]);

  const handleShowFullscreenImage = useCallback((images: string[], startIndex: number) => {
    if (images && images.length > 0) {
      setFullscreenImageInfo({ images, currentIndex: startIndex });
      setIsFullscreenViewerMounted(true);
      setTimeout(() => setIsFullscreenViewerVisible(true), 10);
    }
  }, []);

  const handleCloseFullscreenImage = useCallback(() => {
    setIsFullscreenViewerVisible(false);
    setTimeout(() => {
      setIsFullscreenViewerMounted(false);
      setFullscreenImageInfo(null);
    }, MODAL_ANIMATION_DURATION);
  }, []);

  const handleNextFullscreenImage = useCallback(() => {
    setFullscreenImageInfo(prev => {
      if (prev && prev.images.length > 0) {
        const nextIndex = (prev.currentIndex + 1) % prev.images.length;
        return { ...prev, currentIndex: nextIndex };
      }
      return prev;
    });
  }, []);

  const handlePreviousFullscreenImage = useCallback(() => {
    setFullscreenImageInfo(prev => {
      if (prev && prev.images.length > 0) {
        const prevIndex = (prev.currentIndex - 1 + prev.images.length) % prev.images.length;
        return { ...prev, currentIndex: prevIndex };
      }
      return prev;
    });
  }, []);

  const handleOpenAboutUsModal = useCallback(() => {
    setIsAboutUsModalMounted(true);
    setTimeout(() => setIsAboutUsModalVisible(true), 10);
  }, []);

  const handleCloseAboutUsModal = useCallback(() => {
    setIsAboutUsModalVisible(false);
    setTimeout(() => setIsAboutUsModalMounted(false), MODAL_ANIMATION_DURATION);
  }, []);

  const handleOpenLoginModal = useCallback(() => {
    setIsLoginModalMounted(true);
    setTimeout(() => setIsLoginModalVisible(true), 10);
  }, []);

  const handleCloseLoginModal = useCallback(() => {
    setIsLoginModalVisible(false);
    setTimeout(() => setIsLoginModalMounted(false), MODAL_ANIMATION_DURATION);
  }, []);

  const handleLogin = useCallback((email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      handleCloseLoginModal();
      return true;
    }
    return false;
  }, [handleCloseLoginModal]);

  const handleLogout = useCallback(() => {
    setIsAdminLoggedIn(false);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header 
        onAddListingClick={handleOpenAddForm}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLoginClick={handleOpenLoginModal}
        onLogoutClick={handleLogout}
      />

      {backendMessage && (
        <div className="text-center bg-green-100 text-green-800 py-2 font-semibold">
          {backendMessage}
        </div>
      )}

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyList 
          properties={displayedProperties} 
          onViewDetails={handleViewDetails}
          isAdminLoggedIn={isAdminLoggedIn}
          onOpenEditForm={isAdminLoggedIn ? handleOpenEditForm : undefined}
          onDeleteProperty={isAdminLoggedIn ? handleDeleteProperty : undefined}
        />
      </main>

      <Footer onAboutUsClick={handleOpenAboutUsModal} />

      {isPropertyModalMounted && selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          isVisible={isPropertyModalVisible}
          onClose={handleCloseModal}
          onShowFullscreenImage={handleShowFullscreenImage}
        />
      )}

      {isPropertyFormMounted && isAdminLoggedIn && (
        <AddPropertyForm
          isVisible={isPropertyFormVisible}
          mode={formMode || 'add'}
          initialData={propertyToEdit}
          onSubmit={handlePropertyFormSubmit}
          onClose={handleClosePropertyForm} 
        />
      )}

      {isFullscreenViewerMounted && fullscreenImageInfo && fullscreenImageInfo.images.length > 0 && (
        <FullscreenImageViewer 
          isVisible={isFullscreenViewerVisible}
          imageUrl={fullscreenImageInfo.images[fullscreenImageInfo.currentIndex]}
          onClose={handleCloseFullscreenImage}
          onNext={handleNextFullscreenImage}
          onPrevious={handlePreviousFullscreenImage}
          currentIndex={fullscreenImageInfo.currentIndex}
          totalImages={fullscreenImageInfo.images.length}
        />
      )}

      {isAboutUsModalMounted && (
        <AboutUsModal
          isVisible={isAboutUsModalVisible}
          onClose={handleCloseAboutUsModal}
        />
      )}

      {isLoginModalMounted && (
        <LoginModal
          isVisible={isLoginModalVisible}
          onClose={handleCloseLoginModal}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;