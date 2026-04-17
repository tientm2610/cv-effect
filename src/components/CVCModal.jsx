import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CVModal({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-5xl h-[90vh] bg-dark rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-charcoal/80">
              <h3 className="text-lg font-bold text-white">Tran Manh Tien - CV</h3>
              <div className="flex items-center gap-3">
                <a
                  href="/resume.pdf"
                  download="resume.pdf"
                  className="text-sm transition-colors flex items-center gap-2 cursor-hover"
                style={{ color: 'var(--text-secondary)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Download
                </a>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all cursor-hover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="h-[calc(100%-65px)]">
              <iframe
                src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                className="w-full h-full"
                title="CV Preview"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CVModal;