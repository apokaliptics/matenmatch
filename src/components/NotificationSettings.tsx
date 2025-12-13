import { X, Bell, MessageSquare, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface NotificationSettingsProps {
  onClose: () => void;
}

export function NotificationSettings({ onClose }: NotificationSettingsProps) {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    newMatches: true,
    messages: true,
    sosRequests: true,
    projectInvites: true,
    reviews: true,
  });

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-3 shadow-sm">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </motion.button>
        <h2>{t('notifications')}</h2>
      </div>

      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        {/* New Matches */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3>New Matches</h3>
                <p className="text-sm text-gray-600">Get notified when someone matches with you</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, newMatches: !settings.newMatches })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.newMatches ? 'bg-[#22c55e]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.newMatches ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div>
                <h3>Messages</h3>
                <p className="text-sm text-gray-600">Receive message notifications</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, messages: !settings.messages })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.messages ? 'bg-[#22c55e]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.messages ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* SOS Requests */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#ef4444]" />
              </div>
              <div>
                <h3>SOS Requests</h3>
                <p className="text-sm text-gray-600">Urgent help requests from teammates</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, sosRequests: !settings.sosRequests })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.sosRequests ? 'bg-[#22c55e]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.sosRequests ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Project Invites */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3>Project Invites</h3>
                <p className="text-sm text-gray-600">When you're invited to join a team</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, projectInvites: !settings.projectInvites })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.projectInvites ? 'bg-[#22c55e]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.projectInvites ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <Star className="w-5 h-5 text-orange-600" fill="currentColor" />
              </div>
              <div>
                <h3>Reviews</h3>
                <p className="text-sm text-gray-600">When teammates review you</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, reviews: !settings.reviews })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.reviews ? 'bg-[#22c55e]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.reviews ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white py-4 rounded-full shadow-lg"
        >
          Save Changes
        </motion.button>
      </div>
    </motion.div>
  );
}

function Star({ className, fill }: { className: string; fill?: string }) {
  return (
    <svg className={className} fill={fill || 'none'} viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}
