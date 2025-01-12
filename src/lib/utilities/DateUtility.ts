export class DateUtility {
  /**
   *  ISO 8601形式の日付の変換
   * @param raw ISO 8601形式の日付
   * @returns Asia/Tokyoでの年月日
   */
  public static convertISO8601ToFormattedDate(raw: string | undefined): string {
    if (raw === undefined) {
      return "9999年12年31日"
    }

    const date = new Date(raw)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    return `${year}年${month}月${day}日`
  }
}
