# Irregular Verbs 360 - Luyện tập 360 Động từ bất quy tắc tiếng Anh

**Irregular Verbs 360** là ứng dụng web hiện đại giúp người học tiếng Anh ghi nhớ và rèn luyện **360 động từ bất quy tắc** thông qua flashcard, 8 dạng trò chơi tương tác, sổ từ sai thông minh và hệ thống thống kê tiến độ học tập.

---

## 🌟 Tính năng nổi bật

- **360 Động từ chuẩn hóa**: Đầy đủ V1, V2, V3, nghĩa tiếng Việt, phát âm, ghi chú ngữ pháp và biến thể Anh - Mỹ (UK / US).
- **18 Màn học bài bản**: Chia đều 20 động từ mỗi màn, mở khóa theo tỷ lệ chính xác (≥70%).
- **Thẻ Flashcard 3D & Bảng từ**: Học từ với hiệu ứng lật thẻ 3D, âm thanh phát âm mẫu (Web Speech API) và bảng từ tổng hợp.
- **8 Dạng trò chơi & Thử thách**:
  1. **Quiz trắc nghiệm**: Đáp án nhiễu thông minh (không trùng câu đúng, không câu 2 đáp án đúng, chấm điểm khoảng cách từ).
  2. **Nhập V2 và V3**: Điền 2 dạng quá khứ với khả năng chấp nhận nhiều biến thể hợp lệ.
  3. **Điền dạng còn thiếu**: Linh hoạt hỏi theo mọi chiều (cho V1 tìm V2/V3, cho V2 tìm V1/V3...).
  4. **Nối từ**: Ghép 5-8 cặp từ trên giao diện di động.
  5. **Đúng hay Sai?**: Kiểm tra tính hợp lệ của bộ 3 dạng động từ.
  6. **Tìm từ khác nhóm**: Chọn từ không cùng quy luật biến đổi (với lời giải thích quy luật).
  7. **Sắp xếp thứ tự**: Đổi vị trí thẻ thành chuỗi V1 → V2 → V3.
  8. **Thử thách tổng hợp**: Trộn nhiều dạng câu hỏi với tùy chọn giới hạn thời gian.
- **Sổ từ sai (Mistake Book)**: Tự động lưu các từ bạn trả lời sai, ưu tiên ôn tập cho tới khi trả lời đúng 3 lần liên tiếp.
- **Từ điển 360**: Tìm kiếm nhanh theo V1, V2, V3, nghĩa tiếng Việt, lọc theo màn học, trạng thái thuộc và quy luật từ.
- **Thống kê & Tiến độ**: Biểu đồ phân bố 4 mức độ (Mới, Đang học, Đang ôn, Đã thuộc), chuỗi ngày học (Daily Streak).
- **Sao lưu & Phục hồi**: Xuất/Nhập dữ liệu tiến độ ra tệp JSON, tùy chọn Reset tiến độ an toàn.
- **Deploy GitHub Pages 100%**: Sử dụng HashRouter, chạy mượt trên mọi thiết bị và tên miền GitHub Pages không lo lỗi 404.

---

## 🛠️ Công nghệ sử dụng

- **Core**: React 19, TypeScript, Vite 6
- **Styling**: Tailwind CSS v3, Lucide React (Icons), Canvas Confetti (Hiệu ứng)
- **State & Storage**: LocalStorage với Schema Versioning & Auto Migration
- **Sound**: Web Audio API Synthesizer (Âm thanh chuẩn offline không lo lỗi 404)
- **Testing**: Vitest unit test suite

---

## 📁 Cấu trúc dự án

```text
src/
├── components/
│   ├── common/             # Component cơ bản (Badge, Card, Button)
│   ├── dictionary/         # VerbCard, VerbDetailModal
│   ├── flashcards/         # FlashcardView, VerbTableView
│   └── layout/             # Navbar, Footer, Modal
├── data/
│   ├── levelsData.ts       # 18 Màn học metadata & danh sách 20 động từ
│   └── verbsData.ts        # Bộ dữ liệu chuẩn 360 động từ bất quy tắc
├── games/
│   ├── InputGame.tsx       # Game 2: Nhập V2 & V3
│   ├── MatchingGame.tsx    # Game 4: Nối từ
│   ├── MissingFormsGame.tsx# Game 3: Điền dạng còn thiếu
│   ├── MistakeReviewGame.tsx # Game 8: Ôn sổ từ sai
│   ├── MixedChallengeGame.tsx # Game 9: Thử thách tổng hợp
│   ├── OddOneOutGame.tsx   # Game 6: Tìm từ khác nhóm
│   ├── QuizGame.tsx        # Game 1: Quiz trắc nghiệm
│   ├── ReorderGame.tsx     # Game 7: Sắp xếp thứ tự
│   └── TrueFalseGame.tsx   # Game 5: Đúng hay Sai?
├── hooks/
│   └── useProgress.ts      # React hook tích hợp LocalStorage & State
├── pages/
│   ├── DictionaryPage.tsx  # Trang Từ điển 360
│   ├── GamePlayPage.tsx    # Trình phát game & Modal báo kết quả
│   ├── HomePage.tsx        # Dashboard tổng quan & 18 Màn
│   ├── LevelGamesPage.tsx  # Chọn game của màn
│   ├── LevelsPage.tsx      # Danh sách 18 màn
│   ├── ReviewPage.tsx      # Sổ từ sai (Mistake book)
│   ├── SettingsPage.tsx    # Cài đặt, sao lưu, reset
│   └── StatisticsPage.tsx  # Thống kê phân bố học tập
├── services/
│   └── progressService.ts  # Quản lý lưu trữ LocalStorage, migration, export/import
├── styles/
│   └── index.css           # Design system, glassmorphism & tailwind directives
├── tests/
│   ├── answerNormalizer.test.ts   # Test chuẩn hóa đáp án
│   ├── datasetValidator.test.ts   # Test kiểm tra 360 động từ & 18 màn
│   └── distractorGenerator.test.ts# Test thuật toán đáp án nhiễu
├── types/
│   ├── game.ts
│   ├── progress.ts
│   └── verb.ts
├── utils/
│   ├── answerNormalizer.ts   # Xử lý cắt khoảng trắng, chữ hoa/thường, biến thể
│   ├── datasetValidator.ts   # Hàm kiểm tra tính hợp lệ của dữ liệu
│   ├── distractorGenerator.ts# Thuật toán sinh đáp án nhiễu an toàn
│   ├── masteryCalculator.ts  # Thuật toán tính điểm 0-100 & trạng thái
│   └── soundEffects.ts       # Bộ phát âm thanh Web Audio API
├── App.tsx                   # Single Page Application Hash Router
└── main.tsx                  # Root entry point
```

---

## 🚀 Hướng dẫn Cài đặt & Chạy ứng dụng

### 1. Cài đặt các gói phụ thuộc
```bash
npm install
```

### 2. Chạy môi trường Development
```bash
npm run dev
```
Mở trình duyệt truy cập: `http://localhost:5173`

### 3. Chạy Unit Tests
```bash
npm run test
```

### 4. Build sản phẩm cho Production
```bash
npm run build
```
Sản phẩm build sẽ nằm ở thư mục `dist/`.

---

## 🌐 Hướng dẫn Deploy lên GitHub Pages

Ứng dụng được thiết kế tương thích 100% với GitHub Pages:

1. **Khởi tạo repository Git** (nếu chưa có):
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Irregular Verbs 360"
   ```

2. **Đẩy code lên GitHub**:
   ```bash
   git remote add origin https://github.com/USERNAME/IrregularVerbsGame.git
   git branch -M main
   git push -u origin main
   ```

3. **Cấu hình GitHub Pages**:
   - Vào repository trên GitHub -> **Settings** -> **Pages**.
   - Mục **Source**: Chọn **GitHub Actions** (hoặc Deploy from branch `main` / `gh-pages`).
   - Nếu dùng GitHub Actions, chọn workflow **Static HTML / Vite**.

Ứng dụng sẽ hoạt động mượt mà tại `https://USERNAME.github.io/IrregularVerbsGame/#/` mà không xảy ra lỗi 404 khi làm mới trang.

---

## 📚 Nguồn Dữ liệu & Giấy phép

- **Nguồn dữ liệu**: Bộ dữ liệu 360 động từ bất quy tắc được biên soạn chuẩn hóa từ WordNet & Wiktionary English Irregular Verbs repository.
- **Giấy phép**: Giấy phép mở (Open Access / MIT License) phục vụ mục đích giáo dục phi thương mại.

---

## 🛠️ Hướng dẫn Mở rộng

### Thêm một động từ mới
Mở tệp `src/data/verbsData.ts` và thêm một đối tượng dạng `IrregularVerb`:
```ts
{
  id: "newverb",
  v1: "newverb",
  v2: ["v2form"],
  v3: ["v3form"],
  meaning: "nghĩa tiếng Việt",
  level: 1,
  frequency: "common",
  patternGroup: "v2=v3"
}
```

### Thêm một game mới
1. Tạo file game mới trong `src/games/NewGame.tsx`.
2. Định nghĩa giao diện nhận props `verbs`, `onCompleteSession`, `onExit`.
3. Khai báo kiểu game trong `src/types/game.ts` và tích hợp vào `GamePlayPage.tsx`.

---

© 2026 Irregular Verbs 360 - Xây dựng với ❤️ dành cho người học tiếng Anh.
