import { IrregularVerb } from '../types/verb';

/**
 * Irregular Verbs 360 Dataset
 * Source: Curated standard English irregular verbs reference dataset.
 * License: Open Access for educational applications.
 * Total Verbs: 360
 * Levels: 18 (20 verbs per level)
 */
export const IRREGULAR_VERBS: IrregularVerb[] = [
  {
    "id": "be",
    "v1": "be",
    "v2": [
      "was",
      "were"
    ],
    "v3": [
      "been"
    ],
    "meaning": "là, thì, ở",
    "level": 1,
    "frequency": "common",
    "patternGroup": "mixed"
  },
  {
    "id": "have",
    "v1": "have",
    "v2": [
      "had"
    ],
    "v3": [
      "had"
    ],
    "meaning": "có, ăn, uống",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "do",
    "v1": "do",
    "v2": [
      "did"
    ],
    "v3": [
      "done"
    ],
    "meaning": "làm, thực hiện",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v1!=v2!=v3"
  },
  {
    "id": "go",
    "v1": "go",
    "v2": [
      "went"
    ],
    "v3": [
      "gone"
    ],
    "meaning": "đi",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v1!=v2!=v3"
  },
  {
    "id": "say",
    "v1": "say",
    "v2": [
      "said"
    ],
    "v3": [
      "said"
    ],
    "meaning": "nói",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "make",
    "v1": "make",
    "v2": [
      "made"
    ],
    "v3": [
      "made"
    ],
    "meaning": "chế tạo, làm ra",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "know",
    "v1": "know",
    "v2": [
      "knew"
    ],
    "v3": [
      "known"
    ],
    "meaning": "biết, quen thuộc",
    "level": 1,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "take",
    "v1": "take",
    "v2": [
      "took"
    ],
    "v3": [
      "taken"
    ],
    "meaning": "cầm, lấy, đưa đi",
    "level": 1,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "see",
    "v1": "see",
    "v2": [
      "saw"
    ],
    "v3": [
      "seen"
    ],
    "meaning": "nhìn thấy, hiểu",
    "level": 1,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "come",
    "v1": "come",
    "v2": [
      "came"
    ],
    "v3": [
      "come"
    ],
    "meaning": "đến, tới",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v1=v3"
  },
  {
    "id": "think",
    "v1": "think",
    "v2": [
      "thought"
    ],
    "v3": [
      "thought"
    ],
    "meaning": "suy nghĩ, cho rằng",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "get",
    "v1": "get",
    "v2": [
      "got"
    ],
    "v3": [
      "gotten",
      "got"
    ],
    "meaning": "nhận được, có được",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "notes": "Gotten phổ biến hơn ở Mỹ, got phổ biến hơn ở Anh."
  },
  {
    "id": "give",
    "v1": "give",
    "v2": [
      "gave"
    ],
    "v3": [
      "given"
    ],
    "meaning": "cho, tặng",
    "level": 1,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "find",
    "v1": "find",
    "v2": [
      "found"
    ],
    "v3": [
      "found"
    ],
    "meaning": "tìm thấy, nhận ra",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "tell",
    "v1": "tell",
    "v2": [
      "told"
    ],
    "v3": [
      "told"
    ],
    "meaning": "kể, bảo, nói với",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "become",
    "v1": "become",
    "v2": [
      "became"
    ],
    "v3": [
      "become"
    ],
    "meaning": "trở thành, trở nên",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v1=v3"
  },
  {
    "id": "show",
    "v1": "show",
    "v2": [
      "showed"
    ],
    "v3": [
      "shown",
      "showed"
    ],
    "meaning": "cho xem, trình bày",
    "level": 1,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "leave",
    "v1": "leave",
    "v2": [
      "left"
    ],
    "v3": [
      "left"
    ],
    "meaning": "rời đi, bỏ lại",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "feel",
    "v1": "feel",
    "v2": [
      "felt"
    ],
    "v3": [
      "felt"
    ],
    "meaning": "cảm thấy",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "put",
    "v1": "put",
    "v2": [
      "put"
    ],
    "v3": [
      "put"
    ],
    "meaning": "đặt, để",
    "level": 1,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "bring",
    "v1": "bring",
    "v2": [
      "brought"
    ],
    "v3": [
      "brought"
    ],
    "meaning": "mang theo, mang lại",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "begin",
    "v1": "begin",
    "v2": [
      "began"
    ],
    "v3": [
      "begun"
    ],
    "meaning": "bắt đầu",
    "level": 2,
    "frequency": "common",
    "patternGroup": "vowel_change"
  },
  {
    "id": "keep",
    "v1": "keep",
    "v2": [
      "kept"
    ],
    "v3": [
      "kept"
    ],
    "meaning": "giữ, tiếp tục",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "hold",
    "v1": "hold",
    "v2": [
      "held"
    ],
    "v3": [
      "held"
    ],
    "meaning": "cầm, nắm, tổ chức",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "write",
    "v1": "write",
    "v2": [
      "wrote"
    ],
    "v3": [
      "written"
    ],
    "meaning": "viết",
    "level": 2,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "stand",
    "v1": "stand",
    "v2": [
      "stood"
    ],
    "v3": [
      "stood"
    ],
    "meaning": "đứng, chịu đựng",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "hear",
    "v1": "hear",
    "v2": [
      "heard"
    ],
    "v3": [
      "heard"
    ],
    "meaning": "nghe thấy",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "let",
    "v1": "let",
    "v2": [
      "let"
    ],
    "v3": [
      "let"
    ],
    "meaning": "cho phép, để cho",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "mean",
    "v1": "mean",
    "v2": [
      "meant"
    ],
    "v3": [
      "meant"
    ],
    "meaning": "có nghĩa là, có ý định",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "set",
    "v1": "set",
    "v2": [
      "set"
    ],
    "v3": [
      "set"
    ],
    "meaning": "thiết lập, đặt, để",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "meet",
    "v1": "meet",
    "v2": [
      "met"
    ],
    "v3": [
      "met"
    ],
    "meaning": "gặp gỡ, đáp ứng",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "run",
    "v1": "run",
    "v2": [
      "ran"
    ],
    "v3": [
      "run"
    ],
    "meaning": "chạy, điều hành",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v1=v3"
  },
  {
    "id": "pay",
    "v1": "pay",
    "v2": [
      "paid"
    ],
    "v3": [
      "paid"
    ],
    "meaning": "trả tiền, thanh toán",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "sit",
    "v1": "sit",
    "v2": [
      "sat"
    ],
    "v3": [
      "sat"
    ],
    "meaning": "ngồi",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "speak",
    "v1": "speak",
    "v2": [
      "spoke"
    ],
    "v3": [
      "spoken"
    ],
    "meaning": "nói chuyện, phát biểu",
    "level": 2,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "lie",
    "v1": "lie",
    "v2": [
      "lay"
    ],
    "v3": [
      "lain"
    ],
    "meaning": "nằm, tọa lạc",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v1!=v2!=v3",
    "notes": "Lie (nói dối) là động từ thường: lied - lied."
  },
  {
    "id": "lead",
    "v1": "lead",
    "v2": [
      "led"
    ],
    "v3": [
      "led"
    ],
    "meaning": "dẫn dắt, lãnh đạo",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "read",
    "v1": "read",
    "v2": [
      "read"
    ],
    "v3": [
      "read"
    ],
    "meaning": "đọc (phát âm V2/V3 là /red/)",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "grow",
    "v1": "grow",
    "v2": [
      "grew"
    ],
    "v3": [
      "grown"
    ],
    "meaning": "phát triển, trồng",
    "level": 2,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "lose",
    "v1": "lose",
    "v2": [
      "lost"
    ],
    "v3": [
      "lost"
    ],
    "meaning": "đánh mất, thua",
    "level": 2,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "fall",
    "v1": "fall",
    "v2": [
      "fell"
    ],
    "v3": [
      "fallen"
    ],
    "meaning": "ngã, rơi, giảm",
    "level": 3,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "send",
    "v1": "send",
    "v2": [
      "sent"
    ],
    "v3": [
      "sent"
    ],
    "meaning": "gửi đi",
    "level": 3,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "build",
    "v1": "build",
    "v2": [
      "built"
    ],
    "v3": [
      "built"
    ],
    "meaning": "xây dựng",
    "level": 3,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "understand",
    "v1": "understand",
    "v2": [
      "understood"
    ],
    "v3": [
      "understood"
    ],
    "meaning": "hiểu",
    "level": 3,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "draw",
    "v1": "draw",
    "v2": [
      "drew"
    ],
    "v3": [
      "drawn"
    ],
    "meaning": "vẽ, kéo, thu hút",
    "level": 3,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "break",
    "v1": "break",
    "v2": [
      "broke"
    ],
    "v3": [
      "broken"
    ],
    "meaning": "làm vỡ, bẻ gãy",
    "level": 3,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "spend",
    "v1": "spend",
    "v2": [
      "spent"
    ],
    "v3": [
      "spent"
    ],
    "meaning": "dành (thời gian), tiêu (tiền)",
    "level": 3,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "cut",
    "v1": "cut",
    "v2": [
      "cut"
    ],
    "v3": [
      "cut"
    ],
    "meaning": "cắt, thái",
    "level": 3,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "rise",
    "v1": "rise",
    "v2": [
      "rose"
    ],
    "v3": [
      "risen"
    ],
    "meaning": "mọc lên, gia tăng",
    "level": 3,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "drive",
    "v1": "drive",
    "v2": [
      "drove"
    ],
    "v3": [
      "driven"
    ],
    "meaning": "lái xe, thúc đẩy",
    "level": 3,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "buy",
    "v1": "buy",
    "v2": [
      "bought"
    ],
    "v3": [
      "bought"
    ],
    "meaning": "mua",
    "level": 3,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "wear",
    "v1": "wear",
    "v2": [
      "wore"
    ],
    "v3": [
      "worn"
    ],
    "meaning": "mặc, đeo, mang",
    "level": 3,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "choose",
    "v1": "choose",
    "v2": [
      "chose"
    ],
    "v3": [
      "chosen"
    ],
    "meaning": "chọn lựa",
    "level": 3,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "seek",
    "v1": "seek",
    "v2": [
      "sought"
    ],
    "v3": [
      "sought"
    ],
    "meaning": "tìm kiếm, theo đuổi",
    "level": 3,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "catch",
    "v1": "catch",
    "v2": [
      "caught"
    ],
    "v3": [
      "caught"
    ],
    "meaning": "bắt lấy, bắt kịp",
    "level": 3,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "deal",
    "v1": "deal",
    "v2": [
      "dealt"
    ],
    "v3": [
      "dealt"
    ],
    "meaning": "thỏa thuận, đối phó",
    "level": 3,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "win",
    "v1": "win",
    "v2": [
      "won"
    ],
    "v3": [
      "won"
    ],
    "meaning": "chiến thắng, giành được",
    "level": 3,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "forget",
    "v1": "forget",
    "v2": [
      "forgot"
    ],
    "v3": [
      "forgotten",
      "forgot"
    ],
    "meaning": "quên",
    "level": 3,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "lay",
    "v1": "lay",
    "v2": [
      "laid"
    ],
    "v3": [
      "laid"
    ],
    "meaning": "đặt, để, đẻ trứng",
    "level": 3,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "cost",
    "v1": "cost",
    "v2": [
      "cost"
    ],
    "v3": [
      "cost"
    ],
    "meaning": "có giá là, tốn kém",
    "level": 3,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "eat",
    "v1": "eat",
    "v2": [
      "ate"
    ],
    "v3": [
      "eaten"
    ],
    "meaning": "ăn",
    "level": 4,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "beat",
    "v1": "beat",
    "v2": [
      "beat"
    ],
    "v3": [
      "beaten",
      "beat"
    ],
    "meaning": "đánh đập, đánh bại",
    "level": 4,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "hit",
    "v1": "hit",
    "v2": [
      "hit"
    ],
    "v3": [
      "hit"
    ],
    "meaning": "đánh, va chạm",
    "level": 4,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "hurt",
    "v1": "hurt",
    "v2": [
      "hurt"
    ],
    "v3": [
      "hurt"
    ],
    "meaning": "làm đau, tổn thương",
    "level": 4,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "sing",
    "v1": "sing",
    "v2": [
      "sang"
    ],
    "v3": [
      "sung"
    ],
    "meaning": "hát",
    "level": 4,
    "frequency": "common",
    "patternGroup": "vowel_change"
  },
  {
    "id": "fly",
    "v1": "fly",
    "v2": [
      "flew"
    ],
    "v3": [
      "flown"
    ],
    "meaning": "bay",
    "level": 4,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "ride",
    "v1": "ride",
    "v2": [
      "rode"
    ],
    "v3": [
      "ridden"
    ],
    "meaning": "cưỡi (ngựa), đi (xe)",
    "level": 4,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "sell",
    "v1": "sell",
    "v2": [
      "sold"
    ],
    "v3": [
      "sold"
    ],
    "meaning": "bán",
    "level": 4,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "ring",
    "v1": "ring",
    "v2": [
      "rang"
    ],
    "v3": [
      "rung"
    ],
    "meaning": "rung chuông, gọi điện",
    "level": 4,
    "frequency": "common",
    "patternGroup": "vowel_change"
  },
  {
    "id": "swim",
    "v1": "swim",
    "v2": [
      "swam"
    ],
    "v3": [
      "swum"
    ],
    "meaning": "bơi lội",
    "level": 4,
    "frequency": "common",
    "patternGroup": "vowel_change"
  },
  {
    "id": "throw",
    "v1": "throw",
    "v2": [
      "threw"
    ],
    "v3": [
      "thrown"
    ],
    "meaning": "ném, quăng",
    "level": 4,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "teach",
    "v1": "teach",
    "v2": [
      "taught"
    ],
    "v3": [
      "taught"
    ],
    "meaning": "dạy học, giảng dạy",
    "level": 4,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "sleep",
    "v1": "sleep",
    "v2": [
      "slept"
    ],
    "v3": [
      "slept"
    ],
    "meaning": "ngủ",
    "level": 4,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "drink",
    "v1": "drink",
    "v2": [
      "drank"
    ],
    "v3": [
      "drunk"
    ],
    "meaning": "uống",
    "level": 4,
    "frequency": "common",
    "patternGroup": "vowel_change"
  },
  {
    "id": "fight",
    "v1": "fight",
    "v2": [
      "fought"
    ],
    "v3": [
      "fought"
    ],
    "meaning": "chiến đấu, đánh nhau",
    "level": 4,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "hide",
    "v1": "hide",
    "v2": [
      "hid"
    ],
    "v3": [
      "hidden"
    ],
    "meaning": "trốn, giấu",
    "level": 4,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "shoot",
    "v1": "shoot",
    "v2": [
      "shot"
    ],
    "v3": [
      "shot"
    ],
    "meaning": "bắn, quay phim",
    "level": 4,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "shut",
    "v1": "shut",
    "v2": [
      "shut"
    ],
    "v3": [
      "shut"
    ],
    "meaning": "đóng lại, khép lại",
    "level": 4,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "steal",
    "v1": "steal",
    "v2": [
      "stole"
    ],
    "v3": [
      "stolen"
    ],
    "meaning": "trộm, cắp",
    "level": 4,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "feed",
    "v1": "feed",
    "v2": [
      "fed"
    ],
    "v3": [
      "fed"
    ],
    "meaning": "cho ăn, nuôi dưỡng",
    "level": 4,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "shake",
    "v1": "shake",
    "v2": [
      "shook"
    ],
    "v3": [
      "shaken"
    ],
    "meaning": "rung, lắc, bắt tay",
    "level": 5,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "spread",
    "v1": "spread",
    "v2": [
      "spread"
    ],
    "v3": [
      "spread"
    ],
    "meaning": "lan truyền, trải ra",
    "level": 5,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "hang",
    "v1": "hang",
    "v2": [
      "hung",
      "hanged"
    ],
    "v3": [
      "hung",
      "hanged"
    ],
    "meaning": "treo (tranh/đồ), treo cổ (hanged)",
    "level": 5,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "notes": "Hanged dùng cho hình phạt treo cổ."
  },
  {
    "id": "blow",
    "v1": "blow",
    "v2": [
      "blew"
    ],
    "v3": [
      "blown"
    ],
    "meaning": "thổi",
    "level": 5,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "lend",
    "v1": "lend",
    "v2": [
      "lent"
    ],
    "v3": [
      "lent"
    ],
    "meaning": "cho vay, cho mượn",
    "level": 5,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "sink",
    "v1": "sink",
    "v2": [
      "sank"
    ],
    "v3": [
      "sunk"
    ],
    "meaning": "chìm, chìm xuống",
    "level": 5,
    "frequency": "common",
    "patternGroup": "vowel_change"
  },
  {
    "id": "bend",
    "v1": "bend",
    "v2": [
      "bent"
    ],
    "v3": [
      "bent"
    ],
    "meaning": "bẻ cong, cúi xuống",
    "level": 5,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "freeze",
    "v1": "freeze",
    "v2": [
      "froze"
    ],
    "v3": [
      "frozen"
    ],
    "meaning": "đóng băng, đông lạnh",
    "level": 5,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "burst",
    "v1": "burst",
    "v2": [
      "burst"
    ],
    "v3": [
      "burst"
    ],
    "meaning": "nổ tung, bùng phát",
    "level": 5,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "slide",
    "v1": "slide",
    "v2": [
      "slid"
    ],
    "v3": [
      "slid"
    ],
    "meaning": "trượt, lướt",
    "level": 5,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "bite",
    "v1": "bite",
    "v2": [
      "bit"
    ],
    "v3": [
      "bitten"
    ],
    "meaning": "cắn",
    "level": 5,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "tear",
    "v1": "tear",
    "v2": [
      "tore"
    ],
    "v3": [
      "torn"
    ],
    "meaning": "xé rách",
    "level": 5,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "swear",
    "v1": "swear",
    "v2": [
      "swore"
    ],
    "v3": [
      "sworn"
    ],
    "meaning": "thề, chửi thề",
    "level": 5,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "stick",
    "v1": "stick",
    "v2": [
      "stuck"
    ],
    "v3": [
      "stuck"
    ],
    "meaning": "dán, dính, đâm",
    "level": 5,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "dig",
    "v1": "dig",
    "v2": [
      "dug"
    ],
    "v3": [
      "dug"
    ],
    "meaning": "đào, bới",
    "level": 5,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "quit",
    "v1": "quit",
    "v2": [
      "quit",
      "quitted"
    ],
    "v3": [
      "quit",
      "quitted"
    ],
    "meaning": "bỏ, nghỉ việc",
    "level": 5,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "wake",
    "v1": "wake",
    "v2": [
      "woke",
      "waked"
    ],
    "v3": [
      "woken",
      "waked"
    ],
    "meaning": "thức dậy, đánh thức",
    "level": 5,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "shine",
    "v1": "shine",
    "v2": [
      "shone",
      "shined"
    ],
    "v3": [
      "shone",
      "shined"
    ],
    "meaning": "chiếu sáng, đánh bóng",
    "level": 5,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "notes": "Shined dùng khi đánh bóng (ví dụ: shined shoes)."
  },
  {
    "id": "sweep",
    "v1": "sweep",
    "v2": [
      "swept"
    ],
    "v3": [
      "swept"
    ],
    "meaning": "quét nhà, quét qua",
    "level": 5,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "learn",
    "v1": "learn",
    "v2": [
      "learned",
      "learnt"
    ],
    "v3": [
      "learned",
      "learnt"
    ],
    "meaning": "học tập",
    "level": 5,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "variants": [
      {
        "form": "learned",
        "region": "US"
      },
      {
        "form": "learnt",
        "region": "UK"
      }
    ],
    "notes": "Learned phổ biến ở Mỹ, learnt phổ biến ở Anh."
  },
  {
    "id": "dream",
    "v1": "dream",
    "v2": [
      "dreamed",
      "dreamt"
    ],
    "v3": [
      "dreamed",
      "dreamt"
    ],
    "meaning": "nằm mơ, mơ ước",
    "level": 6,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "variants": [
      {
        "form": "dreamed",
        "region": "US"
      },
      {
        "form": "dreamt",
        "region": "UK"
      }
    ]
  },
  {
    "id": "burn",
    "v1": "burn",
    "v2": [
      "burned",
      "burnt"
    ],
    "v3": [
      "burned",
      "burnt"
    ],
    "meaning": "đốt, cháy",
    "level": 6,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "variants": [
      {
        "form": "burned",
        "region": "US"
      },
      {
        "form": "burnt",
        "region": "UK"
      }
    ]
  },
  {
    "id": "spell",
    "v1": "spell",
    "v2": [
      "spelled",
      "spelt"
    ],
    "v3": [
      "spelled",
      "spelt"
    ],
    "meaning": "đánh vần",
    "level": 6,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "variants": [
      {
        "form": "spelled",
        "region": "US"
      },
      {
        "form": "spelt",
        "region": "UK"
      }
    ]
  },
  {
    "id": "smell",
    "v1": "smell",
    "v2": [
      "smelled",
      "smelt"
    ],
    "v3": [
      "smelled",
      "smelt"
    ],
    "meaning": "ngửi, tỏa mùi",
    "level": 6,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "variants": [
      {
        "form": "smelled",
        "region": "US"
      },
      {
        "form": "smelt",
        "region": "UK"
      }
    ]
  },
  {
    "id": "spill",
    "v1": "spill",
    "v2": [
      "spilled",
      "spilt"
    ],
    "v3": [
      "spilled",
      "spilt"
    ],
    "meaning": "tràn, làm đổ",
    "level": 6,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "variants": [
      {
        "form": "spilled",
        "region": "US"
      },
      {
        "form": "spilt",
        "region": "UK"
      }
    ]
  },
  {
    "id": "speed",
    "v1": "speed",
    "v2": [
      "sped",
      "speeded"
    ],
    "v3": [
      "sped",
      "speeded"
    ],
    "meaning": "chạy tốc độ, tăng tốc",
    "level": 6,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "bear",
    "v1": "bear",
    "v2": [
      "bore"
    ],
    "v3": [
      "borne",
      "born"
    ],
    "meaning": "chịu đựng, sinh đẻ",
    "level": 6,
    "frequency": "common",
    "patternGroup": "en_suffix",
    "notes": "Born dùng trong thể bị động nghĩa sinh ra (was born)."
  },
  {
    "id": "awake",
    "v1": "awake",
    "v2": [
      "awoke",
      "awaked"
    ],
    "v3": [
      "awoken",
      "awaked"
    ],
    "meaning": "thức giấc",
    "level": 6,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "arise",
    "v1": "arise",
    "v2": [
      "arose"
    ],
    "v3": [
      "arisen"
    ],
    "meaning": "nảy sinh, phát sinh",
    "level": 6,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "bet",
    "v1": "bet",
    "v2": [
      "bet",
      "betted"
    ],
    "v3": [
      "bet",
      "betted"
    ],
    "meaning": "cá cược",
    "level": 6,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "bid",
    "v1": "bid",
    "v2": [
      "bid"
    ],
    "v3": [
      "bid"
    ],
    "meaning": "đấu giá, trả giá",
    "level": 6,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "bind",
    "v1": "bind",
    "v2": [
      "bound"
    ],
    "v3": [
      "bound"
    ],
    "meaning": "trói, buộc, ràng buộc",
    "level": 6,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "bleed",
    "v1": "bleed",
    "v2": [
      "bled"
    ],
    "v3": [
      "bled"
    ],
    "meaning": "chảy máu",
    "level": 6,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "breed",
    "v1": "breed",
    "v2": [
      "bred"
    ],
    "v3": [
      "bred"
    ],
    "meaning": "nuôi dưỡng, sinh sản",
    "level": 6,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "broadcast",
    "v1": "broadcast",
    "v2": [
      "broadcast",
      "broadcasted"
    ],
    "v3": [
      "broadcast",
      "broadcasted"
    ],
    "meaning": "phát sóng truyền thanh/hình",
    "level": 6,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "cast",
    "v1": "cast",
    "v2": [
      "cast"
    ],
    "v3": [
      "cast"
    ],
    "meaning": "ném, đúc, phân vai",
    "level": 6,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "cling",
    "v1": "cling",
    "v2": [
      "clung"
    ],
    "v3": [
      "clung"
    ],
    "meaning": "bám chặt, khăng khăng",
    "level": 6,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "creep",
    "v1": "creep",
    "v2": [
      "crept"
    ],
    "v3": [
      "crept"
    ],
    "meaning": "bò, rón rén",
    "level": 6,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "dare",
    "v1": "dare",
    "v2": [
      "dared",
      "durst"
    ],
    "v3": [
      "dared"
    ],
    "meaning": "dám",
    "level": 6,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "dive",
    "v1": "dive",
    "v2": [
      "dived",
      "dove"
    ],
    "v3": [
      "dived"
    ],
    "meaning": "lặn, lao xuống",
    "level": 6,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "variants": [
      {
        "form": "dove",
        "region": "US"
      }
    ]
  },
  {
    "id": "flee",
    "v1": "flee",
    "v2": [
      "fled"
    ],
    "v3": [
      "fled"
    ],
    "meaning": "chạy trốn, bỏ chạy",
    "level": 7,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "fling",
    "v1": "fling",
    "v2": [
      "flung"
    ],
    "v3": [
      "flung"
    ],
    "meaning": "ném mạnh, quăng mạnh",
    "level": 7,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "forbid",
    "v1": "forbid",
    "v2": [
      "forbade",
      "forbad"
    ],
    "v3": [
      "forbidden"
    ],
    "meaning": "nghiêm cấm",
    "level": 7,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "forgive",
    "v1": "forgive",
    "v2": [
      "forgave"
    ],
    "v3": [
      "forgiven"
    ],
    "meaning": "tha thứ",
    "level": 7,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "forgo",
    "v1": "forgo",
    "v2": [
      "forwent"
    ],
    "v3": [
      "forgone"
    ],
    "meaning": "bỏ qua, kiêng cữ",
    "level": 7,
    "frequency": "rare",
    "patternGroup": "v1!=v2!=v3"
  },
  {
    "id": "grind",
    "v1": "grind",
    "v2": [
      "ground"
    ],
    "v3": [
      "ground"
    ],
    "meaning": "xay, nghiền nhỏ",
    "level": 7,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "kneel",
    "v1": "kneel",
    "v2": [
      "knelt",
      "kneeled"
    ],
    "v3": [
      "knelt",
      "kneeled"
    ],
    "meaning": "quỳ gối",
    "level": 7,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "knit",
    "v1": "knit",
    "v2": [
      "knit",
      "knitted"
    ],
    "v3": [
      "knit",
      "knitted"
    ],
    "meaning": "đan len",
    "level": 7,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "leap",
    "v1": "leap",
    "v2": [
      "leapt",
      "leaped"
    ],
    "v3": [
      "leapt",
      "leaped"
    ],
    "meaning": "nhảy vọt",
    "level": 7,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "light",
    "v1": "light",
    "v2": [
      "lit",
      "lighted"
    ],
    "v3": [
      "lit",
      "lighted"
    ],
    "meaning": "thắp sáng, đốt đèn",
    "level": 7,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "mistake",
    "v1": "mistake",
    "v2": [
      "mistook"
    ],
    "v3": [
      "mistaken"
    ],
    "meaning": "phạm sai lầm, nhầm lẫn",
    "level": 7,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "mow",
    "v1": "mow",
    "v2": [
      "mowed"
    ],
    "v3": [
      "mown",
      "mowed"
    ],
    "meaning": "cắt cỏ",
    "level": 7,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "overcome",
    "v1": "overcome",
    "v2": [
      "overcame"
    ],
    "v3": [
      "overcome"
    ],
    "meaning": "vượt qua (khó khăn)",
    "level": 7,
    "frequency": "common",
    "patternGroup": "v1=v3"
  },
  {
    "id": "overdo",
    "v1": "overdo",
    "v2": [
      "overdid"
    ],
    "v3": [
      "overdone"
    ],
    "meaning": "làm quá sức, làm quá trớn",
    "level": 7,
    "frequency": "medium",
    "patternGroup": "v1!=v2!=v3"
  },
  {
    "id": "overtake",
    "v1": "overtake",
    "v2": [
      "overtook"
    ],
    "v3": [
      "overtaken"
    ],
    "meaning": "vượt mặt (xe), áp đảo",
    "level": 7,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "prove",
    "v1": "prove",
    "v2": [
      "proved"
    ],
    "v3": [
      "proven",
      "proved"
    ],
    "meaning": "chứng minh",
    "level": 7,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "rid",
    "v1": "rid",
    "v2": [
      "rid"
    ],
    "v3": [
      "rid"
    ],
    "meaning": "giải thoát, loại bỏ",
    "level": 7,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "saw",
    "v1": "saw",
    "v2": [
      "sawed"
    ],
    "v3": [
      "sawn",
      "sawed"
    ],
    "meaning": "cưa gỗ",
    "level": 7,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "sew",
    "v1": "sew",
    "v2": [
      "sewed"
    ],
    "v3": [
      "sewn",
      "sewed"
    ],
    "meaning": "may, khâu",
    "level": 7,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "shear",
    "v1": "shear",
    "v2": [
      "sheared"
    ],
    "v3": [
      "shorn",
      "sheared"
    ],
    "meaning": "xén lông cừu",
    "level": 7,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "shed",
    "v1": "shed",
    "v2": [
      "shed"
    ],
    "v3": [
      "shed"
    ],
    "meaning": "rụng (lá), rớt (nước mắt)",
    "level": 8,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "shrink",
    "v1": "shrink",
    "v2": [
      "shrank",
      "shrunk"
    ],
    "v3": [
      "shrunk"
    ],
    "meaning": "co lại, thu nhỏ",
    "level": 8,
    "frequency": "medium",
    "patternGroup": "vowel_change"
  },
  {
    "id": "shrive",
    "v1": "shrive",
    "v2": [
      "shrove",
      "shrived"
    ],
    "v3": [
      "shriven",
      "shrived"
    ],
    "meaning": "xưng tội, giải tội",
    "level": 8,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "slay",
    "v1": "slay",
    "v2": [
      "slew",
      "slayed"
    ],
    "v3": [
      "slain",
      "slayed"
    ],
    "meaning": "sát hại, tiêu diệt",
    "level": 8,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "sling",
    "v1": "sling",
    "v2": [
      "slung"
    ],
    "v3": [
      "slung"
    ],
    "meaning": "ném, treo móc",
    "level": 8,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "slink",
    "v1": "slink",
    "v2": [
      "slunk"
    ],
    "v3": [
      "slunk"
    ],
    "meaning": "lẻn đi, lén lút",
    "level": 8,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "slit",
    "v1": "slit",
    "v2": [
      "slit"
    ],
    "v3": [
      "slit"
    ],
    "meaning": "rạch, rạch nứt",
    "level": 8,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "smite",
    "v1": "smite",
    "v2": [
      "smote"
    ],
    "v3": [
      "smitten"
    ],
    "meaning": "đánh đập mạnh, mê đắm",
    "level": 8,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "sow",
    "v1": "sow",
    "v2": [
      "sowed"
    ],
    "v3": [
      "sown",
      "sowed"
    ],
    "meaning": "gieo hạt",
    "level": 8,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "spit",
    "v1": "spit",
    "v2": [
      "spat",
      "spit"
    ],
    "v3": [
      "spat",
      "spit"
    ],
    "meaning": "nhổ nước bọt",
    "level": 8,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "split",
    "v1": "split",
    "v2": [
      "split"
    ],
    "v3": [
      "split"
    ],
    "meaning": "chẻ, chia rẽ",
    "level": 8,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "spoil",
    "v1": "spoil",
    "v2": [
      "spoiled",
      "spoilt"
    ],
    "v3": [
      "spoiled",
      "spoilt"
    ],
    "meaning": "làm hỏng, chiều chuộng",
    "level": 8,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "variants": [
      {
        "form": "spoiled",
        "region": "US"
      },
      {
        "form": "spoilt",
        "region": "UK"
      }
    ]
  },
  {
    "id": "spring",
    "v1": "spring",
    "v2": [
      "sprang",
      "sprung"
    ],
    "v3": [
      "sprung"
    ],
    "meaning": "nhảy lên, bật dậy",
    "level": 8,
    "frequency": "medium",
    "patternGroup": "vowel_change"
  },
  {
    "id": "sting",
    "v1": "sting",
    "v2": [
      "stung"
    ],
    "v3": [
      "stung"
    ],
    "meaning": "châm, đốt (ong/bọ)",
    "level": 8,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "stink",
    "v1": "stink",
    "v2": [
      "stank",
      "stunk"
    ],
    "v3": [
      "stunk"
    ],
    "meaning": "bốc mùi hôi thối",
    "level": 8,
    "frequency": "medium",
    "patternGroup": "vowel_change"
  },
  {
    "id": "stride",
    "v1": "stride",
    "v2": [
      "strode"
    ],
    "v3": [
      "strridden"
    ],
    "meaning": "sải bước dài",
    "level": 8,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "strike",
    "v1": "strike",
    "v2": [
      "struck"
    ],
    "v3": [
      "struck",
      "stricken"
    ],
    "meaning": "đánh, đình công",
    "level": 8,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "string",
    "v1": "string",
    "v2": [
      "strung"
    ],
    "v3": [
      "strung"
    ],
    "meaning": "xâu chuỗi, lên dây đàn",
    "level": 8,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "strive",
    "v1": "strive",
    "v2": [
      "strove",
      "strived"
    ],
    "v3": [
      "striven",
      "strived"
    ],
    "meaning": "strive",
    "level": 8,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "sublet",
    "v1": "sublet",
    "v2": [
      "sublet"
    ],
    "v3": [
      "sublet"
    ],
    "meaning": "cho thuê lại",
    "level": 8,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "sunburn",
    "v1": "sunburn",
    "v2": [
      "sunburned",
      "sunburnt"
    ],
    "v3": [
      "sunburned",
      "sunburnt"
    ],
    "meaning": "cháy nắng",
    "level": 9,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "swell",
    "v1": "swell",
    "v2": [
      "swelled"
    ],
    "v3": [
      "swollen",
      "swelled"
    ],
    "meaning": "sưng lên, phồng lên",
    "level": 9,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "thrust",
    "v1": "thrust",
    "v2": [
      "thrust"
    ],
    "v3": [
      "thrust"
    ],
    "meaning": "đẩy mạnh, thọc",
    "level": 9,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "tread",
    "v1": "tread",
    "v2": [
      "trod"
    ],
    "v3": [
      "trodden",
      "trod"
    ],
    "meaning": "dẫm lên, bước lên",
    "level": 9,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "unbend",
    "v1": "unbend",
    "v2": [
      "unbent"
    ],
    "v3": [
      "unbent"
    ],
    "meaning": "duỗi thẳng, thư giãn",
    "level": 9,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "unbind",
    "v1": "unbind",
    "v2": [
      "unbound"
    ],
    "v3": [
      "unbound"
    ],
    "meaning": "cởi trói, tháo thắt",
    "level": 9,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "undergo",
    "v1": "undergo",
    "v2": [
      "underwent"
    ],
    "v3": [
      "undergone"
    ],
    "meaning": "trải qua, chịu đựng",
    "level": 9,
    "frequency": "common",
    "patternGroup": "v1!=v2!=v3"
  },
  {
    "id": "underlie",
    "v1": "underlie",
    "v2": [
      "underlay"
    ],
    "v3": [
      "underlain"
    ],
    "meaning": "nằm dưới, làm cơ sở",
    "level": 9,
    "frequency": "medium",
    "patternGroup": "v1!=v2!=v3"
  },
  {
    "id": "underpay",
    "v1": "underpay",
    "v2": [
      "underpaid"
    ],
    "v3": [
      "underpaid"
    ],
    "meaning": "trả lương thấp",
    "level": 9,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "undersell",
    "v1": "undersell",
    "v2": [
      "undersold"
    ],
    "v3": [
      "undersold"
    ],
    "meaning": "bán giá thấp hơn đối thủ",
    "level": 9,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "undertake",
    "v1": "undertake",
    "v2": [
      "undertook"
    ],
    "v3": [
      "undertaken"
    ],
    "meaning": "đảm nhận, thực hiện",
    "level": 9,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "underwrite",
    "v1": "underwrite",
    "v2": [
      "underwrote"
    ],
    "v3": [
      "underwritten"
    ],
    "meaning": "bảo hiểm, cam kết tài chính",
    "level": 9,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "undo",
    "v1": "undo",
    "v2": [
      "undid"
    ],
    "v3": [
      "undone"
    ],
    "meaning": "hủy thao tác, tháo ra",
    "level": 9,
    "frequency": "common",
    "patternGroup": "v1!=v2!=v3"
  },
  {
    "id": "unfreeze",
    "v1": "unfreeze",
    "v2": [
      "unfroze"
    ],
    "v3": [
      "unfrozen"
    ],
    "meaning": "rã đông, giải băng",
    "level": 9,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "unhang",
    "v1": "unhang",
    "v2": [
      "unhung"
    ],
    "v3": [
      "unhung"
    ],
    "meaning": "tháo xuống (bức tranh)",
    "level": 9,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "unhide",
    "v1": "unhide",
    "v2": [
      "unhid"
    ],
    "v3": [
      "unhidden"
    ],
    "meaning": "bỏ ẩn, hiện ra",
    "level": 9,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "unhold",
    "v1": "unhold",
    "v2": [
      "unheld"
    ],
    "v3": [
      "unheld"
    ],
    "meaning": "buông ra",
    "level": 9,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "unknit",
    "v1": "unknit",
    "v2": [
      "unknit",
      "unknitted"
    ],
    "v3": [
      "unknit",
      "unknitted"
    ],
    "meaning": "tháo len đan",
    "level": 9,
    "frequency": "rare",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "unlearn",
    "v1": "unlearn",
    "v2": [
      "unlearned",
      "unlearnt"
    ],
    "v3": [
      "unlearned",
      "unlearnt"
    ],
    "meaning": "gạt bỏ thói quen cũ",
    "level": 9,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "unmake",
    "v1": "unmake",
    "v2": [
      "unmade"
    ],
    "v3": [
      "unmade"
    ],
    "meaning": "hủy hoại, trả lại nguyên trạng",
    "level": 9,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "unsay",
    "v1": "unsay",
    "v2": [
      "unsaid"
    ],
    "v3": [
      "unsaid"
    ],
    "meaning": "rút lại lời nói",
    "level": 10,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "unstick",
    "v1": "unstick",
    "v2": [
      "unstuck"
    ],
    "v3": [
      "unstuck"
    ],
    "meaning": "gỡ ra, bóc ra",
    "level": 10,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "unstring",
    "v1": "unstring",
    "v2": [
      "unstrung"
    ],
    "v3": [
      "unstrung"
    ],
    "meaning": "nới dây đàn, làm mất tinh thần",
    "level": 10,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "unwind",
    "v1": "unwind",
    "v2": [
      "unwound"
    ],
    "v3": [
      "unwound"
    ],
    "meaning": "tháo cuộn, thư giãn",
    "level": 10,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "uphold",
    "v1": "uphold",
    "v2": [
      "upheld"
    ],
    "v3": [
      "upheld"
    ],
    "meaning": "tôn trọng, duy trì (pháp luật)",
    "level": 10,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "upset",
    "v1": "upset",
    "v2": [
      "upset"
    ],
    "v3": [
      "upset"
    ],
    "meaning": "làm buồn lòng, làm xáo trộn",
    "level": 10,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "waylay",
    "v1": "waylay",
    "v2": [
      "waylaid"
    ],
    "v3": [
      "waylaid"
    ],
    "meaning": "mai phục, chặn đường",
    "level": 10,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "weave",
    "v1": "weave",
    "v2": [
      "wove",
      "weaved"
    ],
    "v3": [
      "woven",
      "weaved"
    ],
    "meaning": "dệt vải, đan lại",
    "level": 10,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "wed",
    "v1": "wed",
    "v2": [
      "wed",
      "wedded"
    ],
    "v3": [
      "wed",
      "wedded"
    ],
    "meaning": "kết hôn",
    "level": 10,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "weep",
    "v1": "weep",
    "v2": [
      "wept"
    ],
    "v3": [
      "wept"
    ],
    "meaning": "khóc lóc, rỉ nước",
    "level": 10,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "wet",
    "v1": "wet",
    "v2": [
      "wet",
      "wetted"
    ],
    "v3": [
      "wet",
      "wetted"
    ],
    "meaning": "làm ướt",
    "level": 10,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "whet",
    "v1": "whet",
    "v2": [
      "whet",
      "whetted"
    ],
    "v3": [
      "whet",
      "whetted"
    ],
    "meaning": "mài sắc, kích thích (tò mò)",
    "level": 10,
    "frequency": "rare",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "wind",
    "v1": "wind",
    "v2": [
      "wound"
    ],
    "v3": [
      "wound"
    ],
    "meaning": "cuộn lại, lên dây cót",
    "level": 10,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "withdraw",
    "v1": "withdraw",
    "v2": [
      "withdrew"
    ],
    "v3": [
      "withdrawn"
    ],
    "meaning": "rút tiền, rút khỏi",
    "level": 10,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "withhold",
    "v1": "withhold",
    "v2": [
      "withheld"
    ],
    "v3": [
      "withheld"
    ],
    "meaning": "giữ lại, từ chối cấp",
    "level": 10,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "withstand",
    "v1": "withstand",
    "v2": [
      "withstood"
    ],
    "v3": [
      "withstood"
    ],
    "meaning": "chịu đựng, chống lại",
    "level": 10,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "wring",
    "v1": "wring",
    "v2": [
      "wrung"
    ],
    "v3": [
      "wrung"
    ],
    "meaning": "vắt (quần áo), vặn tay",
    "level": 10,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "backbite",
    "v1": "backbite",
    "v2": [
      "backbit"
    ],
    "v3": [
      "backbitten"
    ],
    "meaning": "nói lén, nói xấu sau lưng",
    "level": 10,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "backslide",
    "v1": "backslide",
    "v2": [
      "backslid"
    ],
    "v3": [
      "backslid",
      "backslidden"
    ],
    "meaning": "tái phạm thói xấu",
    "level": 10,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "befall",
    "v1": "befall",
    "v2": [
      "befell"
    ],
    "v3": [
      "befallen"
    ],
    "meaning": "xảy đến, giáng xuống",
    "level": 10,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "beget",
    "v1": "beget",
    "v2": [
      "begot",
      "begat"
    ],
    "v3": [
      "begotten"
    ],
    "meaning": "sinh ra, gây ra",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "behold",
    "v1": "behold",
    "v2": [
      "beheld"
    ],
    "v3": [
      "beheld"
    ],
    "meaning": "ngắm nhìn, chiêm ngưỡng",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "bespeak",
    "v1": "bespeak",
    "v2": [
      "bespoke"
    ],
    "v3": [
      "bespoken"
    ],
    "meaning": "chứng tỏ, đặt làm riêng",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "beset",
    "v1": "beset",
    "v2": [
      "beset"
    ],
    "v3": [
      "beset"
    ],
    "meaning": "bao vây, quấy rầy",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "bestrew",
    "v1": "bestrew",
    "v2": [
      "bestrewed"
    ],
    "v3": [
      "bestrewed",
      "bestrewn"
    ],
    "meaning": "rải rác khắp nơi",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "bestride",
    "v1": "bestride",
    "v2": [
      "bestrode"
    ],
    "v3": [
      "bestridden"
    ],
    "meaning": "bước qua, cưỡi",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "betake",
    "v1": "betake",
    "v2": [
      "betook"
    ],
    "v3": [
      "betaken"
    ],
    "meaning": "dẫn thân, đi đến",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "bethink",
    "v1": "bethink",
    "v2": [
      "bethought"
    ],
    "v3": [
      "bethought"
    ],
    "meaning": "suy xét, nhớ lại",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "browbeat",
    "v1": "browbeat",
    "v2": [
      "browbeat"
    ],
    "v3": [
      "browbeaten",
      "browbeat"
    ],
    "meaning": "hăm dọa, đe dọa",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "crossbreed",
    "v1": "crossbreed",
    "v2": [
      "crossbred"
    ],
    "v3": [
      "crossbred"
    ],
    "meaning": "lai tạo giống",
    "level": 11,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "crosscut",
    "v1": "crosscut",
    "v2": [
      "crosscut"
    ],
    "v3": [
      "crosscut"
    ],
    "meaning": "cắt ngang, đi tắt",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "disprove",
    "v1": "disprove",
    "v2": [
      "disproved"
    ],
    "v3": [
      "disproven",
      "disproved"
    ],
    "meaning": "bác bỏ, chứng minh sai",
    "level": 11,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "dogfight",
    "v1": "dogfight",
    "v2": [
      "dogfought"
    ],
    "v3": [
      "dogfought"
    ],
    "meaning": "không chiến, giao chiến cận kề",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "drawback",
    "v1": "drawback",
    "v2": [
      "drewback"
    ],
    "v3": [
      "drawnback"
    ],
    "meaning": "rút lui",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "gainsay",
    "v1": "gainsay",
    "v2": [
      "gainsaid"
    ],
    "v3": [
      "gainsaid"
    ],
    "meaning": "chối cãi, phủ nhận",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "ghostwrite",
    "v1": "ghostwrite",
    "v2": [
      "ghostwrote"
    ],
    "v3": [
      "ghostwritten"
    ],
    "meaning": "viết thuê",
    "level": 11,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "hamstring",
    "v1": "hamstring",
    "v2": [
      "hamstrung",
      "hamstringed"
    ],
    "v3": [
      "hamstrung",
      "hamstringed"
    ],
    "meaning": "cắt gân kheo, làm tê liệt",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "inbreed",
    "v1": "inbreed",
    "v2": [
      "inbred"
    ],
    "v3": [
      "inbred"
    ],
    "meaning": "phối giống đồng huyết",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "inlay",
    "v1": "inlay",
    "v2": [
      "inlaid"
    ],
    "v3": [
      "inlaid"
    ],
    "meaning": "khảm, cẩn",
    "level": 11,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "input",
    "v1": "input",
    "v2": [
      "input",
      "inputted"
    ],
    "v3": [
      "input",
      "inputted"
    ],
    "meaning": "nhập dữ liệu",
    "level": 11,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "inset",
    "v1": "inset",
    "v2": [
      "inset"
    ],
    "v3": [
      "inset"
    ],
    "meaning": "lồng vào, chèn vào",
    "level": 12,
    "frequency": "rare",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "interbreed",
    "v1": "interbreed",
    "v2": [
      "interbred"
    ],
    "v3": [
      "interbred"
    ],
    "meaning": "giao phối khác loài",
    "level": 12,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "intercut",
    "v1": "intercut",
    "v2": [
      "intercut"
    ],
    "v3": [
      "intercut"
    ],
    "meaning": "cắt cảnh xen kẽ",
    "level": 12,
    "frequency": "rare",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "interlay",
    "v1": "interlay",
    "v2": [
      "interlaid"
    ],
    "v3": [
      "interlaid"
    ],
    "meaning": "đặt xen vào",
    "level": 12,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "interweave",
    "v1": "interweave",
    "v2": [
      "interwove",
      "interweaved"
    ],
    "v3": [
      "interwoven",
      "interweaved"
    ],
    "meaning": "dệt xen kẽ, trộn lẫn",
    "level": 12,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "misbecome",
    "v1": "misbecome",
    "v2": [
      "misbecame"
    ],
    "v3": [
      "misbecome"
    ],
    "meaning": "không hợp, không xứng",
    "level": 12,
    "frequency": "rare",
    "patternGroup": "v1=v3"
  },
  {
    "id": "miscast",
    "v1": "miscast",
    "v2": [
      "miscast"
    ],
    "v3": [
      "miscast"
    ],
    "meaning": "phân vai không hợp",
    "level": 12,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "misdeal",
    "v1": "misdeal",
    "v2": [
      "misdealt"
    ],
    "v3": [
      "misdealt"
    ],
    "meaning": "chia bài sai",
    "level": 12,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "misdo",
    "v1": "misdo",
    "v2": [
      "misdid"
    ],
    "v3": [
      "misdone"
    ],
    "meaning": "làm sai, phạm lỗi",
    "level": 12,
    "frequency": "rare",
    "patternGroup": "v1!=v2!=v3"
  },
  {
    "id": "misgive",
    "v1": "misgive",
    "v2": [
      "misgave"
    ],
    "v3": [
      "misgiven"
    ],
    "meaning": "làm lo âu, hoài nghi",
    "level": 12,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "mishear",
    "v1": "mishear",
    "v2": [
      "misheard"
    ],
    "v3": [
      "misheard"
    ],
    "meaning": "nghe nhầm",
    "level": 12,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "mishit",
    "v1": "mishit",
    "v2": [
      "mishit"
    ],
    "v3": [
      "mishit"
    ],
    "meaning": "đánh bóng trượt",
    "level": 12,
    "frequency": "rare",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "mislay",
    "v1": "mislay",
    "v2": [
      "mislaid"
    ],
    "v3": [
      "mislaid"
    ],
    "meaning": "để thất lạc",
    "level": 12,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "mislead",
    "v1": "mislead",
    "v2": [
      "misled"
    ],
    "v3": [
      "misled"
    ],
    "meaning": "làm lạc hướng, dối lừa",
    "level": 12,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "misread",
    "v1": "misread",
    "v2": [
      "misread"
    ],
    "v3": [
      "misread"
    ],
    "meaning": "đọc nhầm, hiểu sai",
    "level": 12,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "misspeak",
    "v1": "misspeak",
    "v2": [
      "misspoke"
    ],
    "v3": [
      "misspoken"
    ],
    "meaning": "lỡ lời, nói lộn",
    "level": 12,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "misspend",
    "v1": "misspend",
    "v2": [
      "misspent"
    ],
    "v3": [
      "misspent"
    ],
    "meaning": "lãng phí (tiền/tuổi trẻ)",
    "level": 12,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "misunderstand",
    "v1": "misunderstand",
    "v2": [
      "misunderstood"
    ],
    "v3": [
      "misunderstood"
    ],
    "meaning": "hiểu nhầm",
    "level": 12,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "miswrite",
    "v1": "miswrite",
    "v2": [
      "miswrote"
    ],
    "v3": [
      "miswritten"
    ],
    "meaning": "viết sai",
    "level": 12,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "offset",
    "v1": "offset",
    "v2": [
      "offset"
    ],
    "v3": [
      "offset"
    ],
    "meaning": "bù đắp, đền bù",
    "level": 12,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "outbid",
    "v1": "outbid",
    "v2": [
      "outbid"
    ],
    "v3": [
      "outbid"
    ],
    "meaning": "trả giá cao hơn",
    "level": 13,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "outdo",
    "v1": "outdo",
    "v2": [
      "outdid"
    ],
    "v3": [
      "outdone"
    ],
    "meaning": "vượt trội hơn",
    "level": 13,
    "frequency": "medium",
    "patternGroup": "v1!=v2!=v3"
  },
  {
    "id": "outfight",
    "v1": "outfight",
    "v2": [
      "outfought"
    ],
    "v3": [
      "outfought"
    ],
    "meaning": "đánh giỏi hơn",
    "level": 13,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "outgrow",
    "v1": "outgrow",
    "v2": [
      "outgrew"
    ],
    "v3": [
      "outgrown"
    ],
    "meaning": "lớn nhanh hơn, bỏ thói quen",
    "level": 13,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "outlay",
    "v1": "outlay",
    "v2": [
      "outlaid"
    ],
    "v3": [
      "outlaid"
    ],
    "meaning": "chi tiêu, bỏ vốn",
    "level": 13,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "outrun",
    "v1": "outrun",
    "v2": [
      "outran"
    ],
    "v3": [
      "outrun"
    ],
    "meaning": "chạy nhanh hơn",
    "level": 13,
    "frequency": "medium",
    "patternGroup": "v1=v3"
  },
  {
    "id": "outsell",
    "v1": "outsell",
    "v2": [
      "outsold"
    ],
    "v3": [
      "outsold"
    ],
    "meaning": "bán chạy hơn",
    "level": 13,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "outshine",
    "v1": "outshine",
    "v2": [
      "outshone",
      "outshined"
    ],
    "v3": [
      "outshone",
      "outshined"
    ],
    "meaning": "tỏa sáng hơn",
    "level": 13,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "outsing",
    "v1": "outsing",
    "v2": [
      "outsang"
    ],
    "v3": [
      "outsung"
    ],
    "meaning": "hát hay hơn",
    "level": 13,
    "frequency": "rare",
    "patternGroup": "vowel_change"
  },
  {
    "id": "outspeak",
    "v1": "outspeak",
    "v2": [
      "outspoke"
    ],
    "v3": [
      "outspoken"
    ],
    "meaning": "nói nhiều/thẳng thắn hơn",
    "level": 13,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "outthink",
    "v1": "outthink",
    "v2": [
      "outthought"
    ],
    "v3": [
      "outthought"
    ],
    "meaning": "khôn khéo hơn",
    "level": 13,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "outwear",
    "v1": "outwear",
    "v2": [
      "outwore"
    ],
    "v3": [
      "outworn"
    ],
    "meaning": "dùng bền hơn, làm kiệt sức",
    "level": 13,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "overbear",
    "v1": "overbear",
    "v2": [
      "overbore"
    ],
    "v3": [
      "overborne"
    ],
    "meaning": "đè bẹp, áp đảo",
    "level": 13,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "overblow",
    "v1": "overblow",
    "v2": [
      "overblew"
    ],
    "v3": [
      "overblown"
    ],
    "meaning": "thổi phồng quá mức",
    "level": 13,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "overbuild",
    "v1": "overbuild",
    "v2": [
      "overbuilt"
    ],
    "v3": [
      "overbuilt"
    ],
    "meaning": "xây dựng quá nhiều",
    "level": 13,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "overbuy",
    "v1": "overbuy",
    "v2": [
      "overbought"
    ],
    "v3": [
      "overbought"
    ],
    "meaning": "mua quá nhiều",
    "level": 13,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "overcast",
    "v1": "overcast",
    "v2": [
      "overcast"
    ],
    "v3": [
      "overcast"
    ],
    "meaning": "mây phủ u uất",
    "level": 13,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "overeat",
    "v1": "overeat",
    "v2": [
      "overate"
    ],
    "v3": [
      "overeaten"
    ],
    "meaning": "ăn bội thực, ăn quá nhiều",
    "level": 13,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "overfeed",
    "v1": "overfeed",
    "v2": [
      "overfed"
    ],
    "v3": [
      "overfed"
    ],
    "meaning": "cho ăn quá nhiều",
    "level": 13,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "overfly",
    "v1": "overfly",
    "v2": [
      "overflew"
    ],
    "v3": [
      "overflown"
    ],
    "meaning": "bay qua vùng trời",
    "level": 13,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "overgrow",
    "v1": "overgrow",
    "v2": [
      "overgrew"
    ],
    "v3": [
      "overgrown"
    ],
    "meaning": "mọc um tùm",
    "level": 14,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "overhang",
    "v1": "overhang",
    "v2": [
      "overhung"
    ],
    "v3": [
      "overhung"
    ],
    "meaning": "nhô ra trên",
    "level": 14,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "overhear",
    "v1": "overhear",
    "v2": [
      "overheard"
    ],
    "v3": [
      "overheard"
    ],
    "meaning": "nghe lỏm",
    "level": 14,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "overlay",
    "v1": "overlay",
    "v2": [
      "overlaid"
    ],
    "v3": [
      "overlaid"
    ],
    "meaning": "phủ lên trên",
    "level": 14,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "overlie",
    "v1": "overlie",
    "v2": [
      "overlay"
    ],
    "v3": [
      "overlain"
    ],
    "meaning": "nằm đè lên",
    "level": 14,
    "frequency": "rare",
    "patternGroup": "v1!=v2!=v3"
  },
  {
    "id": "overpay",
    "v1": "overpay",
    "v2": [
      "overpaid"
    ],
    "v3": [
      "overpaid"
    ],
    "meaning": "trả quá nhiều tiền",
    "level": 14,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "override",
    "v1": "override",
    "v2": [
      "overrode"
    ],
    "v3": [
      "overridden"
    ],
    "meaning": "đè lên, gạt phắt đi",
    "level": 14,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "overrun",
    "v1": "overrun",
    "v2": [
      "overran"
    ],
    "v3": [
      "overrun"
    ],
    "meaning": "tràn qua, vượt quá",
    "level": 14,
    "frequency": "medium",
    "patternGroup": "v1=v3"
  },
  {
    "id": "oversee",
    "v1": "oversee",
    "v2": [
      "oversaw"
    ],
    "v3": [
      "overseen"
    ],
    "meaning": "giám sát",
    "level": 14,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "oversell",
    "v1": "oversell",
    "v2": [
      "oversold"
    ],
    "v3": [
      "oversold"
    ],
    "meaning": "tâng bốc quá lời",
    "level": 14,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "oversew",
    "v1": "oversew",
    "v2": [
      "oversewed"
    ],
    "v3": [
      "oversewn",
      "oversewed"
    ],
    "meaning": "khâu mép",
    "level": 14,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "overshoot",
    "v1": "overshoot",
    "v2": [
      "overshot"
    ],
    "v3": [
      "overshot"
    ],
    "meaning": "bắn quá mục tiêu, đi quá",
    "level": 14,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "oversleep",
    "v1": "oversleep",
    "v2": [
      "overslept"
    ],
    "v3": [
      "overslept"
    ],
    "meaning": "ngủ quen, ngủ quá giờ",
    "level": 14,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "overspend",
    "v1": "overspend",
    "v2": [
      "overspent"
    ],
    "v3": [
      "overspent"
    ],
    "meaning": "chi tiêu quá tay",
    "level": 14,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "overspill",
    "v1": "overspill",
    "v2": [
      "overspilled",
      "overspilt"
    ],
    "v3": [
      "overspilled",
      "overspilt"
    ],
    "meaning": "tràn ra ngoài",
    "level": 14,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "overthink",
    "v1": "overthink",
    "v2": [
      "overthought"
    ],
    "v3": [
      "overthought"
    ],
    "meaning": "suy nghĩ quá nhiều",
    "level": 14,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "overthrow",
    "v1": "overthrow",
    "v2": [
      "overthrew"
    ],
    "v3": [
      "overthrown"
    ],
    "meaning": "lật đổ (chính quyền)",
    "level": 14,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "rebind",
    "v1": "rebind",
    "v2": [
      "rebound"
    ],
    "v3": [
      "rebound"
    ],
    "meaning": "đóng lại bìa sách",
    "level": 14,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "rebuild",
    "v1": "rebuild",
    "v2": [
      "rebuilt"
    ],
    "v3": [
      "rebuilt"
    ],
    "meaning": "xây dựng lại",
    "level": 14,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "recast",
    "v1": "recast",
    "v2": [
      "recast"
    ],
    "v3": [
      "recast"
    ],
    "meaning": "đúc lại, tính toán lại",
    "level": 14,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "redo",
    "v1": "redo",
    "v2": [
      "redid"
    ],
    "v3": [
      "redone"
    ],
    "meaning": "làm lại",
    "level": 15,
    "frequency": "common",
    "patternGroup": "v1!=v2!=v3"
  },
  {
    "id": "redraw",
    "v1": "redraw",
    "v2": [
      "redrew"
    ],
    "v3": [
      "redrawn"
    ],
    "meaning": "vẽ lại",
    "level": 15,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "refit",
    "v1": "refit",
    "v2": [
      "refit",
      "refitted"
    ],
    "v3": [
      "refit",
      "refitted"
    ],
    "meaning": "sửa chữa trang bị lại",
    "level": 15,
    "frequency": "rare",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "regrind",
    "v1": "regrind",
    "v2": [
      "reground"
    ],
    "v3": [
      "reground"
    ],
    "meaning": "mài lại",
    "level": 15,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "regrow",
    "v1": "regrow",
    "v2": [
      "regrew"
    ],
    "v3": [
      "regrown"
    ],
    "meaning": "mọc lại",
    "level": 15,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "rehang",
    "v1": "rehang",
    "v2": [
      "rehung"
    ],
    "v3": [
      "rehung"
    ],
    "meaning": "treo lại",
    "level": 15,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "rehear",
    "v1": "rehear",
    "v2": [
      "reheard"
    ],
    "v3": [
      "reheard"
    ],
    "meaning": "nghe xử lại (tòa án)",
    "level": 15,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "reknit",
    "v1": "reknit",
    "v2": [
      "reknit",
      "reknitted"
    ],
    "v3": [
      "reknit",
      "reknitted"
    ],
    "meaning": "đan lại",
    "level": 15,
    "frequency": "rare",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "relay",
    "v1": "relay",
    "v2": [
      "relaid"
    ],
    "v3": [
      "relaid"
    ],
    "meaning": "lát lại, chuyển tiếp",
    "level": 15,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "relearn",
    "v1": "relearn",
    "v2": [
      "relearned",
      "relearnt"
    ],
    "v3": [
      "relearned",
      "relearnt"
    ],
    "meaning": "học lại",
    "level": 15,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "relight",
    "v1": "relight",
    "v2": [
      "relit",
      "relighted"
    ],
    "v3": [
      "relit",
      "relighted"
    ],
    "meaning": "thắp sáng lại",
    "level": 15,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "remake",
    "v1": "remake",
    "v2": [
      "remade"
    ],
    "v3": [
      "remade"
    ],
    "meaning": "làm lại, làm lại phim",
    "level": 15,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "rend",
    "v1": "rend",
    "v2": [
      "rent"
    ],
    "v3": [
      "rent"
    ],
    "meaning": "xé toạc, xé rách",
    "level": 15,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "repay",
    "v1": "repay",
    "v2": [
      "repaid"
    ],
    "v3": [
      "repaid"
    ],
    "meaning": "hoàn tiền, trả nợ",
    "level": 15,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "reread",
    "v1": "reread",
    "v2": [
      "reread"
    ],
    "v3": [
      "reread"
    ],
    "meaning": "đọc lại",
    "level": 15,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "rerun",
    "v1": "rerun",
    "v2": [
      "reran"
    ],
    "v3": [
      "rerun"
    ],
    "meaning": "phát lại (chương trình)",
    "level": 15,
    "frequency": "common",
    "patternGroup": "v1=v3"
  },
  {
    "id": "resell",
    "v1": "resell",
    "v2": [
      "resold"
    ],
    "v3": [
      "resold"
    ],
    "meaning": "bán lại",
    "level": 15,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "reset",
    "v1": "reset",
    "v2": [
      "reset"
    ],
    "v3": [
      "reset"
    ],
    "meaning": "đặt lại, cài đặt lại",
    "level": 15,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "resew",
    "v1": "resew",
    "v2": [
      "resewed"
    ],
    "v3": [
      "resewn",
      "resewed"
    ],
    "meaning": "may lại",
    "level": 15,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "retake",
    "v1": "retake",
    "v2": [
      "retook"
    ],
    "v3": [
      "retaken"
    ],
    "meaning": "thi lại, chiếm lại",
    "level": 15,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "retell",
    "v1": "retell",
    "v2": [
      "retold"
    ],
    "v3": [
      "retold"
    ],
    "meaning": "kể lại",
    "level": 16,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "rethink",
    "v1": "rethink",
    "v2": [
      "rethought"
    ],
    "v3": [
      "rethought"
    ],
    "meaning": "cân nhắc lại",
    "level": 16,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "rewin",
    "v1": "rewin",
    "v2": [
      "rewon"
    ],
    "v3": [
      "rewon"
    ],
    "meaning": "giành lại chiến thắng",
    "level": 16,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "rewind",
    "v1": "rewind",
    "v2": [
      "rewound"
    ],
    "v3": [
      "rewound"
    ],
    "meaning": "tua lại (băng/video)",
    "level": 16,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "rewrite",
    "v1": "rewrite",
    "v2": [
      "rewrote"
    ],
    "v3": [
      "rewritten"
    ],
    "meaning": "viết lại",
    "level": 16,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "rive",
    "v1": "rive",
    "v2": [
      "rived"
    ],
    "v3": [
      "riven",
      "rived"
    ],
    "meaning": "chẻ đôi, làm tan nát",
    "level": 16,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "roughhew",
    "v1": "roughhew",
    "v2": [
      "roughhewed"
    ],
    "v3": [
      "roughhewn"
    ],
    "meaning": "đẽo thô",
    "level": 16,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "shoe",
    "v1": "shoe",
    "v2": [
      "shod",
      "shoed"
    ],
    "v3": [
      "shod",
      "shoed"
    ],
    "meaning": "đóng móng ngựa",
    "level": 16,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "singe",
    "v1": "singe",
    "v2": [
      "singed"
    ],
    "v3": [
      "singed"
    ],
    "meaning": "làm cháy xém",
    "level": 16,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "skywrite",
    "v1": "skywrite",
    "v2": [
      "skywrote"
    ],
    "v3": [
      "skywritten"
    ],
    "meaning": "viết chữ bằng khói trên trời",
    "level": 16,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "sneak",
    "v1": "sneak",
    "v2": [
      "snuck",
      "sneaked"
    ],
    "v3": [
      "snuck",
      "sneaked"
    ],
    "meaning": "lén lút đi",
    "level": 16,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "variants": [
      {
        "form": "snuck",
        "region": "US"
      }
    ]
  },
  {
    "id": "strew",
    "v1": "strew",
    "v2": [
      "strewed"
    ],
    "v3": [
      "strewn",
      "strewed"
    ],
    "meaning": "rắc, rải",
    "level": 16,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "sweat",
    "v1": "sweat",
    "v2": [
      "sweat",
      "sweated"
    ],
    "v3": [
      "sweat",
      "sweated"
    ],
    "meaning": "đổ mồ hôi",
    "level": 16,
    "frequency": "common",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "telecast",
    "v1": "telecast",
    "v2": [
      "telecast"
    ],
    "v3": [
      "telecast"
    ],
    "meaning": "phát sóng truyền hình",
    "level": 16,
    "frequency": "rare",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "testdrive",
    "v1": "testdrive",
    "v2": [
      "testdrove"
    ],
    "v3": [
      "testdriven"
    ],
    "meaning": "lái thử xe",
    "level": 16,
    "frequency": "common",
    "patternGroup": "en_suffix"
  },
  {
    "id": "testfly",
    "v1": "testfly",
    "v2": [
      "testflew"
    ],
    "v3": [
      "testflown"
    ],
    "meaning": "bay thử nghiệm",
    "level": 16,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "typecast",
    "v1": "typecast",
    "v2": [
      "typecast"
    ],
    "v3": [
      "typecast"
    ],
    "meaning": "gắn chặt vào 1 dạng vai diễn",
    "level": 16,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "typeset",
    "v1": "typeset",
    "v2": [
      "typeset"
    ],
    "v3": [
      "typeset"
    ],
    "meaning": "sắp chữ in",
    "level": 16,
    "frequency": "rare",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "typewrite",
    "v1": "typewrite",
    "v2": [
      "typewrote"
    ],
    "v3": [
      "typewritten"
    ],
    "meaning": "đánh máy chữ",
    "level": 16,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "unclothe",
    "v1": "unclothe",
    "v2": [
      "unclothed",
      "unclad"
    ],
    "v3": [
      "unclothed",
      "unclad"
    ],
    "meaning": "cởi áo quần",
    "level": 16,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "underbid",
    "v1": "underbid",
    "v2": [
      "underbid"
    ],
    "v3": [
      "underbid"
    ],
    "meaning": "bỏ giá thấp hơn",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "underbuy",
    "v1": "underbuy",
    "v2": [
      "underbought"
    ],
    "v3": [
      "underbought"
    ],
    "meaning": "mua dưới khả năng",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "undercut",
    "v1": "undercut",
    "v2": [
      "undercut"
    ],
    "v3": [
      "undercut"
    ],
    "meaning": "hạ giá để cạnh tranh",
    "level": 17,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "underfeed",
    "v1": "underfeed",
    "v2": [
      "underfed"
    ],
    "v3": [
      "underfed"
    ],
    "meaning": "cho ăn suy dinh dưỡng",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "undergird",
    "v1": "undergird",
    "v2": [
      "undergirt",
      "undergirded"
    ],
    "v3": [
      "undergirt",
      "undergirded"
    ],
    "meaning": "gia cố phía dưới",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "undershoot",
    "v1": "undershoot",
    "v2": [
      "undershot"
    ],
    "v3": [
      "undershot"
    ],
    "meaning": "bắn rơi ngắn hơn mục tiêu",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "underspend",
    "v1": "underspend",
    "v2": [
      "underspent"
    ],
    "v3": [
      "underspent"
    ],
    "meaning": "chi tiêu dưới ngân sách",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "unhitch",
    "v1": "unhitch",
    "v2": [
      "unhitched"
    ],
    "v3": [
      "unhitched"
    ],
    "meaning": "tháo xích, gỡ móc",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "unlay",
    "v1": "unlay",
    "v2": [
      "unlaid"
    ],
    "v3": [
      "unlaid"
    ],
    "meaning": "tháo xoắn (dây cáp)",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "unreeve",
    "v1": "unreeve",
    "v2": [
      "unrove",
      "unreeved"
    ],
    "v3": [
      "unrove",
      "unreeved"
    ],
    "meaning": "tháo dây luồn",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "unshoe",
    "v1": "unshoe",
    "v2": [
      "unshod"
    ],
    "v3": [
      "unshod"
    ],
    "meaning": "tháo móng (ngựa)",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "unthink",
    "v1": "unthink",
    "v2": [
      "unthought"
    ],
    "v3": [
      "unthought"
    ],
    "meaning": "xóa bỏ tư tưởng",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "untread",
    "v1": "untread",
    "v2": [
      "untrod"
    ],
    "v3": [
      "untrodden"
    ],
    "meaning": "đi ngược lại dấu chân",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "unweave",
    "v1": "unweave",
    "v2": [
      "unwove"
    ],
    "v3": [
      "unwoven"
    ],
    "meaning": "tháo gỡ sợi dệt",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "vex",
    "v1": "vex",
    "v2": [
      "vext",
      "vexed"
    ],
    "v3": [
      "vext",
      "vexed"
    ],
    "meaning": "làm phiền lòng, phẫn nộ",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "winterfeed",
    "v1": "winterfeed",
    "v2": [
      "winterfed"
    ],
    "v3": [
      "winterfed"
    ],
    "meaning": "cho ăn qua mùa đông",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "wiredraw",
    "v1": "wiredraw",
    "v2": [
      "wiredrew"
    ],
    "v3": [
      "wiredrawn"
    ],
    "meaning": "kéo sợi kim loại",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "wont",
    "v1": "wont",
    "v2": [
      "wont"
    ],
    "v3": [
      "wont",
      "wonted"
    ],
    "meaning": "quen làm gì",
    "level": 17,
    "frequency": "rare",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "work",
    "v1": "work",
    "v2": [
      "worked",
      "wrought"
    ],
    "v3": [
      "worked",
      "wrought"
    ],
    "meaning": "làm việc, gia công (wrought iron)",
    "level": 17,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "notes": "Wrought cổ nhưng còn dùng trong wrought iron."
  },
  {
    "id": "wreak",
    "v1": "wreak",
    "v2": [
      "wreaked",
      "wrought"
    ],
    "v3": [
      "wreaked",
      "wrought"
    ],
    "meaning": "trút (cơn giận), gây ra",
    "level": 17,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "zinc",
    "v1": "zinc",
    "v2": [
      "zincked",
      "zinced"
    ],
    "v3": [
      "zincked",
      "zinced"
    ],
    "meaning": "mạ kẽm",
    "level": 18,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "abide",
    "v1": "abide",
    "v2": [
      "abode",
      "abided"
    ],
    "v3": [
      "abode",
      "abided"
    ],
    "meaning": "tuân theo, trú ngụ",
    "level": 18,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "backlight",
    "v1": "backlight",
    "v2": [
      "backlit"
    ],
    "v3": [
      "backlit"
    ],
    "meaning": "rọi đèn từ phía sau",
    "level": 18,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "cleave",
    "v1": "cleave",
    "v2": [
      "cleft",
      "clove",
      "cleaved"
    ],
    "v3": [
      "cleft",
      "cloven",
      "cleaved"
    ],
    "meaning": "chẻ đôi, bám chặt",
    "level": 18,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "gild",
    "v1": "gild",
    "v2": [
      "gilded",
      "gilt"
    ],
    "v3": [
      "gilded",
      "gilt"
    ],
    "meaning": "mạ vàng",
    "level": 18,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "gird",
    "v1": "gird",
    "v2": [
      "girded",
      "girt"
    ],
    "v3": [
      "girded",
      "girt"
    ],
    "meaning": "thắt lưng, bao quanh",
    "level": 18,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "heave",
    "v1": "heave",
    "v2": [
      "heaved",
      "hove"
    ],
    "v3": [
      "heaved",
      "hove"
    ],
    "meaning": "nâng lên nặng nhọc",
    "level": 18,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "hew",
    "v1": "hew",
    "v2": [
      "hewed"
    ],
    "v3": [
      "hewn",
      "hewed"
    ],
    "meaning": "đẽo, chặt bằng rìu",
    "level": 18,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "lade",
    "v1": "lade",
    "v2": [
      "laded"
    ],
    "v3": [
      "laden",
      "laded"
    ],
    "meaning": "chất hàng lên tàu",
    "level": 18,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "melt",
    "v1": "melt",
    "v2": [
      "melted"
    ],
    "v3": [
      "melted",
      "molten"
    ],
    "meaning": "tan chảy (molten lava)",
    "level": 18,
    "frequency": "common",
    "patternGroup": "v2=v3",
    "notes": "Molten dùng làm tính từ: molten lava."
  },
  {
    "id": "pen",
    "v1": "pen",
    "v2": [
      "penned",
      "pent"
    ],
    "v3": [
      "penned",
      "pent"
    ],
    "meaning": "nhốt lại, viết lách",
    "level": 18,
    "frequency": "rare",
    "patternGroup": "v2=v3"
  },
  {
    "id": "plead",
    "v1": "plead",
    "v2": [
      "pled",
      "pleaded"
    ],
    "v3": [
      "pled",
      "pleaded"
    ],
    "meaning": "bào chữa, van xin",
    "level": 18,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "seethe",
    "v1": "seethe",
    "v2": [
      "seethed",
      "sod"
    ],
    "v3": [
      "seethed",
      "sodden"
    ],
    "meaning": "sôi sục, tức giận",
    "level": 18,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "smite_literary",
    "v1": "smite",
    "v2": [
      "smote"
    ],
    "v3": [
      "smitten"
    ],
    "meaning": "đáng phạt, tàn phá",
    "level": 18,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "spin",
    "v1": "spin",
    "v2": [
      "spun"
    ],
    "v3": [
      "spun"
    ],
    "meaning": "xoay tròn, quay tơ",
    "level": 18,
    "frequency": "common",
    "patternGroup": "v2=v3"
  },
  {
    "id": "spit_v2",
    "v1": "spit",
    "v2": [
      "spat",
      "spit"
    ],
    "v3": [
      "spat",
      "spit"
    ],
    "meaning": "xiên que nướng, nhổ",
    "level": 18,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  },
  {
    "id": "slit_v2",
    "v1": "slay",
    "v2": [
      "slew"
    ],
    "v3": [
      "slain"
    ],
    "meaning": "tàn sát (dạng cổ)",
    "level": 18,
    "frequency": "rare",
    "patternGroup": "en_suffix"
  },
  {
    "id": "sublet_v2",
    "v1": "sublet",
    "v2": [
      "sublet"
    ],
    "v3": [
      "sublet"
    ],
    "meaning": "cho thuê lại căn hộ",
    "level": 18,
    "frequency": "medium",
    "patternGroup": "v1=v2=v3"
  },
  {
    "id": "tread_v2",
    "v1": "tread",
    "v2": [
      "trod"
    ],
    "v3": [
      "trodden"
    ],
    "meaning": "bước đi trên cỏ",
    "level": 18,
    "frequency": "medium",
    "patternGroup": "en_suffix"
  },
  {
    "id": "wring_v2",
    "v1": "wring",
    "v2": [
      "wrung"
    ],
    "v3": [
      "wrung"
    ],
    "meaning": "vắt khô",
    "level": 18,
    "frequency": "medium",
    "patternGroup": "v2=v3"
  }
];

export const VERBS_BY_ID: Record<string, IrregularVerb> = IRREGULAR_VERBS.reduce(
  (acc, verb) => {
    acc[verb.id] = verb;
    return acc;
  },
  {} as Record<string, IrregularVerb>
);
