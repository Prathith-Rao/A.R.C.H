
import { useState, useEffect } from 'react';

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

export const useFolderImages = (folderPath: string, fallbackImage?: string) => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      const foundImages: string[] = [];
      
      // Try to load images with numbered naming convention (1.jpg, 2.jpg, etc.)
      for (let i = 1; i <= 20; i++) { // Check up to 20 images
        let imageFound = false;
        
        for (const ext of IMAGE_EXTENSIONS) {
          const imagePath = `${folderPath}${i}.${ext}`;
          
          try {
            // Create a new image element to test if the image exists
            const img = new Image();
            const imageExists = await new Promise<boolean>((resolve) => {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(false);
              img.src = imagePath;
            });
            
            if (imageExists) {
              foundImages.push(imagePath);
              imageFound = true;
              break; // Found image with this number, move to next
            }
          } catch (error) {
            // Image doesn't exist, continue
          }
        }
        
        // If no image found with this number, stop looking
        if (!imageFound && i > 3) {
          break;
        }
      }
      
      // If no images found and fallback provided, use fallback
      if (foundImages.length === 0 && fallbackImage) {
        foundImages.push(fallbackImage);
      }
      
      setImages(foundImages);
      setIsLoading(false);
    };

    if (folderPath) {
      loadImages();
    }
  }, [folderPath, fallbackImage]);

  return { images, isLoading };
};
