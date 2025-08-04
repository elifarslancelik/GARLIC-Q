import React from 'react';
import Button from '../../common/Button';

const CodeEditor = ({
  code,
  setCode,
  language,
  setLanguage,
  isGenerating,
  onGenerate,
  onCopy,
  onClear,
  onTranslate,
  copySuccess,
  languages
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-light text-white">
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
        </div>
      </div>

      <div className="flex-1 relative">
        <textarea
          ref={(el) => {
            if (el) {
              el.style.height = 'auto';
              el.style.height = el.scrollHeight + 'px';
            }
          }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code or description here..."
          className="w-full h-full bg-black/40 border border-white/20 rounded-lg p-4 text-white placeholder-white/40 focus:outline-none focus:border-orange-500 resize-none font-mono text-sm"
          style={{ minHeight: '300px' }}
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex space-x-2">
          <Button
            onClick={onGenerate}
            disabled={isGenerating || !code.trim()}
            variant="primary"
            size="sm"
          >
            {isGenerating ? 'Generating...' : 'Generate Code'}
          </Button>
          
          <Button
            onClick={onClear}
            variant="outline"
            size="sm"
          >
            Clear
          </Button>
          
          {onTranslate && (
            <Button
              onClick={onTranslate}
              variant="secondary"
              size="sm"
            >
              Translate
            </Button>
          )}
        </div>
        
        <Button
          onClick={() => onCopy(code)}
          variant="secondary"
          size="sm"
        >
          {copySuccess ? 'Copied!' : 'Copy'}
        </Button>
      </div>
    </div>
  );
};

export default CodeEditor; 