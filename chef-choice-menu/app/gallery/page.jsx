'use client';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import image1 from '../../public/1.jpg';
import image2 from '../../public/2.jpg';
import image3 from '../../public/3.jpg';
import image4 from '../../public/4.png';
import image5 from '../../public/5.png';
import image6 from '../../public/6.png';
import image7 from '../../public/7.png';
import image8 from '../../public/8.png';
import image9 from '../../public/9.png';
import image10 from '../../public/10.png';
import Image from 'next/image';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      id: 1,
      src: image1
    },
    {
      id: 2,
      src: image2
    },
    {
      id: 3,
      src: image3
    },
    {
      id: 4,
      src: image4
    },
    {
      id: 5,
      src: image5
    },
    {
      id: 6,
      src: image6
    },
    {
      id: 7,
      src: image7
    },
    {
      id: 8,
      src: image8
    },
    {
      id: 9,
      src: image9
    },
    {
      id: 10,
      src: image10
    }
  ];

  const openImage = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-white">
        <div className="max-w-6xl pt-32 mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-orange-600">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore stunning visuals from our events and get inspired for your next celebration
          </p>
          </div>
    {/* Gallery Grid */}
        <div className=" mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative"
              onClick={() => openImage(image, index)}
            >
              <Image
                src={image.src}
                alt="Gallery image"
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4 z-50"
          onClick={closeImage}
        >
          <div 
            className="relative max-w-7xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="flex items-center justify-center h-full">
              <Image
                src={selectedImage.src}
                alt=""
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}