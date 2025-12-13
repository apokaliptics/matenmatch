import { motion } from 'framer-motion';
import { Plus, Filter, Clock, Users, Target, Calendar, Star, Shield, TrendingUp, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { ProjectPost } from './ProjectPost';
import { CreateProject } from './CreateProject';

interface Project {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  posterName: string;
  posterAvatar: string;
  posterUniversity: string;
  posterTrustScore: number;
  skillsNeeded: string[];
  teamSize: number;
  currentMembers: number;
  deadline: string;
  goal: 'huntingA' | 'justPass';
  timeCommitment: string;
  workStyle: 'nightOwl' | 'earlyBird' | 'flexible';
  postedDate: string;
  applicants: number;
  verified: boolean;
}

export function ProjectBoard() {
  const { t, language } = useLanguage();
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'huntingA' | 'justPass'>('all');
  const [showStats, setShowStats] = useState(true);

  // Mock projects - in real app, fetch from backend
  const projects: Project[] = [
    {
      id: '1',
      title: 'Marketing Research Project',
      titleVi: 'Dự Án Nghiên Cứu Marketing',
      description: 'Need 2 teammates for market analysis project. Looking for people good at data analysis and presentation.',
      descriptionVi: 'Cần 2 đồng đội cho dự án phân tích thị trường. Tìm người giỏi phân tích dữ liệu và thuyết trình.',
      posterName: 'Minh Anh',
      posterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MinhAnh',
      posterUniversity: 'FTU',
      posterTrustScore: 4.8,
      skillsNeeded: ['Research', 'Slide Design', 'Presentation'],
      teamSize: 3,
      currentMembers: 1,
      deadline: '2025-01-15',
      goal: 'huntingA',
      timeCommitment: '10-15 hours/week',
      workStyle: 'earlyBird',
      postedDate: '2 days ago',
      applicants: 7,
      verified: true,
    },
    {
      id: '2',
      title: 'Website Development Group',
      titleVi: 'Nhóm Phát Triển Website',
      description: 'Building a website for final project. Need frontend and content writer.',
      descriptionVi: 'Xây dựng website cho đồ án cuối kỳ. Cần frontend và người viết nội dung.',
      posterName: 'Tuấn Kiệt',
      posterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TuanKiet',
      posterUniversity: 'RMIT',
      posterTrustScore: 4.9,
      skillsNeeded: ['Content Writing', 'Research', 'Time Management'],
      teamSize: 4,
      currentMembers: 2,
      deadline: '2025-02-01',
      goal: 'huntingA',
      timeCommitment: '15-20 hours/week',
      workStyle: 'nightOwl',
      postedDate: '5 hours ago',
      applicants: 12,
      verified: true,
    },
    {
      id: '3',
      title: 'Business Case Study',
      titleVi: 'Nghiên Cứu Tình Huống Kinh Doanh',
      description: 'Easy case study for business class. Just need to pass, low pressure.',
      descriptionVi: 'Tình huống kinh doanh đơn giản. Chỉ cần qua môn, không áp lực.',
      posterName: 'Hải Yến',
      posterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HaiYen',
      posterUniversity: 'NEU',
      posterTrustScore: 4.5,
      skillsNeeded: ['Research', 'Content Writing'],
      teamSize: 3,
      currentMembers: 2,
      deadline: '2025-01-20',
      goal: 'justPass',
      timeCommitment: '3-5 hours/week',
      workStyle: 'flexible',
      postedDate: '1 day ago',
      applicants: 4,
      verified: false,
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.goal === filter);

  // Network stats (Q13, Q42)
  const networkStats = {
    totalUsers: 2847,
    activeProjects: 156,
    successfulMatches: 1923,
    avgCompletionRate: 87,
    thisWeekMatches: 134,
  };

  if (showCreateProject) {
    return <CreateProject onClose={() => setShowCreateProject(false)} />;
  }

  if (selectedProject) {
    return <ProjectPost project={selectedProject} onClose={() => setSelectedProject(null)} />;
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white mb-1">{t('projectBoard')}</h2>
            <p className="text-sm text-white/80">{t('findSpecificProjects')}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateProject(true)}
            className="w-12 h-12 rounded-full bg-[#ef4444] flex items-center justify-center shadow-lg"
          >
            <Plus className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Network Effect Stats (Q13, Q42) */}
        {showStats && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">{t('platformStats')}</span>
              </div>
              <button
                onClick={() => setShowStats(false)}
                className="text-xs text-white/60 hover:text-white"
              >
                {t('hide')}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-2xl mb-1">{networkStats.totalUsers.toLocaleString()}</div>
                <div className="text-xs text-white/70">{t('activeStudents')}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-2xl mb-1">{networkStats.avgCompletionRate}%</div>
                <div className="text-xs text-white/70">{t('projectCompletion')}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-2xl mb-1">{networkStats.successfulMatches.toLocaleString()}</div>
                <div className="text-xs text-white/70">{t('successfulMatches')}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-2xl mb-1">+{networkStats.thisWeekMatches}</div>
                <div className="text-xs text-white/70">{t('thisWeek')}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Goal-Based Filter (Q35, Q36) */}
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm transition-colors ${
              filter === 'all'
                ? 'bg-white text-[#2563eb]'
                : 'bg-white/20 text-white'
            }`}
          >
            {t('allProjects')}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('huntingA')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm transition-colors ${
              filter === 'huntingA'
                ? 'bg-white text-[#2563eb]'
                : 'bg-white/20 text-white'
            }`}
          >
            🎯 {t('huntingA')}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('justPass')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm transition-colors ${
              filter === 'justPass'
                ? 'bg-white text-[#2563eb]'
                : 'bg-white/20 text-white'
            }`}
          >
            ✌️ {t('justPass')}
          </motion.button>
        </div>
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Project Header */}
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={project.posterAvatar}
                  alt={project.posterName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="truncate">
                      {language === 'vi' ? project.titleVi : project.title}
                    </h3>
                    {project.verified && (
                      <Shield className="w-4 h-4 text-[#2563eb] flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{project.posterName}</span>
                    <span>•</span>
                    <span>{project.posterUniversity}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-[#f59e0b]" />
                      <span>{project.posterTrustScore}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${
                  project.goal === 'huntingA'
                    ? 'bg-[#2563eb]/10 text-[#2563eb]'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {project.goal === 'huntingA' ? '🎯 A+' : '✌️ Pass'}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {language === 'vi' ? project.descriptionVi : project.description}
              </p>

              {/* Skills Needed */}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.skillsNeeded.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                  >
                    {t(skill.toLowerCase().replace(/ /g, ''))}
                  </span>
                ))}
              </div>

              {/* Project Meta */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{project.currentMembers}/{project.teamSize} {t('members')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{project.deadline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{project.timeCommitment}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Target className="w-4 h-4" />
                  <span>{project.applicants} {t('applicants')}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">{project.postedDate}</span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="px-4 py-2 bg-[#2563eb] text-white rounded-xl text-sm"
                >
                  {t('viewDetails')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Target className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="mb-2">{t('noProjectsYet')}</h3>
            <p className="text-sm text-gray-500 mb-4">{t('beFirstToPost')}</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateProject(true)}
              className="px-6 py-3 bg-[#2563eb] text-white rounded-xl"
            >
              {t('createProject')}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
