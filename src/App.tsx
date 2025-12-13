import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SwipeCard } from './components/SwipeCard';
import { ProfileDetail } from './components/ProfileDetail';
import { SOSMode } from './components/SOSMode';
import { Chat } from './components/Chat';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { DiscoveryFilters, FilterSettings } from './components/DiscoveryFilters';
import { EndOfDeck } from './components/EndOfDeck';
import { LoginStreakModal } from './components/LoginStreakModal';
import { ProjectBoard } from './components/ProjectBoard';
import { Zap, MessageCircle, LayoutGrid, User as UserIcon, SlidersHorizontal, Briefcase } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { User, CurrentUserProfile } from './types/user';

type Screen = 'discover' | 'chat' | 'settings' | 'projects';
type AuthScreen = 'login' | 'signup';

function AppContent() {
  const { t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [currentScreen, setCurrentScreen] = useState<Screen>('discover');
  const [showProfile, setShowProfile] = useState(false);
  const [viewingOwnProfile, setViewingOwnProfile] = useState(false);
  const [showSOS, setShowSOS] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [swipedUserIds, setSwipedUserIds] = useState<Set<string>>(new Set());
  const [showLoginStreak, setShowLoginStreak] = useState(false);
  const [loginStreak, setLoginStreak] = useState(0);
  
  const [currentUser, setCurrentUser] = useState<CurrentUserProfile>({
    id: 'current-user',
    name: 'Nguyễn Văn An',
    major: 'Computer Science',
    university: 'VNU',
    archetype: 'studybuddy',
    goal: 'Hunting A+',
    workStyle: 'Night Owl',
    reputation: 4.9,
    photo: 'https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    verified: true,
    bio: 'Đam mê công nghệ và lập trình. Tìm bạn cùng làm dự án!',
    bioen: 'Passionate about technology and programming. Looking for project partners!',
    badges: ['Code Master', 'Team Player', 'Reliable'],
    skills: {
      Leadership: 75,
      'Slide Design': 70,
      Research: 80,
      Presentation: 70,
      'Content Writing': 65,
      'Time Management': 85,
    },
    studentId: '2012345678',
    email: 'nguyen.an@vnu.edu.vn',
  });

  const [filters, setFilters] = useState<FilterSettings>({
    enabled: false,
    radius: 50,
    goal: 'all',
    workStyle: 'all',
    archetype: 'all',
    university: 'All Universities',
  });

  // Reset deck when app first loads
  useEffect(() => {
    if (isLoggedIn && currentScreen === 'discover') {
      // Only reset if we haven't started swiping yet
      if (swipedUserIds.size === 0 && currentUserIndex === 0) {
        setSwipedUserIds(new Set());
        setCurrentUserIndex(0);
      }
    }
  }, [isLoggedIn, currentScreen]);

  // Update login streak
  const updateLoginStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const streakDataStr = localStorage.getItem('loginStreakData');
    
    let streakData = {
      currentStreak: 0,
      longestStreak: 0,
      totalLogins: 0,
      loginDates: [] as string[],
      lastLoginDate: ''
    };

    if (streakDataStr) {
      streakData = JSON.parse(streakDataStr);
    }

    // Check if already logged in today
    if (streakData.lastLoginDate === today) {
      setLoginStreak(streakData.currentStreak);
      return;
    }

    // Check if yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (streakData.lastLoginDate === yesterdayStr) {
      // Continue streak
      streakData.currentStreak += 1;
    } else if (streakData.lastLoginDate === '') {
      // First login
      streakData.currentStreak = 1;
    } else {
      // Streak broken
      streakData.currentStreak = 1;
    }

    streakData.lastLoginDate = today;
    streakData.totalLogins += 1;
    streakData.loginDates.push(today);
    streakData.longestStreak = Math.max(streakData.longestStreak, streakData.currentStreak);

    localStorage.setItem('loginStreakData', JSON.stringify(streakData));
    setLoginStreak(streakData.currentStreak);
    setShowLoginStreak(true);
  };

  const allUsers: User[] = [
    {
      id: '1',
      name: 'Nguyễn Gia Bảo',
      major: 'International Business',
      university: 'FTU',
      archetype: 'thecarrier',
      goal: 'Hunting A+',
      workStyle: 'Night Owl',
      reputation: 4.8,
      photo: 'https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      verified: true,
      bio: 'Tôi làm việc tốt nhất dưới áp lực và thích giải quyết những dự án thách thức. Đang tìm đồng đội nghiêm túc muốn đạt điểm cao môn International Marketing!',
      bioen: 'I work best under pressure and love tackling challenging projects. Looking for serious teammates who want to ace International Marketing!',
      badges: ['Deadline Crusher', 'Active Listener', 'Tech Wizard'],
      skills: {
        Leadership: 85,
        'Slide Design': 70,
        Research: 90,
        Presentation: 75,
        'Content Writing': 80,
        'Time Management': 95,
      },
      gender: 'male',
    },
    {
      id: '2',
      name: 'Trịnh Khánh Ly',
      major: 'Computer Science',
      university: 'VNU',
      archetype: 'studybuddy',
      goal: 'Just Pass',
      workStyle: 'Early Bird',
      reputation: 4.6,
      photo: 'https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      verified: true,
      bio: 'Học buổi sáng sớm là sở trường của tôi! Đang tìm đồng đội chill muốn học và vui vẻ khi hoàn thành dự án.',
      bioen: 'Early morning study sessions are my thing! Looking for chill teammates who want to learn and have fun while completing projects.',
      badges: ['Morning Hero', 'Code Master', 'Team Player'],
      skills: {
        Leadership: 60,
        'Slide Design': 85,
        Research: 70,
        Presentation: 65,
        'Content Writing': 75,
        'Time Management': 80,
      },
      gender: 'female',
    },
    {
      id: '3',
      name: 'Nguyễn Minh Kiệt',
      major: 'Business Administration',
      university: 'NEU',
      archetype: 'teambuilder',
      goal: 'Hunting A+',
      workStyle: 'Night Owl',
      reputation: 4.9,
      photo: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      verified: true,
      bio: 'Đam mê xây dựng đội nhóm tuyệt vời và mang lại kết quả xuất sắc. Hãy cùng tạo nên điều gì đó tuyệt vời!',
      bioen: 'Passionate about building great teams and delivering exceptional results. Let\'s create something amazing together!',
      badges: ['Presentation Pro', 'Strategic Thinker', 'Networking Ninja'],
      skills: {
        Leadership: 95,
        'Slide Design': 80,
        Research: 75,
        Presentation: 90,
        'Content Writing': 70,
        'Time Management': 85,
      },
      gender: 'male',
    },
    {
      id: '4',
      name: 'Phạm Quỳnh Chi',
      major: 'Marketing',
      university: 'UEH',
      archetype: 'studybuddy',
      goal: 'Hunting A+',
      workStyle: 'Early Bird',
      reputation: 4.7,
      photo: 'https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      verified: true,
      bio: 'Creative và passionate về marketing! Tìm team muốn làm những campaign sáng tạo và nổi bật.',
      bioen: 'Creative and passionate about marketing! Looking for a team that wants to create innovative and standout campaigns.',
      badges: ['Creative Mind', 'Detail Oriented', 'Fast Learner'],
      skills: {
        Leadership: 70,
        'Slide Design': 90,
        Research: 75,
        Presentation: 85,
        'Content Writing': 88,
        'Time Management': 80,
      },
      gender: 'female',
    },
    {
      id: '5',
      name: 'Phan Trường Thịnh',
      major: 'Finance & Banking',
      university: 'FTU',
      archetype: 'thecarrier',
      goal: 'Hunting A+',
      workStyle: 'Night Owl',
      reputation: 4.9,
      photo: 'https://images.unsplash.com/photo-1594077810908-9ffd89d704ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      verified: true,
      bio: 'Detail-oriented và analytical. Thích làm việc với số liệu và phân tích. Đang tìm đồng đội chuyên nghiệp cho dự án Finance.',
      bioen: 'Detail-oriented and analytical. Love working with numbers and analysis. Looking for professional teammates for Finance projects.',
      badges: ['Excel Master', 'Analytical', 'Reliable'],
      skills: {
        Leadership: 85,
        'Slide Design': 65,
        Research: 95,
        Presentation: 78,
        'Content Writing': 70,
        'Time Management': 90,
      },
      gender: 'male',
    },
    {
      id: '6',
      name: 'Trương Ngọc Ánh',
      major: 'Data Science',
      university: 'FTU',
      archetype: 'teambuilder',
      goal: 'Just Pass',
      workStyle: 'Early Bird',
      reputation: 4.5,
      photo: 'https://images.unsplash.com/photo-1752937326758-f130e633b422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      verified: true,
      bio: 'Python enthusiast! Yêu thích data visualization và machine learning. Tìm team cùng passion về tech.',
      bioen: 'Python enthusiast! Love data visualization and machine learning. Looking for teammates with a passion for tech.',
      badges: ['Python Pro', 'Problem Solver', 'Collaborative'],
      skills: {
        Leadership: 75,
        'Slide Design': 80,
        Research: 92,
        Presentation: 70,
        'Content Writing': 65,
        'Time Management': 85,
      },
      gender: 'female',
    },
    {
      id: '7',
      name: 'Nguyễn Trí Hùng',
      major: 'Economics',
      university: 'NEU',
      archetype: 'thecarrier',
      goal: 'Hunting A+',
      workStyle: 'Night Owl',
      reputation: 4.8,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      verified: true,
      bio: 'Nghiêm túc với học tập, nhưng cũng biết cách làm việc teamwork vui vẻ. Đang cần team cho môn Macroeconomics.',
      bioen: 'Serious about studying, but also know how to have fun working in a team. Need a team for Macroeconomics.',
      badges: ['Research Expert', 'Critical Thinker', 'Dependable'],
      skills: {
        Leadership: 80,
        'Slide Design': 70,
        Research: 95,
        Presentation: 82,
        'Content Writing': 85,
        'Time Management': 88,
      },
      gender: 'male',
    },
    {
      id: '8',
      name: 'Nguyễn Hà My',
      major: 'International Relations',
      university: 'UEH',
      archetype: 'studybuddy',
      goal: 'Just Pass',
      workStyle: 'Early Bird',
      reputation: 4.6,
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      verified: true,
      bio: 'Giao tiếp tốt và friendly. Tìm bạn cùng làm presentation và research. Let\'s make learning fun!',
      bioen: 'Good communication and friendly. Looking for partners to do presentations and research. Let\'s make learning fun!',
      badges: ['Great Communicator', 'Friendly', 'Organized'],
      skills: {
        Leadership: 65,
        'Slide Design': 75,
        Research: 80,
        Presentation: 90,
        'Content Writing': 85,
        'Time Management': 75,
      },
      gender: 'female',
    },
  ];

  // Filter users based on filter settings - only apply if filters are enabled
  const filteredUsers = filters.enabled 
    ? allUsers.filter(user => {
        if (swipedUserIds.has(user.id)) return false;
        if (filters.goal !== 'all' && user.goal !== filters.goal) return false;
        if (filters.workStyle !== 'all' && user.workStyle !== filters.workStyle) return false;
        if (filters.archetype !== 'all' && user.archetype !== filters.archetype) return false;
        if (filters.university !== 'All Universities' && user.university !== filters.university) return false;
        return true;
      })
    : allUsers;

  const currentDisplayUser = filteredUsers[currentUserIndex];
  const hasMoreUsers = currentUserIndex < filteredUsers.length && currentDisplayUser !== undefined;

  console.log('=== DEBUG ===');
  console.log('Total users in database:', allUsers.length);
  console.log('Filtered users count:', filteredUsers.length);
  console.log('Current index:', currentUserIndex);
  console.log('Swiped count:', swipedUserIds.size);
  console.log('Swiped IDs:', Array.from(swipedUserIds));
  console.log('Has more users:', hasMoreUsers);
  console.log('Current display user:', currentDisplayUser?.name || 'NONE');
  console.log('All filtered user names:', filteredUsers.map(u => u.name));
  console.log('=============');

  const handleSwipeLeft = () => {
    if (currentDisplayUser) {
      setSwipedUserIds(prev => new Set([...prev, currentDisplayUser.id]));
      setCurrentUserIndex(prev => prev + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentDisplayUser) {
      alert(`✅ Invited ${currentDisplayUser.name} to your team!`);
      setSwipedUserIds(prev => new Set([...prev, currentDisplayUser.id]));
      setCurrentUserIndex(prev => prev + 1);
    }
  };

  const handleSuperLike = () => {
    setShowSOS(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    updateLoginStreak();
  };

  const handleSignup = (signupData: { fullName: string; studentId: string; university: string; major: string; email: string }) => {
    // Update current user with signup data
    setCurrentUser(prev => ({
      ...prev,
      name: signupData.fullName,
      studentId: signupData.studentId,
      university: signupData.university,
      major: signupData.major,
      email: signupData.email,
    }));
    setIsLoggedIn(true);
    updateLoginStreak();
  };

  const handleApplyFilters = (newFilters: FilterSettings) => {
    setFilters(newFilters);
    setCurrentUserIndex(0);
    // If filters are disabled, reset swiped users to show everyone
    if (!newFilters.enabled) {
      setSwipedUserIds(new Set());
    }
  };

  const handleResetDeck = () => {
    setSwipedUserIds(new Set());
    setCurrentUserIndex(0);
  };

  const handleUpdateProfile = (updatedProfile: CurrentUserProfile) => {
    setCurrentUser(updatedProfile);
  };

  const handleViewOwnProfile = () => {
    setViewingOwnProfile(true);
    setShowProfile(true);
  };

  if (!isLoggedIn) {
    if (authScreen === 'login') {
      return (
        <Login 
          onLogin={handleLogin} 
          onSwitchToSignup={() => setAuthScreen('signup')}
        />
      );
    } else {
      return (
        <Signup 
          onSignup={handleSignup} 
          onSwitchToLogin={() => setAuthScreen('login')}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="bg-gradient-to-r from-[#2563eb] to-[#f97316] bg-clip-text text-transparent">
              {t('appName')}
            </h1>
            <div className="flex items-center gap-2">
              {currentScreen === 'discover' && (
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowFilters(true)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                </motion.button>
              )}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSOS(true)}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ef4444] to-[#dc2626] flex items-center justify-center shadow-lg"
              >
                <Zap className="w-5 h-5 text-white fill-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {currentScreen === 'discover' && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full px-6 py-8"
            >
              {hasMoreUsers && currentDisplayUser ? (
                <SwipeCard 
                  user={currentDisplayUser}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  onSuperLike={handleSuperLike}
                  onCardClick={() => setShowProfile(true)}
                />
              ) : (
                <EndOfDeck 
                  onReset={handleResetDeck}
                  onOpenFilters={() => setShowFilters(true)}
                />
              )}
            </motion.div>
          )}

          {currentScreen === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <Chat currentUserId={currentUser.id} />
            </motion.div>
          )}

          {currentScreen === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <Settings 
                onLogout={() => setIsLoggedIn(false)} 
                currentUser={currentUser}
                onUpdateProfile={handleUpdateProfile}
                onViewProfile={handleViewOwnProfile}
              />
            </motion.div>
          )}

          {currentScreen === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <ProjectBoard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 sticky bottom-0 z-40">
        <div className="max-w-md mx-auto pl-1 pr-6 py-3">
          <div className="flex items-center justify-evenly">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentScreen('discover')}
              className={`flex flex-col items-center gap-1 py-2 px-5 rounded-xl transition-colors ${
                currentScreen === 'discover' ? 'bg-blue-50 text-[#2563eb]' : 'text-gray-600'
              }`}
            >
              <motion.div
                animate={{ 
                  scale: currentScreen === 'discover' ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <LayoutGrid className="w-6 h-6" />
              </motion.div>
              <span className="text-xs whitespace-nowrap">{t('discover')}</span>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentScreen('chat')}
              className={`flex flex-col items-center gap-1 py-2 px-5 rounded-xl transition-colors ${
                currentScreen === 'chat' ? 'bg-blue-50 text-[#2563eb]' : 'text-gray-600'
              }`}
            >
              <motion.div
                animate={{ 
                  scale: currentScreen === 'chat' ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
              <span className="text-xs whitespace-nowrap">{t('chat')}</span>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSOS(true)}
              className="flex flex-col items-center gap-1 py-2 px-5 rounded-xl text-[#ef4444]"
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Zap className="w-6 h-6 fill-current" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-2 h-2 bg-[#ef4444] rounded-full"
                />
              </div>
              <span className="text-xs whitespace-nowrap">{t('sos')}</span>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentScreen('settings')}
              className={`flex flex-col items-center gap-1 py-2 px-5 rounded-xl transition-colors ${
                currentScreen === 'settings' ? 'bg-blue-50 text-[#2563eb]' : 'text-gray-600'
              }`}
            >
              <motion.div
                animate={{ 
                  scale: currentScreen === 'settings' ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <UserIcon className="w-6 h-6" />
              </motion.div>
              <span className="text-xs whitespace-nowrap">{t('settings')}</span>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentScreen('projects')}
              className={`flex flex-col items-center gap-1 py-2 px-5 rounded-xl transition-colors ${
                currentScreen === 'projects' ? 'bg-blue-50 text-[#2563eb]' : 'text-gray-600'
              }`}
            >
              <motion.div
                animate={{ 
                  scale: currentScreen === 'projects' ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Briefcase className="w-6 h-6" />
              </motion.div>
              <span className="text-xs whitespace-nowrap">{t('projects')}</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Modals/Overlays */}
      {showProfile && viewingOwnProfile && (
        <ProfileDetail 
          user={currentUser}
          onClose={() => {
            setShowProfile(false);
            setViewingOwnProfile(false);
          }}
        />
      )}

      {showProfile && !viewingOwnProfile && currentDisplayUser && (
        <ProfileDetail 
          user={currentDisplayUser}
          onClose={() => setShowProfile(false)}
        />
      )}

      {showSOS && (
        <SOSMode onClose={() => setShowSOS(false)} />
      )}

      {showFilters && (
        <DiscoveryFilters
          currentFilters={filters}
          onClose={() => setShowFilters(false)}
          onApply={handleApplyFilters}
        />
      )}

      {/* Login Streak Modal */}
      {showLoginStreak && (
        <LoginStreakModal
          streak={loginStreak}
          onClose={() => setShowLoginStreak(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
