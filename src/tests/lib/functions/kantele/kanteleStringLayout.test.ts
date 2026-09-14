import {
  isKanteleStringOrder,
  oppositeStringOrder,
  orderedStringIndexes,
  stringNumberLabel,
} from "@/lib/functions/kantele/kanteleStringLayout"

describe("lib/functions/kantele/kanteleStringLayout", () => {
  test("弦番号は低音側を1弦とする", () => {
    expect(stringNumberLabel(0)).toBe("1弦")
    expect(stringNumberLabel(4)).toBe("5弦")
  })

  test("低音が下の並びでは高音弦から描画される", () => {
    expect(orderedStringIndexes(5, "bassBottom")).toEqual([4, 3, 2, 1, 0])
  })

  test("低音が上の並びでは低音弦から描画される", () => {
    expect(orderedStringIndexes(5, "bassTop")).toEqual([0, 1, 2, 3, 4])
  })

  test("弦が0本の場合は空配列", () => {
    expect(orderedStringIndexes(0, "bassBottom")).toEqual([])
  })

  test("並び順を反転できる", () => {
    expect(oppositeStringOrder("bassBottom")).toBe("bassTop")
    expect(oppositeStringOrder("bassTop")).toBe("bassBottom")
  })

  test("不正な値は並び順として扱わない", () => {
    expect(isKanteleStringOrder("bassTop")).toBe(true)
    expect(isKanteleStringOrder("unknown")).toBe(false)
    expect(isKanteleStringOrder(undefined)).toBe(false)
  })
})
