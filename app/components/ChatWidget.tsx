'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, X, Send, Bot, User, Sparkles, 
  ArrowRight, Loader2, Phone, MessageSquare, DollarSign 
} from 'lucide-react';
import { 
  Industry, industryLabels, industryEmojis, 
  WELCOME_MESSAGE, CONVERSION_BUTTONS, LEAD_CAPTURE_PROMPT 
} from '../lib/chatPrompts';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  buttons?: IndustryButton[] | ConversionButton[];
}

interface IndustryButton {
  id: Industry;
  label: string;
}

interface ConversionButton {
  id: string;
  label: string;
  action: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const [showConversionButtons, setShowConversionButtons] = useState(false);
  const [leadCaptureMode, setLeadCaptureMode] = useState(false);
  const [hasShownConversion, setHasShownConversion] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current && selectedIndustry) {
      inputRef.current.focus();
    }
  }, [isOpen, selectedIndustry]);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const industryButtons: IndustryButton[] = (Object.keys(industryLabels) as Industry[]).map(key => ({
        id: key,
        label: industryLabels[key],
      }));

      setMessages([{
        id: '1',
        role: 'assistant',
        content: WELCOME_MESSAGE,
        timestamp: new Date(),
        buttons: industryButtons,
      }]);
    }
  }, [isOpen, messages.length]);

  const handleIndustrySelect = async (industry: Industry) => {
    setSelectedIndustry(industry);
    
    // Add user selection message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: industryLabels[industry],
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev.map(m => ({ ...m, buttons: undefined })), userMessage]);
    setIsLoading(true);

    // Get initial response for selected industry
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: `Пользователь выбрал демо: ${industryLabels[industry]}. Начни разговор как AI-ассистент этого бизнеса. Поприветствуй и предложи помощь.` }],
          industry,
          messageCount: 0,
        }),
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setMessageCount(1);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Извини, произошла ошибка. Попробуй ещё раз.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !selectedIndustry) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const newMessageCount = messageCount + 1;
    setMessageCount(newMessageCount);

    try {
      // Build conversation history for API
      const conversationHistory = messages
        .filter(m => !m.buttons)
        .map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }));
      
      conversationHistory.push({
        role: 'user',
        content: inputValue.trim(),
      });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationHistory,
          industry: selectedIndustry,
          messageCount: newMessageCount,
        }),
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      // Show conversion after 5 user messages (only once)
      if (newMessageCount >= 5 && !hasShownConversion) {
        setTimeout(() => {
          const conversionMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content: `💡 Кстати, если тебе понравилось как работает AI-бот — мы можем создать такого же для твоего бизнеса.

Хочешь узнать подробнее?`,
            timestamp: new Date(),
            buttons: CONVERSION_BUTTONS as ConversionButton[],
          };
          setMessages(prev => [...prev, conversionMessage]);
          setShowConversionButtons(true);
          setHasShownConversion(true);
        }, 1500);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Извини, произошла ошибка связи. Попробуй ещё раз.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConversionAction = (action: string) => {
    setShowConversionButtons(false);
    setLeadCaptureMode(true);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: CONVERSION_BUTTONS.find(b => b.action === action)?.label || action,
      timestamp: new Date(),
    };
    
    const leadMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: LEAD_CAPTURE_PROMPT,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev.map(m => ({ ...m, buttons: undefined })), userMessage, leadMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setSelectedIndustry(null);
    setMessageCount(0);
    setShowConversionButtons(false);
    setLeadCaptureMode(false);
    setHasShownConversion(false);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl"
            style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)' }}
          >
            <MessageCircle className="w-7 h-7" />
            {/* Pulse animation */}
            <span className="absolute w-full h-full rounded-full bg-white/30 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[80vh] flex flex-col rounded-3xl overflow-hidden border border-white/20"
            style={{ 
              background: 'rgba(10, 10, 15, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-white">AI Insider Bot</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Online</span>
                    {selectedIndustry && (
                      <span className="ml-1">• {industryEmojis[selectedIndustry]}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedIndustry && (
                  <button
                    onClick={resetChat}
                    className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded"
                  >
                    Сменить нишу
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                      message.role === 'assistant' 
                        ? 'bg-white/10' 
                        : 'bg-white'
                    }`}>
                      {message.role === 'assistant' ? (
                        <Bot className="w-4 h-4 text-white" />
                      ) : (
                        <User className="w-4 h-4 text-black" />
                      )}
                    </div>
                    
                    {/* Message bubble */}
                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.role === 'assistant'
                        ? 'bg-white/5 border border-white/10'
                        : 'bg-white text-black'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </motion.div>

                  {/* Buttons */}
                  {message.buttons && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-3 ml-11 flex flex-col gap-2"
                    >
                      {message.buttons.map((button) => (
                        <button
                          key={button.id}
                          onClick={() => {
                            if ('action' in button) {
                              handleConversionAction(button.action);
                            } else {
                              handleIndustrySelect(button.id as Industry);
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                            bg-white/5 border border-white/20 text-white
                            hover:bg-white/10 hover:border-white/30 transition-all text-left"
                        >
                          {'action' in button ? (
                            <>
                              {button.action === 'demo' && <Phone className="w-4 h-4" />}
                              {button.action === 'discuss' && <MessageSquare className="w-4 h-4" />}
                              {button.action === 'pricing' && <DollarSign className="w-4 h-4" />}
                            </>
                          ) : null}
                          {button.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                      <span className="text-sm text-gray-400">Печатает...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {selectedIndustry && (
              <div className="px-4 py-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Напиши сообщение..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white 
                      placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="w-11 h-11 rounded-xl bg-white text-black flex items-center justify-center
                      disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 text-center mt-2">
                  Демо AI-бота от AI Insider • Powered by GPT-4
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

