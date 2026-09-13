import { scaleDegreeLabel } from "@/lib/functions/kantele/scaleDegree"

describe("lib/functions/kantele/scaleDegree", () => {
  test("5弦の場合、I〜Vになる", () => {
    expect(scaleDegreeLabel(0)).toBe("I")
    expect(scaleDegreeLabel(1)).toBe("II")
    expect(scaleDegreeLabel(2)).toBe("III")
    expect(scaleDegreeLabel(3)).toBe("IV")
    expect(scaleDegreeLabel(4)).toBe("V")
  })

  test("8本目以降はIから繰り返す", () => {
    expect(scaleDegreeLabel(7)).toBe("I")
    expect(scaleDegreeLabel(8)).toBe("II")
  })
})
