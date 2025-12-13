import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Lock, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginProps {
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

export function Login({ onLogin, onSwitchToSignup }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Save or clear remembered email
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      onLogin();
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
          <h1 className="text-white mb-2">{t('appName')}</h1>
          <p className="text-white/90">{t('findYourTeam')}</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="mb-6 text-center">{t('welcome')}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">{t('schoolEmail')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@ftu.edu.vn"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all"
                  required
                />
              </div>
            </div>

            <div className="text-right">
              <button type="button" className="text-[#2563eb] text-sm hover:underline">
                {t('forgotPassword')}
              </button>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#2563eb] border-gray-300 rounded focus:ring-2 focus:ring-[#2563eb]"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">
                {t('rememberMe')}
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              {t('login')}
            </motion.button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            {t('dontHaveAccount')}{' '}
            <button 
              onClick={onSwitchToSignup}
              className="text-[#2563eb] hover:underline"
            >
              {t('signUp')}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
