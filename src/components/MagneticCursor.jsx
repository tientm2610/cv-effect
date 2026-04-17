import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export function MagneticCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const ringFillRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  
  const quickToDotX = useRef(null);
  const quickToDotY = useRef(null);
  const quickToRingX = useRef(null);
  const quickToRingY = useRef(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    quickToDotX.current = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power3.out' });
    quickToDotY.current = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power3.out' });

    quickToRingX.current = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' });
    quickToRingY.current = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      
      if (quickToDotX.current) quickToDotX.current(e.clientX);
      if (quickToDotY.current) quickToDotY.current(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (!quickToRingX.current || !quickToRingY.current) return;

    let animationFrame;
    const animate = () => {
      const dx = mouseX.current - ringX.current;
      const dy = mouseY.current - ringY.current;
      
      ringX.current += dx * 0.15;
      ringY.current += dy * 0.15;
      
      quickToRingX.current(ringX.current);
      quickToRingY.current(ringY.current);
      
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover') ||
        target.closest('.cursor-hover') ||
        target.classList.contains('cursor-magnetic') ||
        target.closest('.cursor-magnetic');
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const ringVariants = {
    idle: { 
      scale: 1,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    hover: { 
      scale: 1.5,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.8)',
    },
    click: { 
      scale: 0.8,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    }
  };

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* <motion.div
        ref={cursorRingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform', opacity: isVisible ? 1 : 0 }}
        animate={isClicked ? 'click' : isHovering ? 'hover' : 'idle'}
        variants={ringVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div 
          className="relative"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1.5px solid rgba(255, 255, 255, 0.5)',
            background: isHovering ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
            backdropFilter: isHovering ? 'blur(8px)' : 'blur(4px)',
            transition: 'all 0.3s ease',
            boxShadow: isHovering ? '0 0 20px rgba(255, 255, 255, 0.2)' : 'none',
          }}
        >
          <AnimatePresence>
            {isHovering && (
              <motion.div
                ref={ringFillRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          willChange: 'transform',
          background: '#ffffff',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
        }}
      />

      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-40 h-40 rounded-full pointer-events-none z-[9998]"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </AnimatePresence> */}
    </>
  );
}