import { fireEvent, render, screen } from "@testing-library/react"
import { KanteleGrid } from "@/components/organisms/kantele/KanteleGrid"

const TUNING = ["D4", "E4", "F#4", "G4", "A4"]

function renderGrid(props: Partial<Parameters<typeof KanteleGrid>[0]> = {}) {
  const onToggleNote = jest.fn()

  render(
    <KanteleGrid
      tuning={TUNING}
      length={32}
      stepsPerBeat={2}
      notes={[]}
      currentStep={null}
      stringOrder='bassBottom'
      onToggleNote={onToggleNote}
      {...props}
    />,
  )

  return { onToggleNote }
}

describe("components/organisms/kantele/KanteleGrid", () => {
  test("1行に詰めず段に折り返して表示する", () => {
    renderGrid()

    // 幅を測れないテスト環境では暫定値(16ステップ)で折り返す
    expect(screen.getByText("1段目")).toBeTruthy()
    expect(screen.getByText("2段目")).toBeTruthy()
    expect(screen.queryByText("3段目")).toBeNull()

    // 弦の本数 × ステップ数ぶんのマスが並ぶ
    expect(screen.getAllByRole("button")).toHaveLength(TUNING.length * 32)
  })

  test("低音が下の並びでは高音弦が先頭行になる", () => {
    renderGrid()

    const firstCell = screen.getAllByRole("button")[0]
    expect(firstCell.getAttribute("aria-label")).toBe("5弦(A4) / 1ステップ目")
  })

  test("低音が上の並びでは低音弦が先頭行になる", () => {
    renderGrid({ stringOrder: "bassTop" })

    const firstCell = screen.getAllByRole("button")[0]
    expect(firstCell.getAttribute("aria-label")).toBe("1弦(D4) / 1ステップ目")
  })

  test("マスをクリックすると弦と位置を渡して切り替える", () => {
    const { onToggleNote } = renderGrid({ stringOrder: "bassTop" })

    fireEvent.click(screen.getByLabelText("2弦(E4) / 3ステップ目"))

    expect(onToggleNote).toHaveBeenCalledWith(1, 2)
  })

  test("置いた音はaria-pressedで示される", () => {
    renderGrid({ notes: [{ string: 0, step: 0 }], stringOrder: "bassTop" })

    const pressed = (label: string) =>
      screen.getByLabelText(label).getAttribute("aria-pressed")

    expect(pressed("1弦(D4) / 1ステップ目")).toBe("true")
    expect(pressed("2弦(E4) / 1ステップ目")).toBe("false")
  })
})
