import { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
}

/**
 * Preload critical images for better performance
 * Use this for hero images and above-the-fold content
 */
const ImagePreloader = ({ images }: ImagePreloaderProps) => {
  useEffect(() => {
    images.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, [images]);

  return null;
};

export default ImagePreloader;
