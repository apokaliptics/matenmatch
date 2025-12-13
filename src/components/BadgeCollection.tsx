import { motion } from 'framer-motion';
import { ChevronLeft, Crown, Flame, Shield, Sparkles, Trophy, Zap, Star, Award, Target, Heart, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useState } from 'react';

interface BadgeCollectionProps {
  onClose: () => void;
}

interface Badge {
  id: string;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  icon: any;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

export function BadgeCollection({ onClose }: BadgeCollectionProps) {
  const { t, language } = useLanguage();
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    // Check which badges are unlocked
    const streakDataStr = localStorage.getItem('loginStreakData');
    const streakData = streakDataStr ? JSON.parse(streakDataStr) : { totalLogins: 0, longestStreak: 0, loginDates: [] };
    
    // Get first login date
    const firstLoginDate = streakData.loginDates && streakData.loginDates.length > 0 
      ? new Date(streakData.loginDates[0])
      : new Date();

    const allBadges: Badge[] = [
      {
        id: 'day-one',
        name: 'Day One',
        nameVi: 'Người Tiên Phong',
        description: 'Joined Mate & Match from the very beginning',
        descriptionVi: 'Tham gia Mate & Match từ những ngày đầu tiên',
        icon: Crown,
        unlocked: true, // Everyone gets this
        rarity: 'legendary',
        unlockedAt: firstLoginDate.toLocaleDateString(),
      },
      {
        id: 'veteran',
        name: 'Veteran',
        nameVi: 'Kỳ Cựu',
        description: 'Logged in for 30 consecutive days',
        descriptionVi: 'Đăng nhập 30 ngày liên tiếp',
        icon: Shield,
        unlocked: streakData.longestStreak >= 30,
        rarity: 'epic',
        unlockedAt: streakData.longestStreak >= 30 ? new Date().toLocaleDateString() : undefined,
      },
      {
        id: 'fire-starter',
        name: 'Fire Starter',
        nameVi: 'Người Khơi Lửa',
        description: 'Achieved a 7-day login streak',
        descriptionVi: 'Đạt chuỗi đăng nhập 7 ngày',
        icon: Flame,
        unlocked: streakData.longestStreak >= 7,
        rarity: 'rare',
        unlockedAt: streakData.longestStreak >= 7 ? new Date().toLocaleDateString() : undefined,
      },
      {
        id: 'centurion',
        name: 'Centurion',
        nameVi: 'Chiến Binh Trăm Ngày',
        description: 'Logged in for 100 consecutive days',
        descriptionVi: 'Đăng nhập 100 ngày liên tiếp',
        icon: Trophy,
        unlocked: streakData.longestStreak >= 100,
        rarity: 'legendary',
        unlockedAt: streakData.longestStreak >= 100 ? new Date().toLocaleDateString() : undefined,
      },
      {
        id: 'dedicated',
        name: 'Dedicated Student',
        nameVi: 'Sinh Viên Tận Tâm',
        description: 'Logged in 50 times total',
        descriptionVi: 'Đăng nhập tổng cộng 50 lần',
        icon: Award,
        unlocked: streakData.totalLogins >= 50,
        rarity: 'epic',
        unlockedAt: streakData.totalLogins >= 50 ? new Date().toLocaleDateString() : undefined,
      },
      {
        id: 'rising-star',
        name: 'Rising Star',
        nameVi: 'Ngôi Sao Đang Lên',
        description: 'Logged in 10 times total',
        descriptionVi: 'Đăng nhập tổng cộng 10 lần',
        icon: Sparkles,
        unlocked: streakData.totalLogins >= 10,
        rarity: 'common',
        unlockedAt: streakData.totalLogins >= 10 ? new Date().toLocaleDateString() : undefined,
      },
      {
        id: 'team-player',
        name: 'Team Player',
        nameVi: 'Người Đồng Đội',
        description: 'Matched with 5 different teammates',
        descriptionVi: 'Ghép đôi với 5 đồng đội khác nhau',
        icon: Users,
        unlocked: false, // Based on actual matches
        rarity: 'rare',
      },
      {
        id: 'streak-master',
        name: 'Streak Master',
        nameVi: 'Bậc Thầy Chuỗi Ngày',
        description: 'Achieved a 50-day login streak',
        descriptionVi: 'Đạt chuỗi đăng nhập 50 ngày',
        icon: Zap,
        unlocked: streakData.longestStreak >= 50,
        rarity: 'epic',
        unlockedAt: streakData.longestStreak >= 50 ? new Date().toLocaleDateString() : undefined,
      },
      {
        id: 'achiever',
        name: 'Achiever',
        nameVi: 'Người Đạt Thành Tựu',
        description: 'Complete your first project',
        descriptionVi: 'Hoàn thành dự án đầu tiên',
        icon: Target,
        unlocked: false, // Based on actual projects
        rarity: 'common',
      },
      {
        id: 'beloved',
        name: 'Beloved Teammate',
        nameVi: 'Đồng Đội Được Yêu Mến',
        description: 'Received 10 five-star reviews',
        descriptionVi: 'Nhận 10 đánh giá 5 sao',
        icon: Heart,
        unlocked: false, // Based on actual reviews
        rarity: 'rare',
      },
      {
        id: 'super-star',
        name: 'Super Star',
        nameVi: 'Siêu Sao',
        description: 'Maintain 4.9+ reputation score',
        descriptionVi: 'Duy trì điểm uy tín 4.9+',
        icon: Star,
        unlocked: true, // Based on current reputation
        rarity: 'epic',
        unlockedAt: new Date().toLocaleDateString(),
      },
    ];

    setBadges(allBadges);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-400 to-orange-500';
      case 'epic':
        return 'from-purple-400 to-pink-500';
      case 'rare':
        return 'from-blue-400 to-cyan-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-50 to-orange-50';
      case 'epic':
        return 'from-purple-50 to-pink-50';
      case 'rare':
        return 'from-blue-50 to-cyan-50';
      default:
        return 'from-gray-50 to-gray-100';
    }
  };

  const unlockedBadges = badges.filter(b => b.unlocked);
  const lockedBadges = badges.filter(b => !b.unlocked);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <h2 className="text-white">{t('badgeCollection')}</h2>
        </div>

        {/* Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl mb-1">{unlockedBadges.length}/{badges.length}</div>
              <div className="text-sm text-white/80">{t('badgesUnlocked')}</div>
            </div>
            <Trophy className="w-12 h-12 text-white/30" />
          </div>
        </div>
      </div>

      {/* Badge Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Unlocked Badges */}
        {unlockedBadges.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-4">{t('unlockedBadges')}</h3>
            <div className="grid grid-cols-2 gap-4">
              {unlockedBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-br ${getRarityBg(badge.rarity)} rounded-2xl p-4 border-2 border-transparent hover:border-current cursor-pointer`}
                  style={{ 
                    borderImageSlice: 1,
                    borderImageSource: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                  }}
                >
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${getRarityColor(badge.rarity)} flex items-center justify-center`}>
                    <badge.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-center text-sm mb-1">
                    {language === 'vi' ? badge.nameVi : badge.name}
                  </h4>
                  <p className="text-center text-xs text-gray-500 mb-2">
                    {language === 'vi' ? badge.descriptionVi : badge.description}
                  </p>
                  {badge.unlockedAt && (
                    <div className="text-center text-xs text-gray-400">
                      {t('unlocked')}: {badge.unlockedAt}
                    </div>
                  )}
                  <div className="text-center mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white`}>
                      {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Badges */}
        {lockedBadges.length > 0 && (
          <div>
            <h3 className="mb-4">{t('lockedBadges')}</h3>
            <div className="grid grid-cols-2 gap-4">
              {lockedBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: (unlockedBadges.length + index) * 0.05 }}
                  className="bg-gray-100 rounded-2xl p-4 border-2 border-gray-200 opacity-60"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-300 flex items-center justify-center">
                    <badge.icon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-center text-sm mb-1 text-gray-600">
                    {language === 'vi' ? badge.nameVi : badge.name}
                  </h4>
                  <p className="text-center text-xs text-gray-400 mb-2">
                    {language === 'vi' ? badge.descriptionVi : badge.description}
                  </p>
                  <div className="text-center mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-500">
                      {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
