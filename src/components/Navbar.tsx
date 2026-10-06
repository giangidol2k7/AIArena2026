import React from 'react';
import { ShieldCheck, ShieldAlert, Sparkles, BookOpen, Layers, Share2, Compass } from 'lucide-react';
import { GuardrailAuditResult } from '../data/culturalKnowledgeBase';

interface NavbarProps {
  currentTab: 'studio' | 'ai' | 'handbook' | 'lookbook';
  setCurrentTab: (tab: 'studio' | 'ai' | 'handbook' | 'lookbook') => void;
  audit: GuardrailAuditResult;
  onOpenFitCard: () => void;
  onQuickPreset: (presetId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  audit,
  onOpenFitCard,
}) => {
  const isSafe = audit.status === 'SAFE';
  const isFlexible = audit.status === 'FLEXIBLE_OK';
  const isTaboo = audit.status === 'TABOO_VIOLATION';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-amber-600 to-yellow-500 p-0.5 shadow-lg shadow-red-950/40 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center border border-amber-500/20">
              <span className="text-amber-400 font-bold font-heritage text-lg tracking-wider">VR</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-lg font-heritage">
                VIETREMIX <span className="text-amber-400 font-sans text-xs tracking-widest px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">CORE</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Hybrid Fashion Styling &amp; Cultural Guardrail Engine for Gen Z
            </p>
          </div>
        </div>

        {/* Live Guardrail Radar Badge in Header */}
        <div className="hidden md:flex items-center">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide transition-all ${
              isTaboo
                ? 'bg-red-950/60 border-red-500/50 text-red-300 animate-pulse shadow-sm shadow-red-500/20'
                : isFlexible
                ? 'bg-amber-950/50 border-amber-500/40 text-amber-300'
                : 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
            }`}
          >
            {isTaboo ? (
              <ShieldAlert className="w-4 h-4 text-red-400" />
            ) : isFlexible ? (
              <Sparkles className="w-4 h-4 text-amber-400" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            )}
            <span>
              {isTaboo
                ? `CẢNH BÁO CẤM KỴ (${audit.violations.length})`
                : isFlexible
                ? 'VÙNG BIẾN TẤU AN TOÀN'
                : 'CHUẨN MỰC DI SẢN 100%'}
            </span>
            <span className="ml-1 px-1.5 py-0.2 rounded bg-black/40 text-[10px] font-mono-tech">
              {audit.score}%
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentTab('studio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'studio'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phối Đồ</span>
              <span className="sm:hidden">Studio</span>
            </button>

            <button
              onClick={() => setCurrentTab('ai')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'ai'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Stylist</span>
            </button>

            <button
              onClick={() => setCurrentTab('handbook')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'handbook'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cẩm Nang Di Sản</span>
              <span className="sm:hidden">Cẩm Nang</span>
            </button>

            <button
              onClick={() => setCurrentTab('lookbook')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'lookbook'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lookbook Mẫu</span>
              <span className="sm:hidden">Preset</span>
            </button>
          </nav>

          {/* Export Fit Card Button */}
          <button
            onClick={onOpenFitCard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-md shadow-red-900/30 transition-all active:scale-95"
            title="Xuất thẻ outfit Gen Z"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Thẻ Fit Card</span>
          </button>
        </div>
      </div>
    </header>
  );
};
