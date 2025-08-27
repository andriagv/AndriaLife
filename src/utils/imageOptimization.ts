// Image optimization utilities
export const optimizeImageUrl = (url: string): string => {
  // If it's an external URL, return as is
  if (url.startsWith('http')) {
    return url;
  }
  
  // For local images, we can add query parameters for optimization
  // This will be handled by the build process
  return url;
};

export const getResponsiveImageSrc = (baseUrl: string): string => {
  // For now, return the base URL
  // In a real implementation, you'd generate multiple sizes
  return baseUrl;
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const lazyLoadImage = (src: string, placeholder?: string): string => {
  // Return a placeholder or low-quality version for lazy loading
  return placeholder || src;
};

// WebP support detection
export const supportsWebP = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Get optimized image format
export const getOptimizedFormat = (originalUrl: string): string => {
  if (supportsWebP()) {
    // Convert to WebP if supported
    return originalUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  return originalUrl;
};

// Check if WebP file exists
export const checkWebPExists = async (webpUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(webpUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Get best available image format
export const getBestImageFormat = async (originalUrl: string): Promise<string> => {
  if (originalUrl.startsWith('http')) {
    return originalUrl;
  }
  
  if (supportsWebP()) {
    const webpUrl = originalUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const webpExists = await checkWebPExists(webpUrl);
    if (webpExists) {
      return webpUrl;
    }
  }
  
  return originalUrl;
}; 