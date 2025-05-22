"use client"

import { useEffect, useState, useRef, type RefObject } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}): [boolean, RefObject<HTMLDivElement | null>] {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (freezeOnceVisible) {
            observer.unobserve(node)
          }
        } else if (!freezeOnceVisible) {
          setIsVisible(false)
        }
      },
      {
        rootMargin,
        threshold,
      },
    )

    observer.observe(node)

    return () => {
      observer.unobserve(node)
    }
  }, [threshold, rootMargin, freezeOnceVisible])

    return [isVisible, ref]

}
