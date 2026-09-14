import {
  dumpKanteleScoreToYaml,
  parseKanteleScoreFromYaml,
} from "@/lib/functions/kantele/kanteleScoreYaml"
import { createDefaultKanteleScore } from "@/lib/functions/kantele/createDefaultKanteleScore"

const EXAMPLE_YAML = `
version: 1
title: "Untitled Kantele Tab"
bpm: 100
stepsPerBeat: 2
beatsPerMeasure: 4
length: 16
tuning:
  - G4
  - A4
  - C5
  - D5
  - E5
notes:
  - string: 0
    step: 0
  - string: 2
    step: 0
  - string: 4
    step: 4
  - string: 1
    step: 8
`

describe("lib/functions/kantele/kanteleScoreYaml", () => {
  test("dump してから parse すると元のデータと一致する", () => {
    const score = createDefaultKanteleScore()
    const yaml = dumpKanteleScoreToYaml(score)
    expect(parseKanteleScoreFromYaml(yaml)).toEqual(score)
  })

  test("サンプルYAMLをパースできる", () => {
    const score = parseKanteleScoreFromYaml(EXAMPLE_YAML)
    expect(score).toEqual({
      version: 1,
      title: "Untitled Kantele Tab",
      bpm: 100,
      stepsPerBeat: 2,
      beatsPerMeasure: 4,
      length: 16,
      tuning: ["G4", "A4", "C5", "D5", "E5"],
      notes: [
        { string: 0, step: 0 },
        { string: 2, step: 0 },
        { string: 4, step: 4 },
        { string: 1, step: 8 },
      ],
    })
  })

  test("構文が不正なYAMLはthrow", () => {
    expect(() => parseKanteleScoreFromYaml("title: [")).toThrow()
  })

  test("構造が不正なYAML(tuningが4要素)はthrow", () => {
    expect(() =>
      parseKanteleScoreFromYaml(
        EXAMPLE_YAML.replace("  - E5\n", ""),
      ),
    ).toThrow()
  })

  test("beatsPerMeasure追加前の古いYAMLも4拍子として読み込める", () => {
    const oldFormatYaml = EXAMPLE_YAML.replace("beatsPerMeasure: 4\n", "")
    expect(parseKanteleScoreFromYaml(oldFormatYaml).beatsPerMeasure).toBe(4)
  })
})
