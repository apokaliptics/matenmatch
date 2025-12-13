import { motion } from 'framer-motion';
import { ChevronLeft, Flame, Trophy, Calendar as CalendarIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

interface StreakCalendarProps {
  onClose: () => void;
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalLogins: number;
  loginDates: string[]; // ISO date strings
}

export function StreakCalendar({ onClose }: StreakCalendarProps) {
  const { t } = useLanguage();
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    totalLogins: 0,
    loginDates: []
  });

  useEffect(() => {
    const data = localStorage.getItem('loginStreakData');
    if (data) {
      setStreakData(JSON.parse(data));
    }
  }, []);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const isLoginDay = (day: number | null) => {
    if (!day) return false;
    const dateStr = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    return streakData.loginDates.includes(dateStr);
  };

  const isMilestoneDay = (day: number | null) => {
    if (!day) return false;
    const dateStr = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    const index = streakData.loginDates.indexOf(dateStr);
    if (index === -1) return false;
    
    const dayNumber = index + 1;
    return dayNumber === 7 || dayNumber === 30 || dayNumber === 50 || dayNumber === 100 || dayNumber % 100 === 0;
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    return day === today.getDate();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#f97316] to-[#ef4444] p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <h2 className="text-white">{t('streakCalendar')}</h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
          >
            <Flame className="w-6 h-6 mx-auto mb-2 fill-white" />
            <div className="text-2xl mb-1">{streakData.currentStreak}</div>
            <div className="text-xs text-white/80">{t('current')}</div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
          >
            <Trophy className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl mb-1">{streakData.longestStreak}</div>
            <div className="text-xs text-white/80">{t('longest')}</div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
          >
            <CalendarIcon className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl mb-1">{streakData.totalLogins}</div>
            <div className="text-xs text-white/80">{t('totalDays')}</div>
          </motion.div>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {/* Month Header */}
          <div className="text-center mb-6">
            <h3>{monthNames[currentMonth]} {currentYear}</h3>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                className={`
                  aspect-square rounded-xl flex items-center justify-center relative
                  ${day ? 'cursor-pointer' : ''}
                  ${isToday(day) ? 'ring-2 ring-[#2563eb]' : ''}
                  ${isLoginDay(day) 
                    ? 'bg-gradient-to-br from-[#f97316] to-[#ef4444] text-white shadow-md' 
                    : 'bg-gray-50 text-gray-400'
                  }
                `}
              >
                {day && (
                  <>
                    <span className="text-sm font-medium">{day}</span>
                    {isMilestoneDay(day) && (
                      <motion.div
                        animate={{ 
                          rotate: [0, -10, 10, -10, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="absolute -top-1 -right-1"
                      >
                        <Trophy className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    )}
                    {isLoginDay(day) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-1"
                      >
                        <Flame className="w-3 h-3 fill-white" />
                      </motion.div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-6">
          <h3 className="mb-4">{t('milestones')}</h3>
          <div className="space-y-3">
            {[
              { days: 7, label: t('firstWeekStreak'), reached: streakData.longestStreak >= 7 },
              { days: 30, label: t('monthStreak'), reached: streakData.longestStreak >= 30 },
              { days: 50, label: t('fiftyDayStreak'), reached: streakData.longestStreak >= 50 },
              { days: 100, label: t('hundredDayStreak'), reached: streakData.longestStreak >= 100 },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.days}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`
                  p-4 rounded-xl flex items-center justify-between
                  ${milestone.reached 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-[#f97316]/20' 
                    : 'bg-gray-50 border border-gray-200'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${milestone.reached ? 'bg-[#f97316]/20' : 'bg-gray-200'}
                  `}>
                    <Trophy className={`w-5 h-5 ${milestone.reached ? 'text-[#f97316]' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <div className={milestone.reached ? 'text-gray-900' : 'text-gray-500'}>
                      {milestone.days} {t('days')}
                    </div>
                    <div className="text-sm text-gray-500">{milestone.label}</div>
                  </div>
                </div>
                {milestone.reached && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-[#22c55e]"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
