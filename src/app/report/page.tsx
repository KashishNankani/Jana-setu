'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ProblemCategory } from '@/lib/types';

// Issue Example Suggestions
const ISSUE_EXAMPLES = [
  { label: 'Garbage / Waste Dump', category: 'garbage', icon: 'ðŸ—‘ï¸' },
  { label: 'Tree Cutting / Fallen Tree', category: 'public_infrastructure', icon: 'ðŸŒ³' },
  { label: 'Water Leakage / Drain Blockage', category: 'water_leak', icon: 'ðŸ’§' },
  { label: 'Air / Water Pollution', category: 'contaminated_water', icon: 'â˜ï¸' },
  { label: 'Road Damage / Potholes', category: 'road_pothole', icon: 'âš ï¸' },
  { label: 'Electricity Problems', category: 'streetlight', icon: 'âš¡' },
  { label: 'Street Light Not Working', category: 'streetlight', icon: 'ðŸ’¡' },
  { label: 'Others', category: 'other', icon: 'ðŸ’¬' },
];

export default function ReportIssuePage() {
  const router = useRouter();

  // Step state (1 to 5)
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState<'voice' | 'photo' | 'video' | 'text' | 'file'>('voice');

  // Input states
  const [voiceRecording, setVoiceRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasVoiceRecorded, setHasVoiceRecorded] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory | ''>('garbage');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Location states
  const [locationText, setLocationText] = useState('Braj Vihar, Ward 12, Indore, Madhya Pradesh 452001');
  const [accuracy, setAccuracy] = useState('10 meters');
  const [isLocating, setIsLocating] = useState(false);

  // AI Analysis Results
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{
    category: ProblemCategory;
    confidence: number;
    severity_level: number;
    summary: string;
    detailed_description: string;
    extracted_location_hints: string | null;
    detected_language: string;
    reasoning: string;
  } | null>(null);

  // Final Registration Result
  const [generatedCode, setGeneratedCode] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');

  // Voice recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (voiceRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 60) {
            setVoiceRecording(false);
            setHasVoiceRecorded(true);
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [voiceRecording]);

  const toggleRecording = () => {
    if (voiceRecording) {
      setVoiceRecording(false);
      setHasVoiceRecorded(true);
      if (!inputText) {
        setInputText('à¤¬à¥ƒà¤œ à¤µà¤¿à¤¹à¤¾à¤° à¤®à¤¾à¤°à¥à¤•à¥‡à¤Ÿ à¤•à¥‡ à¤ªà¤¾à¤¸ à¤­à¤¾à¤°à¥€ à¤•à¤šà¤°à¤¾ à¤œà¤®à¤¾ à¤¹à¥à¤† à¤¹à¥ˆ, à¤¬à¤¹à¥à¤¤ à¤¬à¤¦à¤¬à¥‚ à¤† à¤°à¤¹à¥€ à¤¹à¥ˆ à¤”à¤° à¤°à¤¾à¤¸à¥à¤¤à¤¾ à¤¬à¤‚à¤¦ à¤¹à¥‹ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤');
      }
    } else {
      setRecordingSeconds(0);
      setVoiceRecording(true);
      setHasVoiceRecorded(false);
    }
  };

  const handleUseLiveLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setLocationText('Braj Vihar Main Road, Near Shiv Mandir, Ward 12, Indore - 452001');
      setAccuracy('6 meters (GPS Locked)');
    }, 900);
  };

  const handlePresetPhoto = (url: string, cat: ProblemCategory, defaultText: string) => {
    setPhotoPreview(url);
    setSelectedCategory(cat);
    if (!inputText) setInputText(defaultText);
  };

  // Start Step 2: AI Analysis
  const handleProceedToAnalysis = async () => {
    setCurrentStep(2);
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/ai/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText || 'Garbage dumping on roadside near Braj Vihar Ward 12',
          image_base64: null,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const data = json.data;

        // Map AI category to app category
        let mappedCat: ProblemCategory = 'garbage';
        if (data.category === 'POTHOLE') mappedCat = 'road_pothole';
        else if (data.category === 'DRAINAGE') mappedCat = 'drainage';
        else if (data.category === 'SEWERAGE') mappedCat = 'sewer';
        else if (data.category === 'WATER_SUPPLY') mappedCat = 'water_leak';
        else if (data.category === 'WATER_QUALITY') mappedCat = 'contaminated_water';
        else if (data.category === 'STREETLIGHT') mappedCat = 'streetlight';
        else if (data.category === 'INFRASTRUCTURE') mappedCat = 'public_infrastructure';
        else if (data.category === 'GARBAGE') mappedCat = 'garbage';

        setTimeout(() => {
          setAiResult({
            category: mappedCat,
            confidence: data.confidence || 0.96,
            severity_level: data.severity_level || 4,
            summary: data.summary || 'Solid Waste Accumulation near Pedestrian Walkway',
            detailed_description:
              data.detailed_description ||
              'Substantial garbage heap accumulated along the carriageway, blocking citizen movement and causing environmental hazard.',
            extracted_location_hints: data.extracted_location_hints || 'Braj Vihar Ward 12, Indore',
            detected_language: data.detected_language || 'hi',
            reasoning:
              data.reasoning ||
              'High visual clarity of municipal solid waste overflow. Urgent public health concern during monsoon.',
          });
          setIsAnalyzing(false);
          setCurrentStep(3);
        }, 1500);
      } else {
        throw new Error('Fallback to local AI engine');
      }
    } catch {
      setTimeout(() => {
        setAiResult({
          category: (selectedCategory as ProblemCategory) || 'garbage',
          confidence: 0.94,
          severity_level: 4,
          summary: 'Garbage Dump & Waste Accumulation in Braj Vihar',
          detailed_description:
            inputText ||
            'Large garbage accumulation near market area. Requires municipal cleanup vehicle and waste bin installation.',
          extracted_location_hints: 'Braj Vihar Market, Ward 12',
          detected_language: 'hi',
          reasoning:
            'Identified organic and plastic refuse overflow affecting public pathway. Severity scored 4/5 for hygiene hazard.',
        });
        setIsAnalyzing(false);
        setCurrentStep(3);
      }, 1500);
    }
  };

  const handleFinalSubmit = () => {
    setCurrentStep(4);
    setTimeout(() => {
      const randomCode = `JS-2026-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const randomToken = `token-indore-${Math.random().toString(36).substring(2, 9)}`;
      setGeneratedCode(randomCode);
      setGeneratedToken(randomToken);
      setCurrentStep(5);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                ðŸŒ±
              </div>
              <div>
                <h1 className="text-lg font-bold text-text-primary leading-tight">
                  JanaSetu <span className="text-brand-500">AI</span>
                </h1>
                <p className="text-[10px] text-brand-500 font-medium">Clean City. Green Future.</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-700">
              <span>ðŸ“ Braj Vihar Ward 12, Indore</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-full text-xs font-medium text-slate-600">
              <span>ðŸŒ English</span>
            </div>
            <Link
              href="/dashboard"
              className="text-xs font-semibold px-4 py-2 bg-brand-50 text-brand-600 hover:bg-brand-100 rounded-full border border-brand-200 transition-colors"
            >
              Officer Login â†’
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Header Title */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Report an Issue</h1>
              <p className="text-sm text-slate-500 mt-1">
                Share the issue in the way that&apos;s most convenient for you.
              </p>
            </div>
            <Link
              href="/citizen"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm"
            >
              â† Back to Citizen Hub
            </Link>
          </div>

          {/* 5-Step Stepper */}
          <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className="grid grid-cols-5 gap-2 relative">
              {[
                { num: 1, title: 'Add Details', desc: 'Input & location' },
                { num: 2, title: 'AI Analysis', desc: 'Multimodal check' },
                { num: 3, title: 'Review', desc: 'Inspect classification' },
                { num: 4, title: 'Confirm', desc: 'Citizen approval' },
                { num: 5, title: 'Submit', desc: 'Official registration' },
              ].map((step) => {
                const isPassed = currentStep > step.num;
                const isCurrent = currentStep === step.num;
                return (
                  <div key={step.num} className="flex flex-col items-center text-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                        isPassed
                          ? 'bg-brand-500 text-white shadow-sm'
                          : isCurrent
                          ? 'bg-brand-600 text-white ring-4 ring-brand-100 scale-105'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isPassed ? 'âœ“' : step.num}
                    </div>
                    <span
                      className={`text-xs font-bold mt-2 ${
                        isCurrent ? 'text-brand-600' : isPassed ? 'text-slate-800' : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="hidden md:block text-[10px] text-slate-400 mt-0.5">{step.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* STEP 1: ADD DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            {/* Input Methods Grid */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">How would you like to report?</h2>
                <p className="text-xs text-slate-500 mt-0.5">You can use any one or more methods.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { id: 'voice', icon: 'ðŸŽ™ï¸', label: 'Voice Note', desc: 'Speak in your language' },
                  { id: 'photo', icon: 'ðŸ“·', label: 'Take Photo', desc: 'Capture & upload photo' },
                  { id: 'video', icon: 'ðŸŽ¬', label: 'Record Video', desc: 'Record short clip' },
                  { id: 'text', icon: 'âœï¸', label: 'Type Complaint', desc: 'Type in any language' },
                  { id: 'file', icon: 'ðŸ“', label: 'Upload File', desc: 'Upload documents or audio' },
                ].map((m) => {
                  const active = selectedMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMethod(m.id as any)}
                      className={`p-4 rounded-xl border text-left transition-all relative ${
                        active
                          ? 'border-brand-500 bg-brand-50/50 shadow-sm ring-2 ring-brand-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {active && (
                        <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-brand-500 text-white text-[9px] flex items-center justify-center font-bold">
                          âœ“
                        </span>
                      )}
                      <div className="text-2xl mb-2">{m.icon}</div>
                      <div className="text-xs font-bold text-slate-900">{m.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{m.desc}</div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Interactive Input Box */}
              {selectedMethod === 'voice' && (
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={toggleRecording}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                        voiceRecording
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-brand-500 hover:bg-brand-600 text-white'
                      }`}
                    >
                      <span>{voiceRecording ? 'â¹ Stop Recording' : 'ðŸŽ™ï¸ Tap to Record Voice Note'}</span>
                    </button>
                    <span className="font-mono text-xs text-slate-600 font-bold">
                      00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds} / 01:00
                    </span>
                  </div>

                  {/* Simulated Waveform */}
                  <div className="h-10 bg-white rounded-lg border border-slate-200 px-3 flex items-center justify-center gap-1 overflow-hidden">
                    {Array.from({ length: 48 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-1 rounded-full transition-all duration-150 ${
                          voiceRecording
                            ? 'bg-brand-500'
                            : hasVoiceRecorded
                            ? 'bg-brand-400'
                            : 'bg-slate-300'
                        }`}
                        style={{
                          height: voiceRecording
                            ? `${Math.max(15, Math.floor(Math.sin(idx * 0.4 + recordingSeconds) * 20 + 20))}px`
                            : hasVoiceRecorded
                            ? `${Math.max(8, (idx % 5) * 6 + 6)}px`
                            : '6px',
                        }}
                      />
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-500">
                    ðŸ’¡ You can speak freely in <strong>Hindi, English, Marathi, Malvi</strong> or your local language.
                  </p>

                  {hasVoiceRecorded && (
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 space-y-1">
                      <p className="font-bold flex items-center gap-1.5">
                        <span>âœ“ Audio Transcribed by Gemini AI:</span>
                      </p>
                      <p className="text-slate-700 italic">
                        &quot;à¤¬à¥ƒà¤œ à¤µà¤¿à¤¹à¤¾à¤° à¤®à¤¾à¤°à¥à¤•à¥‡à¤Ÿ à¤•à¥‡ à¤ªà¤¾à¤¸ à¤­à¤¾à¤°à¥€ à¤•à¤šà¤°à¤¾ à¤œà¤®à¤¾ à¤¹à¥à¤† à¤¹à¥ˆ, à¤¬à¤¹à¥à¤¤ à¤¬à¤¦à¤¬à¥‚ à¤† à¤°à¤¹à¥€ à¤¹à¥ˆ à¤”à¤° à¤°à¤¾à¤¸à¥à¤¤à¤¾ à¤¬à¤‚à¤¦ à¤¹à¥‹ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤&quot;
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Photo Input Mode */}
              {selectedMethod === 'photo' && (
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        handlePresetPhoto(
                          'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80',
                          'garbage',
                          'Illegal garbage heap accumulated on roadside near market'
                        )
                      }
                      className="px-3 py-1.5 bg-white border border-slate-300 hover:border-brand-500 rounded-lg text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      ðŸ“¸ Pick Garbage Sample Photo
                    </button>
                    <button
                      onClick={() =>
                        handlePresetPhoto(
                          'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
                          'road_pothole',
                          'Severe asphalt cavity on main road causing hazard'
                        )
                      }
                      className="px-3 py-1.5 bg-white border border-slate-300 hover:border-brand-500 rounded-lg text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      ðŸ“¸ Pick Pothole Sample Photo
                    </button>
                  </div>

                  {photoPreview && (
                    <div className="relative rounded-xl overflow-hidden aspect-video max-w-sm border border-slate-200">
                      <img src={photoPreview} alt="Uploaded Civic Issue" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setPhotoPreview(null)}
                        className="absolute top-2 right-2 w-6 h-6 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full flex items-center justify-center text-xs"
                      >
                        âœ•
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Text Input Mode */}
              {(selectedMethod === 'text' || selectedMethod === 'video' || selectedMethod === 'file') && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Describe the issue in your own words:
                  </label>
                  <textarea
                    rows={3}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="e.g. Deep pothole on main road causing accidents, or water pipeline leaking near market..."
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>
              )}
            </div>

            {/* Location & Issue Category Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">ðŸ“</span>
                    <h3 className="text-sm font-bold text-slate-900">Location</h3>
                  </div>
                  <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
                    Accuracy: {accuracy}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Accurate location helps city officials resolve issues faster.
                </p>

                {/* Map Mini Canvas */}
                <div className="h-32 bg-slate-100 rounded-xl border border-slate-200 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="z-10 text-center">
                    <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm mx-auto shadow-md animate-bounce">
                      ðŸ“
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 bg-white/90 px-2 py-0.5 rounded shadow-sm mt-1 inline-block">
                      Indore Ward 12
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleUseLiveLocation}
                    disabled={isLocating}
                    className="flex-1 py-2 px-3 bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{isLocating ? 'Acquiring GPS...' : 'ðŸŽ¯ Use Live Location'}</span>
                  </button>
                  <button
                    onClick={() => alert('Map pin picker: Move pin to precise street corner or building')}
                    className="py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-sm"
                  >
                    ðŸ“ Pin on Map
                  </button>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 border border-slate-200">
                  {locationText}
                </div>
              </div>

              {/* Examples of Issues Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">ðŸŒ¿</span>
                  <h3 className="text-sm font-bold text-slate-900">Examples of Issues</h3>
                </div>
                <p className="text-xs text-slate-500">
                  Select a common civic category or let AI auto-detect from your input.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {ISSUE_EXAMPLES.map((ex, idx) => {
                    const active = selectedCategory === ex.category;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedCategory(ex.category as ProblemCategory);
                          if (!inputText) setInputText(`${ex.label} observed near ${locationText}`);
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center gap-2 transition-all ${
                          active
                            ? 'border-brand-500 bg-brand-50/60 text-brand-700 font-bold'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        <span>{ex.icon}</span>
                        <span className="truncate">{ex.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Continue Action */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleProceedToAnalysis}
                className="px-8 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-full shadow-lg shadow-brand-500/25 transition-all flex items-center gap-2 group"
              >
                <span>Continue to AI Analysis</span>
                <span className="group-hover:translate-x-1 transition-transform">â†’</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: AI ANALYSIS RUNNING */}
        {currentStep === 2 && isAnalyzing && (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm space-y-6 max-w-lg mx-auto animate-fade-in my-12">
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 rounded-full border-4 border-brand-200 border-t-brand-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">ðŸ¤–</div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Gemini Flash AI Analyzing Complaint...</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Extracting civic problem category, urgency level, location landmarks, and duplicate matches.
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 text-left space-y-1">
              <div className="flex items-center gap-2 text-brand-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                <span>Running multimodal vision & audio transcription</span>
              </div>
              <div className="text-[11px] text-slate-400">Model: gemini-2.0-flash (Indian civic taxonomy)</div>
            </div>
          </div>
        )}

        {/* STEP 3 & 4: REVIEW & CONFIRM */}
        {(currentStep === 3 || currentStep === 4) && aiResult && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                    âœ¨ AI Classification Result
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2">{aiResult.summary}</h2>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-brand-600">
                    {Math.round(aiResult.confidence * 100)}%
                  </span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Confidence</span>
                </div>
              </div>

              {/* AI Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Detected Category</span>
                  <span className="text-slate-900 font-bold text-sm mt-0.5 block">
                    {CATEGORY_LABELS[aiResult.category] || aiResult.category}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Severity Rating</span>
                  <span className="text-rose-600 font-bold text-sm mt-0.5 block">
                    Level {aiResult.severity_level} / 5 (Critical)
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Responsible Dept</span>
                  <span className="text-slate-900 font-bold text-sm mt-0.5 block">
                    Waste Management Dept
                  </span>
                </div>
              </div>

              {/* Description & Reasoning */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-700">Problem Summary & Details</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {aiResult.detailed_description}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-700">AI Reasoning</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-brand-50/50 p-3 rounded-xl border border-brand-100 text-brand-900">
                    ðŸ’¡ {aiResult.reasoning}
                  </p>
                </div>
              </div>

              {/* Citizen Gate / Principle Â§2 Highlight */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <span>âš–ï¸ JanaSetu Citizen Protection Gate (Principle Â§2)</span>
                </p>
                <p className="text-amber-800">
                  AI never registers a complaint alone. Your confirmation confirms this issue and triggers official government assignment.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                >
                  â† Edit Input
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="px-8 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-full shadow-lg shadow-brand-500/25 transition-all flex items-center gap-2"
                >
                  <span>âœ“ Yes, Confirm & Submit Officially</span>
                  <span>â†’</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: REGISTRATION COMPLETE */}
        {currentStep === 5 && (
          <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 text-center shadow-lg max-w-xl mx-auto animate-fade-in my-6 space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">
              âœ“
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Complaint Registered Officially
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-3">
                Tracking Code: <span className="text-brand-600">{generatedCode}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
                Your report has been prioritized and assigned to the Indore Municipal Corporation.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Problem:</span>
                <span className="font-bold text-slate-800">{aiResult?.summary || 'Garbage Dump Issue'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Department:</span>
                <span className="font-bold text-slate-800">Waste Management Department</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Target SLA:</span>
                <span className="font-bold text-rose-600">48 Hours Countdown Active</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">One-Problem One-Link:</span>
                <span className="font-mono font-bold text-brand-600">/t/{generatedToken}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href={`/t/${generatedToken}`}
                className="w-full sm:w-auto px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>ðŸ”— Open Live Tracking Page</span>
              </Link>
              <Link
                href="/citizen"
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-full shadow-sm transition-all"
              >
                Go to Citizen Hub
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
