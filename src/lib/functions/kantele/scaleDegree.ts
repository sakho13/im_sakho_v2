const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"]

// 弦のインデックス(0始まり)を音度のローマ数字表記(I〜VII)に変換する。
// 8本目以降は次のオクターブの音度として再度 I から繰り返す。
export function scaleDegreeLabel(stringIndex: number): string {
  return ROMAN_NUMERALS[stringIndex % ROMAN_NUMERALS.length]
}
