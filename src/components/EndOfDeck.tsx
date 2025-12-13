import { motion } from 'framer-motion';
import { RefreshCw, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface EndOfDeckProps {
  onReset: () => void;
  onOpenFilters: () => void;
}

export function EndOfDeck({ onReset, onOpenFilters }: EndOfDeckProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full text-center p-6"
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1
        }}
        className="mb-6"
      >
        <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-orange-50 rounded-full flex items-center justify-center">
          <span className="text-6xl">🎯</span>
        </div>
      </motion.div>

      <h2 className="mb-3">{t('allCaughtUp')}</h2>
      <p className="text-gray-600 mb-8 max-w-sm">
        {t('checkedEveryone')}
      </p>

      <div className="space-y-3 w-full max-w-sm">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="w-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white py-4 rounded-full shadow-lg flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>{t('reviewAgain')}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenFilters}
          className="w-full bg-white text-gray-700 py-4 rounded-full border-2 border-gray-200 flex items-center justify-center gap-2"
        >
          <Settings className="w-5 h-5" />
          <span>{t('adjustFilters')}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
