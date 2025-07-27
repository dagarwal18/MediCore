import { Bot, User, Clock, CheckCircle2 } from 'lucide-react';

const MessageList = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start space-x-3 ${
            message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            message.role === 'user'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
              : 'bg-gradient-to-r from-green-500 to-emerald-500'
          }`}>
            {message.role === 'user' ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-white" />
            )}
          </div>

          <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
            <div className={`inline-block p-4 rounded-2xl ${
              message.role === 'user'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'bg-white/80 backdrop-blur-sm border border-white/20 text-slate-800'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
            </div>

            <div className={`flex items-center mt-2 text-xs text-slate-500 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}>
              <Clock className="w-3 h-3 mr-1" />
              <span>Just now</span>
              {message.role === 'user' && <CheckCircle2 className="w-3 h-3 ml-2 text-blue-500" />}
            </div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;