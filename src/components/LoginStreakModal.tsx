import { motion, AnimatePresence } from 'framer-motion';
import { Flame, X, Trophy, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginStreakModalProps {
  streak: number;
  onClose: () => void;
}

export function LoginStreakModal({ streak, onClose }: LoginStreakModalProps) {
  const { t } = useLanguage();

  const isMilestone = (streak: number) => {
    return streak === 7 || streak === 30 || streak === 50 || streak === 100 || streak % 100 === 0;
  };

  const getMilestoneMessage = (streak: number) => {
    if (streak === 7) return t('firstWeekStreak');
    if (streak === 30) return t('monthStreak');
    if (streak === 50) return t('fiftyDayStreak');
    if (streak === 100) return t('hundredDayStreak');
    if (streak % 100 === 0) return t('amazingStreak');
    return '';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center z-10"
          >
            <X className="w-5 h-5 text-gray-600" />
          </motion.button>

          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, x: Math.random() * 400 - 200, opacity: 0 }}
                animate={{ 
                  y: 600, 
                  x: Math.random() * 400 - 200,
                  opacity: [0, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute"
              >
                {i % 3 === 0 ? (
                  <Flame className="w-4 h-4 text-orange-400/30" />
                ) : i % 3 === 1 ? (
                  <Star className="w-3 h-3 text-yellow-400/30" />
                ) : (
                  <Trophy className="w-3 h-3 text-blue-400/30" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Flame Icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -10, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
              }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <Flame className="w-24 h-24 text-[#f97316] fill-[#f97316]" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Flame className="w-24 h-24 text-[#f97316]/30 fill-[#f97316]/30" />
                </motion.div>
              </div>
            </motion.div>

            {/* Streak Count */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <h1 className="text-6xl bg-gradient-to-r from-[#f97316] to-[#ef4444] bg-clip-text text-transparent mb-2">
                {streak}
              </h1>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2"
            >
              {t('dayStreak')}
            </motion.h2>

            {isMilestone(streak) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl"
              >
                <div className="flex items-center justify-center gap-2 text-[#f97316]">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">{getMilestoneMessage(streak)}</span>
                </div>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 mb-6"
            >
              {t('keepStreakGoing')}
            </motion.p>

            {/* Continue Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full bg-gradient-to-r from-[#f97316] to-[#ef4444] text-white py-4 rounded-full shadow-lg"
            >
              {t('letsGo')}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
