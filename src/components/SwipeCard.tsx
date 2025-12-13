import { Moon, Sun, Star, X, BookOpen } from 'lucide-react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

interface SwipeCardProps {
  user: {
    id: string;
    name: string;
    major: string;
    university: string;
    archetype: string;
    goal: string;
    workStyle: 'Night Owl' | 'Early Bird';
    reputation: number;
    photo: string;
    verified: boolean;
    bio?: string;
    bioen?: string;
  };
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSuperLike: () => void;
  onCardClick: () => void;
}

export function SwipeCard({ user, onSwipeLeft, onSwipeRight, onSuperLike, onCardClick }: SwipeCardProps) {
  const { t, language } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  
  const dragX = useMotionValue(0);
  const rotateValue = useTransform(dragX, [-200, 200], [-25, 25]);
  const opacityLeft = useTransform(dragX, [-200, -50, 0], [1, 0.5, 0]);
  const opacityRight = useTransform(dragX, [0, 50, 200], [0, 0.5, 1]);

  const handleDragEnd = (_event: any, info: any) => {
    setIsDragging(false);
    if (info.offset.x > 100) {
      onSwipeRight();
    } else if (info.offset.x < -100) {
      onSwipeLeft();
    }
  };

  const bio = language === 'vi' ? user.bio : user.bioen;
  const translatedMajor = t(user.major);

  return (
    <div className="relative w-full max-w-md mx-auto h-[600px]">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ 
          x: dragX,
          rotate: rotateValue,
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <div 
          onClick={onCardClick}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full flex flex-col"
        >
          {/* User Photo */}
          <div className="relative h-72">
            <img 
              src={user.photo} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Verified Badge - Subtle */}
            {user.verified && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="absolute top-4 right-4 w-6 h-6 bg-[#2563eb] rounded-full flex items-center justify-center shadow-lg"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
            )}
            
            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-white mb-1">{user.name}</h2>
                  <p className="text-white/90 text-sm mb-1">{translatedMajor}</p>
                  <p className="text-white/75 text-xs">{user.university}</p>
                </div>
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm">{user.reputation.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card Details */}
          <div className="p-6 space-y-3">
            {/* Bio */}
            {bio && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {bio}
              </p>
            )}

            {/* Tags Row */}
            <div className="flex flex-wrap gap-2">
              {/* Archetype Badge */}
              <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5">
                <span className="text-xs">🎯</span>
                <span>{t(user.archetype.toLowerCase().replace(/\s+/g, ''))}</span>
              </div>
              
              {/* Goal Tag */}
              <div className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 ${
                user.goal === 'Hunting A+' 
                  ? 'bg-orange-50 text-orange-600' 
                  : 'bg-gray-50 text-gray-600'
              }`}>
                <span className="text-xs">{user.goal === 'Hunting A+' ? '🔥' : '😊'}</span>
                <span>{t(user.goal === 'Hunting A+' ? 'huntingA' : 'justPass')}</span>
              </div>
              
              {/* Work Style */}
              <div className="bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5">
                {user.workStyle === 'Night Owl' ? (
                  <>
                    <Moon className="w-3 h-3" />
                    <span>{t('nightOwl')}</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3 h-3" />
                    <span>{t('earlyBird')}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Action Buttons - Better Aligned */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
        {/* Pass */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onSwipeLeft();
          }}
          className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-gray-100"
        >
          <X className="w-7 h-7 text-gray-400" />
        </motion.button>
        
        {/* Super Like / SOS */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onSuperLike();
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#ef4444] to-[#f87171] shadow-xl flex items-center justify-center"
        >
          <Star className="w-6 h-6 text-white fill-white" />
        </motion.button>
        
        {/* Invite to Team - Books Icon */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onSwipeRight();
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-[#22c55e] to-[#4ade80] shadow-xl flex items-center justify-center"
        >
          <BookOpen className="w-7 h-7 text-white" />
        </motion.button>
      </div>
    </div>
  );
}
