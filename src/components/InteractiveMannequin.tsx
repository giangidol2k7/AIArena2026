import React from 'react';
import { OutfitConfig, GuardrailAuditResult } from '../data/culturalKnowledgeBase';
import { AlertTriangle, CheckCircle2, Sparkles, Info } from 'lucide-react';

interface InteractiveMannequinProps {
  outfit: OutfitConfig;
  audit: GuardrailAuditResult;
  onUpdateOutfit: (updates: Partial<OutfitConfig>) => void;
  onSelectHotspot?: (topic: string) => void;
}

export const InteractiveMannequin: React.FC<InteractiveMannequinProps> = ({
  outfit,
  audit,
  onUpdateOutfit,
  onSelectHotspot,
}) => {
  const isNguthanso = outfit.garmentId === 'ngu_than_lap_linh';
  const isNhatbinh = outfit.garmentId === 'nhat_binh';
  const isGiaolinh = outfit.garmentId === 'giao_linh';

  // Fabric texture representation
  const getFabricTextureClass = () => {
    switch (outfit.fabric) {
      case 'Denim nhẹ':
        return 'contrast-125 saturate-150';
      case 'Silk':
        return 'brightness-110';
      case 'Đũi':
        return 'opacity-95';
      case 'Linen':
        return 'opacity-90';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full h-[580px] bg-slate-900/80 rounded-2xl border border-slate-800 p-4 flex flex-col items-center justify-between overflow-hidden shadow-2xl backdrop-blur-sm">
      {/* Background ambient glow according to audit status */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
          audit.status === 'TABOO_VIOLATION'
            ? 'bg-red-950/20 shadow-[inset_0_0_80px_rgba(239,68,68,0.15)]'
            : audit.status === 'FLEXIBLE_OK'
            ? 'bg-amber-950/15 shadow-[inset_0_0_80px_rgba(245,158,11,0.12)]'
            : 'bg-emerald-950/15 shadow-[inset_0_0_80px_rgba(16,185,129,0.12)]'
        }`}
      />

      {/* Top Header Over Mannequin */}
      <div className="w-full flex items-center justify-between z-10 px-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono-tech px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700 text-slate-300">
            {isNguthanso && 'Áo Ngũ Thân Lập Lĩnh'}
            {isNhatbinh && 'Áo Nhật Bình'}
            {isGiaolinh && 'Áo Giao Lĩnh'}
          </span>
          <span className="text-[11px] font-mono-tech px-2 py-0.5 rounded bg-slate-800/60 text-amber-400/90 border border-amber-500/20">
            {outfit.fabric}
          </span>
        </div>

        {/* Quick status pill */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border ${
            audit.status === 'TABOO_VIOLATION'
              ? 'bg-red-500/20 text-red-300 border-red-500/50'
              : audit.status === 'FLEXIBLE_OK'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
          }`}
        >
          {audit.status === 'TABOO_VIOLATION' ? (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>Phạm Cấm Kỵ ({audit.violations.length})</span>
            </>
          ) : audit.status === 'FLEXIBLE_OK' ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Vùng Biến Tấu Hợp Lệ</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chuẩn Mực Di Sản</span>
            </>
          )}
        </div>
      </div>

      {/* Central Interactive SVG Mannequin Canvas */}
      <div className="relative w-full max-w-[320px] h-[460px] flex items-center justify-center z-10">
        <svg
          viewBox="0 0 320 480"
          className={`w-full h-full filter drop-shadow-2xl select-none ${getFabricTextureClass()}`}
        >
          <defs>
            <linearGradient id="garmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={outfit.garmentColor} stopOpacity="0.95" />
              <stop offset="100%" stopColor={outfit.garmentColor} stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.6" />
            </linearGradient>

            {/* Ngũ hành 5-colors for Nhật Bình sleeve cuffs */}
            <linearGradient id="nguHanhCuff" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="20%" stopColor="#ef4444" />
              <stop offset="40%" stopColor="#eab308" />
              <stop offset="60%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* Grid reference & mannequin base shadow */}
          <ellipse cx="160" cy="460" rx="75" ry="14" fill="#0f172a" opacity="0.8" />

          {/* MANNEQUIN BODY SILHOUETTE (Cyber Minimalist Street Model) */}
          {/* Head & Neck */}
          <circle cx="160" cy="48" r="22" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <path d="M152 70 L152 86 L168 86 L168 70 Z" fill="#334155" />

          {/* Accessories: Sunglasses */}
          {outfit.accessories.includes('sunglasses') && (
            <g className="cursor-pointer" onClick={() => onSelectHotspot?.('sunglasses')}>
              <rect x="144" y="42" width="32" height="8" rx="2" fill="#090a0f" stroke="#38bdf8" strokeWidth="1.2" />
              <line x1="160" y1="46" x2="160" y2="46" stroke="#38bdf8" strokeWidth="2" />
            </g>
          )}

          {/* Accessories: Cap or Bucket Hat */}
          {outfit.accessories.includes('cap') && (
            <path d="M136 38 C136 24, 184 24, 184 38 L198 42 L136 42 Z" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.2" />
          )}
          {outfit.accessories.includes('bucket_hat') && (
            <path d="M138 32 L144 22 L176 22 L182 32 L196 40 L124 40 Z" fill="#1e293b" stroke="#475569" strokeWidth="1.2" />
          )}

          {/* STREETWEAR INNER LAYER (Visible when garment is open drape) */}
          {outfit.innerLayer !== 'none' && (
            <g id="inner-layer">
              {outfit.innerLayer === 'crop_top' && (
                <path
                  d="M134 94 L186 94 L180 148 L140 148 Z"
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
              )}
              {outfit.innerLayer === 'tshirt_oversize' && (
                <path
                  d="M130 90 L190 90 L188 185 L132 185 Z"
                  fill="#020617"
                  stroke="#38bdf8"
                  strokeWidth="1"
                />
              )}
              {outfit.innerLayer === 'thin_hoodie' && (
                <g>
                  <path
                    d="M130 86 L190 86 L188 190 L132 190 Z"
                    fill="#18181b"
                    stroke="#52525b"
                    strokeWidth="1.5"
                  />
                  {/* Drawstring */}
                  <line x1="152" y1="96" x2="152" y2="128" stroke="#a1a1aa" strokeWidth="1.5" />
                  <line x1="168" y1="96" x2="168" y2="128" stroke="#a1a1aa" strokeWidth="1.5" />
                </g>
              )}
            </g>
          )}

          {/* STREETWEAR BOTTOM LAYER */}
          <g id="bottom-layer">
            {outfit.bottom === 'cargo_pants' && (
              <g>
                {/* Baggy cargo legs */}
                <path
                  d="M134 200 L122 380 L148 380 L160 250 L172 380 L198 380 L186 200 Z"
                  fill="#0f172a"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                {/* Cargo pockets */}
                <rect x="118" y="270" width="16" height="28" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                <rect x="186" y="270" width="16" height="28" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                <line x1="118" y1="282" x2="134" y2="282" stroke="#64748b" strokeWidth="1" />
                <line x1="186" y1="282" x2="202" y2="282" stroke="#64748b" strokeWidth="1" />
              </g>
            )}

            {outfit.bottom === 'jeans_baggy' && (
              <g>
                <path
                  d="M134 200 L120 380 L150 380 L160 250 L170 380 L200 380 L186 200 Z"
                  fill="#1e3a8a"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                />
                {/* Distressed marks */}
                <line x1="130" y1="290" x2="142" y2="290" stroke="#93c5fd" strokeWidth="1.5" />
                <line x1="178" y1="310" x2="190" y2="310" stroke="#93c5fd" strokeWidth="1.5" />
              </g>
            )}

            {outfit.bottom === 'pleated_skirt' && (
              <g>
                <path
                  d="M138 190 L182 190 L210 270 L110 270 Z"
                  fill="#111827"
                  stroke="#4b5563"
                  strokeWidth="1.5"
                />
                {/* Pleats */}
                <line x1="130" y1="190" x2="125" y2="270" stroke="#374151" strokeWidth="1" />
                <line x1="145" y1="190" x2="145" y2="270" stroke="#374151" strokeWidth="1" />
                <line x1="160" y1="190" x2="160" y2="270" stroke="#374151" strokeWidth="1" />
                <line x1="175" y1="190" x2="175" y2="270" stroke="#374151" strokeWidth="1" />
                <line x1="190" y1="190" x2="195" y2="270" stroke="#374151" strokeWidth="1" />
                {/* Legs exposed for skirt */}
                <path d="M136 270 L134 380 L150 380 L148 270 Z" fill="#334155" />
                <path d="M170 270 L172 380 L186 380 L184 270 Z" fill="#334155" />
              </g>
            )}

            {outfit.bottom === 'wide_trousers' && (
              <path
                d="M136 195 L116 380 L152 380 L160 250 L168 380 L204 380 L184 195 Z"
                fill="#18181b"
                stroke="#3f3f46"
                strokeWidth="1.5"
              />
            )}
          </g>

          {/* FOOTWEAR */}
          <g id="footwear-layer">
            {outfit.footwear === 'chunky_sneaker' && (
              <g>
                {/* Left Chunky Sneaker */}
                <path d="M120 378 L148 378 L152 408 L114 408 Z" fill="#f8fafc" stroke="#090a0f" strokeWidth="2" />
                <rect x="110" y="400" width="44" height="12" rx="4" fill="#020617" />
                {/* Right Chunky Sneaker */}
                <path d="M172 378 L200 378 L206 408 L168 408 Z" fill="#f8fafc" stroke="#090a0f" strokeWidth="2" />
                <rect x="166" y="400" width="44" height="12" rx="4" fill="#020617" />
              </g>
            )}

            {outfit.footwear === 'leather_boots' && (
              <g>
                {/* Combat high boots */}
                <path d="M122 340 L148 340 L152 410 L112 410 L118 340 Z" fill="#090a0f" stroke="#475569" strokeWidth="1.5" />
                <path d="M172 340 L198 340 L208 410 L168 410 L172 340 Z" fill="#090a0f" stroke="#475569" strokeWidth="1.5" />
                <rect x="110" y="402" width="44" height="10" rx="2" fill="#ca8a04" />
                <rect x="166" y="402" width="44" height="10" rx="2" fill="#ca8a04" />
              </g>
            )}

            {outfit.footwear === 'platform_loafers' && (
              <g>
                <path d="M122 375 L150 375 L152 408 L116 408 Z" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
                <path d="M170 375 L198 375 L204 408 L168 408 Z" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
                <rect x="114" y="398" width="40" height="12" rx="2" fill="#090a0f" />
                <rect x="166" y="398" width="40" height="12" rx="2" fill="#090a0f" />
              </g>
            )}
          </g>

          {/* ================= TRADITIONAL GARMENT LAYER ================= */}

          {/* 1. ÁO NGŨ THÂN LẬP LĨNH */}
          {isNguthanso && (
            <g id="garment-ngu-than">
              {/* Sleeves */}
              <path
                d="M130 90 L60 170 L82 188 L134 135 Z"
                fill="url(#garmentGrad)"
                stroke="#d97706"
                strokeWidth="0.8"
              />
              <path
                d="M190 90 L260 170 L238 188 L186 135 Z"
                fill="url(#garmentGrad)"
                stroke="#d97706"
                strokeWidth="0.8"
              />

              {/* Main Robe Body */}
              {outfit.lapelOrientation === 'open_drape' ? (
                /* Cardigan / Trench coat open drape mode (Flexible Zone) */
                <g>
                  {/* Left draped panel */}
                  <path
                    d={
                      outfit.isCropped
                        ? 'M130 86 L108 170 L140 170 L144 86 Z'
                        : 'M130 86 L94 310 L144 310 L148 86 Z'
                    }
                    fill="url(#garmentGrad)"
                    stroke="#b45309"
                    strokeWidth="1.2"
                  />
                  {/* Right draped panel */}
                  <path
                    d={
                      outfit.isCropped
                        ? 'M190 86 L212 170 L180 170 L176 86 Z'
                        : 'M190 86 L226 310 L176 310 L172 86 Z'
                    }
                    fill="url(#garmentGrad)"
                    stroke="#b45309"
                    strokeWidth="1.2"
                  />
                </g>
              ) : (
                /* Standard buttoned robe */
                <path
                  d={
                    outfit.isCropped
                      ? 'M130 86 L100 170 L220 170 L190 86 Z'
                      : 'M130 86 L80 320 L240 320 L190 86 Z'
                  }
                  fill="url(#garmentGrad)"
                  stroke="#b45309"
                  strokeWidth="1.2"
                />
              )}

              {/* Lập lĩnh: Stand-up collar */}
              <rect
                x="146"
                y="74"
                width="28"
                height="14"
                rx="3"
                fill={outfit.garmentColor}
                stroke="#f59e0b"
                strokeWidth="1.5"
                className="cursor-pointer"
                onClick={() => onSelectHotspot?.('lap_linh')}
              />

              {/* 5 Cúc (Buttons) - Down the right chest side OR wrong side */}
              {outfit.lapelOrientation !== 'open_drape' && (
                <g id="cuc-5-vi-tri" className="cursor-pointer" onClick={() => onSelectHotspot?.('cuc_ao')}>
                  {outfit.lapelOrientation === 'button_right' ? (
                    /* CORRECT: Cài khít bên phải */
                    <>
                      <circle cx="174" cy="88" r="3.5" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
                      <circle cx="180" cy="102" r="3.5" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
                      <circle cx="185" cy="118" r="3.5" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
                      <circle cx="182" cy="136" r="3.5" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
                      <circle cx="178" cy="154" r="3.5" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
                      {/* Curved lapel overlap line */}
                      <path d="M164 88 Q185 96 182 165" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
                    </>
                  ) : (
                    /* WRONG TABOO: Cài sang bên trái */
                    <>
                      <circle cx="146" cy="88" r="3.5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
                      <circle cx="140" cy="102" r="3.5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
                      <circle cx="135" cy="118" r="3.5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
                      <circle cx="138" cy="136" r="3.5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
                      <circle cx="142" cy="154" r="3.5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
                      <path d="M156 88 Q135 96 138 165" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                    </>
                  )}
                </g>
              )}

              {/* Crop-top taboo visualization indicator */}
              {outfit.isCropped && (
                <g>
                  <line x1="88" y1="172" x2="232" y2="172" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 4" />
                  <rect x="110" y="156" width="100" height="18" rx="4" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
                  <text x="160" y="169" fill="#fecaca" fontSize="9" textAnchor="middle" fontWeight="bold">
                    CẮT NGẮN CROP-TOP (TABOO)
                  </text>
                </g>
              )}

              {/* Royal Motif taboo indicator */}
              {outfit.hasRoyalMotif && (
                <g className="cursor-pointer" onClick={() => onSelectHotspot?.('royal_motif')}>
                  <circle cx="160" cy="120" r="14" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="160" y="124" fill="#f87171" fontSize="12" textAnchor="middle" fontWeight="bold">
                    🐉
                  </text>
                </g>
              )}
            </g>
          )}

          {/* 2. ÁO NHẬT BÌNH */}
          {isNhatbinh && (
            <g id="garment-nhat-binh">
              {/* Sleeves with Ngũ Hành (5 Colors) at cuffs */}
              <path
                d="M130 90 L52 172 L76 194 L134 135 Z"
                fill="url(#garmentGrad)"
                stroke="#d97706"
                strokeWidth="0.8"
              />
              <path
                d="M190 90 L268 172 L244 194 L186 135 Z"
                fill="url(#garmentGrad)"
                stroke="#d97706"
                strokeWidth="0.8"
              />

              {/* Ngũ Hành Cuff Strips at Sleeve Ends */}
              <rect x="52" y="174" width="24" height="14" fill="url(#nguHanhCuff)" rx="1" transform="rotate(-40 64 180)" />
              <rect x="244" y="174" width="24" height="14" fill="url(#nguHanhCuff)" rx="1" transform="rotate(40 256 180)" />

              {/* Robe Body */}
              <path
                d={
                  outfit.slitHeight === 'high_slit'
                    ? 'M130 86 L100 240 L220 240 L190 86 Z'
                    : 'M130 86 L80 320 L240 320 L190 86 Z'
                }
                fill="url(#garmentGrad)"
                stroke="#b45309"
                strokeWidth="1.2"
              />

              {/* High slit taboo cut indicator */}
              {outfit.slitHeight === 'high_slit' && (
                <g>
                  <line x1="80" y1="230" x2="105" y2="150" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="240" y1="230" x2="215" y2="150" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                </g>
              )}

              {/* Dải Cổ Áo Bản To Hình Chữ Nhật Đặc Trưng Ghép Trước Ngực */}
              {outfit.hasRectangularCollar ? (
                outfit.isCollarHiddenOrCovered ? (
                  /* TABOO: Vắt chéo che mất dải cổ chữ Nhật */
                  <g>
                    <path d="M120 90 L200 170" stroke="#ef4444" strokeWidth="4" />
                    <text x="160" y="130" fill="#fca5a5" fontSize="8" textAnchor="middle" fontWeight="bold">
                      BỊ CHE DẢI CỔ (TABOO)
                    </text>
                  </g>
                ) : (
                  /* AUTHENTIC RECTANGULAR COLLAR BADGE */
                  <g className="cursor-pointer" onClick={() => onSelectHotspot?.('nhat_binh_co')}>
                    {/* The prominent rectangular collar band down chest */}
                    <path
                      d="M142 84 L142 185 L156 185 L156 84 Z"
                      fill="#eab308"
                      stroke="#ca8a04"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M164 84 L164 185 L178 185 L178 84 Z"
                      fill="#eab308"
                      stroke="#ca8a04"
                      strokeWidth="1.2"
                    />
                    {/* Top connecting neck strap */}
                    <rect x="142" y="74" width="36" height="12" fill="#ca8a04" rx="2" />
                    {/* Gem/Metal closure buttons down center */}
                    <circle cx="160" cy="110" r="3.5" fill="#f8fafc" stroke="#ca8a04" strokeWidth="1" />
                    <circle cx="160" cy="140" r="3.5" fill="#f8fafc" stroke="#ca8a04" strokeWidth="1" />
                    <circle cx="160" cy="170" r="3.5" fill="#f8fafc" stroke="#ca8a04" strokeWidth="1" />
                  </g>
                )
              ) : (
                /* TABOO: Tháo bỏ hoàn toàn dải cổ áo chữ Nhật */
                <g>
                  <rect x="144" y="80" width="32" height="100" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="160" y="130" fill="#f87171" fontSize="8" textAnchor="middle" fontWeight="bold">
                    MẤT CỔ CHỮ NHẬT
                  </text>
                </g>
              )}
            </g>
          )}

          {/* 3. ÁO GIAO LĨNH */}
          {isGiaolinh && (
            <g id="garment-giao-linh">
              {/* Wide flared sleeves */}
              <path
                d="M130 90 L40 180 L70 210 L134 140 Z"
                fill="url(#garmentGrad)"
                stroke="#d97706"
                strokeWidth="0.8"
              />
              <path
                d="M190 90 L280 180 L250 210 L186 140 Z"
                fill="url(#garmentGrad)"
                stroke="#d97706"
                strokeWidth="0.8"
              />

              {/* Robe Body */}
              <path
                d="M130 86 L70 330 L250 330 L190 86 Z"
                fill="url(#garmentGrad)"
                stroke="#b45309"
                strokeWidth="1.2"
              />

              {/* Crossed Lapel Collar */}
              <g className="cursor-pointer" onClick={() => onSelectHotspot?.('giao_linh_lapel')}>
                {outfit.lapelOrientation === 'left_over_right' ? (
                  /* CORRECT: Vạt TRÁI đè lên vạt PHẢI */
                  <>
                    {/* Right underlap */}
                    <path d="M190 84 L135 155" stroke="#f59e0b" strokeWidth="3" opacity="0.6" />
                    {/* Left overlap on top */}
                    <path d="M130 84 L185 155" stroke="#fef08a" strokeWidth="4" />
                    <line x1="185" y1="155" x2="190" y2="200" stroke="#fef08a" strokeWidth="2" />
                  </>
                ) : (
                  /* TABOO: Vạt PHẢI đè lên vạt TRÁI */
                  <>
                    <path d="M130 84 L185 155" stroke="#991b1b" strokeWidth="3" opacity="0.6" />
                    <path d="M190 84 L135 155" stroke="#ef4444" strokeWidth="4" />
                    <text x="160" y="130" fill="#fca5a5" fontSize="8" textAnchor="middle" fontWeight="bold">
                      NGƯỢC VẠT (TABOO)
                    </text>
                  </>
                )}
              </g>

              {/* Revealing neckline alert */}
              {outfit.isCollarRevealing && (
                <path d="M140 100 L180 100 L160 140 Z" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
              )}

              {/* Leather Belt Accessory */}
              {outfit.accessories.includes('leather_belt') && (
                <g className="cursor-pointer" onClick={() => onSelectHotspot?.('leather_belt')}>
                  <rect x="120" y="185" width="80" height="10" fill="#1c1917" stroke="#ca8a04" strokeWidth="1" />
                  <rect x="154" y="182" width="12" height="16" fill="#eab308" rx="2" stroke="#78350f" strokeWidth="1" />
                </g>
              )}
            </g>
          )}

          {/* Quick info icon hotspot on collar */}
          <g className="cursor-pointer opacity-80 hover:opacity-100" onClick={() => onSelectHotspot?.('structural_rules')}>
            <circle cx="160" cy="80" r="9" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
            <text x="160" y="83" fill="#f59e0b" fontSize="9" textAnchor="middle" fontWeight="bold">i</text>
          </g>
        </svg>

        {/* Floating Quick Action overlay over mannequin */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-auto">
          {/* Fabric quick switch chips */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-[10px]">
            {(['Linen', 'Đũi', 'Denim nhẹ', 'Silk', 'Khaki'] as OutfitConfig['fabric'][]).map((f) => (
              <button
                key={f}
                onClick={() => onUpdateOutfit({ fabric: f })}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  outfit.fabric === f
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Color preview circle */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono-tech">Màu:</span>
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
              style={{ backgroundColor: outfit.garmentColor }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Mannequin Footer Guide */}
      <div className="w-full flex items-center justify-between text-[11px] text-slate-400 z-10 px-1 pt-2 border-t border-slate-800/60">
        <span className="flex items-center gap-1 text-slate-400">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>Click vào các chi tiết (cổ, cúc, vạt) để xem giải nghĩa di sản</span>
        </span>
        <span className="font-mono-tech text-slate-500 text-[10px]">
          VietRemix Vector Canvas v2.4
        </span>
      </div>
    </div>
  );
};
