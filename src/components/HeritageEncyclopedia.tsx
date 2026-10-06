import React, { useState } from 'react';
import { CULTURAL_KNOWLEDGE_BASE, GarmentData, OutfitConfig } from '../data/culturalKnowledgeBase';
import {
  BookOpen,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Layers,
  History,
  CheckCircle,
  AlertOctagon,
} from 'lucide-react';

interface HeritageEncyclopediaProps {
  onLoadGarmentInStudio: (garmentId: OutfitConfig['garmentId']) => void;
}

export const HeritageEncyclopedia: React.FC<HeritageEncyclopediaProps> = ({
  onLoadGarmentInStudio,
}) => {
  const [selectedId, setSelectedId] = useState<GarmentData['id']>('ngu_than_lap_linh');
  const selectedGarment = CULTURAL_KNOWLEDGE_BASE[selectedId];

  return (
    <div className="flex flex-col gap-6">
      {/* Header section */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-tech tracking-wider uppercase font-bold">
              <BookOpen className="w-4 h-4" />
              <span>Cơ Sở Dữ Liệu Lịch Sử Xác Thực (Ground-Truth Knowledge Base)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heritage text-white mt-1">
              Cẩm Nang Di Sản &amp; Ranh Giới Văn Hóa
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Mọi quy tắc trong VietRemix Core đều tuân thủ 100% dữ liệu khảo chứng đã xác thực. Không suy diễn lịch sử, không tự chế ý nghĩa. Phân định rõ ràng giữa **Điều Cấm Kỵ (Hard Taboos)** và **Vùng Biến Tấu Tự Do (Flexible Zones)**.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-tech text-slate-400">Niên đại:</span>
            <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 font-mono-tech text-xs font-bold">
              {selectedGarment.era}
            </span>
          </div>
        </div>

        {/* Garment Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          {Object.values(CULTURAL_KNOWLEDGE_BASE).map((garment) => {
            const isSelected = selectedId === garment.id;
            return (
              <button
                key={garment.id}
                onClick={() => setSelectedId(garment.id)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-lg shadow-amber-950/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm font-heritage">{garment.name}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </div>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <History className="w-3 h-3 text-amber-500/80" />
                  <span>{garment.era}</span>
                </span>
                <span className="text-[11px] text-slate-300 line-clamp-2 mt-1">
                  {garment.description_summary}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Grid: Structural Rules, Hard Taboos, Flexible Zones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Structural Rules & Anatomy (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col gap-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Layers className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm text-white font-heritage">
                Quy Chuẩn Cấu Trúc (Structural Rules)
              </h3>
              <p className="text-[11px] text-slate-400">
                Các đặc điểm nhận diện cốt lõi bất biến của {selectedGarment.name}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {Object.entries(selectedGarment.structural_rules).map(([key, val]) => (
              <div
                key={key}
                className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 flex flex-col gap-1"
              >
                <span className="text-[11px] font-mono-tech text-amber-400 uppercase font-bold tracking-wider">
                  {key === 'vat_ao' && '1. Vạt Áo (Vạt ngũ thân)'}
                  {key === 'cuc_ao' && '2. Cúc Áo (Ngũ thường)'}
                  {key === 'co_ao' && '3. Cổ Áo (Lập lĩnh / Chữ Nhật / Giao lĩnh)'}
                  {key === 'tay_ao' && '4. Tay Áo & Dải Ngũ Hành'}
                  {key === 'cuc_chi_tiet' && '5. Cúc & Dải Buộc Chi Tiết'}
                  {key === 'than_ao' && '6. Thân Áo & Xẻ Tà'}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">{val}</p>
              </div>
            ))}
          </div>

          {/* Detailed Philosophy box */}
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 mt-auto">
            <span className="text-xs font-bold text-amber-300 block mb-1">
              Triết lý văn hóa truyền đời:
            </span>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              {selectedGarment.id === 'ngu_than_lap_linh' &&
                '4 vạt ngoài bao bọc 1 vạt con thể hiện lòng hiếu đạo và sự chở che của cha mẹ 2 bên nội ngoại với con cái. 5 cúc mang trọn đạo đức làm người: Cần, Tín, Nhân, Nghĩa, Lễ.'}
              {selectedGarment.id === 'nhat_binh' &&
                'Dải cổ hình chữ Nhật ghép trước ngực tạo nên nét tôn nghiêm vương giả. Dải ngũ hành ở cửa tay thể hiện 5 yếu tố Kim Mộc Thủy Hỏa Thổ hài hòa với vũ trụ.'}
              {selectedGarment.id === 'giao_linh' &&
                'Cổ áo giao nhau với vạt trái đè vạt phải (Tả Nhẫm) đại diện cho nhân luân dương tính của người sống, phân biệt rạch ròi với tang lễ cổ truyền.'}
            </p>
          </div>

          {/* Quick jump to studio button */}
          <button
            onClick={() => onLoadGarmentInStudio(selectedGarment.id)}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <span>Phối Đồ Ngay Với {selectedGarment.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Column: Hard Taboos vs Flexible Zones (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* HARD TABOOS BOX (RED GUARDRAIL) */}
          <div className="bg-red-950/20 rounded-2xl border border-red-500/40 p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-2 border-b border-red-500/20">
              <AlertOctagon className="w-5 h-5 text-red-400" />
              <div>
                <h3 className="font-bold text-sm text-red-200 font-heritage tracking-wide">
                  Điều Tuyệt Đối Cấm Kỵ (Hard Taboos)
                </h3>
                <p className="text-[11px] text-red-300/80">
                  Ranh giới đỏ: Không được phép vi phạm khi biến tấu thời trang
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedGarment.hard_taboos.map((taboo, idx) => (
                <div
                  key={idx}
                  className="bg-red-950/40 border border-red-500/30 rounded-xl p-3.5 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-red-500/30 text-red-300 flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">
                    ✕
                  </span>
                  <div>
                    <span className="text-xs font-bold text-red-200 block mb-0.5">
                      {taboo}
                    </span>
                    <span className="text-[11px] text-red-300/70 leading-relaxed block">
                      {taboo.includes('crop-top') &&
                        'Cắt ngắn làm phá hủy cấu trúc 5 vạt, tước đi ý nghĩa bảo bọc của Tứ thân phụ mẫu.'}
                      {taboo.includes('sang bên trái') &&
                        'Quy tắc cổ truyền cài vạt áo về bên phải, cài vắt sang trái phạm vào kiêng kỵ trang phục tang tế.'}
                      {taboo.includes('Hoàng gia') &&
                        'Họa tiết Rồng 5 móng hay Phượng hoàng hoàng tộc thời Nguyễn có thứ bậc nghiêm ngặt, không dùng tùy tiện trong phong cách đường phố bụi phủi.'}
                      {taboo.includes('chữ Nhật') &&
                        'Dải cổ chữ Nhật là đặc trưng nhận diện duy nhất của Áo Nhật Bình; tháo bỏ sẽ biến áo thành dạng áo khoác thông thường không còn tính di sản.'}
                      {taboo.includes('vạt phải đè lên vạt trái') &&
                        'Giao Lĩnh luôn luôn vạt trái đè lên vạt phải. Đảo ngược vạt là cách mặc của người đã khuất theo cổ lễ.'}
                      {taboo.includes('hở hang') &&
                        'Áo Giao Lĩnh tôn vinh sự thanh tao kín đáo, xẻ cổ quá sâu đánh mất tinh thần cổ phục.'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FLEXIBLE ZONES BOX (GREEN / AMBER CREATIVE FREEDOM) */}
          <div className="bg-emerald-950/20 rounded-2xl border border-emerald-500/40 p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-500/20">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-bold text-sm text-emerald-200 font-heritage tracking-wide">
                  Vùng Biến Tấu Tự Do (Flexible Zones)
                </h3>
                <p className="text-[11px] text-emerald-300/80">
                  Không gian sáng tạo Gen Z được phép thử nghiệm không giới hạn
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedGarment.flexible_zones.map((zone, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3.5 flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-emerald-200 block mb-0.5">
                      {zone}
                    </span>
                    <span className="text-[11px] text-emerald-300/70 leading-relaxed block">
                      Gen Z có thể tự do phối cùng các biểu tượng thời trang đường phố (Salomon, Rick Owens, Cargo pants, Y2K aesthetic) mà vẫn gìn giữ nguyên vẹn giá trị cội nguồn.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
