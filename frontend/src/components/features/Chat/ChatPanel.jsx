import React from 'react';
import Button from '../../common/Button';

const ChatPanel = ({
  messages,
  inputMessage,
  setInputMessage,
  onSendMessage,
  isTyping,
  onToggleChat
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-light text-white">
          AI Chat Assistant
        </h3>
        <Button
          onClick={onToggleChat}
          variant="outline"
          size="sm"
        >
          Hide Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white'
                  : 'bg-black/40 text-white border border-white/20'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-60 mt-1">{message.timestamp}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-black/40 text-white border border-white/20 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          placeholder="Ask me anything..."
          className="flex-1 bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-orange-500"
        />
        <Button
          onClick={onSendMessage}
          disabled={!inputMessage.trim() || isTyping}
          variant="primary"
          size="sm"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPanel; 