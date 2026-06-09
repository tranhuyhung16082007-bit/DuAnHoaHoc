/**
 * Smart Search Engine v2 — ƯU TIÊN SỐ
 * - Số khớp = trọng số cực cao (×10)
 * - Chữ khớp CHÍNH XÁC (không synonym, không mở rộng)
 * - Gõ "điện phân" → chỉ ra bài có "điện phân", KHÔNG ra bài "đốt cháy"
 */

import { normalizeText } from "./vietnamese";

export type QuestionType = "TN" | "DS" | "TL";

export interface Exercise {
  id: string;
  type: QuestionType;
  tags: string[];
  de_bai: string;
  
  // Cho dạng TN (Multiple Choice)
  dap_an_tn?: "A" | "B" | "C" | "D";
  cac_lua_chon?: {
    A: string;
    B: string;
    C: string;
    D: string;
  };

  // Cho dạng DS (True/False)
  cac_phat_bieu?: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  dap_an_ds?: {
    a: boolean;
    b: boolean;
    c: boolean;
    d: boolean;
  };

  // Cho dạng TL (Short Answer)
  dap_an_tl?: string;

  loi_giai: string;
}

export interface SearchResult {
  exercise: Exercise;
  score: number;
}

/**
 * Trích xuất tất cả số từ text
 * Xử lý cả format VN (dấu phẩy thập phân: 8,8 → 8.8)
 */
function extractNumbers(text: string): string[] {
  // Chuẩn hóa: thay dấu phẩy thập phân VN thành dấu chấm
  const normalized = text.replace(/(\d),(\d)/g, "$1.$2");
  // Trích xuất tất cả số (bao gồm số thập phân)
  const matches = normalized.match(/\d+\.?\d*/g);
  return matches ? [...new Set(matches)] : [];
}

/**
 * Trích xuất phần chữ (không phải số) từ query
 */
function extractWords(query: string): string[] {
  // Bỏ số và ký tự đặc biệt, chỉ lấy chữ
  const wordsOnly = normalizeText(query)
    .replace(/\d+\.?\d*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!wordsOnly) return [];

  return wordsOnly
    .split(" ")
    .filter((w) => w.length >= 2); // bỏ chữ quá ngắn (1 ký tự)
}

/**
 * Chấm điểm 1 bài tập
 */
function scoreExercise(
  exercise: Exercise,
  queryNumbers: string[],
  queryWords: string[]
): number {
  let score = 0;

  // === LAYER 1: SỐ KHỚP (×10 mỗi số) ===
  if (queryNumbers.length > 0) {
    // Chuẩn hóa số trong đề bài
    const deBaiNormalized = exercise.de_bai.replace(/(\d),(\d)/g, "$1.$2");
    const deBaiNumbers = extractNumbers(deBaiNormalized);

    for (const num of queryNumbers) {
      if (deBaiNumbers.includes(num)) {
        score += 10;
      }
    }
  }

  // === LAYER 2: CHỮ KHỚP CHÍNH XÁC (không synonym) ===
  if (queryWords.length > 0) {
    const normalizedDeBai = normalizeText(exercise.de_bai);
    const normalizedTags = exercise.tags.map((t) => normalizeText(t));

    for (const word of queryWords) {
      // Khớp trong tags (×2)
      let tagMatched = false;
      for (const tag of normalizedTags) {
        if (tag === word || tag.includes(word)) {
          score += 2;
          tagMatched = true;
          break;
        }
      }

      // Khớp trong đề bài (×1) — chỉ nếu chưa khớp tag
      if (!tagMatched && normalizedDeBai.includes(word)) {
        score += 1;
      }
    }
  }

  return score;
}

/**
 * Hàm search chính
 */
export function searchExercises(
  exercises: Exercise[],
  query: string
): SearchResult[] {
  if (!query.trim()) return [];

  const queryNumbers = extractNumbers(query);
  const queryWords = extractWords(query);

  // Phải có ít nhất 1 số hoặc 1 từ
  if (queryNumbers.length === 0 && queryWords.length === 0) return [];

  const results: SearchResult[] = exercises
    .map((exercise) => ({
      exercise,
      score: scoreExercise(exercise, queryNumbers, queryWords),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return results;
}
