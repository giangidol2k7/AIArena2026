import React, { useState, useMemo } from 'react';
import {
  OutfitConfig,
  auditOutfit,
  PRESET_OUTFITS,
  CULTURAL_KNOWLEDGE_BASE,
} from './data/culturalKnowledgeBase';
import { Navbar } from './components/Navbar';
import { InteractiveMannequin } from './components/InteractiveMannequin';
import { GuardrailRadar } from './components/GuardrailRadar';
import { RemixControls } from './components/RemixControls';
import { AIStylistPanel } from './components/AIStylistPanel';
import { HeritageEncyclopedia } from './components/HeritageEncyclopedia';
import { LookbookShowcase } from './components/LookbookShowcase';
import { FitCardModal } from './components/FitCardModal';
import {
  Sparkles,
  ShieldCheck,
  Flame,
  Info,
  X,
  Compass,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'studio' | 'ai' | 'handbook' | 'lookbook'>('studio');
  const [isFitCardOpen, setIsFitCardOpen] = useState(false);
  const [hotspotTopic, setHotspotTopic] = useState<string | null>(null);

  // Active outfit state in Studio
  const [outfit, setOutfit] = useState<OutfitConfig>({
    garmentId: 'ngu_than_lap_linh',
    lapelOrientation: 'open_drape', // modern trench coat drape
    isCropped: false,
    slitHeight: 'standard',
    hasRectangularCollar: true,
    isCollarHiddenOrCovered: false,
    isCollarRevealing: false,
    hasRoyalMotif: false,
    fabric: 'Denim nhẹ',
    garmentColor: '#1e293b',
    innerLayer: 'tshirt_oversize',
    bottom: 'cargo_pants',
    footwear: 'chunky_sneaker',
    accessories: ['sunglasses'],
  });

  // Calculate audit dynamically
  const audit = useMemo(() => auditOutfit(outfit), [outfit]);

  const handleUpdateOutfit = (updates: Partial<OutfitConfig>) => {
    setOutfit((prev) => ({ ...prev, ...updates }));
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = PRESET_OUTFITS.find((p) => p.id === presetId);
    if (preset) {
      setOutfit(preset.config);
    }
  };

  const handleLoadGarmentInStudio = (garmentId: OutfitConfig['garmentId']) => {
    if (garmentId === 'ngu_than_lap_linh') {
      setOutfit((prev) => ({
        ...prev,
        garmentId: 'ngu_than_lap_linh',
        lapelOrientation: 'button_right',
        isCropped: false,
        hasRoyalMotif: false,
      }));
    } else if (garmentId === 'nhat_binh') {
      setOutfit((prev) => ({
        ...prev,
        garmentId: 'nhat_binh',
        lapelOrientation: 'open_drape',
        hasRectangularCollar: true,
        isCollarHiddenOrCovered: false,
        slitHeight: 'standard',
      }));
    } else if (garmentId === 'giao_linh') {
      setOutfit((prev) => ({
        ...prev,
        garmentId: 'giao_linh',
        lapelOrientation: 'left_over_right',
        isCollarRevealing: false,
      }));
    }
    setCurrentTab('studio');
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-slate-100 flex flex-col bg-grid-cyber bg-radial-gradient">
      {/* Top Navbar with live guardrail badge */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        audit={audit}
        onOpenFitCard={() => setIsFitCardOpen(true)}
        onQuickPreset={handleSelectPreset}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Banner Announcement for Gen Z */}
        <div className="mb-6 bg-gradient-to-r from-red-950/40 via-slate-900 to-amber-950/40 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>VietRemix Core Engine: Sáng Tạo Streetwear x Cổ Phục Chuẩn Xác 100%</span>
                <span className="hidden md:inline-block text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono-tech">
                  Verified Data
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Áo Ngũ Thân Lập Lĩnh, Áo Nhật Bình và Áo Giao Lĩnh kết hợp cùng Streetwear Gen Z với bộ lọc ranh giới văn hóa thông minh.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCurrentTab('ai')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hỏi Stylist AI</span>
            </button>
            <button
              onClick={() => setCurrentTab('handbook')}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              Cẩm Nang Quy Chuẩn
            </button>
          </div>
        </div>

        {/* TAB 1: STUDIO (Interactive Mannequin, Guardrail Radar & Controls) */}
        {currentTab === 'studio' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Interactive 2D Vector Mannequin (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <InteractiveMannequin
                  outfit={outfit}
                  audit={audit}
                  onUpdateOutfit={handleUpdateOutfit}
                  onSelectHotspot={(topic) => setHotspotTopic(topic)}
                />

                {/* Quick Presets Strip Under Mannequin */}
                <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-400 font-mono-tech flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Preset Nhanh:</span>
                  </span>
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    <button
                      onClick={() => handleSelectPreset('cyber-ngu-than')}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-[11px] font-medium text-amber-300 border border-slate-800 whitespace-nowrap transition-colors"
                    >
                      Cyber Hanoian
                    </button>
                    <button
                      onClick={() => handleSelectPreset('nhat-binh-y2k')}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-[11px] font-medium text-amber-300 border border-slate-800 whitespace-nowrap transition-colors"
                    >
                      Huế Y2K
                    </button>
                    <button
                      onClick={() => handleSelectPreset('giao-linh-gorpcore')}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-[11px] font-medium text-amber-300 border border-slate-800 whitespace-nowrap transition-colors"
                    >
                      Thăng Long Fit
                    </button>
                    <button
                      onClick={() => handleSelectPreset('taboo-warning-test')}
                      className="px-2.5 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-[11px] font-medium text-red-300 border border-red-500/40 whitespace-nowrap transition-colors"
                    >
                      Test Báo Động
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Cultural Guardrail Radar & Remix Controls (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* 1. Cultural Guardrail Radar (Strict compliance check & 1-click fix) */}
                <GuardrailRadar
                  audit={audit}
                  outfit={outfit}
                  onApplyFix={handleUpdateOutfit}
                  onOpenKnowledgeBase={(garmentId) => {
                    handleLoadGarmentInStudio(garmentId as OutfitConfig['garmentId']);
                    setCurrentTab('handbook');
                  }}
                />

                {/* 2. Interactive Remix Controls (Garments, Streetwear layers, Materials) */}
                <RemixControls
                  outfit={outfit}
                  onUpdateOutfit={handleUpdateOutfit}
                  onSelectPreset={handleSelectPreset}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI STYLIST & CHAT */}
        {currentTab === 'ai' && (
          <AIStylistPanel
            outfit={outfit}
            audit={audit}
            onApplyOutfitUpdates={handleUpdateOutfit}
          />
        )}

        {/* TAB 3: HERITAGE ENCYCLOPEDIA (GROUND-TRUTH KNOWLEDGE BASE) */}
        {currentTab === 'handbook' && (
          <HeritageEncyclopedia
            onLoadGarmentInStudio={handleLoadGarmentInStudio}
          />
        )}

        {/* TAB 4: LOOKBOOK SHOWCASE */}
        {currentTab === 'lookbook' && (
          <LookbookShowcase
            onLoadOutfit={(config) => setOutfit(config)}
            onGoToStudio={() => setCurrentTab('studio')}
          />
        )}
      </main>

      {/* Hotspot Lore Modal */}
      {hotspotTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setHotspotTopic(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-tech uppercase font-bold mb-2">
              <Info className="w-4 h-4" />
              <span>Giải Nghĩa Di Sản Chi Tiết</span>
            </div>

            <h3 className="text-lg font-bold font-heritage text-white mb-2">
              {hotspotTopic === 'lap_linh' && 'Cổ Áo Lập Lĩnh (Cổ Đứng Cài Phải)'}
              {hotspotTopic === 'cuc_ao' && '5 Cúc Áo (Cần, Tín, Nhân, Nghĩa, Lễ)'}
              {hotspotTopic === 'nhat_binh_co' && 'Dải Cổ Áo Hình Chữ Nhật Đặc Trưng'}
              {hotspotTopic === 'giao_linh_lapel' && 'Quy Ước Cổ Áo Giao Nhau (Vạt Trái Đè Phải)'}
              {hotspotTopic === 'royal_motif' && 'Cảnh Báo: Họa Tiết Hoàng Gia Triều Nguyễn'}
              {hotspotTopic === 'leather_belt' && 'Biến Tấu Thắt Lưng Da (Leather Belt) Hiện Đại'}
              {hotspotTopic === 'structural_rules' && 'Cấu Trúc Cốt Lõi Bất Biến'}
              {hotspotTopic === 'sunglasses' && 'Phụ Kiện Kính Mát / Streetwear Y2K'}
            </h3>

            <div className="text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              {hotspotTopic === 'lap_linh' && (
                <p>
                  Cổ áo Lập lĩnh là dạng cổ đứng ôm khít cổ, cài bằng cúc về phía bên phải (Hữu Nhẫm). Cài sang bên trái là điều tuyệt đối cấm kỵ vì đó là quy thức trang phục của tang ma.
                </p>
              )}
              {hotspotTopic === 'cuc_ao' && (
                <p>
                  Năm hạt cúc trên áo Ngũ thân lập lĩnh đại diện cho 5 đức tính làm người: <strong>Cần, Tín, Nhân, Nghĩa, Lễ</strong>. Khi cài khít, áo tạo nên dáng vẻ tề chỉnh, thanh tao và khiêm cung.
                </p>
              )}
              {hotspotTopic === 'nhat_binh' && (
                <p>
                  Dải cổ áo bản to chạy dọc trước ngực ghép lại tạo thành hình chữ Nhật đặc trưng. Đây là dấu hiệu nhận diện bất di bất dịch của Áo Nhật Bình thời Nguyễn. Tuyệt đối không tháo bỏ hay vắt chéo che mất dải cổ này!
                </p>
              )}
              {hotspotTopic === 'giao_linh_lapel' && (
                <p>
                  Áo Giao Lĩnh bắt buộc vạt trái đè lên vạt phải (Tả Nhẫm). Đây là quy ước cổ truyền ngàn năm của người sống. Mặc ngược vạt (phải đè trái) phạm vào điều đại kỵ trong văn hóa cổ phục.
                </p>
              )}
              {hotspotTopic === 'royal_motif' && (
                <p>
                  Họa tiết Mãng xà 5 móng hoặc Phượng hoàng hoàng tộc chỉ dành riêng cho tầng lớp hoàng gia triều Nguyễn. Khi biến tấu streetwear bụi phủi, việc tùy tiện in ấn các biểu tượng này là hành vi phạm kỵ. Nên dùng hoa văn kỷ hà hoặc vải trơn tối giản.
                </p>
              )}
              {hotspotTopic === 'leather_belt' && (
                <p>
                  Việc kết hợp thắt lưng da hiện đại (leather belt) để tạo điểm nhấn eo khi mặc Áo Giao Lĩnh nằm trong <strong>Vùng Biến Tấu Tự Do (Flexible Zone)</strong>, mang đến visual cực cháy mà vẫn bảo toàn kết cấu vạt áo!
                </p>
              )}
              {hotspotTopic === 'structural_rules' && (
                <p>
                  Hệ thống VietRemix Core phân định rõ ràng giữa những yếu tố cấu trúc cốt lõi (bất biến) và những yếu tố phối đồ bên ngoài (tự do sáng tạo), giúp bạn an tâm tỏa sáng.
                </p>
              )}
              {hotspotTopic === 'sunglasses' && (
                <p>
                  Kính râm Y2K Cyber, nón cap, mũ bucket là những phụ kiện được cho phép 100% trong vùng biến tấu, giúp tạo nên phong cách Cyber Hanoian đặc sắc cho Gen Z.
                </p>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setHotspotTopic(null)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Đã Hiểu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Fit Card Export Modal */}
      <FitCardModal
        isOpen={isFitCardOpen}
        onClose={() => setIsFitCardOpen(false)}
        outfit={outfit}
        audit={audit}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-heritage font-bold text-slate-300 text-sm">
              VIETREMIX CORE
            </span>
            <span>•</span>
            <span>Cultural Guardrail &amp; Hybrid Fashion Engine</span>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-400">
            Dữ liệu khảo chứng: Áo Ngũ Thân Lập Lĩnh &amp; Áo Nhật Bình (Triều Nguyễn 1802-1945), Áo Giao Lĩnh (Lý-Trần-Lê-Nguyễn).
          </div>
        </div>
      </footer>
    </div>
  );
}
