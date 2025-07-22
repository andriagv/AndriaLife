import React, { useEffect, useRef } from 'react';
import './PhotoFrame.css';

const PhotoFrame = ({ images, children }) => {
  const containerRef = useRef(null);
  const isPausedRef = useRef(false);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    let density = 5;
    let distance = 0;
    let speed = 200;
    const directions = ['top', 'right', 'bottom', 'left'];
    const allGridElements = [];

    function preloadImages(srcArray, callback) {
      let loaded = 0;
      srcArray.forEach(src => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          if (loaded === srcArray.length) callback();
        };
        img.src = src;
      });
    }

    function renderWalls() {
      const gridContainer = containerRef.current;
      if (!gridContainer) return;
      
      gridContainer.style.setProperty('--grid-sz', density);
      gridContainer.style.setProperty('--rev-dis', distance);

      allGridElements.length = 0;

      directions.forEach(dir => {
        const parent = gridContainer.querySelector(`.${dir}`);
        if (!parent) return;
        parent.innerHTML = '';
        const total = density * density;
        for (let i = 1; i <= total; i++) {
          const div = document.createElement('div');
          div.classList.add(`${dir.charAt(0)}${i}`);
          parent.appendChild(div);
          allGridElements.push(div);
        }
      });

      startImageInterval();
    }

    let loadedCount = 0;
    let totalElementsToLoad = 0;

    function startImageInterval() {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      loadedCount = 0;
      totalElementsToLoad = allGridElements.length;

      intervalIdRef.current = setInterval(() => {
        if (isPausedRef.current) return;
        const unloadedElements = allGridElements.filter(el => !el.classList.contains('loaded'));
        if (unloadedElements.length === 0) return;

        const randomElement = unloadedElements[Math.floor(Math.random() * unloadedElements.length)];
        const randomImage = images[Math.floor(Math.random() * images.length)];
        randomElement.style.background = `url('${randomImage}')`;
        randomElement.classList.add('loaded');
        loadedCount++;

        randomElement.addEventListener('click', () => {
          randomElement.classList.add('selected');
          if (randomElement.parentNode) {
            randomElement.parentNode.classList.add('selectedPane');
          }
          pauseInterval();
        });

        if (loadedCount >= totalElementsToLoad) {
          clearInterval(intervalIdRef.current);
        }
      }, speed);
    }

    function pauseInterval() {
      isPausedRef.current = true;
    }

    function resumeInterval() {
      const container = containerRef.current;
      if (!container) return;
      
      const selectedElement = container.querySelector('.selected');
      if (selectedElement) selectedElement.classList.remove('selected');

      const selectedPane = container.querySelector('.selectedPane');
      if (selectedPane) selectedPane.classList.remove('selectedPane');

      if (!isPausedRef.current) return;
      isPausedRef.current = false;
      startImageInterval();
    }

    // Wait a bit before starting to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      preloadImages(images, () => {
        renderWalls();
      });
    }, 100);

    // Setup back button listener
    const setupBackButton = () => {
      const backBtn = containerRef.current?.querySelector('#back-btn');
      if (backBtn) {
        backBtn.addEventListener('click', resumeInterval);
      }
    };

    setupBackButton();

    return () => {
      clearTimeout(initTimeout);
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      
      const backBtn = containerRef.current?.querySelector('#back-btn');
      if (backBtn) {
        backBtn.removeEventListener('click', resumeInterval);
      }
    };
  }, [images]);

  return (
    <div className="inf-grid-hero-container" ref={containerRef}>
      <div className="top"></div>
      <div className="right"></div>
      <div className="bottom"></div>
      <div className="left"></div>
      <div id="back-btn">Back</div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default PhotoFrame; 