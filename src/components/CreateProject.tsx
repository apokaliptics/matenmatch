import { motion } from 'framer-motion';
import { ChevronLeft, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

interface CreateProjectProps {
  onClose: () => void;
}

export function CreateProject({ onClose }: CreateProjectProps) {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({
    title: '',
    titleVi: '',
    description: '',
    descriptionVi: '',
    skillsNeeded: [] as string[],
    teamSize: 3,
    deadline: '',
    goal: 'huntingA' as 'huntingA' | 'justPass',
    timeCommitment: '',
    workStyle: 'flexible' as 'nightOwl' | 'earlyBird' | 'flexible',
  });

  const allSkills = [
    'Leadership',
    'Slide Design',
    'Research',
    'Presentation',
    'Content Writing',
    'Time Management',
  ];

  const toggleSkill = (skill: string) => {
    setProjectData(prev => ({
      ...prev,
      skillsNeeded: prev.skillsNeeded.includes(skill)
        ? prev.skillsNeeded.filter(s => s !== skill)
        : [...prev.skillsNeeded, skill],
    }));
  };

  const handleCreate = () => {
    // In real app, submit to backend
    alert(t('projectCreated'));
    onClose();
  };

  return (
    <div className="h-full flex flex-col bg-white">
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
          <div className="flex-1">
            <h2 className="text-white mb-1">{t('createProject')}</h2>
            <div className="text-sm text-white/80">{t('step')} {step}/3</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: '33%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm mb-2">{t('projectTitle')} (English)</label>
              <input
                type="text"
                value={projectData.title}
                onChange={(e) => setProjectData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Marketing Research Project"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">{t('projectTitle')} (Tiếng Việt)</label>
              <input
                type="text"
                value={projectData.titleVi}
                onChange={(e) => setProjectData(prev => ({ ...prev, titleVi: e.target.value }))}
                placeholder="vd: Dự Án Nghiên Cứu Marketing"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">{t('description')} (English)</label>
              <textarea
                value={projectData.description}
                onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what you need help with..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">{t('description')} (Tiếng Việt)</label>
              <textarea
                value={projectData.descriptionVi}
                onChange={(e) => setProjectData(prev => ({ ...prev, descriptionVi: e.target.value }))}
                placeholder="Mô tả bạn cần giúp đỡ gì..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">{t('projectGoal')}</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setProjectData(prev => ({ ...prev, goal: 'huntingA' }))}
                  className={`p-4 rounded-xl border-2 transition-colors ${
                    projectData.goal === 'huntingA'
                      ? 'border-[#2563eb] bg-[#2563eb]/10'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm">{t('huntingA')}</div>
                </button>
                <button
                  onClick={() => setProjectData(prev => ({ ...prev, goal: 'justPass' }))}
                  className={`p-4 rounded-xl border-2 transition-colors ${
                    projectData.goal === 'justPass'
                      ? 'border-[#2563eb] bg-[#2563eb]/10'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="text-2xl mb-2">✌️</div>
                  <div className="text-sm">{t('justPass')}</div>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Requirements */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm mb-3">{t('skillsNeeded')}</label>
              <div className="grid grid-cols-2 gap-3">
                {allSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`p-4 rounded-xl border-2 transition-colors text-left ${
                      projectData.skillsNeeded.includes(skill)
                        ? 'border-[#2563eb] bg-[#2563eb]/10'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="text-sm">{t(skill.toLowerCase().replace(/ /g, ''))}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-3">{t('teamSize')}</label>
              <div className="flex items-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProjectData(prev => ({ ...prev, teamSize: Math.max(2, prev.teamSize - 1) }))}
                  className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <Minus className="w-5 h-5" />
                </motion.button>
                <div className="flex-1 text-center">
                  <div className="text-4xl mb-1">{projectData.teamSize}</div>
                  <div className="text-sm text-gray-500">{t('members')}</div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProjectData(prev => ({ ...prev, teamSize: Math.min(10, prev.teamSize + 1) }))}
                  className="w-12 h-12 rounded-full bg-[#2563eb] text-white flex items-center justify-center"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">{t('deadline')}</label>
              <input
                type="date"
                value={projectData.deadline}
                onChange={(e) => setProjectData(prev => ({ ...prev, deadline: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">{t('timeCommitment')}</label>
              <input
                type="text"
                value={projectData.timeCommitment}
                onChange={(e) => setProjectData(prev => ({ ...prev, timeCommitment: e.target.value }))}
                placeholder="e.g., 10-15 hours/week"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </motion.div>
        )}

        {/* Step 3: Work Style */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm mb-3">{t('preferredWorkStyle')}</label>
              <div className="space-y-3">
                <button
                  onClick={() => setProjectData(prev => ({ ...prev, workStyle: 'earlyBird' }))}
                  className={`w-full p-4 rounded-xl border-2 transition-colors text-left ${
                    projectData.workStyle === 'earlyBird'
                      ? 'border-[#2563eb] bg-[#2563eb]/10'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🐦</div>
                    <div className="flex-1">
                      <div className="mb-1">{t('earlyBird')}</div>
                      <div className="text-xs text-gray-500">{t('morningWork')}</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setProjectData(prev => ({ ...prev, workStyle: 'nightOwl' }))}
                  className={`w-full p-4 rounded-xl border-2 transition-colors text-left ${
                    projectData.workStyle === 'nightOwl'
                      ? 'border-[#2563eb] bg-[#2563eb]/10'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🦉</div>
                    <div className="flex-1">
                      <div className="mb-1">{t('nightOwl')}</div>
                      <div className="text-xs text-gray-500">{t('eveningWork')}</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setProjectData(prev => ({ ...prev, workStyle: 'flexible' }))}
                  className={`w-full p-4 rounded-xl border-2 transition-colors text-left ${
                    projectData.workStyle === 'flexible'
                      ? 'border-[#2563eb] bg-[#2563eb]/10'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">⏰</div>
                    <div className="flex-1">
                      <div className="mb-1">{t('flexible')}</div>
                      <div className="text-xs text-gray-500">{t('adaptableSchedule')}</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="text-sm mb-3">{t('projectPreview')}</div>
              <div className="bg-white rounded-xl p-4 space-y-3">
                <h3>{projectData.title || t('untitled')}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {projectData.description || t('noDescription')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {projectData.skillsNeeded.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                      {t(skill.toLowerCase().replace(/ /g, ''))}
                    </span>
                  ))}
                  {projectData.skillsNeeded.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                      +{projectData.skillsNeeded.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex gap-3">
          {step > 1 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(step - 1)}
              className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl"
            >
              {t('back')}
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => step === 3 ? handleCreate() : setStep(step + 1)}
            className="flex-1 py-4 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white rounded-xl"
          >
            {step === 3 ? t('createProject') : t('continue')}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
