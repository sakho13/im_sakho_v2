export type KanteleStringOrder = "bassBottom" | "bassTop"

// 画面上で低音弦をどちら側に並べるか。実機を見たときの並びに合わせて切り替える。
export const DEFAULT_STRING_ORDER: KanteleStringOrder = "bassBottom"

export const STRING_ORDER_LABELS: Record<KanteleStringOrder, string> = {
  bassBottom: "1弦(低音)が下",
  bassTop: "1弦(低音)が上",
}

// 弦番号は低音側を1弦とする。tuning配列のindexに1を足したものと一致する。
export function stringNumberLabel(stringIndex: number): string {
  return `${stringIndex + 1}弦`
}

// 上から下へ描画する順に、tuning配列のindexを並べ替える。
export function orderedStringIndexes(
  stringCount: number,
  order: KanteleStringOrder,
): number[] {
  const indexes = Array.from({ length: Math.max(0, stringCount) }, (_, i) => i)
  return order === "bassBottom" ? indexes.reverse() : indexes
}

export function oppositeStringOrder(
  order: KanteleStringOrder,
): KanteleStringOrder {
  return order === "bassBottom" ? "bassTop" : "bassBottom"
}

export function isKanteleStringOrder(
  value: unknown,
): value is KanteleStringOrder {
  return value === "bassBottom" || value === "bassTop"
}
