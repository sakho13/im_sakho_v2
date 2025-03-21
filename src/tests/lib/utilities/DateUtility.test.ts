import { DateUtility } from "@/lib/utilities/DateUtility"

describe("lib/utilities/DateUtility", () => {
  describe("convertISO8601ToFormattedDate", () => {
    test("undefinedの場合", () => {
      expect(DateUtility.convertISO8601ToFormattedDate(undefined)).toBe(
        "9999年12月31日",
      )
    })

    test("正常系", () => {
      expect(DateUtility.convertISO8601ToFormattedDate("2021-01-01")).toBe(
        "2021年01月01日",
      )
    })

    test("異常系 適当な文字列", () => {
      expect(DateUtility.convertISO8601ToFormattedDate("invalid date")).toBe(
        "9999年12月31日",
      )
    })
  })
})
