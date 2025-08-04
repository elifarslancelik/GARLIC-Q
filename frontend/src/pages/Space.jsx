import React from 'react';
import { useNavigate } from 'react-router-dom';

const Space = () => {
  const navigate = useNavigate();
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
                    <img src="../assets/garliq.png" alt="GARLIC-Q Logo" className="w-16 h-16 object-contain" />
                  </div>
                </div>
                <h1 className="text-3xl font-light text-white tracking-wide" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  GARLIC-Q
                </h1>
                <p className="text-white/80 text-lg font-light" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Space
                </p>
              </div>
              
              {/* Welcome message */}
              <div className="space-y-2">
                <h2 className="text-xl font-light text-white tracking-wide" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Welcome to your personal space
                </h2>
                <p className="text-white/60 text-sm font-light max-w-md mx-auto" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  You have successfully authenticated with face recognition. This is your secure space.
                </p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
              {/* Left Column - User Info */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-light text-white mb-4" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    User Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/80 text-sm font-light">Status</p>
                        <p className="text-white text-sm">Authenticated</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/80 text-sm font-light">Last Login</p>
                        <p className="text-white text-sm">Just now</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-light text-white mb-4" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-white/80 text-sm font-light">Settings</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-white/80 text-sm font-light">Security</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Center Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-light text-white" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                      Dashboard
                    </h3>
                    <button
                      onClick={() => navigate('/hub')}
                      className="group cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 hover:scale-110">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-xl p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm font-light">Total Sessions</p>
                          <p className="text-white text-2xl font-light">1</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm font-light">Security Level</p>
                          <p className="text-white text-2xl font-light">High</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <h3 className="text-xl font-light text-white mb-6" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-light">Face authentication successful</p>
                        <p className="text-white/60 text-sm font-light">Just now</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-light">Session started</p>
                        <p className="text-white/60 text-sm font-light">Just now</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back button */}
            <div className="flex justify-center pt-8">
              <button
                onClick={() => navigate('/')}
                className="relative px-8 py-3 bg-black/40 backdrop-blur-[2px] backdrop-saturate-[180%] border border-white/20 rounded-2xl font-light tracking-wide text-white shadow-[0_8px_32px_rgba(31,38,135,0.2),inset_0_4px_20px_rgba(255,255,255,0.3)] hover:bg-white/10 transition-all duration-150 hover:scale-105 hover:shadow-lg active:scale-95 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:rounded-2xl before:backdrop-blur-[1px] before:shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] before:opacity-60 before:z-[-1] before:blur-[1px] before:drop-shadow-[10px_4px_6px_black] before:brightness-[115%]" 
                style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Back to Login
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

export default Space; 