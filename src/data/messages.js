// Mock conversations for the Messages page. Each conversation has a thread
// of messages; "fromMe" tells the UI which side of the chat bubble to use.
export const conversations = [
  {
    id: 'c1',
    providerId: 'p1',
    lastMessage: 'Hi! Can you help me with a poster design?',
    time: '2m ago',
    unread: true,
    thread: [
      { id: 1, fromMe: false, text: "Hi! Can you help me with a poster design?", time: '10:02 AM' },
      { id: 2, fromMe: true, text: "Hey! Sure, what's it for?", time: '10:05 AM' },
      { id: 3, fromMe: false, text: 'A college fest event, need it by Friday.', time: '10:06 AM' },
    ],
  },
  {
    id: 'c2',
    providerId: 'p2',
    lastMessage: 'Hey, are you available this weekend?',
    time: '1h ago',
    unread: true,
    thread: [
      { id: 1, fromMe: false, text: 'Hey, are you available this weekend?', time: 'Yesterday' },
      { id: 2, fromMe: true, text: 'Yes, Saturday afternoon works for me.', time: 'Yesterday' },
    ],
  },
  {
    id: 'c3',
    providerId: 'p3',
    lastMessage: 'Your crochet order is ready for pickup.',
    time: '3h ago',
    unread: false,
    thread: [
      { id: 1, fromMe: false, text: 'Your crochet order is ready for pickup.', time: 'Mon' },
      { id: 2, fromMe: true, text: 'Awesome, I\'ll come by this evening!', time: 'Mon' },
      { id: 3, fromMe: false, text: 'Sounds good, see you then.', time: 'Mon' },
    ],
  },
  {
    id: 'c4',
    providerId: 'p4',
    lastMessage: 'Sent you the edited reel, take a look!',
    time: '1d ago',
    unread: false,
    thread: [
      { id: 1, fromMe: false, text: 'Sent you the edited reel, take a look!', time: 'Sun' },
      { id: 2, fromMe: true, text: 'This looks great, thank you!', time: 'Sun' },
    ],
  },
  {
    id: 'c5',
    providerId: 'p5',
    lastMessage: 'Site is live, can you check it out?',
    time: '2d ago',
    unread: false,
    thread: [
      { id: 1, fromMe: false, text: 'Site is live, can you check it out?', time: 'Sat' },
      { id: 2, fromMe: true, text: 'Checking now, looks clean!', time: 'Sat' },
    ],
  },
]

export const getConversationById = (id) => conversations.find((c) => c.id === id)
