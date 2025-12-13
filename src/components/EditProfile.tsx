import { X, Camera, User, Mail, CreditCard, Building2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { CurrentUserProfile } from '../types/user';

interface EditProfileProps {
  profile: CurrentUserProfile;
  onClose: () => void;
  onSave: (updatedProfile: CurrentUserProfile) => void;
}

export function EditProfile({ profile, onClose, onSave }: EditProfileProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(profile);
  const [photoPreview, setPhotoPreview] = useState(profile.photo);

  const handlePhotoChange = () => {
    // In a real app, this would open file picker
    const newPhoto = prompt('Enter image URL for demo:');
    if (newPhoto) {
      setPhotoPreview(newPhoto);
      setFormData({ ...formData, photo: newPhoto });
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const universities = [
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

  const majors = [
    'International Business',
    'Business Administration',
    'Finance & Banking',
    'Marketing',
    'Economics',
    'Computer Science',
    'Information Technology',
    'Data Science',
    'Accounting',
    'International Relations',
  ];

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
            <h2>{t('editProfile')}</h2>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="p-6 space-y-4">
            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePhotoChange}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center shadow-lg"
                >
                  <Camera className="w-4 h-4 text-white" />
                </motion.button>
              </div>
              <p className="text-sm text-gray-600">Tap to change photo</p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-gray-700 mb-2">{t('fullName')}</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                />
              </div>
            </div>

            {/* Student ID */}
            <div>
              <label className="block text-gray-700 mb-2">{t('studentId')}</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">{t('email')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  disabled
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* University */}
            <div>
              <label className="block text-gray-700 mb-2">{t('university')}</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-white appearance-none"
                >
                  {universities.map((uni) => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Major */}
            <div>
              <label className="block text-gray-700 mb-2">{t('major')}</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-white appearance-none"
                >
                  {majors.map((major) => (
                    <option key={major} value={major}>{major}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-700 mb-2">Bio (Vietnamese)</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Bio (English)</label>
              <textarea
                value={formData.bioen}
                onChange={(e) => setFormData({ ...formData, bioen: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-none"
                rows={3}
              />
            </div>

            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white py-4 rounded-full shadow-lg"
            >
              Save Changes
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
