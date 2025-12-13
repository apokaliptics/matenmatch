import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Mail, Lock, User, CreditCard, Globe, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SignupProps {
  onSignup: (data: { fullName: string; studentId: string; university: string; major: string; email: string }) => void;
  onSwitchToLogin: () => void;
}

export function Signup({ onSignup, onSwitchToLogin }: SignupProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    university: '',
    customUniversity: '',
    major: '',
    customMajor: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { language, toggleLanguage, t } = useLanguage();

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
    'Other',
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
    'Other',
  ];

  const handleNext = () => {
    if (step === 1) {
      const finalUniversity = formData.university === 'Other' ? formData.customUniversity : formData.university;
      const finalMajor = formData.major === 'Other' ? formData.customMajor : formData.major;
      
      if (formData.fullName && formData.studentId && finalUniversity && finalMajor) {
        setStep(2);
      }
    } else if (step === 2) {
      if (formData.email && formData.password && formData.password === formData.confirmPassword) {
        const finalUniversity = formData.university === 'Other' ? formData.customUniversity : formData.university;
        const finalMajor = formData.major === 'Other' ? formData.customMajor : formData.major;
        
        onSignup({
          fullName: formData.fullName,
          studentId: formData.studentId,
          university: finalUniversity,
          major: finalMajor,
          email: formData.email,
        });
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#f97316] flex items-center justify-center p-6">
      {/* Language Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLanguage}
        className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2"
      >
        <Globe className="w-4 h-4" />
        <span>{language === 'en' ? 'VI' : 'EN'}</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <BookOpen className="w-16 h-16 text-white" strokeWidth={2} />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <BookOpen className="w-16 h-16 text-white/30" strokeWidth={2} />
              </motion.div>
            </div>
          </motion.div>
          <h1 className="text-white mb-2">{t('createAccount')}</h1>
          <p className="text-white/90">{t('joinCommunity')}</p>
        </div>

        {/* Signup Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-2xl max-h-[80vh] overflow-y-auto"
        >
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-[#2563eb]' : 'bg-gray-200'}`} />
            <div className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-[#2563eb]' : 'bg-gray-200'}`} />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-4"
              >
                <h3 className="text-center mb-4">{t('studentInfo')}</h3>

                <div>
                  <label className="block text-gray-700 mb-2">{t('fullName')}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Nguyễn Văn An"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{t('studentId')}</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      placeholder="2012345678"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{t('university')}</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] appearance-none bg-white"
                      required
                    >
                      <option value="">{t('selectUniversity')}</option>
                      {universities.map((uni) => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.university === 'Other' && (
                  <div>
                    <label className="block text-gray-700 mb-2">Enter Your University</label>
                    <input
                      type="text"
                      value={formData.customUniversity}
                      onChange={(e) => setFormData({ ...formData, customUniversity: e.target.value })}
                      placeholder="Type your university name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 mb-2">{t('major')}</label>
                  <select
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] appearance-none bg-white"
                    required
                  >
                    <option value="">{t('selectMajor')}</option>
                    {majors.map((major) => (
                      <option key={major} value={major}>{major}</option>
                    ))}
                  </select>
                </div>

                {formData.major === 'Other' && (
                  <div>
                    <label className="block text-gray-700 mb-2">Enter Your Major</label>
                    <input
                      type="text"
                      value={formData.customMajor}
                      onChange={(e) => setFormData({ ...formData, customMajor: e.target.value })}
                      placeholder="Type your major"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      required
                    />
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white py-4 rounded-full shadow-lg"
                >
                  {t('continue')}
                </motion.button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-4"
              >
                <h3 className="text-center mb-4">{t('accountSecurity')}</h3>

                <div>
                  <label className="block text-gray-700 mb-2">{t('schoolEmail')}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@university.edu.vn"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('useSchoolEmail')} <span className="text-gray-400">(example: student@ftu.edu.vn)</span>
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{t('password')}</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{t('confirmPassword')}</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      required
                    />
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">{t('passwordMismatch')}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-full"
                  >
                    {t('back')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    disabled={!formData.email || !formData.password || formData.password !== formData.confirmPassword}
                    className="flex-1 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white py-4 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('createAccount')}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center mt-6 text-gray-600">
            {t('alreadyHaveAccount')}{' '}
            <button 
              onClick={onSwitchToLogin}
              className="text-[#2563eb] hover:underline"
            >
              {t('login')}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
