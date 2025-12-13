import { X, Eye, Shield, UserX, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivacySettingsProps {
  onClose: () => void;
}

export function PrivacySettings({ onClose }: PrivacySettingsProps) {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    profileVisibility: true,
    showEmail: false,
    showUniversity: true,
    allowMessages: true,
    showOnlineStatus: true,
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
        <h2>{t('privacy')}</h2>
      </div>

      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        {/* Profile Visibility */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div>
                <h3>Profile Visibility</h3>
                <p className="text-sm text-gray-600">Show your profile to others</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, profileVisibility: !settings.profileVisibility })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.profileVisibility ? 'bg-[#22c55e]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.profileVisibility ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Show Email */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3>Show Email Address</h3>
                <p className="text-sm text-gray-600">Display email on your profile</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, showEmail: !settings.showEmail })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.showEmail ? 'bg-[#22c55e]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.showEmail ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Show University */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3>Show University</h3>
                <p className="text-sm text-gray-600">Display university information</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, showUniversity: !settings.showUniversity })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.showUniversity ? 'bg-[#22c55e]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.showUniversity ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Allow Messages */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <UserX className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3>Allow Messages</h3>
                <p className="text-sm text-gray-600">Let others send you messages</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, allowMessages: !settings.allowMessages })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.allowMessages ? 'bg-[#22c55e]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.allowMessages ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Show Online Status */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#22c55e] rounded-full" />
              </div>
              <div>
                <h3>Show Online Status</h3>
                <p className="text-sm text-gray-600">Let others see when you're online</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, showOnlineStatus: !settings.showOnlineStatus })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.showOnlineStatus ? 'bg-[#22c55e]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  settings.showOnlineStatus ? 'translate-x-6' : 'translate-x-0.5'
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
