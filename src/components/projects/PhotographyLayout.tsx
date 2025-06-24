import React from "react";

const PhotographyLayout: React.FC = () => {
  const photoFilenames = [
    "IMG_6878.jpeg", "IMG_2148.jpeg", "IMG_2022.jpeg", "IMG_2124.jpeg",  
    "IMG_6869.jpeg", "IMG_2197.jpeg", "IMG_2552.jpeg",
    "IMG_3820.jpeg", "IMG_3830.jpeg", "IMG_5310.jpeg", "IMG_5827.jpeg", "IMG_5853.jpeg",
    "IMG_6012.jpeg", "IMG_6024.jpeg", "IMG_6040.jpeg", "IMG_6061.jpeg", "IMG_6262.jpeg",
    "IMG_6320.jpeg", "IMG_6730.jpeg", "IMG_6897.jpeg",
    "IMG_7830.jpeg", "IMG_9762.jpeg", "FullSizeRender.jpeg",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {photoFilenames.map((filename, index) => (
          <img
            key={index}
            src={`/photos/photography/${filename}`}
            alt={`photo-${index}`}
            className="w-full mb-4 rounded-lg shadow-md break-inside-avoid"
          />
        ))}
      </div>
    </div>
  );
};

export default PhotographyLayout;