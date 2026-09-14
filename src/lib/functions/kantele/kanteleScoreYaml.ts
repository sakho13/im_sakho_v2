import { dump, load, JSON_SCHEMA } from "js-yaml"
import { KanteleScore } from "@/types/kantele"
import { validateKanteleScore } from "./validateKanteleScore"

export function dumpKanteleScoreToYaml(score: KanteleScore): string {
  return dump(score, { indent: 2 })
}

export function parseKanteleScoreFromYaml(text: string): KanteleScore {
  const raw = load(text, { schema: JSON_SCHEMA })
  return validateKanteleScore(raw)
}
