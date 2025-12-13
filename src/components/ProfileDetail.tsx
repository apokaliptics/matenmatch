import { Star, Award, Shield, X } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface ProfileDetailProps {
  user: {
    name: string;
    major: string;
    photo: string;
    reputation: number;
    verified: boolean;
    bio: string;
    bioen: string;
    badges: string[];
    skills: {
      Leadership: number;
      'Slide Design': number;
      Research: number;
      Presentation: number;
      'Content Writing': number;
      'Time Management': number;
    };
  };
  onClose: () => void;
}

export function ProfileDetail({ user, onClose }: ProfileDetailProps) {
  const { t, language } = useLanguage();
  const bio = language === 'vi' ? user.bio : user.bioen;
  const translatedMajor = t(user.major);
  
  const skillEntries = Object.entries(user.skills || {});
  const maxSkill = 100;

  const radarData = skillEntries.map(([skill, value]) => ({
    skill: t(skill.toLowerCase().replace(/\s+/g, '')),
    value,
    fullMark: maxSkill,
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-md h-full md:h-auto md:rounded-3xl overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 p-4 flex items-center justify-between z-10">
            <h3>{t('profileDetails')}</h3>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
          
          {/* Profile Photo */}
          <div className="relative h-72">
            <img 
              src={user.photo} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-white mb-1">{user.name}</h2>
              <p className="text-white/90">{translatedMajor}</p>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Trust Score */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#2563eb] to-[#3b82f6] rounded-2xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="opacity-90">{t('trustScore')}</span>
                {user.verified && (
                  <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs">{t('verified')}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                <span className="text-4xl">{user.reputation.toFixed(1)}</span>
                <span className="text-xl opacity-75">/5.0</span>
              </div>
            </motion.div>
            
            {/* Badges */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="mb-3">{t('badges')}</h3>
              <div className="flex flex-wrap gap-2">
                {user.badges.map((badge, index) => (
                  <motion.div 
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white px-4 py-2 rounded-full flex items-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    <span>{badge}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* RPG Stats - Radar Chart */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="mb-4">{t('skillStats')}</h3>
              <div className="bg-gray-50 rounded-2xl p-4">
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#d1d5db" />
                    <PolarAngleAxis 
                      dataKey="skill" 
                      tick={{ fill: '#6b7280', fontSize: 11 }}
                    />
                    <Radar
                      name={user.name}
                      dataKey="value"
                      stroke="#2563eb"
                      fill="#2563eb"
                      fillOpacity={0.6}
                      label={{ 
                        fill: '#1f2937', 
                        fontSize: 11,
                        fontWeight: 600 
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
                
                {/* Skill List with Numbers */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {skillEntries.map(([skill, value]) => (
                    <div 
                      key={skill} 
                      className="flex items-center justify-between bg-white p-2 rounded-lg"
                    >
                      <span className="text-xs text-gray-700">
                        {t(skill.toLowerCase().replace(/\s+/g, ''))}
                      </span>
                      <span className="text-sm text-[#2563eb]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Bio */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="mb-3">{t('about')}</h3>
              <p className="text-gray-600">{bio}</p>
            </motion.div>
            
            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#22c55e] to-[#4ade80] text-white py-4 rounded-full shadow-lg"
            >
              {t('inviteToTeam')}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
