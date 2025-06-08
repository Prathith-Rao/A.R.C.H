
import React, { useState } from 'react';

interface HeritageImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const HeritageImage: React.FC<HeritageImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  fallbackSrc = "/placeholder.svg" 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img 
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default HeritageImage;
