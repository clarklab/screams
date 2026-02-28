'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const WELCOME_MESSAGE = "Want to talk about scary movies? Ask me any question, if you dare...";
const RING_DELAY_MS = 20_000;

export function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isRinging, setIsRinging] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const ringTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const reducedMotion = useReducedMotion();

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Ring the phone after 20 seconds if chat hasn't been opened yet
  useEffect(() => {
    if (hasBeenOpened) return;

    ringTimeoutRef.current = setTimeout(() => {
      if (!hasBeenOpened) {
        setIsRinging(true);
      }
    }, RING_DELAY_MS);

    return () => {
      if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
    };
  }, [hasBeenOpened]);

  const handleOpen = useCallback(() => {
    setIsOpen((o) => {
      const next = !o;
      if (next && !hasBeenOpened) {
        setHasBeenOpened(true);
        setIsRinging(false);
      }
      return next;
    });
  }, [hasBeenOpened]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const getMessageText = (parts: (typeof messages)[number]['parts']) =>
    parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('');

  const avatarElement = (size: 'sm' | 'md' | 'lg') => {
    const sizeMap = { sm: 24, md: 40, lg: 64 };
    const px = sizeMap[size];
    const cls = size === 'sm'
      ? 'h-6 w-6 shrink-0'
      : size === 'md'
        ? 'h-10 w-10'
        : 'h-16 w-16';
    return (
      <div
        className={`${cls} overflow-hidden rounded-full`}
        style={{
          backgroundColor: '#1c1c1c',
          border: size === 'lg' ? '1px solid #333' : '2px solid #333',
        }}
      >
        <Image
          src="/apple-touch-icon.png"
          alt="Ghostface"
          width={px}
          height={px}
          className="h-full w-full object-cover"
          priority
        />
      </div>
    );
  };

  return (
    <>
      {/* Floating chat button — Ghostface mask style */}
      <motion.button
        onClick={handleOpen}
        aria-label={isOpen ? 'Hang up' : 'Answer the call from Ghostface'}
        className="chat-button-position fixed right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
        style={{
          backgroundColor: isOpen ? '#dc2626' : '#111',
          color: '#fff',
          boxShadow: isOpen
            ? '0 0 20px rgba(220, 38, 38, 0.5)'
            : isRinging
              ? '0 0 24px rgba(220, 38, 38, 0.6)'
              : '0 0 20px rgba(0, 0, 0, 0.5)',
        }}
        animate={
          isRinging && !reducedMotion
            ? {
                scale: [1, 1.15, 1, 1.1, 1],
                rotate: [0, -8, 8, -6, 4, 0],
              }
            : { scale: 1, rotate: 0 }
        }
        transition={
          isRinging
            ? { duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }
            : { type: 'spring', stiffness: 400, damping: 30 }
        }
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          /* Phone icon */
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        )}

        {/* Ringing pulse ring */}
        {isRinging && !reducedMotion && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid #dc2626' }}
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8 }}
          />
        )}
      </motion.button>

      {/* Chat panel — dark, menacing Ghostface theme */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-panel-position fixed inset-x-0 z-40 flex flex-col sm:inset-x-auto sm:right-6 sm:w-96 sm:rounded-2xl"
            style={{
              height: 'min(calc(80dvh - env(safe-area-inset-bottom, 0px)), 600px)',
              backgroundColor: '#0a0a0a',
              border: '1px solid #222',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.8), 0 0 60px rgba(220, 38, 38, 0.1)',
            }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {/* Header — Incoming call from Ghostface */}
            <div
              className="flex items-center gap-3 rounded-t-none px-4 py-3 sm:rounded-t-2xl"
              style={{
                background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)',
                borderBottom: '1px solid #222',
              }}
            >
              {avatarElement('md')}
              <div className="flex-1">
                <div className="text-sm font-bold tracking-wide" style={{ color: '#fff' }}>
                  Ghostface
                </div>
                <div className="text-xs" style={{ color: '#dc2626' }}>
                  {isLoading ? 'typing...' : 'on the line'}
                </div>
              </div>
              <div
                className="flex h-6 items-center rounded-full px-2 text-[10px] font-semibold uppercase tracking-widest"
                style={{ backgroundColor: 'rgba(220, 38, 38, 0.15)', color: '#dc2626' }}
              >
                Live
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3" style={{ overscrollBehavior: 'contain' }}>
              {/* Welcome message — always shown as first message */}
              <motion.div
                className="mb-3 flex justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="mr-2 mt-1">
                  {avatarElement('sm')}
                </div>
                <div
                  className="max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                  style={{
                    backgroundColor: '#1a1a1a',
                    color: '#ccc',
                    borderBottomLeftRadius: '4px',
                    border: '1px solid #222',
                  }}
                >
                  {WELCOME_MESSAGE}
                </div>
              </motion.div>

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="mr-2 mt-1">
                      {avatarElement('sm')}
                    </div>
                  )}
                  <div
                    className="max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                    style={
                      m.role === 'user'
                        ? {
                            backgroundColor: '#1e3a5f',
                            color: '#e0e0e0',
                            borderBottomRightRadius: '4px',
                          }
                        : {
                            backgroundColor: '#1a1a1a',
                            color: '#ccc',
                            borderBottomLeftRadius: '4px',
                            border: '1px solid #222',
                          }
                    }
                  >
                    {getMessageText(m.parts)}
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="mb-3 flex justify-start">
                  <div className="mr-2 mt-1">
                    {avatarElement('sm')}
                  </div>
                  <div
                    className="rounded-2xl px-3.5 py-2.5 text-sm"
                    style={{
                      backgroundColor: '#1a1a1a',
                      color: '#dc2626',
                      borderBottomLeftRadius: '4px',
                      border: '1px solid #222',
                    }}
                  >
                    <span className="inline-flex gap-1">
                      <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                    </span>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-3 rounded-lg px-3 py-2 text-center text-xs" style={{ color: '#dc2626' }}>
                  The line went dead... Try again.
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 px-4 py-3"
              style={{ borderTop: '1px solid #222' }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Say something..."
                disabled={isLoading}
                className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none placeholder:opacity-40"
                style={{
                  backgroundColor: '#151515',
                  color: '#e0e0e0',
                  border: '1px solid #333',
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-opacity disabled:opacity-30"
                style={{ backgroundColor: '#dc2626', color: '#fff' }}
                aria-label="Send message"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
