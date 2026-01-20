import type { Metadata } from 'next';
import './globals.css';
import ChatWidget from './components/ChatWidget';
import { ChatProvider } from './context/ChatContext';
import { LanguageProvider } from './context/LanguageContext';

export const metadata: Metadata = {
  title: 'AI Insider | AI Automation & Voice Agent Studio',
  description: 'We build AI systems that think, speak and act — for your business. Based in Switzerland, working globally.',
  keywords: 'AI automation, voice agents, AI studio, custom AI, workflow automation, Switzerland',
  verification: {
    google: 'FssjOblx7nbHTbP51suqX3HfaMfuP20-RqLJMYnw6sc',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          <ChatProvider>
            {children}
            <ChatWidget />
          </ChatProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

