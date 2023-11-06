import { useState, useLayoutEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let width;
  let height;

  if (windowSize.width <= 600) {
    // For mobile (width less than or equal to 600 pixels), use full width.
    width = windowSize.width;
    height = windowSize.height;
  } else if (windowSize.width <= 1024) {
    // For tablets (width less than or equal to 1024 pixels), use 90% of the width.
    width = Math.floor(0.9 * windowSize.width);
    height =  Math.floor(0.9 * windowSize.height)
  } else {
    // For desktop devices, use 70% of the width.
    width = Math.floor(0.6 * windowSize.width);
    height =  Math.floor(0.6 * windowSize.height)
  }

  return {
    width,
    height
  };
}

export default useWindowSize;