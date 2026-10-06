import React from 'react';
import { PRESET_OUTFITS, OutfitConfig } from '../data/culturalKnowledgeBase';
import { Sparkles, ArrowRight, ShieldCheck, AlertTriangle, Layers, Flame } from 'lucide-react';

interface LookbookShowcaseProps {
  onLoadOutfit: (config: OutfitConfig) => void;
  onGoToStudio: () => void;
}

export const LookbookShowcase: React.FC<LookbookShowcaseProps> = ({
  onLoadOutfit,
  onGoToStudio,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Intro Header */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-tech tracking-wider uppercase font-bold">
          <Flame className="w-4 h-4 text-red-400" />
          <span>Gen Z Hybrid Lookbook Collection 2026</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-heritage text-white mt-1">
          Bản Phối Mẫu Streetwear x Việt Phục
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Khám phá những phong cách phối đồ được thiết kế riêng cho Gen Z độ tuổi 18–22. Mỗi outfit đều đã được hệ thống Cultural Guardrail kiểm định tỉ mỉ, giúp bạn tự tin xuống phố, đi triển lãm hay cháy phố cùng bạn bè mà không lo phạm lỗi văn hóa.
        </p>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRESET_OUTFITS.map((preset) => {
          const isWarningTest = preset.id === 'taboo-warning-test';

          return (
            <div
              key={preset.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all hover:scale-[1.01] shadow-xl ${
                isWarningTest
                  ? 'bg-gradient-to-br from-red-950/30 to-slate-950 border-red-500/40'
                  : 'bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-950 border-slate-800 hover:border-amber-500/40'
              }`}
            >
              <div>
                {/* Badge header */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-mono-tech px-2.5 py-1 rounded-full font-bold uppercase border ${
                      isWarningTest
                        ? 'bg-red-500/20 text-red-300 border-red-500/40'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {preset.vibe}
                  </span>
                  <span className="text-[11px] font-mono-tech text-slate-400">
                    {preset.garmentName}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-bold font-heritage text-white flex items-center gap-2">
                  <span>{preset.name}</span>
                  {!isWarningTest && (
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  )}
                  {isWarningTest && (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {preset.tagline}
                </p>

                {/* Key Components Pills */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Chất liệu: {preset.config.fabric}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Cách mặc:{' '}
                    {preset.config.lapelOrientation === 'open_drape'
                      ? 'Khoác buông tà'
                      : preset.config.lapelOrientation === 'button_right'
                      ? 'Cài sườn phải'
                      : preset.config.lapelOrientation === 'left_over_right'
                      ? 'Vạt trái đè phải'
                      : 'Cài vắt trái (Taboo)'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Quần:{' '}
                    {preset.config.bottom === 'cargo_pants'
                      ? 'Cargo túi hộp'
                      : preset.config.bottom === 'pleated_skirt'
                      ? 'Chân váy Y2K'
                      : 'Jeans baggy'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Giày:{' '}
                    {preset.config.footwear === 'chunky_sneaker'
                      ? 'Chunky Sneaker'
                      : 'Bốt da cổ cao'}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono-tech">
                  {isWarningTest
                    ? 'Dùng để thử nghiệm bộ lọc'
                    : '100% Phù hợp quy chuẩn'}
                </span>
                <button
                  onClick={() => {
                    onLoadOutfit(preset.config);
                    onGoToStudio();
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-md ${
                    isWarningTest
                      ? 'bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-500/40'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                  }`}
                >
                  <span>Thử Ngay Trong Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
