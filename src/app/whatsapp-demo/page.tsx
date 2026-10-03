'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  sender: 'citizen' | 'bot';
  text?: string;
  image?: string;
  audio?: boolean;
  location?: string;
  buttons?: string[];
  trackingUrl?: string;
  timestamp: string;
}

export default function WhatsAppDemoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'नमस्ते! Welcome to JanaSetu Indore Civic Bot 🌱\n\nPlease send a photo, voice note, or text describing the civic issue in your area (English, हिन्दी or regional language).',
      timestamp: '10:24 AM',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [currentBotState, setCurrentBotState] = useState<
    'AWAITING_REPORT' | 'AWAITING_CONFIRMATION' | 'AWAITING_LOCATION' | 'REGISTERED' | 'VERIFY_RESOLUTION'
  >('AWAITING_REPORT');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addBotMessage = (msg: Partial<ChatMessage>, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ...msg,
        },
      ]);
    }, delay);
  };

  const handleSendText = (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const citizenMsg: ChatMessage = {
      id: `c-${Date.now()}`,
      sender: 'citizen',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, citizenMsg]);
    setInputText('');

    // State machine logic
    if (currentBotState === 'AWAITING_REPORT') {
      setCurrentBotState('AWAITING_CONFIRMATION');
      addBotMessage({
        text: '🤖 *JanaSetu Gemini AI Analysis:*\n\n• Category: *Garbage / Solid Waste Dump*\n• Urgency: *High (Level 4/5)*\n• Detected Language: *Hindi / English*\n\nIs this classification correct? (Principle §2: You have the final say)',
        buttons: ['✅ YES, That is correct', '❌ NO, Different problem'],
      });
    } else if (currentBotState === 'AWAITING_CONFIRMATION') {
      if (textToSend.toLowerCase().includes('yes') || textToSend.includes('✅')) {
        setCurrentBotState('AWAITING_LOCATION');
        addBotMessage({
          text: 'Great! Please share your GPS location pin or type your street / landmark in Indore.',
          buttons: ['📍 Share Live Location (Braj Vihar Ward 12)', '✍️ Type Landmark Manually'],
        });
      } else {
        setCurrentBotState('AWAITING_REPORT');
        addBotMessage({
          text: 'Understood. Please describe or select the correct category (e.g. Water Leak, Pothole, Drainage, Streetlight).',
        });
      }
    } else if (currentBotState === 'AWAITING_LOCATION') {
      setCurrentBotState('REGISTERED');
      addBotMessage(
        {
          text: '✅ *Complaint Registered Officially!*\n\n• Problem ID: *#JS-2026-0517-1024*\n• Assigned To: *Waste Management Department*\n• SLA Clock: *48-Hour Resolution Target Active*\n• Reporter: *You are Reporter #1 (Community lead)*\n\nTrack progress live using your one-problem-one-link:',
          trackingUrl: '/t/token-indore-001',
          buttons: ['🔍 Track Status Live', '🔔 Simulate Resolution Verification'],
        },
        1000
      );
    }
  };

  const handleSimulatePhoto = () => {
    const citizenMsg: ChatMessage = {
      id: `c-${Date.now()}`,
      sender: 'citizen',
      text: 'Braj Vihar market ke paas bahut kachra jama hai, kripya safai karwayein.',
      image: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=600&q=80',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, citizenMsg]);
    setCurrentBotState('AWAITING_CONFIRMATION');

    addBotMessage({
      text: '🤖 *JanaSetu Gemini AI Analysis:*\n\n• Image Analysis: *Visible Solid Waste Accumulation*\n• Category: *Garbage / Waste Management*\n• Severity: *Level 4 / 5 (Critical)*\n• Confidence: *96% High*\n\nIs this classification correct? (Principle §2)',
      buttons: ['✅ YES, That is correct', '❌ NO, Different problem'],
    });
  };

  const handleSimulateVoice = () => {
    const citizenMsg: ChatMessage = {
      id: `c-${Date.now()}`,
      sender: 'citizen',
      audio: true,
      text: '🎙️ Voice Note (0:14) — Transcribed: "बृज विहार मार्केट के पास भारी कचरा जमा हुआ है, बहुत बदबू आ रही है।"',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, citizenMsg]);
    setCurrentBotState('AWAITING_CONFIRMATION');

    addBotMessage({
      text: '🤖 *JanaSetu Gemini AI Analysis (Audio Transcription):*\n\n• Audio Language: *Hindi (हिन्दी)*\n• Category: *Garbage Dumping (कचरा डंप)*\n• Severity: *Level 4 / 5*\n\nIs this classification correct?',
      buttons: ['✅ YES, That is correct', '❌ NO, Different problem'],
    });
  };

  const handleButtonClick = (btnText: string) => {
    if (btnText.includes('Simulate Resolution Verification')) {
      setCurrentBotState('VERIFY_RESOLUTION');
      addBotMessage({
        text: '📢 *Update from Indore Municipal Corporation:*\n\nField Officer *Rakesh Sharma* has submitted resolution evidence (before & after verified by AI).\n\n*Did the department genuinely fix this issue?*\n(Principle §10: Your confirmation controls closure)',
        buttons: ['👍 YES, It is completely resolved', '👎 NO, Problem still exists'],
      });
      return;
    }

    if (btnText.includes('Track Status Live')) {
      window.open('/t/token-indore-001', '_blank');
      return;
    }

    if (btnText.includes('YES, It is completely resolved')) {
      addBotMessage({
        text: '🎉 *Issue Marked CLOSED & RESOLVED!*\n\nThank you for verifying! Your civic participation has earned you *+50 Green Points* in Indore Ward 12. Have a great day!',
      });
      return;
    }

    if (btnText.includes('NO, Problem still exists')) {
      addBotMessage({
        text: '⚠️ *Issue REOPENED & Escalated to Department Supervisor!*\n\nOfficer accountability history updated. The team has been re-dispatched. We fail at most once and never let it happen again (Principle §11).',
      });
      return;
    }

    handleSendText(btnText);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🌱</span>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">JanaSetu Citizen WhatsApp Bot</h1>
              <p className="text-[10px] text-brand-400">Official Interactive WhatsApp-First Simulator</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/t/token-indore-001"
            className="text-xs font-semibold px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
          >
            🔗 View Tracking Page
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-semibold px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold rounded-lg transition-colors"
          >
            Govt Dashboard →
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 items-center justify-center">
        {/* Left Side: Explanatory Card */}
        <div className="w-full md:w-80 space-y-4 text-slate-300 text-xs">
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-3 shadow-lg">
            <span className="text-2xl">📱</span>
            <h2 className="text-sm font-bold text-white">WhatsApp-First Principle (§1)</h2>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Citizens in India never need to install an app or remember passwords. They simply send photos, voice notes, or text to JanaSetu on WhatsApp.
            </p>
            <div className="space-y-1.5 border-t border-slate-700 pt-3 text-[11px]">
              <div className="flex items-center gap-1.5 text-brand-400 font-semibold">
                <span>✓</span>
                <span>Multimodal Gemini Flash AI</span>
              </div>
              <div className="flex items-center gap-1.5 text-brand-400 font-semibold">
                <span>✓</span>
                <span>One-Problem One-Link Sharing</span>
              </div>
              <div className="flex items-center gap-1.5 text-brand-400 font-semibold">
                <span>✓</span>
                <span>Citizen Dual Verification</span>
              </div>
            </div>
          </div>

          {/* Quick Simulation Trigger Buttons */}
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
            <h3 className="text-xs font-bold text-white">Quick Triggers:</h3>
            <div className="space-y-1.5">
              <button
                onClick={handleSimulatePhoto}
                className="w-full text-left p-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 transition-colors flex items-center gap-2"
              >
                <span>📸</span>
                <span>Simulate Photo of Garbage Dump</span>
              </button>
              <button
                onClick={handleSimulateVoice}
                className="w-full text-left p-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 transition-colors flex items-center gap-2"
              >
                <span>🎙️</span>
                <span>Simulate Hindi Voice Note</span>
              </button>
              <button
                onClick={() =>
                  handleSendText('Pothole on AB road near Vijay Nagar square, deep cavity')
                }
                className="w-full text-left p-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 transition-colors flex items-center gap-2"
              >
                <span>⚠️</span>
                <span>Simulate Pothole Text Message</span>
              </button>
            </div>
          </div>
        </div>

        {/* WhatsApp Mobile Frame (Center) */}
        <div className="w-full max-w-sm bg-[#111b21] rounded-3xl border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[640px]">
          {/* WhatsApp Header */}
          <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between text-white border-b border-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm shadow-sm">
                🌱
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold leading-tight">JanaSetu Indore</h3>
                  <span className="text-emerald-400 text-[10px]">✓</span>
                </div>
                <p className="text-[10px] text-slate-400">Official Municipal Bot</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <span>📞</span>
              <span>⋮</span>
            </div>
          </div>

          {/* WhatsApp Chat Messages Stream */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#0b141a] bg-opacity-95">
            {messages.map((m) => {
              const isBot = m.sender === 'bot';
              return (
                <div key={m.id} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                      isBot ? 'bg-[#202c33] text-slate-100 rounded-tl-none' : 'bg-[#005c4b] text-white rounded-tr-none'
                    }`}
                  >
                    {m.image && (
                      <div className="rounded-xl overflow-hidden mb-2 aspect-video border border-slate-600">
                        <img src={m.image} alt="Complaint Evidence" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <p className="whitespace-pre-line text-[11px]">{m.text}</p>

                    {m.trackingUrl && (
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <Link
                          href={m.trackingUrl}
                          target="_blank"
                          className="inline-block text-[10px] font-bold text-emerald-400 hover:underline"
                        >
                          🔗 Click here to open public tracking dossier ›
                        </Link>
                      </div>
                    )}

                    <span className="text-[9px] text-slate-400 block text-right mt-1">
                      {m.timestamp} {m.sender === 'citizen' && '✓✓'}
                    </span>
                  </div>

                  {/* Interactive Button Options */}
                  {m.buttons && (
                    <div className="mt-1.5 flex flex-col gap-1 w-[85%]">
                      {m.buttons.map((b, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleButtonClick(b)}
                          className="w-full py-1.5 px-3 bg-[#202c33] hover:bg-[#2a3942] border border-slate-700 text-emerald-400 font-bold text-[10px] rounded-xl transition-colors text-center shadow-sm"
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-[#202c33] text-slate-400 text-[10px] px-3 py-1.5 rounded-full w-24">
                <span>typing</span>
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* WhatsApp Input Bar */}
          <div className="bg-[#202c33] p-2 flex items-center gap-2 border-t border-slate-700">
            <button
              onClick={handleSimulatePhoto}
              title="Send Photo"
              className="text-slate-400 hover:text-white p-1 text-base"
            >
              📷
            </button>
            <button
              onClick={handleSimulateVoice}
              title="Record Voice Note"
              className="text-slate-400 hover:text-white p-1 text-base"
            >
              🎙️
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
              placeholder="Type message in any language..."
              className="flex-1 bg-[#2a3942] text-xs text-white placeholder:text-slate-400 px-3 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleSendText()}
              className="w-8 h-8 rounded-full bg-[#00a884] text-white flex items-center justify-center font-bold text-xs"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
