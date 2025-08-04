import React from 'react';

const Loading = ({ 
  size = 'md', 
  text = 'Loading...', 
  variant = 'spinner',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const Spinner = () => (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizes[size]}`} />
  );

  const Dots = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );

  const Pulse = () => (
    <div className={`animate-pulse bg-blue-600 rounded-full ${sizes[size]}`} />
  );

  const variants = {
    spinner: Spinner,
    dots: Dots,
    pulse: Pulse
  };

  const LoadingComponent = variants[variant];

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <LoadingComponent />
      {text && (
        <p className="text-sm text-gray-600">{text}</p>
      )}
    </div>
  );
};

export default Loading; 