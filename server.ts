import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  CULTURAL_KNOWLEDGE_BASE,
  auditOutfit,
  OutfitConfig,
} from './src/data/culturalKnowledgeBase.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `
You are the AI Intelligence Engine for "VietRemix Core" - a hybrid fashion styling and cultural guardrail platform for Gen Z in Vietnam (aged 18–22).
- Core Goal: Help users creatively remix traditional Vietnamese garments (Việt phục: Áo Ngũ Thân, Áo Nhật Bình, Áo Giao Lĩnh) with modern streetwear while maintaining 100% cultural accuracy based ONLY on verified data.
- Tone: Trendy, respectful, supportive, Gen Z-friendly, non-judgmental, concise.
- Operating Constraint: You MUST strictly operate within this JSON dataset. DO NOT invent, assume, or extrapolate historical origins, court ranks, or meanings not present in this schema.

Knowledge Base:
${JSON.stringify({ cultural_knowledge_base: CULTURAL_KNOWLEDGE_BASE }, null, 2)}

Strict Rules:
1. Áo Ngũ Thân Lập Lĩnh: 
   - 5 vạt (4 vạt ngoài = tứ thân phụ mẫu, 1 vạt con = bản thân). 5 cúc (Cần, Tín, Nhân, Nghĩa, Lễ). Cổ đứng lập lĩnh cài khít bên phải.
   - Hard Taboos: Cắt ngắn vạt thành crop-top; Cài vắt nếp vạt sang trái; In/thêu họa tiết Hoàng gia (Mãng xà 5 móng, Phượng) khi biến tấu bụi phủi.
   - Flexible Zones: Vải linen, đũi, denim nhẹ, silk, khaki; Mặc cài kín cúc HOẶC khoác buông vạt như Cardigan/Trench coat; Phối kèm sneaker, bốt da, jeans, chân váy xếp ly, kính mát, mũ cap/bucket.
2. Áo Nhật Bình:
   - Dải cổ áo bản to hình chữ Nhật đặc trưng ghép lại ở trước ngực; Tay thụt/tay rộng với dải màu ngũ hành ở cửa tay; Cài bằng dải buộc hoặc cúc kim loại/ngọc.
   - Hard Taboos: Tháo bỏ hoàn toàn dải cổ áo chữ Nhật; Mặc vắt chéo che mất dải cổ áo; Cắt xẻ tà quá cao.
   - Flexible Zones: Mặc khoác ngoài dạng Cardigan/Kimono jacket phối cùng áo phông/crop-top bên trong; Phối cùng chân váy dài, quần suông, bốt da cao cổ, túi xách Y2K.
3. Áo Giao Lĩnh:
   - Cổ áo giao nhau, vạt trái đè lên vạt phải; Thân rộng rãi, xẻ tà 2 bên.
   - Hard Taboos: Mặc vạt phải đè lên vạt trái; Biến tấu hở hang quá đà ở cổ áo.
   - Flexible Zones: Phối layer cùng áo hoodie mỏng, quần cargo, sneaker; Biến tấu dây thắt lưng hiện đại (leather belt).

Response Format:
- Respond in modern Vietnamese (youthful Gen Z fashion slang like "slay", "keo lỳ", "outfit cháy", "hợp vibe", "chuẩn bài").
- Always highlight: 
  1. Cultural Check (Bảo chứng văn hóa): Is it 100% Safe, in a Flexible Zone, or a Hard Taboo?
  2. Styling Tips (Công thức phối đồ): How to style it to look modern and streetwear-ready.
  3. Cultural Meaning (Ý nghĩa cốt lõi): Explain the meaning of the garment parts (e.g. 5 vạt, 5 cúc, vạt trái đè phải) concisely.
`;

// API: Get Cultural Knowledge Base
app.get('/api/cultural-knowledge', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: CULTURAL_KNOWLEDGE_BASE,
  });
});

// API: Audit Outfit (Strict deterministic check)
app.post('/api/audit', (req: Request, res: Response) => {
  try {
    const outfit: OutfitConfig = req.body;
    if (!outfit || !outfit.garmentId) {
      res.status(400).json({ error: 'Missing outfit configuration' });
      return;
    }
    const audit = auditOutfit(outfit);
    res.json({ success: true, audit });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ error: error.message || 'Audit failed' });
  }
});

// API: Gemini AI Stylist Consultation
app.post('/api/gemini/consult', async (req: Request, res: Response) => {
  try {
    const { message, outfitContext } = req.body;
    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!aiClient) {
      // Deterministic fallback if API key is not yet set
      res.json({
        success: true,
        reply: `[VietRemix Guardian Note]: Hệ thống đang chạy chế độ Guardrail cục bộ. 
Căn cứ vào dữ liệu chuẩn xác của Việt phục:
- Áo Ngũ Thân: Tuyệt đối không cắt croptop, không cài vạt sang trái, không in rồng 5 móng bụi phủi. Bạn có thể khoác buông vạt như cardigan phối sneaker & quần jeans!
- Áo Nhật Bình: Giữ trọn dải cổ chữ Nhật, có thể khoác kimono jacket cùng croptop & bốt da Y2K.
- Áo Giao Lĩnh: Luôn giữ vạt trái đè vạt phải, phối layer hoodie mỏng & leather belt cực cháy!`,
      });
      return;
    }

    const contextPrompt = outfitContext
      ? `\n\nNgười dùng hiện đang thử nghiệm trang phục sau trong Remix Studio:\n${JSON.stringify(outfitContext, null, 2)}`
      : '';

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `${message}${contextPrompt}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'VietRemix Engine đang phân tích outfit của bạn...';
    res.json({ success: true, reply });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Gemini consult error:', error);
    res.status(500).json({
      error: error.message || 'Lỗi xử lý tư vấn thời trang',
    });
  }
});

// API: Gemini Generate Auto Remix
app.post('/api/gemini/generate-remix', async (req: Request, res: Response) => {
  try {
    const { garmentId, occasion, aesthetic } = req.body;

    if (!aiClient) {
      // Local preset fallback
      res.json({
        success: true,
        outfitName: 'Cyber Heritage Vibe',
        tagline: 'Phối đồ chuẩn nét Việt phục Gen Z',
        stylingConcept:
          'Khoác buông tà như Cardigan/Trench coat, kết hợp cùng sneaker chunky và quần cargo hiện đại.',
        culturalValidation: '100% thuộc Vùng Biến Tấu An Toàn theo dữ liệu triều Nguyễn / Lý-Trần-Lê.',
        items: [
          'Việt phục chính hãng đúng kết cấu vạt & cổ',
          'Sneaker chunky trắng/đen',
          'Quần Cargo hoặc ống suông',
          'Kính râm hoặc mũ bucket',
        ],
      });
      return;
    }

    const prompt = `Hãy gợi ý một bản phối (remix outfit) streetwear hoàn hảo kết hợp giữa ${
      garmentId === 'ngu_than_lap_linh'
        ? 'Áo Ngũ Thân Lập Lĩnh'
        : garmentId === 'nhat_binh'
        ? 'Áo Nhật Bình'
        : 'Áo Giao Lĩnh'
    } cho dịp "${occasion || 'Dạo phố cuối tuần'}" theo phong cách "${
      aesthetic || 'Streetwear Gen Z'
    }".
    Yêu cầu:
    - Tuân thủ 100% dữ liệu lịch sử trong Knowledge Base.
    - Không vi phạm bất kỳ Hard Taboo nào.
    - Tận dụng tối đa Flexible Zones.
    - Trả lời bằng JSON với format:
    {
      "outfitName": "Tên bản phối bắt tai Gen Z",
      "tagline": "Một câu slogan cực slay",
      "stylingConcept": "Mô tả cách mặc (cài cúc, khoác buông, phối layer)",
      "culturalValidation": "Giải thích vì sao cách phối này 100% an toàn và tôn trọng di sản",
      "items": ["Món 1", "Món 2", "Món 3", "Món 4"]
    }`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ success: true, ...parsed });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Gemini remix error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`VietRemix Core engine running on http://localhost:${port}`);
  });
}

startServer();
