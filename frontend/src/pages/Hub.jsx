import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hub = () => {
  const navigate = useNavigate();
  const apps = [
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Depth layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-black/40 to-gray-900/30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-gray-800/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-gray-900/30"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="relative group perspective-1000">
          {/* Card glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 rounded-[3rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          
          {/* Main glassmorphism card */}
          <div className="relative bg-black/40 backdrop-blur-[2px] backdrop-saturate-[180%] border border-white/20 rounded-[3rem] shadow-[0_8px_32px_rgba(31,38,135,0.2),inset_0_4px_20px_rgba(255,255,255,0.3)] p-12 max-w-7xl w-full min-h-[80vh] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:rounded-[3rem] before:backdrop-blur-[1px] before:shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] before:opacity-60 before:z-[-1] before:blur-[1px] before:drop-shadow-[10px_4px_6px_black] before:brightness-[115%]">
            
            {/* Header */}
            <div className="text-center space-y-6 relative z-10 mb-8">
              {/* Logo and title */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-3xl flex items-center justify-center shadow-lg overflow-hidden">
                    <img src="/garliq.png" alt="GARLIC-Q Logo" className="w-16 h-16 object-contain" />
                  </div>
                </div>
                <h1 className="text-3xl font-light text-white tracking-wide" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  GARLIC-Q
                </h1>
                <p className="text-white/80 text-lg font-light" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Hub
                </p>
              </div>
              
              {/* Welcome message */}
              <div className="space-y-2">
                <h2 className="text-xl font-light text-white tracking-wide" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Application Hub
                </h2>
                <p className="text-white/60 text-sm font-light max-w-md mx-auto" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Access all your secure applications from one place
                </p>
              </div>
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 relative z-10 mb-8">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className="group cursor-pointer"
                  onClick={() => {
                    if (app.name === 'Recipes-GQ') {
                                                                      navigate('/recipes-gq');
                      } else if (app.name === 'GQ-Calendar') {
                        navigate('/calendar-gq');
                    }
                  }}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <div className="text-center space-y-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <span className="text-2xl">{app.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-light text-lg mb-1" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                          {app.name}
                        </h3>
                        <p className="text-white/60 text-sm font-light" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                          {app.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative z-10 mb-8">
              <h3 className="text-lg font-light text-white mb-4" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <span className="text-sm">💬</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-light text-sm">Garlic-Qlove accessed</p>
                    <p className="text-white/60 text-xs font-light">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                    <span className="text-sm">📁</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-light text-sm">GQ-Files accessed</p>
                    <p className="text-white/60 text-xs font-light">5 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center space-x-4 relative z-10">
              <button
                onClick={() => navigate('/space')}
                className="relative px-8 py-3 bg-black/40 backdrop-blur-[2px] backdrop-saturate-[180%] border border-white/20 rounded-2xl font-light tracking-wide text-white shadow-[0_8px_32px_rgba(31,38,135,0.2),inset_0_4px_20px_rgba(255,255,255,0.3)] hover:bg-white/10 transition-all duration-150 hover:scale-105 hover:shadow-lg active:scale-95 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:rounded-2xl before:backdrop-blur-[1px] before:shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] before:opacity-60 before:z-[-1] before:blur-[1px] before:drop-shadow-[10px_4px_6px_black] before:brightness-[115%]" 
                style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Back to Space
              </button>
            </div>
            
            {/* Floating elements for extra effect */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gray-800/20 rounded-full blur-sm"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-black/30 rounded-full blur-sm"></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-white/10 rounded-full blur-sm"></div>
            <div className="absolute bottom-1/4 -left-6 w-3 h-3 bg-gray-600/20 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hub; 