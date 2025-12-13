import { Clock, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

interface SOSModeProps {
  onClose: () => void;
}

interface Hero {
  id: string;
  name: string;
  skill: string;
  reputation: number;
  photo: string;
  online: boolean;
}

export function SOSMode({ onClose }: SOSModeProps) {
  const { t } = useLanguage();
  const [requestedHeroes, setRequestedHeroes] = useState<Set<string>>(new Set());
  const [sosRequest, setSosRequest] = useState({
    need: '',
    deadline: '',
    offer: '',
  });
  
  const availableHeroes: Hero[] = [
    {
      id: '1',
      name: 'Võ Thị Mai',
      skill: 'Poster Design',
      reputation: 4.9,
      photo: 'https://images.unsplash.com/photo-1543689604-6fe8dbcd1f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      online: true,
    },
    {
      id: '2',
      name: 'Hoàng Đức Long',
      skill: 'Graphic Design',
      reputation: 4.7,
      photo: 'https://images.unsplash.com/photo-1639654655546-68bc1f21e9e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      online: true,
    },
    {
      id: '3',
      name: 'Lý Thu Trang',
      skill: 'Visual Design',
      reputation: 4.8,
      photo: 'https://images.unsplash.com/photo-1720659201153-e0c195776963?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      online: true,
    },
  ];

  const handleRequest = (heroId: string) => {
    setRequestedHeroes(prev => new Set([...prev, heroId]));
  };

  const handleSendSOSRequest = () => {
    if (sosRequest.need && sosRequest.deadline) {
      alert(`SOS Request sent!\nNeed: ${sosRequest.need}\nDeadline: ${sosRequest.deadline}${sosRequest.offer ? `\nOffer: ${sosRequest.offer}` : ''}`);
      setSosRequest({ need: '', deadline: '', offer: '' });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white z-50 flex flex-col"
      >
        {/* Header - Fixed */}
        <div className="bg-gradient-to-r from-[#ef4444] to-[#dc2626] p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <Zap className="w-5 h-5 text-white fill-white" />
            </motion.div>
            <div>
              <h2 className="text-white">{t('sosMode')}</h2>
              <p className="text-white/80 text-sm">{t('findHelpFast')}</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6 space-y-6 max-w-md mx-auto pb-8">
            {/* Request Form */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-2xl p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#ef4444]" />
                </div>
                <h3>{t('createSOSRequest')}</h3>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm">{t('whatDoYouNeed')}</label>
                <input 
                  type="text"
                  value={sosRequest.need}
                  onChange={(e) => setSosRequest({ ...sosRequest, need: e.target.value })}
                  placeholder="e.g., 1 Poster Designer, Data Analyst"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ef4444] bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm">{t('deadline')}</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text"
                    value={sosRequest.deadline}
                    onChange={(e) => setSosRequest({ ...sosRequest, deadline: e.target.value })}
                    placeholder="e.g., 12 hours, Tomorrow 5PM"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ef4444] bg-gray-50"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm">{t('offer')}</label>
                <input 
                  type="text"
                  value={sosRequest.offer}
                  onChange={(e) => setSosRequest({ ...sosRequest, offer: e.target.value })}
                  placeholder="e.g., Coffee, Help with future projects"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ef4444] bg-gray-50"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendSOSRequest}
                disabled={!sosRequest.need || !sosRequest.deadline}
                className="w-full bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white py-3.5 rounded-xl shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('sendSOSRequest')}
              </motion.button>
            </motion.div>
            
            {/* Available Heroes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-[#22c55e] rounded-full"
                  />
                  <h3 className="text-gray-900">{t('availableNow')} ({availableHeroes.length})</h3>
                </div>
                <button className="text-[#ef4444] text-sm">View All</button>
              </div>
              
              {availableHeroes.map((hero, index) => {
                const isRequested = requestedHeroes.has(hero.id);
                
                return (
                  <motion.div
                    key={hero.id}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img 
                        src={hero.photo} 
                        alt={hero.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      {hero.online && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#22c55e] border-2 border-white rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-gray-900">{hero.name}</h3>
                      <p className="text-gray-600 text-sm">{hero.skill}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-500 text-sm">⭐</span>
                        <span className="text-sm text-gray-600">{hero.reputation.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={!isRequested ? { scale: 1.05 } : {}}
                      whileTap={!isRequested ? { scale: 0.95 } : {}}
                      onClick={() => !isRequested && handleRequest(hero.id)}
                      disabled={isRequested}
                      className={`px-5 py-2 rounded-full text-sm shadow-sm transition-all ${
                        isRequested
                          ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                          : 'bg-[#ef4444] text-white hover:shadow-md'
                      }`}
                    >
                      {isRequested ? 'Requested' : t('request')}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
