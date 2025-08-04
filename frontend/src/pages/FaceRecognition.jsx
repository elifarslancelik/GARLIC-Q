import React, { useState, useRef, useEffect } from 'react';

const FaceRecognition = ({ onClose, onSuccess }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState('Ready to scan');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        track.enabled = false;
      });
      streamRef.current = null;
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', 0.8);
    });
  };

  const attemptLogin = async (imageBlob) => {
    const formData = new FormData();
    formData.append('file', imageBlob, 'face.jpg');

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/login', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setStatus('Login successful!');
        onSuccess({ type: 'login', data });
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }
    } catch (err) {
      throw err;
    }
  };

  const attemptSignup = async (imageBlob) => {
    const formData = new FormData();
    formData.append('file', imageBlob, 'face.jpg');

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/signup', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setStatus('Signup successful!');
        onSuccess({ type: 'signup', data });
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Signup failed');
      }
    } catch (err) {
      throw err;
    }
  };

  const handleScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsScanning(true);
    setIsLoading(true);
    setError('');
    setStatus('Scanning...');

    try {
      const imageBlob = await captureImage();
      
      // First try to login
      setStatus('Attempting login...');
      try {
        await attemptLogin(imageBlob);
        return;
      } catch (loginError) {
        // If login fails, try signup
        setStatus('Login failed, attempting signup...');
        try {
          await attemptSignup(imageBlob);
        } catch (signupError) {
          setError(signupError.message);
          setStatus('Authentication failed');
        }
      }
    } catch (err) {
      setError('Failed to capture image');
      setStatus('Scan failed');
    } finally {
      setIsLoading(false);
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-black/40 backdrop-blur-[2px] backdrop-saturate-[180%] border border-white/20 rounded-[3rem] shadow-[0_8px_32px_rgba(31,38,135,0.2),inset_0_4px_20px_rgba(255,255,255,0.3)] p-8 max-w-2xl w-full mx-4">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-light text-white tracking-wide mb-2">
            Face Recognition
          </h2>
          <p className="text-white/80 text-sm">
            Position your face in the frame and click scan
          </p>
        </div>

        {/* Camera Feed */}
        <div className="relative mb-6">
          <div className="relative rounded-2xl overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-64 object-cover"
            />
            <canvas
              ref={canvasRef}
              className="hidden"
            />
            
            {/* Scanning overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>{status}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status and Error */}
        <div className="text-center mb-6">
          {error && (
            <div className="text-red-400 text-sm mb-2">
              {error}
            </div>
          )}
          <div className="text-white/80 text-sm">
            {status}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleScan}
            disabled={isLoading}
            className="relative px-8 py-3 bg-black/40 backdrop-blur-[2px] backdrop-saturate-[180%] border border-white/20 rounded-2xl font-light tracking-wide text-white shadow-[0_8px_32px_rgba(31,38,135,0.2),inset_0_4px_20px_rgba(255,255,255,0.3)] hover:bg-white/10 transition-all duration-150 hover:scale-105 hover:shadow-lg active:scale-95 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:rounded-2xl before:backdrop-blur-[1px] before:shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] before:opacity-60 before:z-[-1] before:blur-[1px] before:drop-shadow-[10px_4px_6px_black] before:brightness-[115%] disabled:opacity-50 disabled:cursor-not-allowed" 
            style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            {isLoading ? 'Processing...' : 'Scan Face'}
          </button>
          
          <button
            onClick={onClose}
            disabled={isLoading}
            className="relative px-8 py-3 bg-black/40 backdrop-blur-[2px] backdrop-saturate-[180%] border border-white/20 rounded-2xl font-light tracking-wide text-white shadow-[0_8px_32px_rgba(31,38,135,0.2),inset_0_4px_20px_rgba(255,255,255,0.3)] hover:bg-white/10 transition-all duration-150 hover:scale-105 hover:shadow-lg active:scale-95 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:rounded-2xl before:backdrop-blur-[1px] before:shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] before:opacity-60 before:z-[-1] before:blur-[1px] before:drop-shadow-[10px_4px_6px_black] before:brightness-[115%] disabled:opacity-50 disabled:cursor-not-allowed" 
            style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition; 