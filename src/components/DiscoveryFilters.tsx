import { X, MapPin, Target, Moon, Sun, Flame, Smile, ToggleLeft, ToggleRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

interface DiscoveryFiltersProps {
  onClose: () => void;
  onApply: (filters: FilterSettings) => void;
  currentFilters: FilterSettings;
}

export interface FilterSettings {
  enabled: boolean;
  radius: number;
  goal: 'all' | 'Hunting A+' | 'Just Pass';
  workStyle: 'all' | 'Night Owl' | 'Early Bird';
  archetype: 'all' | 'thecarrier' | 'studybuddy' | 'teambuilder';
  university: string;
}

export function DiscoveryFilters({ onClose, onApply, currentFilters }: DiscoveryFiltersProps) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<FilterSettings>(currentFilters);

  const universities = [
    'All Universities',
    'Foreign Trade University (FTU)',
    'National Economics University (NEU)',
    'Vietnam National University, Hanoi (VNU)',
    'University of Economics and Business (UEB-VNU)',
    'University of Economics Ho Chi Minh City (UEH)',
    'RMIT University Vietnam',
    'British University Vietnam (BUV)',
    'Fulbright University Vietnam',
    'Hanoi University of Science and Technology (HUST)',
    'Ho Chi Minh City University of Technology (HCMUT)',
    'University of Social Sciences and Humanities (USSH)',
    'Ton Duc Thang University (TDTU)',
  ];

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const defaultFilters: FilterSettings = {
      enabled: false,
      radius: 50,
      goal: 'all',
      workStyle: 'all',
      archetype: 'all',
      university: 'All Universities',
    };
    setFilters(defaultFilters);
  };

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
          className="bg-white w-full max-w-md h-auto md:rounded-3xl overflow-y-auto max-h-[90vh]"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between z-10">
            <h2>{t('filters')}</h2>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="p-6 space-y-6">
            {/* Enable/Disable Filters */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {filters.enabled ? (
                    <ToggleRight className="w-8 h-8 text-[#2563eb]" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                  )}
                  <div>
                    <h3 className={filters.enabled ? 'text-[#2563eb]' : 'text-gray-600'}>
                      {filters.enabled ? t('filtersEnabled') : t('filtersDisabled')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {filters.enabled ? 'Apply criteria below' : 'Showing all users'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setFilters({ ...filters, enabled: !filters.enabled })}
                  className={`w-14 h-7 rounded-full transition-colors ${
                    filters.enabled ? 'bg-[#2563eb]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                      filters.enabled ? 'translate-x-7' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Filter Options - Only visible when enabled */}
            <AnimatePresence>
              {filters.enabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {/* Distance */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-[#2563eb]" />
                      <h3>{t('distance')}</h3>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={filters.radius}
                        onChange={(e) => setFilters({ ...filters, radius: parseInt(e.target.value) })}
                        className="w-full"
                      />
                      <p className="text-gray-600 text-sm">{filters.radius} km away</p>
                    </div>
                  </div>

                  {/* University */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-[#2563eb]" />
                      <h3>{t('university')}</h3>
                    </div>
                    <select
                      value={filters.university}
                      onChange={(e) => setFilters({ ...filters, university: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-white"
                    >
                      {universities.map((uni) => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                  </div>

                  {/* Goal */}
                  <div>
                    <h3 className="mb-3">{t('goal')}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters({ ...filters, goal: 'all' })}
                        className={`px-4 py-3 rounded-xl border-2 transition-all ${
                          filters.goal === 'all'
                            ? 'border-[#2563eb] bg-blue-50 text-[#2563eb]'
                            : 'border-gray-200 bg-white text-gray-600'
                        }`}
                      >
                        All
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters({ ...filters, goal: 'Hunting A+' })}
                        className={`px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-1 ${
                          filters.goal === 'Hunting A+'
                            ? 'border-[#f97316] bg-orange-50 text-[#f97316]'
                            : 'border-gray-200 bg-white text-gray-600'
                        }`}
                      >
                        <Flame className="w-4 h-4" />
                        <span className="text-sm">A+</span>
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters({ ...filters, goal: 'Just Pass' })}
                        className={`px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-1 ${
                          filters.goal === 'Just Pass'
                            ? 'border-gray-400 bg-gray-50 text-gray-700'
                            : 'border-gray-200 bg-white text-gray-600'
                        }`}
                      >
                        <Smile className="w-4 h-4" />
                        <span className="text-sm">Pass</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Work Style */}
                  <div>
                    <h3 className="mb-3">{t('workStyle')}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters({ ...filters, workStyle: 'all' })}
                        className={`px-4 py-3 rounded-xl border-2 transition-all ${
                          filters.workStyle === 'all'
                            ? 'border-[#2563eb] bg-blue-50 text-[#2563eb]'
                            : 'border-gray-200 bg-white text-gray-600'
                        }`}
                      >
                        All
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters({ ...filters, workStyle: 'Night Owl' })}
                        className={`px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-1 ${
                          filters.workStyle === 'Night Owl'
                            ? 'border-purple-400 bg-purple-50 text-purple-700'
                            : 'border-gray-200 bg-white text-gray-600'
                        }`}
                      >
                        <Moon className="w-4 h-4" />
                        <span className="text-sm">Night</span>
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters({ ...filters, workStyle: 'Early Bird' })}
                        className={`px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-1 ${
                          filters.workStyle === 'Early Bird'
                            ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                            : 'border-gray-200 bg-white text-gray-600'
                        }`}
                      >
                        <Sun className="w-4 h-4" />
                        <span className="text-sm">Early</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Archetype */}
                  <div>
                    <h3 className="mb-3">{t('archetype')}</h3>
                    <div className="space-y-2">
                      {['all', 'thecarrier', 'studybuddy', 'teambuilder'].map((type) => (
                        <motion.button
                          key={type}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFilters({ ...filters, archetype: type as any })}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-left ${
                            filters.archetype === type
                              ? 'border-[#2563eb] bg-blue-50 text-[#2563eb]'
                              : 'border-gray-200 bg-white text-gray-600'
                          }`}
                        >
                          {type === 'all' ? t('allArchetypes') : t(type)}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-full"
              >
                {t('reset')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApply}
                className="flex-1 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white py-4 rounded-full shadow-lg"
              >
                {t('applyFilters')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
