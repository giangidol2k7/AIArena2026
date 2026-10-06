export interface StructuralRules {
  vat_ao?: string;
  cuc_ao?: string;
  co_ao?: string;
  tay_ao?: string;
  cuc_chi_tiet?: string;
  than_ao?: string;
}

export interface GarmentData {
  id: 'ngu_than_lap_linh' | 'nhat_binh' | 'giao_linh';
  name: string;
  era: string;
  structural_rules: StructuralRules;
  hard_taboos: string[];
  flexible_zones: string[];
  description_summary: string;
}

export const CULTURAL_KNOWLEDGE_BASE: Record<string, GarmentData> = {
  ngu_than_lap_linh: {
    id: 'ngu_than_lap_linh',
    name: 'Áo Ngũ Thân Lập Lĩnh',
    era: 'Triều Nguyễn (1802 - 1945)',
    structural_rules: {
      vat_ao: '5 vạt (4 vạt ngoài tượng trưng cho tứ thân phụ mẫu, 1 vạt con tượng trưng cho bản thân)',
      cuc_ao: '5 cúc (Cần, Tín, Nhân, Nghĩa, Lễ)',
      co_ao: 'Lập lĩnh (cổ đứng), cài khít bên phải',
    },
    hard_taboos: [
      'Cắt ngắn vạt áo thành dáng crop-top',
      'Cài vắt nếp vạt áo sang bên trái',
      'In/thêu họa tiết Hoàng gia (Mãng xà 5 móng, Phượng) khi biến tấu bụi phủi',
    ],
    flexible_zones: [
      'Chất liệu vải: Linen, Đũi, Denim nhẹ, Silk, Khaki',
      'Cách mặc: Cài kín cúc hoặc Khoác buông vạt như Cardigan/Trench coat',
      'Item phối kèm: Sneaker, Bốt da, Quần Jeans, Chân váy xếp ly, Kính mát, Mũ Cap/Bucket',
    ],
    description_summary:
      'Áo ngũ thân lập lĩnh thời Nguyễn mang cấu trúc 5 vạt (tứ thân phụ mẫu + bản thân), 5 cúc tượng trưng ngũ thường (Cần, Tín, Nhân, Nghĩa, Lễ), cổ đứng lập lĩnh cài khít bên phải.',
  },
  nhat_binh: {
    id: 'nhat_binh',
    name: 'Áo Nhật Bình',
    era: 'Triều Nguyễn (1802 - 1945)',
    structural_rules: {
      co_ao: 'Dải cổ áo bản to hình chữ Nhật đặc trưng ghép lại ở trước ngực',
      tay_ao: 'Tay thụt/tay rộng với dải màu ngũ hành ở cửa tay',
      cuc_chi_tiet: 'Cài bằng dải buộc hoặc cúc kim loại/ngọc',
    },
    hard_taboos: [
      'Tháo bỏ hoàn toàn dải cổ áo chữ Nhật',
      'Mặc vắt chéo che mất dải cổ áo',
      'Cắt xẻ tà quá cao',
    ],
    flexible_zones: [
      'Mặc khoác ngoài dạng Cardigan/Kimono jacket phối cùng áo phông/crop-top bên trong',
      'Phối cùng chân váy dài, quần suông, bốt da cao cổ, túi xách Y2K',
    ],
    description_summary:
      'Áo Nhật Bình thời Nguyễn nhận diện qua dải cổ áo hình chữ Nhật trước ngực, tay áo đính ngũ hành ở cửa tay, cài cúc kim loại/ngọc hoặc dải buộc.',
  },
  giao_linh: {
    id: 'giao_linh',
    name: 'Áo Giao Lĩnh',
    era: 'Thời Lý - Trần - Lê - Nguyễn',
    structural_rules: {
      co_ao: 'Cổ áo giao nhau, vạt trái đè lên vạt phải',
      than_ao: 'Rộng rãi, xẻ tà 2 bên',
    },
    hard_taboos: [
      'Mặc vạt phải đè lên vạt trái',
      'Biến tấu hở hang quá đà ở cổ áo',
    ],
    flexible_zones: [
      'Phối layer cùng áo hoodie mỏng, quần cargo, sneaker',
      'Biến tấu dây thắt lưng hiện đại (leather belt)',
    ],
    description_summary:
      'Áo Giao Lĩnh trải qua các triều đại Lý - Trần - Lê - Nguyễn với cổ áo giao nhau kinh điển (vạt trái đè lên vạt phải), thân áo rộng rãi xẻ tà 2 bên.',
  },
};

export interface OutfitConfig {
  garmentId: 'ngu_than_lap_linh' | 'nhat_binh' | 'giao_linh';
  // Garment specific modifications
  lapelOrientation: 'left_over_right' | 'right_over_left' | 'button_right' | 'button_left' | 'open_drape';
  isCropped: boolean;
  slitHeight: 'standard' | 'high_slit';
  hasRectangularCollar: boolean;
  isCollarHiddenOrCovered: boolean;
  isCollarRevealing: boolean;
  hasRoyalMotif: boolean;
  fabric: 'Linen' | 'Đũi' | 'Denim nhẹ' | 'Silk' | 'Khaki' | 'Brocade';
  garmentColor: string;
  // Modern streetwear pairings
  innerLayer: 'none' | 'crop_top' | 'tshirt_oversize' | 'thin_hoodie' | 'tank_top';
  bottom: 'jeans_baggy' | 'cargo_pants' | 'pleated_skirt' | 'wide_trousers' | 'long_maxi_skirt';
  footwear: 'chunky_sneaker' | 'leather_boots' | 'retro_runner' | 'platform_loafers';
  accessories: string[];
}

export interface GuardrailAuditResult {
  status: 'SAFE' | 'FLEXIBLE_OK' | 'TABOO_VIOLATION';
  score: number; // 0 to 100
  title: string;
  summary: string;
  violations: string[];
  flexibleHighlights: string[];
  culturalNotes: string[];
  recommendedFixes: {
    description: string;
    applyFixAction: Partial<OutfitConfig>;
  }[];
}

export function auditOutfit(outfit: OutfitConfig): GuardrailAuditResult {
  const garment = CULTURAL_KNOWLEDGE_BASE[outfit.garmentId];
  const violations: string[] = [];
  const flexibleHighlights: string[] = [];
  const culturalNotes: string[] = [];
  const recommendedFixes: GuardrailAuditResult['recommendedFixes'] = [];

  // Garment 1: Áo Ngũ Thân Lập Lĩnh
  if (outfit.garmentId === 'ngu_than_lap_linh') {
    culturalNotes.push(
      'Cấu trúc: 5 vạt tượng trưng tứ thân phụ mẫu (4 vạt ngoài) và bản thân (1 vạt con). 5 cúc tượng trưng ngũ thường (Cần, Tín, Nhân, Nghĩa, Lễ).'
    );

    if (outfit.isCropped) {
      violations.push('Cắt ngắn vạt áo thành dáng crop-top (Vi phạm cấu trúc 5 vạt truyền thống).');
      recommendedFixes.push({
        description: 'Khôi phục độ dài nguyên bản của vạt áo ngũ thân để giữ trọn ý nghĩa Tứ thân phụ mẫu.',
        applyFixAction: { isCropped: false },
      });
    }

    if (outfit.lapelOrientation === 'button_left') {
      violations.push('Cài vắt nếp vạt áo sang bên trái (Quy chuẩn Lập lĩnh bắt buộc cài khít bên phải).');
      recommendedFixes.push({
        description: 'Chuyển cài vạt áo sang bên phải hoặc khoác buông vạt kiểu trench coat hiện đại.',
        applyFixAction: { lapelOrientation: 'button_right' },
      });
    }

    if (outfit.hasRoyalMotif) {
      violations.push('In/thêu họa tiết Hoàng gia (Mãng xà 5 móng, Phượng) khi biến tấu bụi phủi.');
      recommendedFixes.push({
        description: 'Bỏ họa tiết hoàng gia hoặc thay bằng hoa văn kỷ hà / trơn tối giản tinh tế.',
        applyFixAction: { hasRoyalMotif: false },
      });
    }

    // Flexible zone checks
    if (outfit.lapelOrientation === 'open_drape') {
      flexibleHighlights.push('Khoác buông vạt như Cardigan / Trench coat hiện đại: Vùng biến tấu được phép!');
    } else if (outfit.lapelOrientation === 'button_right') {
      flexibleHighlights.push('Cài khít cúc bên phải chuẩn lập lĩnh: Giữ trọn tinh thần di sản!');
    }

    if (['Linen', 'Đũi', 'Denim nhẹ', 'Silk', 'Khaki'].includes(outfit.fabric)) {
      flexibleHighlights.push(`Chất liệu ${outfit.fabric} hiện đại: Vùng chất liệu biến tấu hợp lệ.`);
    }

    if (
      outfit.footwear === 'chunky_sneaker' ||
      outfit.footwear === 'leather_boots' ||
      outfit.bottom === 'jeans_baggy' ||
      outfit.bottom === 'pleated_skirt'
    ) {
      flexibleHighlights.push('Phối kèm Streetwear (Sneaker, Bốt da, Jeans, Chân váy xếp ly): Hợp vibe Gen Z và được chấp nhận.');
    }
  }

  // Garment 2: Áo Nhật Bình
  if (outfit.garmentId === 'nhat_binh') {
    culturalNotes.push(
      'Cấu trúc: Dải cổ áo bản to hình chữ Nhật đặc trưng ghép lại ở trước ngực. Cửa tay có dải ngũ hành.'
    );

    if (!outfit.hasRectangularCollar) {
      violations.push('Tháo bỏ hoàn toàn dải cổ áo chữ Nhật (Làm mất yếu tố nhận diện cốt lõi của Nhật Bình).');
      recommendedFixes.push({
        description: 'Giữ nguyên vẹn dải cổ áo hình chữ Nhật đặc trưng.',
        applyFixAction: { hasRectangularCollar: true },
      });
    }

    if (outfit.isCollarHiddenOrCovered) {
      violations.push('Mặc vắt chéo che mất dải cổ áo chữ Nhật.');
      recommendedFixes.push({
        description: 'Mặc khoác ngoài dạng Cardigan/Kimono jacket để phô diễn dải cổ áo chữ Nhật.',
        applyFixAction: { isCollarHiddenOrCovered: false, lapelOrientation: 'open_drape' },
      });
    }

    if (outfit.slitHeight === 'high_slit') {
      violations.push('Cắt xẻ tà quá cao (Vi phạm điều cấm kỵ của Áo Nhật Bình).');
      recommendedFixes.push({
        description: 'Điều chỉnh tà xẻ về độ cao tiêu chuẩn.',
        applyFixAction: { slitHeight: 'standard' },
      });
    }

    // Flexible zone checks
    if (outfit.lapelOrientation === 'open_drape' && (outfit.innerLayer === 'crop_top' || outfit.innerLayer === 'tshirt_oversize')) {
      flexibleHighlights.push('Mặc khoác ngoài dạng Cardigan/Kimono jacket phối cùng áo phông / crop-top bên trong: Biến tấu cực chất và chuẩn quy!');
    }

    if (
      outfit.bottom === 'wide_trousers' ||
      outfit.bottom === 'long_maxi_skirt' ||
      outfit.footwear === 'leather_boots'
    ) {
      flexibleHighlights.push('Phối cùng chân váy dài, quần suông, bốt da cao cổ, túi xách Y2K: Nằm trong vùng biến tấu sáng tạo.');
    }
  }

  // Garment 3: Áo Giao Lĩnh
  if (outfit.garmentId === 'giao_linh') {
    culturalNotes.push(
      'Cấu trúc: Cổ áo giao nhau, vạt trái đè lên vạt phải. Thân áo rộng rãi, xẻ tà 2 bên.'
    );

    if (outfit.lapelOrientation === 'right_over_left') {
      violations.push('Mặc vạt phải đè lên vạt trái (Vi phạm nghiêm trọng: quy tắc bắt buộc là vạt trái đè lên vạt phải).');
      recommendedFixes.push({
        description: 'Đổi vạt áo: Luôn đặt vạt TRÁI đè lên vạt PHẢI.',
        applyFixAction: { lapelOrientation: 'left_over_right' },
      });
    }

    if (outfit.isCollarRevealing) {
      violations.push('Biến tấu hở hang quá đà ở cổ áo (Vi phạm chuẩn mực cổ áo giao nhau).');
      recommendedFixes.push({
        description: 'Khép nếp cổ áo vừa vặn hoặc phối thêm áo lót/hoodie mỏng bên trong.',
        applyFixAction: { isCollarRevealing: false },
      });
    }

    // Flexible zone checks
    if (outfit.innerLayer === 'thin_hoodie' || outfit.bottom === 'cargo_pants' || outfit.footwear === 'chunky_sneaker') {
      flexibleHighlights.push('Phối layer cùng áo hoodie mỏng, quần cargo, sneaker: Phong cách streetwear chuẩn vùng linh hoạt.');
    }

    if (outfit.accessories.includes('leather_belt')) {
      flexibleHighlights.push('Biến tấu dây thắt lưng da hiện đại (leather belt): Điểm nhấn hợp lệ và tôn dáng!');
    }
  }

  // Calculate score and status
  if (violations.length > 0) {
    return {
      status: 'TABOO_VIOLATION',
      score: Math.max(10, 60 - violations.length * 25),
      title: 'CẢNH BÁO: PHẠM ĐIỀU CẤM KỴ VĂN HÓA',
      summary: `Outfit này vi phạm ${violations.length} điều cấm kỵ cốt lõi của ${garment.name}. Cần chỉnh sửa để bảo toàn giá trị di sản.`,
      violations,
      flexibleHighlights,
      culturalNotes,
      recommendedFixes,
    };
  }

  if (flexibleHighlights.length > 0) {
    return {
      status: 'FLEXIBLE_OK',
      score: 95,
      title: 'VÙNG BIẾN TẤU AN TOÀN & SLAY',
      summary: `Outfit kết hợp độc đáo giữa tinh hoa ${garment.name} và streetwear hiện đại, 100% nằm trong vùng biến tấu được phép!`,
      violations: [],
      flexibleHighlights,
      culturalNotes,
      recommendedFixes: [],
    };
  }

  return {
    status: 'SAFE',
    score: 100,
    title: 'CHUẨN MỰC DI SẢN 100%',
    summary: `Trang phục giữ trọn vẹn kết cấu nguyên bản của ${garment.name}, chuẩn mực và tôn trọng tối đa di sản.`,
    violations: [],
    flexibleHighlights,
    culturalNotes,
    recommendedFixes: [],
  };
}

export const PRESET_OUTFITS: {
  id: string;
  name: string;
  garmentName: string;
  tagline: string;
  vibe: string;
  config: OutfitConfig;
}[] = [
  {
    id: 'cyber-ngu-than',
    name: 'Cyber Hanoian',
    garmentName: 'Áo Ngũ Thân Lập Lĩnh',
    tagline: 'Khoác buông vạt lãng tử kết hợp quần cargo & chunky sneaker',
    vibe: 'Techwear Streetwear',
    config: {
      garmentId: 'ngu_than_lap_linh',
      lapelOrientation: 'open_drape',
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
      accessories: ['sunglasses', 'cap'],
    },
  },
  {
    id: 'nhat-binh-y2k',
    name: 'Huế Royalty x Y2K',
    garmentName: 'Áo Nhật Bình',
    tagline: 'Khoác Nhật Bình như kimono jacket mix cùng croptop & bốt da cao cổ',
    vibe: 'Y2K Cyber Chic',
    config: {
      garmentId: 'nhat_binh',
      lapelOrientation: 'open_drape',
      isCropped: false,
      slitHeight: 'standard',
      hasRectangularCollar: true,
      isCollarHiddenOrCovered: false,
      isCollarRevealing: false,
      hasRoyalMotif: false,
      fabric: 'Silk',
      garmentColor: '#be123c',
      innerLayer: 'crop_top',
      bottom: 'pleated_skirt',
      footwear: 'leather_boots',
      accessories: ['y2k_bag', 'chain_necklace'],
    },
  },
  {
    id: 'giao-linh-gorpcore',
    name: 'Thăng Long Layering',
    garmentName: 'Áo Giao Lĩnh',
    tagline: 'Giao Lĩnh vạt trái đè phải chuẩn mực, layer hoodie mỏng & leather belt',
    vibe: 'Neo Heritage Fit',
    config: {
      garmentId: 'giao_linh',
      lapelOrientation: 'left_over_right',
      isCropped: false,
      slitHeight: 'standard',
      hasRectangularCollar: true,
      isCollarHiddenOrCovered: false,
      isCollarRevealing: false,
      hasRoyalMotif: false,
      fabric: 'Đũi',
      garmentColor: '#365314',
      innerLayer: 'thin_hoodie',
      bottom: 'cargo_pants',
      footwear: 'chunky_sneaker',
      accessories: ['leather_belt', 'bucket_hat'],
    },
  },
  {
    id: 'taboo-warning-test',
    name: '⚠️ Ví dụ Vi Phạm Cấm Kỵ (Test Guardrail)',
    garmentName: 'Áo Ngũ Thân Lập Lĩnh',
    tagline: 'Thử nghiệm cắt croptop + cài vắt trái + in rồng 5 móng để thấy hệ thống bảo vệ kích hoạt',
    vibe: 'Guardrail Breach Demo',
    config: {
      garmentId: 'ngu_than_lap_linh',
      lapelOrientation: 'button_left',
      isCropped: true,
      slitHeight: 'standard',
      hasRectangularCollar: true,
      isCollarHiddenOrCovered: false,
      isCollarRevealing: false,
      hasRoyalMotif: true,
      fabric: 'Khaki',
      garmentColor: '#991b1b',
      innerLayer: 'crop_top',
      bottom: 'jeans_baggy',
      footwear: 'chunky_sneaker',
      accessories: ['sunglasses'],
    },
  },
];
