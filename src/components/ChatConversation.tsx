import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Conversation, Message } from '../types/user';
import { Flame } from 'lucide-react';

interface ChatConversationProps {
  conversation: Conversation;
  onBack: () => void;
  currentUserId: string;
}

export function ChatConversation({ conversation, onBack, currentUserId }: ChatConversationProps) {
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        text: newMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage('');

      // Simulate response after 1 second
      setTimeout(() => {
        const responses = [
          'Sounds good! When should we meet?',
          'Great idea! I can help with that.',
          'Sure, let me check my schedule.',
          'Perfect! Looking forward to working together.',
          'I agree! Let\'s do it.',
        ];
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: conversation.userId,
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3 shadow-sm">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <img
              src={conversation.user.photo}
              alt={conversation.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {conversation.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22c55e] border-2 border-white rounded-full" />
            )}
          </div>
          <div>
            <h3>{conversation.user.name}</h3>
            <p className="text-xs text-gray-500">
              {conversation.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Chat Streak */}
        {conversation.chatStreak && conversation.chatStreak > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 bg-gradient-to-r from-[#f97316] to-[#ef4444] px-3 py-2 rounded-full mr-2"
          >
            <Flame className="w-4 h-4 text-white fill-white" />
            <span className="text-white text-sm font-medium">{conversation.chatStreak}</span>
          </motion.div>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <MoreVertical className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.map((message, index) => {
          const isOwn = message.senderId === currentUserId;
          const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;

          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {!isOwn && (
                <div className="w-8 h-8 flex-shrink-0">
                  {showAvatar && (
                    <img
                      src={conversation.user.photo}
                      alt={conversation.user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>
              )}

              <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[75%]`}>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    isOwn
                      ? 'bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white'
                      : 'bg-white text-gray-900 shadow-sm'
                  }`}
                >
                  <p className="break-words">{message.text}</p>
                </div>
                <span className="text-xs text-gray-400 mt-1 px-2">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
