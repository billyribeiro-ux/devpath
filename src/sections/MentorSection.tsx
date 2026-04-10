import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { showDevpathToast } from '../lib/devpathToast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ChatTeardropTextIcon, BookOpenIcon, BugIcon, UsersIcon,
  PaperPlaneRightIcon, DotsThreeIcon,
  CircleIcon, SparkleIcon, MagicWandIcon, StopCircleIcon
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const modes = [
  { id: 'coach', label: 'Coach', icon: ChatTeardropTextIcon, desc: 'Hints & guidance', color: 'text-blue-400' },
  { id: 'teacher', label: 'Teacher', icon: BookOpenIcon, desc: 'Clear explanations', color: 'text-green-400' },
  { id: 'debugger', label: 'Debugger', icon: BugIcon, desc: 'Fix code issues', color: 'text-red-400' },
  { id: 'interviewer', label: 'Interviewer', icon: UsersIcon, desc: 'Test knowledge', color: 'text-purple-400' }
];

const sampleMessages = [
  { 
    role: 'ai', 
    content: 'Hi! I\'m your AI mentor. What would you like to learn today?',
    timestamp: '10:30 AM'
  }
];

export default function MentorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const modesRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState('coach');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(sampleMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [neverReveal, setNeverReveal] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage = { 
      role: 'user', 
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const responses: Record<string, string> = {
        coach: 'That\'s a great question! Let me guide you through this. What have you tried so far?',
        teacher: 'Let me explain this concept step by step. The key thing to understand is...',
        debugger: 'I see the issue! Let\'s trace through your code together. First, check if...',
        interviewer: 'Interesting! Can you explain your reasoning? What would happen if we changed...'
      };
      setMessages(prev => [...prev, {
        role: 'ai',
        content: responses[activeMode] || responses.coach,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Headline entrance from top
      scrollTl.fromTo(headlineRef.current,
        { y: '-22vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(bodyRef.current,
        { y: '-20vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Mode selector entrance from left
      const modeItems = modesRef.current?.querySelectorAll('.mode-item');
      if (modeItems && modeItems.length > 0) {
        scrollTl.fromTo(modeItems,
          { x: '-45vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.06, ease: 'none' },
          0.08
        );
      }

      // Chat panel entrance from right
      scrollTl.fromTo(chatRef.current,
        { x: '75vw', opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.10
      );

      // EXIT phase
      scrollTl.fromTo([headlineRef.current, bodyRef.current],
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      if (modeItems && modeItems.length > 0) {
        scrollTl.fromTo(modeItems,
          { x: 0, opacity: 1 },
          { x: '-20vw', opacity: 0, ease: 'power2.in' },
          0.72
        );
      }

      scrollTl.fromTo(chatRef.current,
        { y: 0, opacity: 1 },
        { y: '14vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const activeModeData = modes.find(m => m.id === activeMode);

  return (
    <section
      ref={sectionRef}
      className="section-pinned relative z-[120] flex items-center"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/modern_office_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="scrim-heavy z-[1]" />
      <div className="absolute inset-0 grid-overlay z-[2] opacity-40" />
      <div className="absolute inset-0 grain-overlay z-[3]" />

      {/* Content */}
      <div className="relative z-10 w-full px-[6vw] flex gap-10">
        {/* Left Column */}
        <div className="flex-1 max-w-[26vw]">
          <h2
            ref={headlineRef}
            className="font-display text-[clamp(2rem,4.5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-primary-light"
          >
            Ask. Debug. <span className="text-neon">Grow.</span>
          </h2>

          <p ref={bodyRef} className="mt-4 text-lg text-secondary-light leading-relaxed">
            Coach, teacher, debugger, interviewer—switch modes to match your goal.
          </p>

          {/* Mode Selector */}
          <div ref={modesRef} className="mt-8 space-y-2">
            {modes.map((mode) => (
              <div
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`mode-item flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeMode === mode.id 
                    ? 'bg-white/10 border border-white/20' 
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  activeMode === mode.id ? 'bg-white/10' : 'bg-white/5'
                }`}>
                  <mode.icon 
                    size={20} 
                    className={activeMode === mode.id ? mode.color : 'text-secondary-light'}
                    weight={activeMode === mode.id ? 'fill' : 'regular'}
                  />
                </div>
                <div className="flex-1">
                  <span className={`text-sm block ${activeMode === mode.id ? 'text-primary-light' : 'text-secondary-light'}`}>
                    {mode.label}
                  </span>
                  <span className="text-xs text-secondary-light/60">{mode.desc}</span>
                </div>
                {activeMode === mode.id && (
                  <div className="w-2 h-2 rounded-full bg-neon" />
                )}
              </div>
            ))}
          </div>

          {/* Settings */}
          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StopCircleIcon size={16} className="text-neon" />
                <span className="text-sm text-secondary-light">Never reveal solutions</span>
              </div>
              <button 
                onClick={() => setNeverReveal(!neverReveal)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  neverReveal ? 'bg-neon' : 'bg-white/20'
                }`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                  neverReveal ? 'left-5' : 'left-0.5'
                }`} />
              </button>
            </div>
            <p className="text-xs text-secondary-light/60 mt-2">
              AI will guide you without giving away answers
            </p>
          </div>
        </div>

        {/* Right Column - Chat Panel */}
        <div
          ref={chatRef}
          className="card-dark p-0 w-[56vw] h-[74vh] flex flex-col overflow-hidden"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activeModeData?.color.replace('text-', 'bg-').replace('400', '500/20')
              }`}>
                {activeModeData && (
                  <activeModeData.icon 
                    size={20} 
                    className={activeModeData.color}
                    weight="fill"
                  />
                )}
              </div>
              <div>
                <span className="text-primary-light text-sm font-medium">AI Mentor</span>
                <span className="text-xs text-secondary-light block flex items-center gap-1">
                  <SparkleIcon size={10} className="text-neon" />
                  Mode: {activeModeData?.label}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="pill pill-neon text-xs flex items-center gap-1">
                <CircleIcon size={8} weight="fill" className="animate-pulse" />
                Online
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Chat actions"
                  >
                    <DotsThreeIcon size={20} className="text-secondary-light" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="z-[400] min-w-[12rem] border-white/10 bg-[rgba(12,16,24,0.98)] text-primary-light"
                >
                  <DropdownMenuItem
                    className="focus:bg-white/10"
                    onClick={async () => {
                      const text = messages
                        .map((m) => `${m.role === 'user' ? 'You' : 'Mentor'}: ${m.content}`)
                        .join('\n\n');
                      try {
                        await navigator.clipboard.writeText(text);
                        showDevpathToast('Copied', 'Transcript copied to clipboard.', 'success');
                      } catch {
                        showDevpathToast('Copy failed', 'Clipboard not available.', 'error');
                      }
                    }}
                  >
                    Copy transcript
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="focus:bg-white/10 text-red-400 focus:text-red-300"
                    onClick={() => {
                      setMessages([...sampleMessages]);
                      showDevpathToast('Chat cleared', 'Conversation reset to the welcome message.', 'info');
                    }}
                  >
                    Clear chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] ${
                  msg.role === 'user' ? 'chat-message-user' : 'chat-message-ai'
                }`}>
                  <p className="text-sm text-primary-light leading-relaxed">{msg.content}</p>
                  <span className="text-[10px] text-secondary-light/60 mt-1 block">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="chat-message-ai py-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-neon/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-neon/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-neon/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-white/5">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Ask in ${activeModeData?.label.toLowerCase()} mode...`}
                className="input-dark flex-1"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                className="btn-neon px-4 flex items-center gap-2"
                disabled={!input.trim() || isTyping}
              >
                <PaperPlaneRightIcon size={18} weight="fill" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-secondary-light/60">
              <span>Press Enter to send</span>
              <span className="flex items-center gap-1">
                <MagicWandIcon size={10} />
                AI-powered responses
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
