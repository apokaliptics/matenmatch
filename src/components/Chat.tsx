import { Search, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { Conversation } from '../types/user';
import { ChatConversation } from './ChatConversation';
import { Flame } from 'lucide-react';

interface ChatProps {
  currentUserId: string;
}

export function Chat({ currentUserId }: ChatProps) {
  const { t } = useLanguage();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const conversations: Conversation[] = [
    {
      id: '1',
      userId: '1',
      user: {
        name: 'Nguyễn Gia Bảo',
        photo: 'https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      },
      lastMessage: 'Sounds good! Let\'s meet tomorrow',
      time: '2m',
      unread: 2,
      online: true,
      messages: [
        { id: '1', senderId: '1', text: 'Hey! Want to work on the marketing project?', timestamp: new Date(Date.now() - 3600000) },
        { id: '2', senderId: currentUserId, text: 'Sure! When are you free?', timestamp: new Date(Date.now() - 3000000) },
        { id: '3', senderId: '1', text: 'Sounds good! Let\'s meet tomorrow', timestamp: new Date(Date.now() - 120000) },
      ],
      chatStreak: 5,
    },
    {
      id: '2',
      userId: '2',
      user: {
        name: 'Trịnh Khánh Ly',
        photo: 'https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      },
      lastMessage: 'I can help with the presentation!',
      time: '1h',
      unread: 0,
      online: true,
      messages: [
        { id: '1', senderId: '2', text: 'I can help with the presentation!', timestamp: new Date(Date.now() - 3600000) },
      ],
      chatStreak: 12,
    },
    {
      id: '3',
      userId: '3',
      user: {
        name: 'Nguyễn Minh Kiệt',
        photo: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      },
      lastMessage: 'Thanks for the help yesterday',
      time: '3h',
      unread: 0,
      online: false,
      messages: [
        { id: '1', senderId: '3', text: 'Thanks for the help yesterday', timestamp: new Date(Date.now() - 10800000) },
      ],
      chatStreak: 3,
    },
  ];

  if (selectedConversation) {
    return (
      <ChatConversation
        conversation={selectedConversation}
        onBack={() => setSelectedConversation(null)}
        currentUserId={currentUserId}
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length > 0 ? (
          <div className="space-y-1">
            {conversations.map((conv, index) => (
              <motion.div
                key={conv.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ backgroundColor: '#f9fafb' }}
                onClick={() => setSelectedConversation(conv)}
                className="p-4 flex items-center gap-4 cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={conv.user.photo}
                    alt={conv.user.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#22c55e] border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="truncate">{conv.user.name}</h3>
                    <div className="flex items-center gap-2">
                      {conv.chatStreak && conv.chatStreak > 0 && (
                        <div className="flex items-center gap-1 bg-gradient-to-r from-[#f97316]/10 to-[#ef4444]/10 px-2 py-1 rounded-full">
                          <Flame className="w-3 h-3 text-[#f97316] fill-[#f97316]" />
                          <span className="text-xs text-[#f97316] font-medium">{conv.chatStreak}</span>
                        </div>
                      )}
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm truncate">
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unread > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-[#ef4444] text-white rounded-full flex items-center justify-center text-xs"
                  >
                    {conv.unread}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-gray-600 mb-2">{t('noMessages')}</h3>
            <p className="text-gray-400">{t('startMatching')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
