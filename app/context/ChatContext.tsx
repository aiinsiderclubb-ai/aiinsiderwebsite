'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Industry } from '@/app/lib/chatPrompts';

interface ChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  openWithIndustry: (industry: Industry) => void;
  pendingIndustry: Industry | null;
  clearPendingIndustry: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingIndustry, setPendingIndustry] = useState<Industry | null>(null);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const openWithIndustry = useCallback((industry: Industry) => {
    setPendingIndustry(industry);
    setIsOpen(true);
  }, []);

  const clearPendingIndustry = useCallback(() => {
    setPendingIndustry(null);
  }, []);

  return (
    <ChatContext.Provider value={{
      isOpen,
      openChat,
      closeChat,
      toggleChat,
      openWithIndustry,
      pendingIndustry,
      clearPendingIndustry,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}

