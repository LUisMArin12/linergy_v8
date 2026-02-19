import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

interface WelcomeMessageProps {
  userName?: string;
}

export default function WelcomeMessage({ userName }: WelcomeMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
        >
          <div className="bg-white rounded-xl shadow-2xl border border-[#E5E7EB] overflow-hidden">
            <div className="relative bg-gradient-to-r from-[#157A5A] to-[#0B3D2E] p-4">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

              <div className="relative flex items-start gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  className="flex-shrink-0"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#157A5A]" />
                  </div>
                </motion.div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-white mb-1">
                    ¡Bienvenido{userName ? ` ${userName}` : ''}!
                  </h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Has iniciado sesión exitosamente en LINERGY. Explora el sistema y gestiona la infraestructura eléctrica.
                  </p>
                </div>

                <button
                  onClick={() => setIsVisible(false)}
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  aria-label="Cerrar mensaje"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5, ease: 'linear' }}
              className="h-1 bg-gradient-to-r from-[#157A5A] to-[#0B3D2E]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
