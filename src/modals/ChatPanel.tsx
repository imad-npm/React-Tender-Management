import React, { useState } from 'react';
import { X, Send, Paperclip, Smile } from 'lucide-react';
import { Tender } from '../types/tender';
import { useChatStore } from '../store/chatStore';
import { ChatPanelProps } from '../types/modals';

const ChatPanel: React.FC<ChatPanelProps> = ({
  tender,
  isOpen,
  onClose,
}) => {
  const {
    chatMessages,
    sendMessage,
  } = useChatStore();

  const [newMessage, setNewMessage] = useState('');

  if (!isOpen || !tender) return null;

  const tenderMessages = chatMessages.filter(msg => msg.tenderId === tender.id);

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(tender.id, newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`fixed right-0 top-0 h-full w-96  bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-cyan-50 to-cyan-50">
        <div className="text-cyan-700">
          <h3 className="font-semibold text-lg">{tender.tenderName}</h3>
          <p className=" text-sm">{tender.referenceNumber}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-cyan-700 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100vh-150px)]">
        {tenderMessages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-gray-400" />
            </div>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          tenderMessages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <img
                src={message.userAvatar}
                alt={message.userName}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-gray-900">{message.userName}</span>
                  <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-800">
                  {message.message}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border-none outline-none text-sm"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <div className="flex items-center gap-1">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
              <Smile className="w-4 h-4" />
            </button>
            <button
              onClick={handleSend}
              className="p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
