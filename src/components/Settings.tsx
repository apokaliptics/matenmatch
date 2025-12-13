import { ChevronRight, Star, User, Bell, Lock, Globe, LogOut, Edit, Eye, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { ReviewForm } from './ReviewForm';
import { CurrentUserProfile } from '../types/user';
import { EditProfile } from './EditProfile';
import { PrivacySettings } from './PrivacySettings';
import { NotificationSettings } from './NotificationSettings';
import { StreakCalendar } from './StreakCalendar';
import { BadgeCollection } from './BadgeCollection';
import { AboutUs } from './AboutUs';
import { Calendar, Award } from 'lucide-react';

interface SettingsProps {
  onLogout: () => void;
  currentUser: CurrentUserProfile;
  onUpdateProfile: (profile: CurrentUserProfile) => void;
  onViewProfile: () => void;
}

export function Settings({ onLogout, currentUser, onUpdateProfile, onViewProfile }: SettingsProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showStreakCalendar, setShowStreakCalendar] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const menuItems = [
    {
      icon: Eye,
      label: 'View My Profile',
      onClick: onViewProfile,
      color: 'text-[#22c55e]',
    },
    {
      icon: Edit,
      label: t('editProfile'),
      onClick: () => setShowEditProfile(true),
      color: 'text-[#2563eb]',
    },
    {
      icon: Award,
      label: t('badgeCollection'),
      onClick: () => setShowBadges(true),
      color: 'text-[#f59e0b]',
    },
    {
      icon: Calendar,
      label: t('streakCalendar'),
      onClick: () => setShowStreakCalendar(true),
      color: 'text-[#f97316]',
    },
    {
      icon: Star,
      label: t('reviews'),
      onClick: () => setShowReviews(true),
      color: 'text-[#f97316]',
    },
    {
      icon: Bell,
      label: t('notifications'),
      onClick: () => setShowNotifications(true),
      color: 'text-[#ef4444]',
    },
    {
      icon: Lock,
      label: t('privacy'),
      onClick: () => setShowPrivacy(true),
      color: 'text-gray-600',
    },
    {
      icon: Info,
      label: language === 'vi' ? 'Về Chúng Tôi' : 'About Us',
      onClick: () => setShowAbout(true),
      color: 'text-[#8b5cf6]',
    },
  ];

  const pastReviews = [
    {
      id: '1',
      teammate: {
        name: 'Phạm Thị Lan',
        photo: 'https://images.unsplash.com/photo-1543689604-6fe8dbcd1f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      },
      rating: 4.8,
      date: '2 days ago',
      comment: 'Great teammate, very reliable!',
    },
    {
      id: '2',
      teammate: {
        name: 'Đỗ Văn Hùng',
        photo: 'https://images.unsplash.com/photo-1639654655546-68bc1f21e9e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      },
      rating: 5.0,
      date: '1 week ago',
      comment: 'Excellent work quality and communication',
    },
  ];

  if (showPrivacy) {
    return <PrivacySettings onClose={() => setShowPrivacy(false)} />;
  }

  if (showNotifications) {
    return <NotificationSettings onClose={() => setShowNotifications(false)} />;
  }

  if (showStreakCalendar) {
    return <StreakCalendar onClose={() => setShowStreakCalendar(false)} />;
  }

  if (showBadges) {
    return <BadgeCollection onClose={() => setShowBadges(false)} />;
  }

  if (showAbout) {
    return <AboutUs onClose={() => setShowAbout(false)} />;
  }

  if (showEditProfile) {
    return (
      <EditProfile
        profile={currentUser}
        onClose={() => setShowEditProfile(false)}
        onSave={onUpdateProfile}
      />
    );
  }

  if (showReviewForm) {
    return (
      <ReviewForm
        teammate={{
          name: 'Bùi Thanh Tùng',
          photo: 'https://images.unsplash.com/photo-1720659201153-e0c195776963?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
        }}
        onClose={() => setShowReviewForm(false)}
        onSubmit={(review) => {
          console.log('Review submitted:', review);
          alert(t('feedbackHelps'));
          setShowReviewForm(false);
        }}
      />
    );
  }

  if (showReviews) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReviews(false)}
            className="text-[#2563eb]"
          >
            ← Back
          </motion.button>
          <h2>{t('yourReviews')}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {pastReviews.length > 0 ? (
            <div className="space-y-4">
              {pastReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={review.teammate.photo}
                      alt={review.teammate.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3>{review.teammate.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm">{review.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-xs text-gray-400">• {review.date}</span>
                      </div>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  )}
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowReviewForm(true)}
                className="w-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white py-4 rounded-full"
              >
                Write New Review
              </motion.button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Star className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-gray-600 mb-2">{t('noReviews')}</h3>
              <p className="text-gray-400">{t('completeProjects')}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Profile Section */}
      <div className="bg-gradient-to-br from-[#2563eb] to-[#3b82f6] p-6 text-white">
        <div className="flex items-center gap-4">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={currentUser.photo}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
          />
          <div>
            <h2 className="text-white mb-1">{currentUser.name}</h2>
            <p className="text-white/80">{currentUser.major}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{currentUser.reputation.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ backgroundColor: '#f9fafb' }}
            whileTap={{ scale: 0.98 }}
            onClick={item.onClick}
            className="w-full flex items-center gap-4 p-4 rounded-xl"
          >
            <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="flex-1 text-left">{item.label}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </motion.button>
        ))}

        {/* Language Toggle */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          whileHover={{ backgroundColor: '#f9fafb' }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleLanguage}
          className="w-full flex items-center gap-4 p-4 rounded-xl"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#22c55e]">
            <Globe className="w-5 h-5" />
          </div>
          <span className="flex-1 text-left">{t('language')}</span>
          <span className="text-[#2563eb]">{language === 'en' ? 'English' : 'Tiếng Việt'}</span>
        </motion.button>

        {/* Logout */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ backgroundColor: '#fef2f2' }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full flex items-center gap-4 p-4 rounded-xl text-[#ef4444]"
        >
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="flex-1 text-left">{t('logout')}</span>
        </motion.button>
      </div>
    </div>
  );
}
