import React, { useState } from 'react';
import { OutfitConfig } from '../data/culturalKnowledgeBase';
import {
  Layers,
  Sparkles,
  Scissors,
  Palette,
  Footprints,
  Shirt,
  Glasses,
  Flame,
  AlertTriangle,
} from 'lucide-react';

interface RemixControlsProps {
  outfit: OutfitConfig;
  onUpdateOutfit: (updates: Partial<OutfitConfig>) => void;
  onSelectPreset: (presetId: string) => void;
}

const COLOR_PALETTES = [
  { name: 'Đỏ Sơn Mài', hex: '#be123c' },
  { name: 'Vàng Cung Đình', hex: '#eab308' },
  { name: 'Chàm Indigo', hex: '#1e3a8a' },
  { name: 'Đen Mun Bụi Phủ', hex: '#0f172a' },
  { name: 'Xanh Rêu Đũi', hex: '#365314' },
  { name: 'Cát Mộc Linen', hex: '#78716c' },
];

export const RemixControls: React.FC<RemixControlsProps> = ({
  outfit,
  onUpdateOutfit,
  onSelectPreset,
}) => {
  const [activeCategory, setActiveCategory] = useState<'garment' | 'streetwear' | 'presets'>('garment');

  const isNguthanso = outfit.garmentId === 'ngu_than_lap_linh';
  const isNhatbinh = outfit.garmentId === 'nhat_binh';
  const isGiaolinh = outfit.garmentId === 'giao_linh';

  const toggleAccessory = (acc: string) => {
    const exists = outfit.accessories.includes(acc);
    if (exists) {
      onUpdateOutfit({ accessories: outfit.accessories.filter((a) => a !== acc) });
    } else {
      onUpdateOutfit({ accessories: [...outfit.accessories, acc] });
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl backdrop-blur-sm flex flex-col gap-5">
      {/* Category Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveCategory('garment')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === 'garment'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>Việt Phục Cốt Lõi</span>
          </button>
          <button
            onClick={() => setActiveCategory('streetwear')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === 'streetwear'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Streetwear Layering</span>
          </button>
          <button
            onClick={() => setActiveCategory('presets')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === 'presets'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>Thử Thách &amp; Presets</span>
          </button>
        </div>
      </div>

      {/* CATEGORY 1: VIỆT PHỤC CỐT LÕI */}
      {activeCategory === 'garment' && (
        <div className="flex flex-col gap-5">
          {/* Garment Selector */}
          <div>
            <label className="text-xs font-mono-tech uppercase font-bold text-slate-400 block mb-2">
              1. Chọn Loại Cổ Phục Việt Nam:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() =>
                  onUpdateOutfit({
                    garmentId: 'ngu_than_lap_linh',
                    lapelOrientation: 'button_right',
                    isCropped: false,
                    hasRoyalMotif: false,
                  })
                }
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                  isNguthanso
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="font-bold text-xs">Áo Ngũ Thân Lập Lĩnh</span>
                <span className="text-[10px] text-slate-400">Triều Nguyễn (1802 - 1945)</span>
                <span className="text-[10px] text-amber-400/80">5 vạt, 5 cúc, cổ đứng cài phải</span>
              </button>

              <button
                onClick={() =>
                  onUpdateOutfit({
                    garmentId: 'nhat_binh',
                    lapelOrientation: 'open_drape',
                    hasRectangularCollar: true,
                    isCollarHiddenOrCovered: false,
                    slitHeight: 'standard',
                  })
                }
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                  isNhatbinh
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="font-bold text-xs">Áo Nhật Bình</span>
                <span className="text-[10px] text-slate-400">Triều Nguyễn (1802 - 1945)</span>
                <span className="text-[10px] text-amber-400/80">Dải cổ chữ Nhật, tay ngũ hành</span>
              </button>

              <button
                onClick={() =>
                  onUpdateOutfit({
                    garmentId: 'giao_linh',
                    lapelOrientation: 'left_over_right',
                    isCollarRevealing: false,
                  })
                }
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                  isGiaolinh
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="font-bold text-xs">Áo Giao Lĩnh</span>
                <span className="text-[10px] text-slate-400">Thời Lý - Trần - Lê - Nguyễn</span>
                <span className="text-[10px] text-amber-400/80">Cổ giao nhau (trái đè phải)</span>
              </button>
            </div>
          </div>

          {/* Quy Cách Cài Vạt & Cổ Áo (Critical Guardrail Control) */}
          <div>
            <label className="text-xs font-mono-tech uppercase font-bold text-slate-400 block mb-2 flex items-center justify-between">
              <span>2. Kiểu Mặc &amp; Nếp Cài Vạt:</span>
              <span className="text-[10px] text-amber-400/80 font-normal">
                (Khu vực kiểm định nghiêm ngặt)
              </span>
            </label>

            {isNguthanso && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => onUpdateOutfit({ lapelOrientation: 'button_right' })}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                    outfit.lapelOrientation === 'button_right'
                      ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Cài Khít Bên Phải</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Chuẩn Lập Lĩnh triều Nguyễn
                  </span>
                </button>

                <button
                  onClick={() => onUpdateOutfit({ lapelOrientation: 'open_drape' })}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                    outfit.lapelOrientation === 'open_drape'
                      ? 'bg-amber-950/50 border-amber-500 text-amber-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Khoác Buông Vạt (Trench/Cardigan)</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Vùng biến tấu Gen Z hợp lệ
                  </span>
                </button>

                <button
                  onClick={() => onUpdateOutfit({ lapelOrientation: 'button_left' })}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                    outfit.lapelOrientation === 'button_left'
                      ? 'bg-red-950/50 border-red-500 text-red-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-red-500/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span>Cài Vắt Sang Trái</span>
                  </div>
                  <span className="text-[10px] text-red-400 block mt-1">
                    ⚠️ Điều cấm kỵ (Hard Taboo)
                  </span>
                </button>
              </div>
            )}

            {isNhatbinh && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() =>
                    onUpdateOutfit({
                      lapelOrientation: 'open_drape',
                      hasRectangularCollar: true,
                      isCollarHiddenOrCovered: false,
                    })
                  }
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                    outfit.lapelOrientation === 'open_drape' && !outfit.isCollarHiddenOrCovered
                      ? 'bg-amber-950/50 border-amber-500 text-amber-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Khoác Ngoài Cardigan/Kimono</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Giữ trọn dải cổ chữ Nhật trước ngực
                  </span>
                </button>

                <button
                  onClick={() =>
                    onUpdateOutfit({
                      isCollarHiddenOrCovered: !outfit.isCollarHiddenOrCovered,
                    })
                  }
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                    outfit.isCollarHiddenOrCovered
                      ? 'bg-red-950/50 border-red-500 text-red-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-red-500/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span>Mặc Vắt Chéo Che Cổ</span>
                  </div>
                  <span className="text-[10px] text-red-400 block mt-1">
                    ⚠️ Điều cấm kỵ (Che mất dải cổ)
                  </span>
                </button>

                <button
                  onClick={() =>
                    onUpdateOutfit({
                      hasRectangularCollar: !outfit.hasRectangularCollar,
                    })
                  }
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                    !outfit.hasRectangularCollar
                      ? 'bg-red-950/50 border-red-500 text-red-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-red-500/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span>Tháo Bỏ Cổ Chữ Nhật</span>
                  </div>
                  <span className="text-[10px] text-red-400 block mt-1">
                    ⚠️ Điều cấm kỵ (Mất cốt lõi)
                  </span>
                </button>
              </div>
            )}

            {isGiaolinh && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => onUpdateOutfit({ lapelOrientation: 'left_over_right' })}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                    outfit.lapelOrientation === 'left_over_right'
                      ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Vạt Trái Đè Vạt Phải</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Quy chuẩn ngàn năm thời Lý - Trần - Lê
                  </span>
                </button>

                <button
                  onClick={() => onUpdateOutfit({ lapelOrientation: 'right_over_left' })}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                    outfit.lapelOrientation === 'right_over_left'
                      ? 'bg-red-950/50 border-red-500 text-red-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-red-500/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span>Vạt Phải Đè Vạt Trái</span>
                  </div>
                  <span className="text-[10px] text-red-400 block mt-1">
                    ⚠️ Điều cấm kỵ (Phạm quy cổ lễ)
                  </span>
                </button>

                <button
                  onClick={() => onUpdateOutfit({ isCollarRevealing: !outfit.isCollarRevealing })}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                    outfit.isCollarRevealing
                      ? 'bg-red-950/50 border-red-500 text-red-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span>Biến Tấu Hở Hang Cổ</span>
                  </div>
                  <span className="text-[10px] text-red-400 block mt-1">
                    ⚠️ Cấm kỵ hở quá đà
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* ĐỘ DÀI & HỌA TIẾT (Crop Cut & Royal Motifs Taboos) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Crop toggle */}
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cắt Ngắn Vạt Thành Crop-top</span>
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {isNguthanso
                    ? 'Ngũ thân cấm cắt croptop (mất Tứ thân phụ mẫu)'
                    : 'Kiểm soát tỷ lệ chiều dài tà áo'}
                </span>
              </div>
              <button
                onClick={() => onUpdateOutfit({ isCropped: !outfit.isCropped })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  outfit.isCropped
                    ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {outfit.isCropped ? 'Đã Cắt (Taboo)' : 'Độ Dài Chuẩn'}
              </button>
            </div>

            {/* Royal Motif toggle */}
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Họa Tiết Hoàng Gia (Rồng 5 móng)</span>
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Cấm in/thêu rồng hoàng gia khi phối bụi phủi
                </span>
              </div>
              <button
                onClick={() => onUpdateOutfit({ hasRoyalMotif: !outfit.hasRoyalMotif })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  outfit.hasRoyalMotif
                    ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {outfit.hasRoyalMotif ? 'Có In (Taboo)' : 'Trơn / Mộc'}
              </button>
            </div>
          </div>

          {/* CHẤT LIỆU & BẢNG MÀU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Fabrics */}
            <div>
              <label className="text-xs font-mono-tech uppercase font-bold text-slate-400 block mb-2">
                Chất Liệu Hiện Đại (Vùng Linh Hoạt):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(['Linen', 'Đũi', 'Denim nhẹ', 'Silk', 'Khaki'] as OutfitConfig['fabric'][]).map(
                  (fab) => (
                    <button
                      key={fab}
                      onClick={() => onUpdateOutfit({ fabric: fab })}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        outfit.fabric === fab
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {fab}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="text-xs font-mono-tech uppercase font-bold text-slate-400 block mb-2">
                Bảng Màu Di Sản:
              </label>
              <div className="flex items-center gap-2">
                {COLOR_PALETTES.map((pal) => (
                  <button
                    key={pal.hex}
                    onClick={() => onUpdateOutfit({ garmentColor: pal.hex })}
                    title={pal.name}
                    className={`w-7 h-7 rounded-full transition-transform border-2 ${
                      outfit.garmentColor === pal.hex
                        ? 'scale-110 border-white ring-2 ring-amber-400'
                        : 'border-slate-700 hover:scale-105'
                    }`}
                    style={{ backgroundColor: pal.hex }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 2: STREETWEAR LAYERING */}
      {activeCategory === 'streetwear' && (
        <div className="flex flex-col gap-4">
          {/* Inner Layer */}
          <div>
            <label className="text-xs font-mono-tech uppercase font-bold text-slate-400 block mb-2">
              Lớp Áo Bên Trong (Inner Layer):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { id: 'none', label: 'Không mặc lót' },
                { id: 'crop_top', label: 'Crop-top ôm' },
                { id: 'tshirt_oversize', label: 'Tee Oversize' },
                { id: 'thin_hoodie', label: 'Hoodie Mỏng (Giao Lĩnh)' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onUpdateOutfit({ innerLayer: item.id as OutfitConfig['innerLayer'] })}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    outfit.innerLayer === item.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div>
            <label className="text-xs font-mono-tech uppercase font-bold text-slate-400 block mb-2">
              Quần / Chân Váy (Bottoms):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { id: 'cargo_pants', label: 'Quần Cargo túi hộp' },
                { id: 'jeans_baggy', label: 'Jeans baggy rách gối' },
                { id: 'pleated_skirt', label: 'Chân váy xếp ly Y2K' },
                { id: 'wide_trousers', label: 'Quần suông rộng' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onUpdateOutfit({ bottom: item.id as OutfitConfig['bottom'] })}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    outfit.bottom === item.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Footwear */}
          <div>
            <label className="text-xs font-mono-tech uppercase font-bold text-slate-400 block mb-2 flex items-center gap-1.5">
              <Footprints className="w-3.5 h-3.5 text-amber-400" />
              <span>Giày Dép (Footwear):</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'chunky_sneaker', label: 'Chunky Sneaker (Salomon/AF1)' },
                { id: 'leather_boots', label: 'Bốt da cổ cao (Combat/Chelsea)' },
                { id: 'platform_loafers', label: 'Loafer đế bục Y2K' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onUpdateOutfit({ footwear: item.id as OutfitConfig['footwear'] })}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    outfit.footwear === item.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div>
            <label className="text-xs font-mono-tech uppercase font-bold text-slate-400 block mb-2 flex items-center gap-1.5">
              <Glasses className="w-3.5 h-3.5 text-amber-400" />
              <span>Phụ Kiện Gen Z (Accessories):</span>
            </label>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'sunglasses', label: 'Kính râm Y2K Cyber' },
                { id: 'cap', label: 'Mũ Cap Streetwear' },
                { id: 'bucket_hat', label: 'Mũ Bucket Thêu' },
                { id: 'leather_belt', label: 'Thắt lưng da (Leather belt)' },
              ].map((acc) => {
                const active = outfit.accessories.includes(acc.id);
                return (
                  <button
                    key={acc.id}
                    onClick={() => toggleAccessory(acc.id)}
                    className={`px-3 py-1.5 rounded-lg border transition-all ${
                      active
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {active ? '✓ ' : '+ '}
                    {acc.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 3: THỬ THÁCH & PRESET LOOKBOOK */}
      {activeCategory === 'presets' && (
        <div className="flex flex-col gap-4">
          <p className="text-xs text-slate-300">
            Khám phá các bản phối mẫu để thấy cách hệ thống Cultural Guardrail bảo vệ di sản trong khi vẫn giúp Gen Z tự do sáng tạo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => onSelectPreset('cyber-ngu-than')}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 text-left flex flex-col gap-1 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-300 group-hover:text-amber-200">
                  Cyber Hanoian
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% An Toàn
                </span>
              </div>
              <span className="text-[11px] text-slate-300">
                Áo Ngũ Thân khoác buông + Cargo + Sneaker chunky + Kính mát
              </span>
              <span className="text-[10px] text-slate-500 font-mono-tech mt-1">
                Lập lĩnh • Khoác buông trench coat • Denim nhẹ
              </span>
            </button>

            <button
              onClick={() => onSelectPreset('nhat-binh-y2k')}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 text-left flex flex-col gap-1 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-300 group-hover:text-amber-200">
                  Huế Royalty x Y2K
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Vùng Linh Hoạt
                </span>
              </div>
              <span className="text-[11px] text-slate-300">
                Áo Nhật Bình khoác cardigan + Croptop + Chân váy xếp ly + Bốt da cao cổ
              </span>
              <span className="text-[10px] text-slate-500 font-mono-tech mt-1">
                Giữ dải cổ chữ Nhật • Cửa tay ngũ hành
              </span>
            </button>

            <button
              onClick={() => onSelectPreset('giao-linh-gorpcore')}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 text-left flex flex-col gap-1 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-300 group-hover:text-amber-200">
                  Thăng Long Layering
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% An Toàn
                </span>
              </div>
              <span className="text-[11px] text-slate-300">
                Giao Lĩnh vạt trái đè phải + Layer hoodie mỏng + Leather belt + Quần cargo
              </span>
              <span className="text-[10px] text-slate-500 font-mono-tech mt-1">
                Vải Đũi xanh rêu • Thắt lưng da thời thượng
              </span>
            </button>

            <button
              onClick={() => onSelectPreset('taboo-warning-test')}
              className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/40 hover:border-red-400 text-left flex flex-col gap-1 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-red-300 group-hover:text-red-200 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>Test Guardrail: Phạm 3 Cấm Kỵ</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/30 text-red-200 border border-red-500/50 font-bold">
                  Báo Động Đỏ
                </span>
              </div>
              <span className="text-[11px] text-red-200/90">
                Cắt ngắn croptop + Cài vắt sang trái + In rồng 5 móng bụi phủi
              </span>
              <span className="text-[10px] text-red-400/80 font-mono-tech mt-1">
                Thử nghiệm xem bộ lọc xử lý và hỗ trợ sửa nhanh 1-chạm
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
