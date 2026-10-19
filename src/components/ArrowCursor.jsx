import React, { useEffect, useRef, useState } from 'react';

export default function ArrowCursor() {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Direct 1:1 instantaneous hardware-accelerated transform (0ms latency)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      setIsVisible(true);

      // Check hovered elements
      const target = e.target;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], select, input[type="submit"], input[type="button"], .cursor-pointer');
        const textInput = target.closest('input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea');

        setIsHovered(Boolean(interactive && !textInput));
        setIsTextInput(Boolean(textInput));
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform select-none transition-opacity duration-150 ${
        isVisible && !isTextInput ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    >
      {/* Circle with small centered dot - Centered precisely on mouse tip */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-150 ease-out ${
          isHovered
            ? 'w-10 h-10 border-2 border-forest bg-lime/30 shadow-md shadow-forest/20'
            : 'w-7 h-7 border-[1.5px] border-forest bg-forest/10 shadow-xs'
        } ${isClicking ? 'scale-85' : 'scale-100'}`}
      >
        {/* Small Solid Centered Dot */}
        <div
          className={`rounded-full transition-all duration-150 ${
            isHovered
              ? 'w-2 h-2 bg-forest-dark'
              : 'w-1.5 h-1.5 bg-forest'
          }`}
        />
      </div>
    </div>
  );
}
