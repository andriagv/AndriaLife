import React, { useRef, useEffect } from "react";


interface WoofyHoverImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const WoofyHoverImage: React.FC<WoofyHoverImageProps> = ({ src, alt, className }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const filterRef = useRef<SVGFilterElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const filter = filterRef.current;
    if (!img || !filter) return;

    let animationFrame: number;
    let hovering = false;
    let turbulence = filter.querySelector("feTurbulence") as SVGFETurbulenceElement | null;
    let displacement = filter.querySelector("feDisplacementMap") as SVGFEDisplacementMapElement | null;
    let baseFreq = 0.015;

    const animate = () => {
      if (turbulence && displacement) {
        const now = Date.now() / 700;
        const freq = hovering ? baseFreq + 0.1 * Math.abs(Math.sin(now)) : baseFreq;
        turbulence.setAttribute("baseFrequency", freq.toString());
        displacement.setAttribute("scale", hovering ? "15" : "0");
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseEnter = () => { hovering = true; };
    const handleMouseLeave = () => { hovering = false; };
    img.addEventListener("mouseenter", handleMouseEnter);
    img.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      cancelAnimationFrame(animationFrame);
      img.removeEventListener("mouseenter", handleMouseEnter);
      img.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={className} style={{ display: "inline-block", overflow: "hidden" }}>
      <svg style={{ display: "none" }}>
        <filter id="woofy-hover-filter" ref={filterRef}>
          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="2" result="turb" />
          <feDisplacementMap in2="turb" in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{ filter: "url(#woofy-hover-filter)", transition: "box-shadow 0.3s" }}
        className="w-full h-auto cursor-pointer"
        draggable={false}
      />
    </div>
  );
};

export default WoofyHoverImage; 