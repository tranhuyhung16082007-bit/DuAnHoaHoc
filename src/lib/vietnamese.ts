/**
 * Tiện ích chuẩn hóa tiếng Việt cho Smart Search
 * - Bỏ dấu tiếng Việt
 * - Loại bỏ stopwords
 * - Tokenize chuỗi
 */

const DIACRITICS_MAP: Record<string, string> = {
  'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
  'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
  'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
  'đ': 'd',
  'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
  'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
  'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
  'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
  'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
  'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
  'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
  'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
  'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
};

// Các stopword tiếng Việt phổ biến trong đề Hóa
const STOPWORDS = new Set([
  'cho', 'của', 'và', 'với', 'trong', 'là', 'một', 'các', 'có',
  'được', 'để', 'khi', 'thì', 'từ', 'tại', 'vào', 'ra', 'lên',
  'theo', 'về', 'đã', 'sẽ', 'bị', 'còn', 'vừa', 'đủ', 'thu',
  'sau', 'rồi', 'cần', 'biết', 'rằng', 'hay', 'hoặc', 'nếu',
  'thấy', 'gồm', 'trên', 'dưới', 'nào', 'này', 'đó', 'bao',
  'bằng', 'qua', 'lại',
]);

/**
 * Bỏ dấu tiếng Việt
 */
export function removeDiacritics(str: string): string {
  return str
    .toLowerCase()
    .split('')
    .map(char => DIACRITICS_MAP[char] || char)
    .join('');
}

/**
 * Chuẩn hóa text: bỏ dấu, lowercase, loại ký tự đặc biệt
 */
export function normalizeText(str: string): string {
  return removeDiacritics(str)
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tokenize: tách chuỗi thành mảng token, loại bỏ stopwords
 */
export function tokenize(str: string): string[] {
  const normalized = normalizeText(str);
  return normalized
    .split(' ')
    .filter(token => token.length > 0 && !STOPWORDS.has(token));
}

/**
 * Tokenize nhưng KHÔNG loại bỏ stopwords (dùng cho content matching)
 */
export function tokenizeKeepAll(str: string): string[] {
  const normalized = normalizeText(str);
  return normalized
    .split(' ')
    .filter(token => token.length > 0);
}
