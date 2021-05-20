import { useState, useEffect } from 'react'

type Arr = readonly unknown[]

export function useDebounce<T extends Arr>(
  callback: (...args: T) => any,
  delay: number
) {
  const [callPref, setCallPref] = useState<{ at: number; args: T } | null>(null)

  useEffect(() => {
    if (callPref) {
      const fire = () => {
        setCallPref(null)
        callback(...callPref.args)
      }
      const fireAt = callPref.at + delay
      const fireIn = Math.max(fireAt - Date.now(), 0)
      const id = setTimeout(fire, fireIn)

      return () => clearTimeout(id)
    }
  }, [callback, callPref, delay])

  return (...args: T) => setCallPref({ at: Date.now(), args })
}
