import { useEffect, useRef, useState } from 'react';

/**
 * Hook to measure an element's size using ResizeObserver
 * @returns {{ elementRef: React.RefObject, elementSize: { width: number, height: number } }}
 */
export const useElementSize = () => {
  const elementRef = useRef(null);
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!elementRef.current) return;

    const updateSize = () => {
      const { width, height } = elementRef.current.getBoundingClientRect();
      setElementSize({ width, height });
    };

    updateSize();

    const resizeObserver = new window.ResizeObserver(updateSize);
    resizeObserver.observe(elementRef.current);
    window.addEventListener('resize', updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return { elementRef, elementSize };
};

export default useElementSize;
