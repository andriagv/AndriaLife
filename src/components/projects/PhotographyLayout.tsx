import React from "react";
import { Instagram } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useLanguage } from "@/contexts/LanguageContext";

const INSTAGRAM_URL = "https://www.instagram.com/gvaroph/";

const PhotographyLayout: React.FC = () => {
  const { t } = useLanguage();

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
        {photoFilenames.map((filename, index) => {
          const webp = `/photos/photography/webp/${filename.replace(/\.(jpeg|jpg|png)$/i, '.webp')}`;
          return (
            <OptimizedImage
              key={index}
              src={webp}
              alt={`Photograph by Andria Gvaramia, ${index + 1}`}
              className="w-full mb-4 rounded-lg shadow-md break-inside-avoid"
              placeholder={"/placeholder.svg"}
            />
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <p className="text-lg text-muted-foreground">{t("morePhotosText")}</p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium transition-colors hover:border-primary hover:text-primary"
        >
          <Instagram className="h-5 w-5" aria-hidden="true" />
          {t("morePhotosButton")}
        </a>
      </div>
    </div>
  );
};

export default PhotographyLayout;
