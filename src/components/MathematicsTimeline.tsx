import React from "react";
import { ScrollTimeline } from "@/components/ScrollTimeline";

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

const MathematicsTimeline = () => {
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
      // ... სხვა საჭირო props
      // NB: სურათის გამოსატანად ScrollTimeline-ში უნდა დაემატოს <img> მხარდაჭერა
    />
  );
};

export default MathematicsTimeline; 