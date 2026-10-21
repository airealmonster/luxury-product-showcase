import { useState } from 'react'

/**
 * A looping slide counter. `keyFor(i)` stays stable while slide i is inactive,
 * so its CSS animation restarts only when it becomes active again.
 */
export function useSequence(length: number) {
  const [tick, setTick] = useState(0)
  const active = tick % length
  return {
    active,
    next: () => setTick((t) => t + 1),
    goTo: (i: number) => setTick((t) => t + ((i - (t % length) + length) % length)),
    keyFor: (i: number) => tick - (((tick - i) % length) + length) % length,
  }
}
