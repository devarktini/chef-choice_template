'use client';
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { AuthService } from '@/services/authService';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 2; // Match the curl example

  // Create a flattened array of all images for modal navigation
  const allImages = galleryItems.flatMap((event, eventIndex) => 
    event.images.map((img, imgIndex) => ({
      ...img,
      eventId: event.id,
      eventTitle: event.title,
      eventDescription: event.description,
      createdDate: event.created_date,
      eventIndex,
      imageIndex: imgIndex,
      globalIndex: galleryItems.slice(0, eventIndex)
        .reduce((sum, e) => sum + e.images.length, 0) + imgIndex
    }))
  );

  // Fetch gallery data on component mount and when page changes
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const data = await AuthService.getGalleryItems(currentPage, pageSize);
        console.log("Gallery data loaded:", data);
        
        // Ensure we have results array
        if (data && Array.isArray(data.results)) {
          setGalleryItems(data.results);
          
          // Set pagination information
          setHasNextPage(!!data.next);
          setHasPreviousPage(!!data.previous);
          
          // Calculate total pages
          if (data.count) {
            setTotalPages(Math.ceil(data.count / pageSize));
          }
        } else {
          setGalleryItems([]);
          console.warn("Unexpected API response structure:", data);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching gallery:", err);
        setError('Failed to load gallery images. Please try again later.');
        setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [currentPage]);

  const openImage = (image) => {
    setSelectedImage(image);
    setCurrentIndex(image.globalIndex);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (allImages.length === 0) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % allImages.length;
    } else {
      newIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    }
    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
      // Scroll to top when changing page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        closeImage();
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex, allImages]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="max-w-6xl pt-32 mx-auto text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Our <span className="text-orange-600">Gallery</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Explore stunning visuals from our events and get inspired for your next celebration
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-xl text-gray-600">Loading gallery images...</div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col justify-center items-center h-96">
          <div className="text-6xl mb-4">😕</div>
          <div className="text-xl text-red-600 mb-2">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Gallery Content - Grouped by Event */}
      {!loading && !error && galleryItems.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Pagination Info */}
          <div className="mb-8 text-center text-gray-600">
            <p className="text-lg">
              Page {currentPage} of {totalPages} • Showing {galleryItems.length} events
            </p>
          </div>

          {galleryItems.map((event, eventIndex) => (
            <div key={event.id} className="mb-12">
              {/* Event Header */}
              <div className="mb-6 border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h2>
                <p className="text-lg text-gray-600 mb-2">
                  {event.description}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Posted on: {formatDate(event.created_date)}</span>
                  <span className="mx-2">•</span>
                  <span>{event.images.length} {event.images.length === 1 ? 'photo' : 'photos'}</span>
                </div>
              </div>

              {/* Event Images Grid */}
              {event.images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {event.images.map((img, imgIndex) => {
                    const imageObject = allImages.find(
                      imgObj => imgObj.eventIndex === eventIndex && 
                               imgObj.imageIndex === imgIndex
                    );
                    
                    return (
                      <div
                        key={img.id}
                        className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
                        onClick={() => openImage(imageObject)}
                      >
                        <Image
                          src={img.image}
                          alt={event.title || "Gallery image"}
                          fill
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          priority={eventIndex === 0 && imgIndex < 4}
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No images available for this event
                </div>
              )}
            </div>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* <div className="text-sm text-gray-600">
                  Showing page {currentPage} of {totalPages}
                </div> */}
                
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={handlePreviousPage}
                    disabled={!hasPreviousPage}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      hasPreviousPage
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {generatePageNumbers().map((pageNumber, index) => (
                      pageNumber === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                          ...
                        </span>
                      ) : (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageClick(pageNumber)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === pageNumber
                              ? 'bg-orange-600 text-white'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNextPage}
                    disabled={!hasNextPage}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      hasNextPage
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && galleryItems.length === 0 && (
        <div className="flex flex-col justify-center items-center h-96">
          <div className="text-6xl mb-4">📷</div>
          <div className="text-xl text-gray-600 mb-2">No gallery events available yet</div>
          <p className="text-gray-500">Check back soon for new event photos!</p>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4 z-50"
          onClick={closeImage}
        >
          <div 
            className="relative max-w-7xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeImage}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 md:p-3 transition-all duration-200"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Navigation Buttons */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 md:p-3 transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 md:p-3 transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {allImages.length > 1 && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {allImages.length}
              </div>
            )}

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center overflow-hidden p-2 md:p-4">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.eventTitle || "Gallery image"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-auto h-auto max-w-full max-h-[60vh] md:max-h-[70vh] object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </div>

            {/* Image Info */}
            <div className="bg-gray-900 bg-opacity-80 text-white p-4 md:p-6 rounded-b-lg">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {selectedImage.eventTitle}
                </h3>
                <p className="text-gray-300 mb-3">
                  {selectedImage.eventDescription}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Event Date: {formatDate(selectedImage.createdDate)}</span>
                  <span>
                    Page {currentPage} • Event {selectedImage.eventIndex + 1} • 
                    Image {selectedImage.imageIndex + 1} of {galleryItems[selectedImage.eventIndex]?.images.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}