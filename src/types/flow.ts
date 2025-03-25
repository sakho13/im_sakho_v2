export type FlowNode = {
  id: string
  position: { x: number; y: number }
}

export type FlowEdge = {
  id: string
  source: string | null
  target: string | null
}
