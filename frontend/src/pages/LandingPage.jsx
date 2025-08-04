import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FaceRecognition from './FaceRecognition.jsx';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFaceRecognition, setShowFaceRecognition] = useState(false);

  const handleScanClick = () => {
    setShowFaceRecognition(true);
  };

  const handleFaceRecognitionClose = () => {
    setShowFaceRecognition(false);
  };

  const handleAuthSuccessLocal = (result) => {
    setShowFaceRecognition(false);
    navigate('/space');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Depth layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-black/40 to-gray-900/30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-gray-800/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-gray-900/30"></div>
      
      {/* Glassmorphism card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="relative group perspective-1000">
          {/* Card glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 rounded-[3rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          
          {/* Main glassmorphism card with flip animation */}
          <div 
            className={`relative bg-black/40 backdrop-blur-[2px] backdrop-saturate-[180%] border border-white/20 rounded-[3rem] shadow-[0_8px_32px_rgba(31,38,135,0.2),inset_0_4px_20px_rgba(255,255,255,0.3)] p-12 max-w-md w-full h-96 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:rounded-[3rem] before:backdrop-blur-[1px] before:shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] before:opacity-60 before:z-[-1] before:blur-[1px] before:drop-shadow-[10px_4px_6px_black] before:brightness-[115%] transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Front side of card */}
            <div className={`text-center space-y-8 relative z-10 ${isFlipped ? 'hidden' : ''}`} style={{ width: '100%', height: '100%' }}>
              {/* Logo and title */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-black rounded-3xl flex items-center justify-center shadow-lg overflow-hidden">
                    <img src="../assets/garliq.png" alt="GARLIC-Q Logo" className="w-20 h-20 object-contain" />
                  </div>
                </div>
                <h1 className="text-3xl font-light text-white tracking-wide" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  GARLIC-Q
                </h1>
                <p className="text-white/80 text-sm font-light" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Face Recognition Authentication
                </p>
              </div>
              
              {/* Main message */}
              <div className="space-y-4">
                <h2 className="text-xl font-light text-white tracking-wide" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  scan your face for signup/login
                </h2>
              </div>
              
              {/* Action buttons */}
              <div className="space-y-4 pt-4 flex justify-center">
                <button 
                  onClick={handleScanClick}
                  className="relative px-12 py-4 bg-black/40 backdrop-blur-[2px] backdrop-saturate-[180%] border border-white/20 rounded-3xl font-light tracking-wide text-white shadow-[0_8px_32px_rgba(31,38,135,0.2),inset_0_4px_20px_rgba(255,255,255,0.3)] hover:bg-white/10 transition-all duration-150 hover:scale-105 hover:shadow-lg active:scale-95 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:rounded-3xl before:backdrop-blur-[1px] before:shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] before:opacity-60 before:z-[-1] before:blur-[1px] before:drop-shadow-[10px_4px_6px_black] before:brightness-[115%]" 
                  style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Scan
                </button>
              </div>
            </div>

            {/* Back side of card */}
            <div className={`text-center space-y-8 relative z-10 ${!isFlipped ? 'hidden' : ''}`} style={{ width: '100%', height: '100%' }}>
              {/* Camera icon */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-black rounded-3xl flex items-center justify-center shadow-lg overflow-hidden">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-3xl font-light text-white tracking-wide" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Camera Active
                </h1>
                <p className="text-white/80 text-sm font-light" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Position your face in the frame
                </p>
              </div>
              
              {/* Status message */}
              <div className="space-y-4">
                <h2 className="text-xl font-light text-white tracking-wide" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Ready to scan
                </h2>
              </div>
              
              {/* Action buttons */}
              <div className="space-y-4 pt-4 flex justify-center">
                <button 
                  onClick={handleScanClick}
                  className="relative px-12 py-4 bg-black/40 backdrop-blur-[2px] backdrop-saturate-[180%] border border-white/20 rounded-3xl font-light tracking-wide text-white shadow-[0_8px_32px_rgba(31,38,135,0.2),inset_0_4px_20px_rgba(255,255,255,0.3)] hover:bg-white/10 transition-all duration-150 hover:scale-105 hover:shadow-lg active:scale-95 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:rounded-3xl before:backdrop-blur-[1px] before:shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] before:opacity-60 before:z-[-1] before:blur-[1px] before:drop-shadow-[10px_4px_6px_black] before:brightness-[115%]" 
                  style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Back
                </button>
              </div>
            </div>
            
            {/* Floating elements for extra effect */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gray-800/20 rounded-full blur-sm"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-black/30 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Face Recognition Modal */}
      {showFaceRecognition && (
        <FaceRecognition
          onClose={handleFaceRecognitionClose}
          onSuccess={handleAuthSuccessLocal}
        />
      )}


    </div>
  );
};

export default LandingPage; 