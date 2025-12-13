import { motion } from 'framer-motion';
import { ChevronLeft, Star, Shield, Calendar, Clock, Users, Target, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

interface ProjectPostProps {
  project: any;
  onClose: () => void;
}

export function ProjectPost({ project, onClose }: ProjectPostProps) {
  const { t, language } = useLanguage();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [availability, setAvailability] = useState<string[]>([]);

  const timeSlots = [
    { id: 'morning', label: 'Morning (6AM-12PM)', labelVi: 'Sáng (6-12h)' },
    { id: 'afternoon', label: 'Afternoon (12PM-6PM)', labelVi: 'Chiều (12-18h)' },
    { id: 'evening', label: 'Evening (6PM-12AM)', labelVi: 'Tối (18-24h)' },
    { id: 'night', label: 'Night (12AM-6AM)', labelVi: 'Đêm (0-6h)' },
  ];

  const weekDays = [
    { id: 'mon', label: 'Mon', labelVi: 'T2' },
    { id: 'tue', label: 'Tue', labelVi: 'T3' },
    { id: 'wed', label: 'Wed', labelVi: 'T4' },
    { id: 'thu', label: 'Thu', labelVi: 'T5' },
    { id: 'fri', label: 'Fri', labelVi: 'T6' },
    { id: 'sat', label: 'Sat', labelVi: 'T7' },
    { id: 'sun', label: 'Sun', labelVi: 'CN' },
  ];

  const handleApply = () => {
    // In real app, submit application to backend
    alert(t('applicationSent'));
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
            <h2 className="text-white mb-1">
              {language === 'vi' ? project.titleVi : project.title}
            </h2>
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
              project.goal === 'huntingA'
                ? 'bg-white/20'
                : 'bg-green-500/20'
            }`}>
              {project.goal === 'huntingA' ? '🎯 Hunting A+' : '✌️ Just Pass'}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Poster Info */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={project.posterAvatar}
              alt={project.posterName}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3>{project.posterName}</h3>
                {project.verified && (
                  <Shield className="w-4 h-4 text-[#2563eb]" />
                )}
              </div>
              <div className="text-sm text-gray-500">{project.posterUniversity}</div>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-current text-[#f59e0b]" />
                <span className="text-sm">{project.posterTrustScore} {t('trustScore')}</span>
              </div>
            </div>
          </div>
          
          {/* Verification Badge (Q7) */}
          {project.verified && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm mb-1">{t('verifiedProject')}</div>
                <div className="text-xs text-gray-600">{t('verifiedByProfessor')}</div>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="mb-2">{t('projectDescription')}</h3>
          <p className="text-gray-600">
            {language === 'vi' ? project.descriptionVi : project.description}
          </p>
        </div>

        {/* Skills Needed */}
        <div className="mb-6">
          <h3 className="mb-3">{t('skillsNeeded')}</h3>
          <div className="flex flex-wrap gap-2">
            {project.skillsNeeded.map((skill: string) => (
              <span
                key={skill}
                className="px-4 py-2 bg-[#2563eb]/10 text-[#2563eb] rounded-xl"
              >
                {t(skill.toLowerCase().replace(/ /g, ''))}
              </span>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <Users className="w-5 h-5 text-gray-400 mb-2" />
            <div className="text-sm text-gray-500 mb-1">{t('teamSize')}</div>
            <div className="text-lg">{project.currentMembers}/{project.teamSize}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <Calendar className="w-5 h-5 text-gray-400 mb-2" />
            <div className="text-sm text-gray-500 mb-1">{t('deadline')}</div>
            <div className="text-lg">{project.deadline}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <Clock className="w-5 h-5 text-gray-400 mb-2" />
            <div className="text-sm text-gray-500 mb-1">{t('timeCommitment')}</div>
            <div className="text-sm">{project.timeCommitment}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <Target className="w-5 h-5 text-gray-400 mb-2" />
            <div className="text-sm text-gray-500 mb-1">{t('applicants')}</div>
            <div className="text-lg">{project.applicants}</div>
          </div>
        </div>

        {/* Work Style */}
        <div className="mb-6">
          <h3 className="mb-3">{t('preferredWorkStyle')}</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-center">
              {project.workStyle === 'nightOwl' && '🦉 ' + t('nightOwl')}
              {project.workStyle === 'earlyBird' && '🐦 ' + t('earlyBird')}
              {project.workStyle === 'flexible' && '⏰ ' + t('flexible')}
            </div>
          </div>
        </div>

        {/* Apply Modal Content */}
        {showApplyModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="bg-blue-50 border-2 border-[#2563eb] rounded-2xl p-5">
              <h3 className="mb-4">{t('shareAvailability')}</h3>
              
              {/* Availability Grid (Q27, Q28) */}
              <div className="bg-white rounded-xl p-4 mb-4">
                <div className="text-sm mb-3">{t('selectAvailableSlots')}</div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => {
                        setAvailability(prev =>
                          prev.includes(slot.id)
                            ? prev.filter(s => s !== slot.id)
                            : [...prev, slot.id]
                        );
                      }}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        availability.includes(slot.id)
                          ? 'bg-[#2563eb] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {language === 'vi' ? slot.labelVi : slot.label}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-gray-500">{t('dynamicAvailability')}</div>
              </div>

              {/* Commitment Level */}
              <div className="bg-white rounded-xl p-4 mb-4">
                <div className="text-sm mb-3">{t('yourCommitment')}</div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{t('canMeetDeadlines')}</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{t('availableForMeetings')}</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{t('willCommunicate')}</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl"
                >
                  {t('cancel')}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleApply}
                  className="flex-1 py-3 bg-[#2563eb] text-white rounded-xl"
                >
                  {t('sendApplication')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Accountability Warning (Q9, Q25) */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm mb-1">{t('accountabilityReminder')}</div>
              <div className="text-xs text-gray-600">{t('trackingMilestones')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      {!showApplyModal && (
        <div className="p-6 border-t border-gray-200">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowApplyModal(true)}
            className="w-full py-4 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white rounded-xl text-lg"
          >
            {t('applyToProject')}
          </motion.button>
        </div>
      )}
    </div>
  );
}
