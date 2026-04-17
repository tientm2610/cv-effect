import React, { useState, useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function MagneticCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  useEffect(() => {
    const unsubscribeX = cursorX.on('change', (v) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${v}px, ${cursorY.get()}px)`;
    });
    const unsubscribeY = cursorY.on('change', (v) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${cursorX.get()}px, ${v}px)`;
    });

    const unsubscribeSpringX = mouseX.on('change', (v) => cursorX.set(v - 20));
    const unsubscribeSpringY = mouseY.on('change', (v) => cursorY.set(v - 20));

    return () => {
      unsubscribeX();
      unsubscribeY();
      unsubscribeSpringX();
      unsubscribeSpringY();
    };
  }, [cursorX, cursorY, mouseX, mouseY]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover') ||
        target.closest('.cursor-hover');
      
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  if (typeof window === 'undefined' || !isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          willChange: 'transform',
          background: isHovering ? 'transparent' : 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.5)',
          backdropFilter: 'blur(2px)',
          transform: 'translate(-20px, -20px)',
          transition: 'width 0.3s, height 0.3s, background 0.3s',
          width: isHovering ? '60px' : '20px',
          height: isHovering ? '60px' : '20px',
          opacity: isVisible ? 1 : 0
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          willChange: 'transform',
          transform: `translate(${mouseX.get() - 4}px, ${mouseY.get() - 4}px)`
        }}
      />
    </>
  );
}