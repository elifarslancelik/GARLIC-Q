import React, { useState, useEffect } from 'react';

const CodeTranslator = ({ onClose, onTranslate, editorCode = '', editorLanguage = 'python' }) => {
  const [sourceCode, setSourceCode] = useState(editorCode);
  const [sourceLanguage, setSourceLanguage] = useState(editorLanguage);
  const [targetLanguage, setTargetLanguage] = useState('javascript');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedCode, setTranslatedCode] = useState('');
  const [error, setError] = useState('');
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

  const handleTranslate = async () => {
    if (!sourceCode.trim()) {
      setError('Please enter source code to translate');
      return;
    }

    if (sourceLanguage === targetLanguage) {
      setError('Source and target languages must be different');
      return;
    }

    setIsTranslating(true);
    setError('');
    setTranslatedCode('');

    try {
      const response = await fetch('/api/v1/code/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_code: sourceCode,
          source_language: sourceLanguage,
          target_language: targetLanguage
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTranslatedCode(data.translated_code || 'Translation completed');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Translation failed');
      }
    } catch (error) {
      setError('Connection failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceCode(translatedCode);
    setTranslatedCode('');
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const clearAll = () => {
    setSourceCode('');
    setTranslatedCode('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-xl">🔄</span>
            </div>
            <div>
              <h2 className="text-xl font-light text-white" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                Code Translator
              </h2>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                Translate code between programming languages
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-black/20 rounded-lg text-white/60 hover:text-white hover:bg-black/40 transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {/* Language Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm text-white/70 mb-2">Source Language</label>
            <select
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.icon} {lang.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center justify-center">
            <button
              onClick={swapLanguages}
              className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:scale-110"
              title="Swap languages"
            >
              🔄
            </button>
          </div>
          
          <div>
            <label className="block text-sm text-white/70 mb-2">Target Language</label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.icon} {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Code Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source Code */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-light text-white" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                Source Code ({sourceLanguage})
              </h3>
              <div className="flex items-center space-x-2">
                {editorCode && (
                  <button
                    onClick={() => setSourceCode(editorCode)}
                    className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-700 rounded text-xs text-white hover:from-green-700 hover:to-green-800 transition-all duration-200"
                    title="Load from Code Editor"
                  >
                    📝 Load from Editor
                  </button>
                )}
                <button
                  onClick={() => copyToClipboard(sourceCode)}
                  className="px-2 py-1 bg-black/20 rounded text-xs text-white/60 hover:text-white hover:bg-black/40 transition-all duration-200"
                  title="Copy source code"
                >
                  📋
                </button>
              </div>
            </div>
            <textarea
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              placeholder={`// Enter your ${sourceLanguage} code here...`}
              className="w-full h-64 bg-black/60 border border-white/20 rounded-xl p-4 text-white font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
              style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
            />
          </div>

          {/* Translated Code */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-light text-white" style={{ fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                Translated Code ({targetLanguage})
              </h3>
              {translatedCode && (
                <button
                  onClick={() => copyToClipboard(translatedCode)}
                  className="px-2 py-1 bg-black/20 rounded text-xs text-white/60 hover:text-white hover:bg-black/40 transition-all duration-200"
                  title="Copy translated code"
                >
                  📋
                </button>
              )}
            </div>
            <textarea
              value={translatedCode}
              readOnly
              placeholder="Translated code will appear here..."
              className="w-full h-64 bg-black/60 border border-white/20 rounded-xl p-4 text-white font-mono text-sm resize-none focus:outline-none"
              style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex space-x-3">
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg text-white text-sm font-light hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
            >
              Clear All
            </button>
            {onTranslate && (
              <button
                onClick={() => onTranslate(translatedCode)}
                disabled={!translatedCode}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 rounded-lg text-white text-sm font-light hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50"
              >
                Use in Editor
              </button>
            )}
          </div>
          
          <button
            onClick={handleTranslate}
            disabled={isTranslating || !sourceCode.trim()}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white text-sm font-light hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50"
          >
            {isTranslating ? 'Translating...' : 'Translate Code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeTranslator; 