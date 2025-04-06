export function joinCN(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
