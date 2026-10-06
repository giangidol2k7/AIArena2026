import React from 'react';
import {
  GuardrailAuditResult,
  OutfitConfig,
  CULTURAL_KNOWLEDGE_BASE,
} from '../data/culturalKnowledgeBase';
import {
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Wrench,
  CheckCircle,
  HelpCircle,
  AlertOctagon,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface GuardrailRadarProps {
  audit: GuardrailAuditResult;
  outfit: OutfitConfig;
  onApplyFix: (fix: Partial<OutfitConfig>) => void;
  onOpenKnowledgeBase: (garmentId: string) => void;
}

export const GuardrailRadar: React.FC<GuardrailRadarProps> = ({
  audit,
  outfit,
  onApplyFix,
  onOpenKnowledgeBase,
}) => {
  const currentGarment = CULTURAL_KNOWLEDGE_BASE[outfit.garmentId];
  const isTaboo = audit.status === 'TABOO_VIOLATION';
  const isFlexible = audit.status === 'FLEXIBLE_OK';
  const isSafe = audit.status === 'SAFE';

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl backdrop-blur-sm flex flex-col gap-5">
      {/* Top Banner: Score & Cultural Guardrail Status */}
      <div
        className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
          isTaboo
            ? 'bg-red-950/40 border-red-500/40 text-red-100 shadow-lg shadow-red-950/30'
            : isFlexible
            ? 'bg-amber-950/30 border-amber-500/40 text-amber-100 shadow-lg shadow-amber-950/20'
            : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100 shadow-lg shadow-emerald-950/20'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
              isTaboo
                ? 'bg-red-600/20 border-red-500/50 text-red-400'
                : isFlexible
                ? 'bg-amber-600/20 border-amber-500/50 text-amber-400'
                : 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400'
            }`}
          >
            {isTaboo ? (
              <ShieldAlert className="w-6 h-6 animate-bounce" />
            ) : isFlexible ? (
              <Sparkles className="w-6 h-6" />
            ) : (
              <ShieldCheck className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-tech tracking-wider uppercase font-bold text-slate-400">
                Bộ Lọc Chuẩn Hóa Văn Hóa (Cultural Guardrail)
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-heritage tracking-wide">
              {audit.title}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              {audit.summary}
            </p>
          </div>
        </div>

        {/* Circular / Pill Score Meter */}
        <div className="flex sm:flex-col items-center justify-between w-full sm:w-auto bg-slate-950/70 px-4 py-2.5 rounded-xl border border-slate-800 shrink-0">
          <span className="text-[10px] text-slate-400 uppercase font-mono-tech">
            Điểm Di Sản
          </span>
          <span
            className={`text-2xl font-black font-mono-tech ${
              isTaboo ? 'text-red-400' : isFlexible ? 'text-amber-400' : 'text-emerald-400'
            }`}
          >
            {audit.score}%
          </span>
          <span className="text-[10px] text-slate-400">
            {isTaboo ? 'Cần Chỉnh Sửa' : isFlexible ? 'Sáng Tạo Hợp Lệ' : 'Chuẩn Tuyệt Đối'}
          </span>
        </div>
      </div>

      {/* Taboo Violations Box (High Alert) */}
      {isTaboo && (
        <div className="bg-red-950/20 border border-red-500/40 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold font-mono-tech tracking-wider uppercase">
            <AlertOctagon className="w-4 h-4" />
            <span>Phát hiện vi phạm điều cấm kỵ (Hard Taboos):</span>
          </div>
          <ul className="space-y-2">
            {audit.violations.map((violation, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-red-200 bg-red-950/30 p-2.5 rounded-lg border border-red-500/20"
              >
                <span className="w-4 h-4 rounded-full bg-red-500/30 text-red-300 flex items-center justify-center text-[10px] shrink-0 font-bold mt-0.5">
                  !
                </span>
                <span className="leading-relaxed">{violation}</span>
              </li>
            ))}
          </ul>

          {/* 1-Click Fix Section */}
          {audit.recommendedFixes.length > 0 && (
            <div className="mt-2 pt-3 border-t border-red-500/20 flex flex-col gap-2">
              <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Giải pháp sửa nhanh (1-Click Safe Remix):</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {audit.recommendedFixes.map((fix, idx) => (
                  <button
                    key={idx}
                    onClick={() => onApplyFix(fix.applyFixAction)}
                    className="flex items-center justify-between text-left px-3 py-2 rounded-lg bg-gradient-to-r from-amber-600/30 to-amber-500/20 hover:from-amber-600/40 hover:to-amber-500/30 border border-amber-500/30 text-amber-200 text-xs transition-all hover:scale-[1.01] active:scale-95 group"
                  >
                    <span className="line-clamp-2 pr-2">{fix.description}</span>
                    <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Flexible Zones Exploited (Creative Streetwear Highlights) */}
      {audit.flexibleHighlights.length > 0 && (
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono-tech tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Vùng Biến Tấu Tự Do (Flexible Zones Đang Áp Dụng):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {audit.flexibleHighlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-amber-200/90 bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/20"
              >
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ground-Truth Cultural Meanings & Anatomy Breakdown */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-bold font-mono-tech tracking-wider uppercase">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Ý Nghĩa Cốt Lõi Di Sản ({currentGarment.name})</span>
          </div>
          <button
            onClick={() => onOpenKnowledgeBase(outfit.garmentId)}
            className="text-[11px] text-amber-400 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1"
          >
            <span>Xem Cẩm Nang Chi Tiết</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Structural Rules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          {Object.entries(currentGarment.structural_rules).map(([key, val]) => (
            <div
              key={key}
              className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex flex-col gap-1"
            >
              <span className="text-[10px] font-mono-tech text-amber-400/90 uppercase font-bold">
                {key.replace('_', ' ')}
              </span>
              <span className="text-slate-300 leading-relaxed text-[11px]">{val}</span>
            </div>
          ))}
        </div>

        {/* Educational Note */}
        <div className="flex items-start gap-2 bg-slate-900/50 p-2.5 rounded-lg text-[11px] text-slate-400 border border-slate-800/80">
          <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
          <span>
            {outfit.garmentId === 'ngu_than_lap_linh' &&
              'Triết lý 5 vạt tượng trưng cho Tứ thân phụ mẫu (cha mẹ đẻ, cha mẹ chồng/vợ) che chở vạt con (bản thân). 5 cúc tượng trưng cho Ngũ thường: Cần, Tín, Nhân, Nghĩa, Lễ.'}
            {outfit.garmentId === 'nhat_binh' &&
              'Dải cổ hình chữ Nhật ghép trước ngực là linh hồn của Áo Nhật Bình. Cửa tay đính dải màu ngũ hành (Kim, Mộc, Thủy, Hỏa, Thổ) tương sinh hài hòa.'}
            {outfit.garmentId === 'giao_linh' &&
              'Áo Giao Lĩnh luôn có quy ước vạt trái đè vạt phải. Tuyệt đối không mặc vạt phải đè vạt trái vì đây là quy thức trang phục của người đã khuất trong cổ lễ.'}
          </span>
        </div>
      </div>
    </div>
  );
};
