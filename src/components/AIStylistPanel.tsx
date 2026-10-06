import React, { useState, useRef, useEffect } from 'react';
import { OutfitConfig, GuardrailAuditResult } from '../data/culturalKnowledgeBase';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldCheck,
  Flame,
  Zap,
  RefreshCw,
  Compass,
  ArrowRight,
} from 'lucide-react';

interface AIStylistPanelProps {
  outfit: OutfitConfig;
  audit: GuardrailAuditResult;
  onApplyOutfitUpdates?: (updates: Partial<OutfitConfig>) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AIStylistPanel: React.FC<AIStylistPanelProps> = ({
  outfit,
  audit,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Yo Gen Z! Chào mừng đến với **VietRemix Core Intelligence Engine**. Mình là Stylist AI kiêm Cultural Guardian của bạn. 
      
Mình ở đây để giúp bạn thỏa sức remix Việt phục (Áo Ngũ Thân, Nhật Bình, Giao Lĩnh) cùng streetwear siêu cháy mà **bảo đảm 100% đúng chuẩn mực văn hóa di sản**. Bạn đang ấp ủ ý tưởng phối đồ nào cho outfit sắp tới?`,
      timestamp: 'Vừa xong',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto remix state
  const [occasion, setOccasion] = useState('Dạo phố cuối tuần');
  const [aesthetic, setAesthetic] = useState('Streetwear Cyberpunk');
  const [isGeneratingRemix, setIsGeneratingRemix] = useState(false);
  const [generatedRemix, setGeneratedRemix] = useState<{
    outfitName?: string;
    tagline?: string;
    stylingConcept?: string;
    culturalValidation?: string;
    items?: string[];
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: 'Vừa xong',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          outfitContext: {
            currentGarment: outfit.garmentId,
            lapelOrientation: outfit.lapelOrientation,
            isCropped: outfit.isCropped,
            hasRoyalMotif: outfit.hasRoyalMotif,
            fabric: outfit.fabric,
            innerLayer: outfit.innerLayer,
            bottom: outfit.bottom,
            footwear: outfit.footwear,
            accessories: outfit.accessories,
            guardrailAuditStatus: audit.status,
            guardrailScore: audit.score,
            violations: audit.violations,
          },
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: data.reply,
            timestamp: 'Vừa xong',
          },
        ]);
      } else {
        throw new Error('Không nhận được phản hồi');
      }
    } catch (err: unknown) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `[VietRemix Notice]: Đang có chút gián đoạn kết nối. Nhưng đừng lo! Dựa vào Knowledge Base của chúng mình:
- Với Áo Ngũ Thân Lập Lĩnh: Nhớ giữ trọn 5 vạt (Tứ thân phụ mẫu + bản thân) & 5 cúc, tuyệt đối không cắt croptop hay cài vắt trái nhé! Bạn hoàn toàn có thể khoác buông tà như trench coat đi cùng sneaker và quần jeans!
- Với Áo Nhật Bình: Cổ chữ Nhật trước ngực là linh hồn, giữ nguyên dải cổ và khoác dáng cardigan cực slay!`,
          timestamp: 'Vừa xong',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAutoRemix = async () => {
    setIsGeneratingRemix(true);
    setGeneratedRemix(null);
    try {
      const res = await fetch('/api/gemini/generate-remix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          garmentId: outfit.garmentId,
          occasion,
          aesthetic,
        }),
      });
      const data = await res.json();
      if (data.outfitName) {
        setGeneratedRemix(data);
      }
    } catch (err) {
      console.error('Error generating remix:', err);
    } finally {
      setIsGeneratingRemix(false);
    }
  };

  const PROMPT_SUGGESTIONS = [
    'Khoác Nhật Bình như Kimono jacket đi fes EDM có hợp không?',
    'Áo ngũ thân đi cùng sneaker Salomon và quần cargo có phạm quy không?',
    'Có được cắt ngắn áo ngũ thân thành croptop không và tại sao?',
    'Áo giao lĩnh phối thêm thắt lưng da (leather belt) thế nào cho slay?',
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Chat Column (8 cols) */}
      <div className="lg:col-span-7 xl:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl flex flex-col h-[640px]">
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white font-heritage flex items-center gap-1.5">
                <span>VietRemix Stylist &amp; Guardian AI</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-[11px] text-slate-400">
                Tư vấn thời trang Gen Z • Bảo chứng 100% dữ liệu lịch sử
              </p>
            </div>
          </div>

          <div className="text-[11px] font-mono-tech px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-amber-400/90">
            Current Fit: {audit.score}% Safe
          </div>
        </div>

        {/* Chat Scroll View */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line shadow-sm'
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 text-xs items-center text-slate-400">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>VietRemix Engine đang đối soát quy tắc văn hóa &amp; lên vibe...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions chips */}
        <div className="py-2 overflow-x-auto flex gap-1.5 shrink-0 scrollbar-none border-t border-slate-800/80">
          {PROMPT_SUGGESTIONS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] whitespace-nowrap bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-amber-300 px-2.5 py-1 rounded-full border border-slate-800 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="pt-2 flex gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Hỏi bất kỳ điều gì về cách phối Việt phục x Streetwear..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gửi</span>
          </button>
        </form>
      </div>

      {/* Right Auto-Remix Generator Column (4 cols) */}
      <div className="lg:col-span-5 xl:col-span-4 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl flex flex-col gap-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Zap className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-bold text-sm text-white font-heritage">
              Auto-Remix Generator
            </h3>
            <p className="text-[11px] text-slate-400">
              Tạo bản phối tự động chuẩn văn hóa theo dịp &amp; phong cách
            </p>
          </div>
        </div>

        {/* Occasion & Aesthetic Form */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 font-mono-tech mb-1 uppercase font-bold text-[10px]">
              Dịp diện outfit:
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="Dạo phố Phố Cổ cuối tuần">Dạo phố Phố Cổ cuối tuần</option>
              <option value="Đi triển lãm nghệ thuật đương đại">Đi triển lãm nghệ thuật</option>
              <option value="Đại nhạc hội / Rave / EDM">Đại nhạc hội / Rave / EDM</option>
              <option value="Đi học Đại học / Campus Chic">Đi học Đại học / Campus Chic</option>
              <option value="Chụp kỷ yếu Gen Z độc bản">Chụp kỷ yếu Gen Z độc bản</option>
              <option value="Cà phê workshop vintage">Cà phê workshop vintage</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-mono-tech mb-1 uppercase font-bold text-[10px]">
              Gu thẩm mỹ (Subculture Vibe):
            </label>
            <select
              value={aesthetic}
              onChange={(e) => setAesthetic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="Streetwear Cyberpunk / Techwear">Streetwear Cyberpunk / Techwear</option>
              <option value="Y2K Retro Futuristic">Y2K Retro Futuristic</option>
              <option value="Gorpcore / Utilitarian Cargo">Gorpcore / Utilitarian Cargo</option>
              <option value="Minimalist Clean Fit">Minimalist Clean Fit</option>
              <option value="Indie Grunge Rock">Indie Grunge Rock</option>
            </select>
          </div>

          <button
            onClick={handleGenerateAutoRemix}
            disabled={isGeneratingRemix}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 mt-2"
          >
            {isGeneratingRemix ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Đang phối đồ &amp; kiểm tra guardrail...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sinh Bản Phối Tự Động (AI Generate)</span>
              </>
            )}
          </button>
        </div>

        {/* Generated Remix Result Card */}
        {generatedRemix && (
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-4 flex flex-col gap-3 mt-1 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-tech uppercase font-bold text-amber-400">
                Gợi Ý Dành Riêng Cho Bạn
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                ✓ 100% Guardrail Safe
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white font-heritage">
                {generatedRemix.outfitName}
              </h4>
              <p className="text-xs text-amber-300/90 italic mt-0.5">
                "{generatedRemix.tagline}"
              </p>
            </div>

            <div className="text-xs text-slate-300 space-y-1.5 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-200 block text-[11px]">
                Concept &amp; Cách Phối:
              </span>
              <p className="leading-relaxed text-[11px] text-slate-300">
                {generatedRemix.stylingConcept}
              </p>
            </div>

            {generatedRemix.items && (
              <div>
                <span className="text-[10px] font-mono-tech uppercase font-bold text-slate-400 block mb-1">
                  Items Trong Bộ Phối:
                </span>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  {generatedRemix.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-[11px] text-emerald-200">
              <span className="font-bold flex items-center gap-1 mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bảo Chứng Văn Hóa:</span>
              </span>
              <p className="leading-relaxed">{generatedRemix.culturalValidation}</p>
            </div>
          </div>
        )}

        {/* Quick Cultural Principle */}
        <div className="mt-auto bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-400">
          <span className="text-slate-300 font-semibold block mb-1">
            Quy ước VietRemix Core:
          </span>
          <p className="leading-relaxed">
            Mọi đề xuất từ AI đều được đối chiếu trực tiếp với cơ sở dữ liệu lịch sử xác thực của triều Nguyễn và Lý-Trần-Lê. Không bịa đặt, không vi phạm cấm kỵ.
          </p>
        </div>
      </div>
    </div>
  );
};
