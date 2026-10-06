import React, { useState } from 'react';
import { OutfitConfig, GuardrailAuditResult, CULTURAL_KNOWLEDGE_BASE } from '../data/culturalKnowledgeBase';
import {
  X,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Copy,
  Check,
  Download,
  Share2,
} from 'lucide-react';

interface FitCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  outfit: OutfitConfig;
  audit: GuardrailAuditResult;
}

export const FitCardModal: React.FC<FitCardModalProps> = ({
  isOpen,
  onClose,
  outfit,
  audit,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const garment = CULTURAL_KNOWLEDGE_BASE[outfit.garmentId];
  const isSafe = audit.status === 'SAFE' || audit.status === 'FLEXIBLE_OK';

  const getFitSummaryText = () => {
    return `🔥 VIETREMIX DIGITAL FIT CARD 🔥
Outfit: ${garment.name} (${garment.era})
Bảo Chứng Văn Hóa: ${audit.score}% [${audit.title}]
Chất liệu: ${outfit.fabric}
Cách mặc: ${
      outfit.lapelOrientation === 'open_drape'
        ? 'Khoác buông vạt hiện đại'
        : outfit.lapelOrientation === 'button_right'
        ? 'Cài khít bên phải chuẩn Lập lĩnh'
        : 'Vạt trái đè vạt phải chuẩn Giao lĩnh'
    }
Streetwear Layer: ${outfit.innerLayer} + ${outfit.bottom} + ${outfit.footwear}
Phụ kiện: ${outfit.accessories.join(', ') || 'Tối giản'}
Kiểm định bởi: VietRemix Core Cultural Engine`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFitSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Digital Card Preview Canvas */}
        <div className="p-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 flex flex-col gap-4 border-b border-slate-800/80 relative overflow-hidden">
          {/* Cyberpunk Holographic Border Pattern */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400" />
          <div className="absolute -right-16 -top-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono-tech tracking-widest text-slate-400 uppercase font-bold">
                VIETREMIX FIT CARD #2026-VN
              </span>
            </div>
            <span className="text-[10px] font-mono-tech text-amber-400/90 px-2 py-0.5 rounded bg-slate-900 border border-amber-500/20">
              GEN Z EDITION
            </span>
          </div>

          {/* Garment Title & Silhouette */}
          <div className="text-center py-2">
            <h3 className="text-xl font-bold font-heritage text-white tracking-wide">
              {garment.name}
            </h3>
            <span className="text-xs text-amber-400 font-mono-tech block mt-0.5">
              {garment.era}
            </span>
          </div>

          {/* Cultural Seal Stamp */}
          <div
            className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
              isSafe
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/40 border-red-500/40 text-red-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSafe ? (
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              ) : (
                <ShieldAlert className="w-6 h-6 text-red-400" />
              )}
              <div>
                <span className="text-xs font-bold font-heritage block">
                  {isSafe ? 'BẢO CHỨNG DI SẢN CHUẨN XÁC' : 'CẢNH BÁO VI PHẠM CẤM KỴ'}
                </span>
                <span className="text-[10px] text-slate-300">
                  {isSafe ? '100% Verified Cultural Guardrail' : 'Breach Detected - Needs Fix'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-black font-mono-tech">
                {audit.score}%
              </span>
            </div>
          </div>

          {/* Outfit Inventory Grid */}
          <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400 font-mono-tech text-[11px]">Chất liệu:</span>
              <span className="font-semibold text-slate-200">{outfit.fabric}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400 font-mono-tech text-[11px]">Kiểu mặc:</span>
              <span className="font-semibold text-slate-200">
                {outfit.lapelOrientation === 'open_drape'
                  ? 'Khoác buông Cardigan'
                  : outfit.lapelOrientation === 'button_right'
                  ? 'Cài khít sườn phải'
                  : 'Vạt trái đè vạt phải'}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400 font-mono-tech text-[11px]">Streetwear Bottom:</span>
              <span className="font-semibold text-slate-200">
                {outfit.bottom === 'cargo_pants' && 'Quần Cargo túi hộp'}
                {outfit.bottom === 'jeans_baggy' && 'Jeans baggy rách'}
                {outfit.bottom === 'pleated_skirt' && 'Chân váy xếp ly Y2K'}
                {outfit.bottom === 'wide_trousers' && 'Quần suông rộng'}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400 font-mono-tech text-[11px]">Footwear:</span>
              <span className="font-semibold text-slate-200">
                {outfit.footwear === 'chunky_sneaker' && 'Chunky Sneaker'}
                {outfit.footwear === 'leather_boots' && 'Bốt da cao cổ'}
                {outfit.footwear === 'platform_loafers' && 'Loafer đế bục'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-mono-tech text-[11px]">Phụ kiện:</span>
              <span className="font-semibold text-amber-300">
                {outfit.accessories.length > 0
                  ? outfit.accessories.join(', ')
                  : 'Trơn mộc'}
              </span>
            </div>
          </div>

          {/* Watermark quote */}
          <div className="text-center text-[10px] text-slate-500 font-mono-tech italic pt-1">
            "Sáng tạo không rào cản - Gìn giữ trọn cội nguồn"
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-950 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Đã Sao Chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao Chép Thẻ Fit</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all active:scale-95"
          >
            <span>Tiếp Tục Phối Đồ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
