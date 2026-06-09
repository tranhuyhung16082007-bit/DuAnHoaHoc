/**
 * Từ điển đồng nghĩa Hóa học
 * Key: từ gốc (đã bỏ dấu), Value: mảng các cách diễn đạt khác (đã bỏ dấu)
 * Khi học sinh gõ bất kỳ từ nào trong value → hệ thống map ngược về key
 */

export const CHEM_SYNONYMS: Record<string, string[]> = {
  // Phản ứng
  "dot chay":       ["oxi hoa hoan toan", "phan ung chay", "chay trong o2", "dot", "chay", "combustion"],
  "thuy phan":      ["tac dung voi h2o", "phan huy boi nuoc", "thuy phan"],
  "xa phong hoa":   ["thuy phan trong naoh", "tac dung voi naoh", "xa phong", "xp hoa", "saponification"],
  "trung hoa":      ["tac dung voi axit", "tac dung voi bazo", "trung hoa"],
  "trang bac":      ["phan ung trang guong", "trang guong", "agno3 nh3", "tollens"],
  "hidro hoa":      ["cong h2", "khu hoa", "hidro hoa"],
  "este hoa":       ["phan ung este", "tao este"],
  "nhiet phan":     ["phan huy nhiet", "nung"],
  "dien phan":      ["dp dung dich", "dp nong chay"],

  // Hợp chất
  "este":           ["ester", "hop chat este"],
  "lipit":          ["chat beo", "triglyceride", "triglixerit"],
  "amin":           ["amine", "hop chat amin"],
  "amino axit":     ["aminoaxit", "aa"],
  "cacbohidrat":    ["carbohydrate", "gluxit", "duong"],
  "protein":        ["protit", "chat dam"],
  "polime":         ["polymer", "chat deo", "cao su", "to soi"],

  // Tính chất
  "don chuc":       ["1 chuc", "mot chuc"],
  "da chuc":        ["nhieu chuc", "2 chuc", "3 chuc"],
  "no":             ["chi chua lien ket don", "khong co lien ket doi", "bao hoa"],
  "khong no":       ["co lien ket doi", "chua noi doi", "bat bao hoa"],
  "mach ho":        ["khong vong", "mach thang"],

  // Kim loại
  "kim loai":       ["metal", "kl"],
  "phi kim":        ["non metal", "pk"],
  "hop kim":        ["alloy"],
  "an mon":         ["an mon hoa hoc", "an mon dien hoa", "ri set"],
  "day dien hoa":   ["day hoat dong", "day becketov"],

  // Các thuật ngữ chung
  "dung dich":      ["dd", "dung dich"],
  "phan ung":       ["pu", "p/u", "tac dung", "phan ung"],
  "nong do":        ["cm", "c%", "mol/l"],
  "khoi luong":     ["m", "gam", "kg"],
  "the tich":       ["v", "lit", "ml"],
  "so mol":         ["n mol", "mol"],
  "hieu suat":      ["h%", "hieu suat phan ung"],
  "dktc":           ["dieu kien tieu chuan", "0 do c 1 atm"],
};

/**
 * Mở rộng tokens bằng từ điển đồng nghĩa
 * Input: mảng tokens đã bỏ dấu
 * Output: mảng tokens gốc + tokens mở rộng từ synonyms
 */
export function expandWithSynonyms(tokens: string[]): string[] {
  const expanded = new Set(tokens);
  const joinedQuery = tokens.join(' ');

  for (const [canonical, synonyms] of Object.entries(CHEM_SYNONYMS)) {
    // Kiểm tra canonical có match không
    if (joinedQuery.includes(canonical)) {
      expanded.add(canonical);
      synonyms.forEach(s => expanded.add(s));
      continue;
    }

    // Kiểm tra từng synonym có match không
    for (const synonym of synonyms) {
      if (joinedQuery.includes(synonym) || tokens.some(t => synonym.includes(t) && t.length >= 3)) {
        expanded.add(canonical);
        synonyms.forEach(s => expanded.add(s));
        break;
      }
    }
  }

  return Array.from(expanded);
}
