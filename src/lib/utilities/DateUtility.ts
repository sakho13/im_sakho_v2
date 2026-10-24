export class DateUtility {
  private static readonly _tokyoDateFormatter = new Intl.DateTimeFormat(
    "ja-JP",
    {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
  )

  /**
   *  ISO 8601形式の日付の変換
   * @param raw ISO 8601形式の日付
   * @returns Asia/Tokyoでの年月日
   */
  public static convertISO8601ToFormattedDate(raw: string | undefined): string {
    if (raw === undefined) return "9999年12月31日"

    const date = new Date(raw)
    if (isNaN(date.getTime())) return "9999年12月31日"

    // 実行環境のタイムゾーン (Docker では UTC) に依存せず Asia/Tokyo で整形する
    const parts = DateUtility._tokyoDateFormatter.formatToParts(date)
    const get = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((part) => part.type === type)?.value ?? ""
    return `${get("year")}年${get("month")}月${get("day")}日`
  }
}
