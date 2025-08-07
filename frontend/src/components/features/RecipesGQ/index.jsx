import React, { useState, useRef, useEffect } from 'react';
import CodeTranslator from '../../../pages/CodeTranslator';

const RecipesGQ = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showTranslator, setShowTranslator] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [languages, setLanguages] = useState([
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
  ]);
  const editorRef = useRef(null);

  // Fetch supported languages from backend
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('/api/v1/code/languages');
        if (response.ok) {
          const data = await response.json();
          setLanguages(data.languages);
        }
      } catch (error) {
        console.error('Failed to fetch languages:', error);
        // Keep default languages if fetch fails
      }
    };

    fetchLanguages();
  }, []);

  const handleCodeGeneration = async () => {
    if (!code.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/v1/code/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: code,
          language: language,
          max_tokens: 512,
          temperature: 0.3
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCode(data.response || 'Code generation completed');
      } else {
        setCode('Error: Could not generate code');
      }
    } catch (error) {
      setCode('Error: Connection failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const clearCode = () => {
    setCode('');
  };

  const handleTranslateToEditor = (translatedCode) => {
    setCode(translatedCode);
    setShowTranslator(false);
  };

  const handleChatMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call Ollama API for real AI response
      const response = await fetch('/api/v1/chat/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
          max_tokens: 500,
          temperature: 0.7
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.response || 'Sorry, I could not generate a response.',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: 'Sorry, there was an error connecting to the AI service.',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, there was an error connecting to the AI service.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleCodeGeneration();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Depth layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-black/40 to-gray-900/30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-gray-800/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-gray-900/30"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="relative group perspective-1000">
          {/* Card glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 rounded-[3rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          
          {/* Main glassmorphism card */}
          <div className="relative bg-black/40 backdrop-blur-[2px] backdrop-saturate-[180%] border border-white/20 rounded-[3rem] shadow-[0_8px_32px_rgba(31,38,135,0.2),inset_0_4px_20px_rgba(255,255,255,0.3)] p-6 w-[95vw] min-h-[90vh] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:rounded-[3rem] before:backdrop-blur-[1px] before:shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] before:opacity-60 before:z-[-1] before:blur-[1px] before:drop-shadow-[10px_4px_6px_black] before:brightness-[115%]">
            
            {/* Header */}
            <div className="text-center space-y-4 relative z-10 mb-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">💻</span>
                </div>
                <div>
                  <h1 className="text-2xl font-light text-white tracking-wide" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    Recipes-GQ
                  </h1>
                  <p className="text-white/60 text-sm font-light" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    AI-Powered Code Editor
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content with Sidebar */}
            <div className="flex relative z-10 min-h-[80vh]">
              {/* Main Code Editor Area */}
              <div className="transition-all duration-300 flex-1">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light text-white" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                      Code Editor
                    </h3>
                    <div className="flex items-center space-x-2">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-black/40 border border-white/20 rounded-lg px-3 py-1 text-white text-sm"
                      >
                        {languages.map(lang => (
                          <option key={lang.value} value={lang.value}>
                            {lang.icon} {lang.label}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleCodeGeneration}
                        disabled={isGenerating}
                        className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg text-white text-sm font-light hover:from-orange-700 hover:to-orange-800 transition-all duration-200 disabled:opacity-50"
                      >
                        {isGenerating ? 'Generating...' : 'Generate Code'}
                      </button>
                      <button
                        onClick={() => setShowTranslator(true)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white text-sm font-light hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                        title="Translate Code"
                      >
                        🔄 Translate
                      </button>
                      <button
                        onClick={clearCode}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white text-sm font-light hover:from-red-700 hover:to-red-800 transition-all duration-200"
                        title="Clear Code"
                      >
                        🗑️ Clear
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative flex-1 min-h-0">
                    <textarea
                      ref={editorRef}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`// Start coding in ${language}...\n// Press Ctrl+Enter to generate code`}
                      className="w-full h-full min-h-[400px] max-h-[600px] bg-black/60 border border-white/20 rounded-xl p-4 text-white font-mono text-sm resize-none focus:outline-none focus:border-orange-500"
                      style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
                    />
                    {code && (
                      <button
                        onClick={() => copyToClipboard(code)}
                        className="absolute top-2 right-2 p-2 bg-black/40 rounded-lg text-white/60 hover:text-white hover:bg-black/60 transition-all duration-200"
                        title="Copy code"
                      >
                        📋
                      </button>
                    )}
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between text-xs text-white/40">
                    <span>Press Ctrl+Enter to generate code</span>
                    {code && (
                      <span>{code.split('\n').length} lines, {code.length} characters</span>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Assistant Sidebar */}
              <div className={`transition-all duration-300 ${showChat ? 'w-80 flex-shrink-0 ml-4' : 'w-0 overflow-hidden'}`}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light text-white" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                      AI Assistant
                    </h3>
                    <button
                      onClick={() => setShowChat(false)}
                      className="p-2 bg-black/20 rounded-lg text-white/60 hover:text-white hover:bg-black/40 transition-all duration-200"
                      title="Hide chat"
                    >
                      ✕
                    </button>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-white/40 text-sm py-8">
                        Start a conversation with the AI assistant...
                      </div>
                    ) : (
                      <>
                        {messages.map(message => (
                          <div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-full px-4 py-2 rounded-xl relative group ${
                                message.role === 'user'
                                  ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white'
                                  : 'bg-white/10 text-white'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-60 mt-1">{message.timestamp}</p>
                              {message.role === 'assistant' && (
                                <button
                                  onClick={() => copyToClipboard(message.content)}
                                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 bg-black/20 rounded text-xs hover:bg-black/40"
                                >
                                  📋
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        {/* Typing Indicator */}
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-white/10 text-white px-4 py-2 rounded-xl">
                              <div className="flex items-center space-x-2">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="text-xs text-white/60">AI is typing...</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  {/* Input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleChatMessage()}
                      placeholder={isTyping ? "AI is typing..." : "Ask the AI assistant..."}
                      disabled={isTyping}
                      className="flex-1 bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      onClick={handleChatMessage}
                      disabled={isTyping || !inputMessage.trim()}
                      className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg text-white text-sm font-light hover:from-orange-700 hover:to-orange-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isTyping ? 'AI Typing...' : 'Send'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Show Chat Button (when hidden) */}
            {!showChat && (
              <div className="absolute top-6 right-6 z-20">
                <button
                  onClick={() => setShowChat(true)}
                  className="p-3 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full text-white shadow-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 hover:scale-110"
                  title="Show AI Assistant"
                >
                  💬
                </button>
              </div>
            )}

            {/* Code Translator Modal */}
            {showTranslator && (
              <CodeTranslator
                onClose={() => setShowTranslator(false)}
                onTranslate={handleTranslateToEditor}
                editorCode={code}
                editorLanguage={language}
              />
            )}

            {/* Navigation buttons */}
            <div className="flex justify-center pt-6 relative z-10">
              <button
                onClick={() => window.history.back()}
                className="relative px-8 py-3 bg-black/40 backdrop-blur-[2px] backdrop-saturate-[180%] border border-white/20 rounded-2xl font-light tracking-wide text-white shadow-[0_8px_32px_rgba(31,38,135,0.2),inset_0_4px_20px_rgba(255,255,255,0.3)] hover:bg-white/10 transition-all duration-150 hover:scale-105 hover:shadow-lg active:scale-95 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:rounded-2xl before:backdrop-blur-[1px] before:shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] before:opacity-60 before:z-[-1] before:blur-[1px] before:drop-shadow-[10px_4px_6px_black] before:brightness-[115%]" 
                style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Back to Hub
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

export default RecipesGQ; 