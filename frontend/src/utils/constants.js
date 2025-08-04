export const LANGUAGES = [
  { value: 'python', label: 'Python', icon: '🐍' },
  { value: 'javascript', label: 'JavaScript', icon: '🟨' },
  { value: 'java', label: 'Java', icon: '☕' },
  { value: 'cpp', label: 'C++', icon: '⚡' },
  { value: 'html', label: 'HTML', icon: '🌐' },
  { value: 'css', label: 'CSS', icon: '🎨' },
  { value: 'go', label: 'Go', icon: '🐹' },
  { value: 'rust', label: 'Rust', icon: '🦀' },
  { value: 'php', label: 'PHP', icon: '🐘' },
  { value: 'ruby', label: 'Ruby', icon: '💎' },
  { value: 'swift', label: 'Swift', icon: '🍎' },
  { value: 'kotlin', label: 'Kotlin', icon: '🔷' },
  { value: 'typescript', label: 'TypeScript', icon: '🔵' },
  { value: 'csharp', label: 'C#', icon: '💜' }
];

export const EVENT_TYPES = [
  { value: 'meeting', label: 'Meeting', icon: '🤝', color: 'from-blue-600 to-blue-700' },
  { value: 'task', label: 'Task', icon: '📋', color: 'from-green-600 to-green-700' },
  { value: 'reminder', label: 'Reminder', icon: '⏰', color: 'from-orange-600 to-orange-700' },
  { value: 'deadline', label: 'Deadline', icon: '🚨', color: 'from-red-600 to-red-700' },
  { value: 'personal', label: 'Personal', icon: '👤', color: 'from-purple-600 to-purple-700' }
];

export const HUB_APPS = [
  {
    id: 1,
    name: 'Garlic-Qlove',
    icon: '💬',
    description: 'Secure messaging platform',
    color: 'from-blue-600 to-blue-700'
  },
  {
    id: 2,
    name: 'GQ-Files',
    icon: '📁',
    description: 'Cloud storage & sharing',
    color: 'from-green-600 to-green-700'
  },
  {
    id: 3,
    name: 'GQ-Calendar',
    icon: '📅',
    description: 'Schedule & events',
    color: 'from-purple-600 to-purple-700'
  },
  {
    id: 4,
    name: 'GQ-Notes',
    icon: '📝',
    description: 'Personal notes & docs generation',
    color: 'from-yellow-600 to-yellow-700'
  },
  {
    id: 5,
    name: 'Garlic-QGen',
    icon: '🖼️',
    description: 'Photo & video generation',
    color: 'from-pink-600 to-pink-700'
  },
  {
    id: 6,
    name: 'Recipes-GQ',
    icon: '💻',
    description: 'Code generation & translation',
    color: 'from-orange-600 to-orange-700'
  },
  {
    id: 7,
    name: 'Settings',
    icon: '⚙️',
    description: 'Account & preferences',
    color: 'from-gray-600 to-gray-700'
  }
];

export const ROUTES = {
  LANDING: '/',
  SPACE: '/space',
  HUB: '/hub',
  RECIPES_GQ: '/recipes-gq',
  CALENDAR_GQ: '/calendar-gq',
  FACE_RECOGNITION: '/face-recognition',
  CODE_TRANSLATOR: '/code-translator'
}; 