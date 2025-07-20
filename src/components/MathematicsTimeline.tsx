import React from "react";
import { ScrollTimeline } from "@/components/ScrollTimeline";
import { Lens } from "@/components/common/Lens";

const mathCertificates = [
  { image: "/photos/mathematics/mt1.jpeg" },
  { image: "/photos/mathematics/mt2.jpeg" },
  { image: "/photos/mathematics/mt3.jpeg" },
  { image: "/photos/mathematics/mt4.jpeg" },
  { image: "/photos/mathematics/mt5.jpeg" },
  { image: "/photos/mathematics/mt6.jpeg" },
  { image: "/photos/mathematics/mt7.jpeg" },
];

const events = mathCertificates.map((cert, idx) => ({
  year: "",
  title: "",
  description: "",
  image: cert.image,
}));

interface MathematicsTimelineProps {
  setShowSplashCursor?: (v: boolean) => void;
}

const MathematicsTimeline: React.FC<MathematicsTimelineProps> = ({ setShowSplashCursor }) => {
  return (
    <ScrollTimeline
      events={events}
      title="Mathematics Certificates"
      subtitle=""
      revealAnimation="fade"
      cardAlignment="alternating"
      cardVariant="elevated"
      progressIndicator={true}
      connectorStyle="line"
      parallaxIntensity={0.1}
      progressLineWidth={3}
      dateFormat="none"
      cardEffect="shadow"
      className="my-12"
      renderImage={img => (
        <Lens onHoverChange={setShowSplashCursor}>
          <img src={img} alt="Certificate" className="w-full max-w-[300px] mx-auto mb-2 rounded-xl shadow-[0_4px_24px_rgba(168,85,247,0.18),0_1.5px_8px_rgba(0,0,0,0.10)] object-cover" />
        </Lens>
      )}
    />
  );
};

export default MathematicsTimeline; 