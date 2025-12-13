import { motion } from 'framer-motion';
import { ChevronLeft, Users, Target, TrendingUp, CheckCircle, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AboutUsProps {
  onClose: () => void;
}

export function AboutUs({ onClose }: AboutUsProps) {
  const { t, language } = useLanguage();

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] p-6 text-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <div className="flex-1">
            <h2 className="text-white mb-1">{language === 'vi' ? 'Câu Chuyện Của Chúng Tôi' : 'Our Story'}</h2>
            <div className="text-sm text-white/80">{language === 'vi' ? 'Xây dựng dựa trên nghiên cứu thực tế' : 'Built on real research'}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Origin Story (Q22) */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-[#2563eb]" />
            </div>
            <div>
              <h3>{language === 'vi' ? 'Nguồn Gốc Ý Tưởng' : 'Where It Started'}</h3>
              <p className="text-sm text-gray-500">{language === 'vi' ? 'Từ trải nghiệm thực tế' : 'From real experiences'}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-gray-700 leading-relaxed">
              {language === 'vi' 
                ? 'Mate & Match ra đời từ những trải nghiệm thất bại trong các dự án nhóm mà chúng tôi đã trải qua. Chúng tôi nhận ra rằng việc tìm đồng đội đáng tin cậy không nên dựa vào may mắn - đó là một vấn đề hệ thống cần giải pháp có cấu trúc.'
                : 'Mate & Match was born from repeated failed group project experiences. We realized that finding reliable teammates shouldn\'t depend on luck - it\'s a systematic problem that needs a structured solution.'
              }
            </p>
          </div>
        </div>

        {/* Survey Data (Q1) */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3>{language === 'vi' ? 'Nghiên Cứu & Khảo Sát' : 'Research & Validation'}</h3>
              <p className="text-sm text-gray-500">{language === 'vi' ? '40+ sinh viên được khảo sát' : '40+ students surveyed'}</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-3xl mb-2">40+</div>
                <div className="text-sm text-gray-600">
                  {language === 'vi' ? 'Sinh Viên Khảo Sát' : 'Students Surveyed'}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-3xl mb-2">13</div>
                <div className="text-sm text-gray-600">
                  {language === 'vi' ? 'Trường Đại Học' : 'Universities'}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-3xl mb-2">85%</div>
                <div className="text-sm text-gray-600">
                  {language === 'vi' ? 'Gặp Vấn Đề Tìm Team' : 'Face Team Issues'}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-3xl mb-2">92%</div>
                <div className="text-sm text-gray-600">
                  {language === 'vi' ? 'Muốn Giải Pháp' : 'Want Solution'}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <div className="text-sm mb-2">{language === 'vi' ? 'Vấn Đề Chính Được Báo Cáo:' : 'Top Issues Reported:'}</div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    {language === 'vi' 
                      ? 'Không thể đánh giá kỹ năng trước khi hợp tác (78%)'
                      : 'Unable to assess skills before collaboration (78%)'
                    }
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    {language === 'vi' 
                      ? 'Thành viên nhóm biến mất (ghosting) (71%)'
                      : 'Team members ghosting projects (71%)'
                    }
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    {language === 'vi' 
                      ? 'Không khớp về mục tiêu và cam kết (69%)'
                      : 'Mismatched goals and commitment (69%)'
                    }
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    {language === 'vi' 
                      ? 'Lịch làm việc không tương thích (64%)'
                      : 'Incompatible schedules (64%)'
                    }
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Problem (Q21) */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3>{language === 'vi' ? 'Vấn Đề Cốt Lõi' : 'The Core Problem'}</h3>
              <p className="text-sm text-gray-500">{language === 'vi' ? 'Điểm đau thực sự' : 'The real pain point'}</p>
            </div>
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5">
            <p className="text-gray-800 leading-relaxed">
              {language === 'vi' 
                ? 'Sinh viên không thể đánh giá đáng tin cậy về kỹ năng, cam kết và lịch trống trước khi hình thành nhóm - dẫn đến rủi ro, stress và ảnh hưởng điểm số.'
                : 'Students cannot reliably assess skills, commitment, and availability before forming a team - leading to risk, stress, and grade impact.'
              }
            </p>
          </div>
        </div>

        {/* Why Now (Q40) */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3>{language === 'vi' ? 'Tại Sao Bây Giờ?' : 'Why Now?'}</h3>
              <p className="text-sm text-gray-500">{language === 'vi' ? 'Thời điểm hoàn hảo' : 'Perfect timing'}</p>
            </div>
          </div>
          <div className="bg-green-50 rounded-2xl p-5 space-y-3">
            <p className="text-gray-700 leading-relaxed">
              {language === 'vi' 
                ? 'Sinh viên ngày càng phụ thuộc vào hợp tác nhóm, nhưng các công cụ hiện có vẫn chưa phát triển vượt ra ngoài mạng xã hội.'
                : 'Students increasingly rely on peer collaboration, but tools haven\'t evolved beyond social media.'
              }
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  {language === 'vi' 
                    ? 'Dự án nhóm chiếm 60-80% điểm số'
                    : 'Group projects account for 60-80% of grades'
                  }
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  {language === 'vi' 
                    ? 'Học online tạo ra khoảng cách, khó kết nối'
                    : 'Online learning creates distance, harder connections'
                  }
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  {language === 'vi' 
                    ? 'Gen Z tin tưởng peer reviews hơn CV'
                    : 'Gen Z trusts peer reviews more than CVs'
                  }
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Value Proposition (Q43) */}
        <div className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] rounded-2xl p-6 text-white">
          <h3 className="text-white mb-3">{language === 'vi' ? 'Giá Trị Của Chúng Tôi' : 'Our Value Proposition'}</h3>
          <p className="text-lg leading-relaxed text-white">
            {language === 'vi' 
              ? 'Chúng tôi giúp sinh viên tạo nhóm đáng tin cậy dựa trên kỹ năng, mục tiêu và lịch trống - không phải may mắn.'
              : 'We help students form reliable teams based on skills, goals, and availability - not luck.'
            }
          </p>
        </div>

        {/* Footer */}
        <div className="text-center pt-4 pb-8">
          <p className="text-sm text-gray-500">
            {language === 'vi' 
              ? 'Được xây dựng bởi sinh viên, cho sinh viên 🎓'
              : 'Built by students, for students 🎓'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
