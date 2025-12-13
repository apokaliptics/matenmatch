export interface User {
  id: string;
  name: string;
  major: string;
  university: string;
  archetype: string;
  goal: string;
  workStyle: 'Night Owl' | 'Early Bird';
  reputation: number;
  photo: string;
  verified: boolean;
  bio: string;
  bioen: string;
  badges: string[];
  skills: {
    Leadership: number;
    'Slide Design': number;
    Research: number;
    Presentation: number;
    'Content Writing': number;
    'Time Management': number;
  };
  studentId?: string;
  email?: string;
  gender?: 'male' | 'female';
}

export interface CurrentUserProfile extends User {
  studentId: string;
  email: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  userId: string;
  user: {
    name: string;
    photo: string;
  };
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
  chatStreak?: number; // Consecutive days of chatting
}