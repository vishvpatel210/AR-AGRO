import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappUrl = getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

  return (
    <aside 
      aria-label="WhatsApp customer support"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center print:hidden select-none"
    >
      {/* Tooltip / Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="hidden sm:flex items-center gap-2 mr-3 px-3.5 py-2 rounded-xl bg-warm-white/95 backdrop-blur-md shadow-elevated border border-forest/15 text-xs font-semibold text-forest-dark"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span>Chat on WhatsApp (+91 98700 72960)</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Recognizable WhatsApp Floating Anchor Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with A.R. Agro Spices export desk on WhatsApp (+91 98700 72960)"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-elevated hover:shadow-2xl flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 relative group"
        id="floating-whatsapp-btn"
      >
        {/* Subtle Online Pulse Ring */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-forest-dark rounded-full border-2 border-warm-white flex items-center justify-center shadow-xs">
          <span className="w-2 h-2 bg-lime rounded-full animate-ping"></span>
        </span>

        {/* Recognizable WhatsApp SVG Logo */}
        <svg 
          viewBox="0 0 32 32" 
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-xs" 
          aria-hidden="true"
        >
          <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.628.75 5.163 2.169 7.347L2.6 30.125l6.984-2.022A13.435 13.435 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.688c-2.253 0-4.437-.628-6.328-1.813l-.453-.284-4.697 1.359 1.381-4.578-.3-.475A11.168 11.168 0 0 1 4.813 16c0-6.175 5.012-11.188 11.187-11.188 6.175 0 11.188 5.013 11.188 11.188 0 6.175-5.013 11.188-11.188 11.188zm6.134-8.384c-.337-.169-1.994-.984-2.303-1.097-.309-.113-.534-.169-.759.169-.225.338-.872 1.097-1.069 1.322-.197.225-.394.253-.731.084-.338-.169-1.425-.525-2.716-1.675-1.003-.894-1.681-2-1.878-2.338-.197-.338-.022-.52.147-.688.153-.153.338-.394.506-.591.169-.197.225-.338.338-.563.112-.225.056-.422-.028-.591-.084-.169-.759-1.828-1.041-2.503-.275-.656-.553-.569-.759-.578-.197-.009-.422-.009-.647-.009-.225 0-.591.084-.9.422-.309.338-1.181 1.153-1.181 2.813 0 1.659 1.209 3.263 1.378 3.488.169.225 2.378 3.631 5.763 5.094.806.347 1.434.553 1.925.709.809.256 1.547.219 2.128.134.65-.097 1.994-.816 2.278-1.603.281-.787.281-1.463.197-1.603-.084-.141-.309-.225-.647-.394z" />
        </svg>

        <span className="sr-only">Chat with A.R. Agro Spices on WhatsApp</span>
      </motion.a>
    </aside>
  );
}
