import { LevelInfo } from '../types/verb';
import { IRREGULAR_VERBS } from './verbsData';

export const LEVEL_METADATA: Record<number, { title: string; description: string }> = {
  1: {
    title: "Màn 1: Động từ siêu phổ biến",
    description: "20 động từ cơ bản và thường gặp nhất trong giao tiếp hàng ngày."
  },
  2: {
    title: "Màn 2: Động từ thông dụng",
    description: "Các động từ xuất hiện liên tục trong sách giáo khoa và hội thoại."
  },
  3: {
    title: "Màn 3: Động từ cốt lõi",
    description: "20 động từ quan trọng cho việc đọc hiểu và viết câu."
  },
  4: {
    title: "Màn 4: Hành động hàng ngày",
    description: "Các động từ diễn tả hành động sinh hoạt, ăn uống và đi lại."
  },
  5: {
    title: "Màn 5: Biến thể nhiều dạng",
    description: "Những từ có nhiều biến thể đúng hoặc dạng chuyển đổi đặc biệt."
  },
  6: {
    title: "Màn 6: Khác biệt Anh - Mỹ",
    description: "Các động từ có dạng biến đổi khác nhau giữa chuẩn UK và US (như learnt/learned)."
  },
  7: {
    title: "Màn 7: Chuyển động & Hành vi",
    description: "Động từ miêu tả tư thế, di chuyển và tác động thể chất."
  },
  8: {
    title: "Màn 8: Biểu cảm & Cảm xúc",
    description: "Động từ bộc lộ cảm xúc, trạng thái và phản ứng cơ thể."
  },
  9: {
    title: "Màn 9: Động từ ghép - Phần 1",
    description: "Các động từ tiền tố un-, under-, over- bắt đầu xuất hiện."
  },
  10: {
    title: "Màn 10: Động từ ghép - Phần 2",
    description: "Mở rộng động từ có tiền tố với cấu trúc quy luật biến đổi kế thừa."
  },
  11: {
    title: "Màn 11: Động từ chuyên sâu - Phần 1",
    description: "Các dạng từ ít gặp hơn nhưng có tần suất cao trong văn bản chính thức."
  },
  12: {
    title: "Màn 12: Động từ chuyên sâu - Phần 2",
    description: "Luyện tập các cặp động từ dễ gây nhầm lẫn về mặt ngữ nghĩa."
  },
  13: {
    title: "Màn 13: Động từ tiền tố Out- & Over-",
    description: "Nhóm động từ miêu tả hành động vượt trội hoặc quá mức."
  },
  14: {
    title: "Màn 14: Biến thể tiền tố Over-",
    description: "Rèn luyện các động từ mang ý nghĩa làm quá giới hạn."
  },
  15: {
    title: "Màn 15: Động từ tiền tố Re-",
    description: "Các động từ diễn tả hành động lặp lại hoặc làm lại từ đầu."
  },
  16: {
    title: "Màn 16: Biến thể nâng cao & Hiếm gặp",
    description: "Động từ dành cho người học mức độ khá giỏi muốn chinh phục trọn bộ."
  },
  17: {
    title: "Màn 17: Động từ phức hợp & Học thuật",
    description: "Nhóm động từ xuất hiện trong bài thi IELTS, TOEIC và văn bản chuyên ngành."
  },
  18: {
    title: "Màn 18: Thách thức tối thượng",
    description: "Bộ 20 động từ nâng cao và cổ điển cuối cùng để làm chủ hoàn toàn 360 động từ!"
  }
};

export const LEVELS: LevelInfo[] = Array.from({ length: 18 }, (_, index) => {
  const levelId = index + 1;
  const verbIds = IRREGULAR_VERBS
    .filter(verb => verb.level === levelId)
    .map(verb => verb.id);

  const meta = LEVEL_METADATA[levelId] || {
    title: `Màn ${levelId}`,
    description: `20 động từ bất quy tắc cấp độ ${levelId}.`
  };

  return {
    id: levelId,
    title: meta.title,
    description: meta.description,
    verbIds,
    unlockedByDefault: true,
  };
});

export const getLevelById = (id: number): LevelInfo | undefined => {
  return LEVELS.find(l => l.id === id);
};
