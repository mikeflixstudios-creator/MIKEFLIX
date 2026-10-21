export type Message = {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
};

export type Chat = {
  id: string;
  name: string;
  color: string;
  online: boolean;
  unread: number;
  lastSeen: string;
  lastMessage: string;
  messages: Message[];
};

export const chats: Chat[] = [
  {
    id: 'maya',
    name: 'Maya',
    color: '#22c55e',
    online: true,
    unread: 2,
    lastSeen: '2m ago',
    lastMessage: 'Are we still meeting at 7?',
    messages: [
      { id: '1', sender: 'them', text: 'Hey! Are we still meeting at 7?', time: '9:12 AM' },
      { id: '2', sender: 'me', text: 'Yes! I will be there in 10 minutes.', time: '9:13 AM' },
      { id: '3', sender: 'them', text: 'Perfect. See you soon!', time: '9:14 AM' },
    ],
  },
  {
    id: 'nina',
    name: 'Nina',
    color: '#8b5cf6',
    online: false,
    unread: 0,
    lastSeen: '11:45 AM',
    lastMessage: 'I uploaded the design draft for review.',
    messages: [
      { id: '4', sender: 'them', text: 'I uploaded the design draft for review.', time: '11:45 AM' },
      { id: '5', sender: 'me', text: 'Nice! I will check it out after lunch.', time: '11:48 AM' },
    ],
  },
  {
    id: 'marcus',
    name: 'Marcus',
    color: '#f97316',
    online: true,
    unread: 5,
    lastSeen: 'now',
    lastMessage: 'The launch plan looks solid. Good work!',
    messages: [
      { id: '6', sender: 'them', text: 'The launch plan looks solid. Good work!', time: 'now' },
      { id: '7', sender: 'me', text: 'Thanks! I am finalizing the assets today.', time: 'now' },
    ],
  },
  {
    id: 'family',
    name: 'Family Group',
    color: '#06b6d4',
    online: true,
    unread: 6,
    lastSeen: 'just now',
    lastMessage: 'Mom: Dinner is ready, everyone is welcome.',
    messages: [
      { id: '8', sender: 'them', text: 'Mom: Dinner is ready, everyone is welcome.', time: '6:08 PM' },
      { id: '9', sender: 'me', text: 'On my way!', time: '6:09 PM' },
    ],
  },
  {
    id: 'team',
    name: 'Team Studio',
    color: '#ef4444',
    online: false,
    unread: 0,
    lastSeen: 'yesterday',
    lastMessage: 'The prototype is ready for demo.',
    messages: [
      { id: '10', sender: 'them', text: 'The prototype is ready for demo.', time: 'Yesterday' },
      { id: '11', sender: 'me', text: 'Great, see you tomorrow.', time: 'Yesterday' },
    ],
  },
];
