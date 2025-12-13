import { Star, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface ReviewFormProps {
  teammate: {
    name: string;
    photo: string;
  };
  onClose: () => void;
  onSubmit: (review: {
    punctuality: number;
    quality: number;
    communication: number;
    comment: string;
  }) => void;
}

export function ReviewForm({ teammate, onClose, onSubmit }: ReviewFormProps) {
  const { t } = useLanguage();
  const [punctuality, setPunctuality] = useState(0);
  const [quality, setQuality] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onSubmit({
      punctuality,
      quality,
      communication,
      comment,
    });
  };

  const StarRating = ({ 
    value, 
    onChange, 
    label 
  }: { 
    value: number; 
    onChange: (val: number) => void; 
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-gray-700">{label}</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange(star)}
          >
            <Star 
              className={`w-8 h-8 transition-colors ${
                star <= value 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
              }`}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="bg-white w-full max-w-md md:rounded-3xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2>{t('rateTeammate')}</h2>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="flex items-center gap-4">
              <img 
                src={teammate.photo} 
                alt={teammate.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white/20"
              />
              <div>
                <h3 className="text-white">{teammate.name}</h3>
                <p className="text-white/80">{t('projectCompleted')}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Rating Criteria */}
            <StarRating 
              value={punctuality}
              onChange={setPunctuality}
              label={t('punctuality')}
            />
            
            <StarRating 
              value={quality}
              onChange={setQuality}
              label={t('qualityOfWork')}
            />
            
            <StarRating 
              value={communication}
              onChange={setCommunication}
              label={t('communication')}
            />
            
            {/* Comment Section */}
            <div className="space-y-2">
              <label className="block text-gray-700">
                {t('anonymousFeedback')}
              </label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience working with this teammate..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-none"
                rows={4}
              />
            </div>
            
            {/* Submit Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!punctuality || !quality || !communication}
              className="w-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white py-4 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('submitReview')}
            </motion.button>
            
            <p className="text-center text-sm text-gray-500">
              {t('feedbackHelps')}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
