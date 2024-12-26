import { useLayoutEffect, useState } from "react"
import debounce from "lodash/debounce"

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
}

type Breakpoint = keyof typeof breakpoints

type BreakpointInfo = {
  currentBreakpoint: Breakpoint
  isOverXL: boolean
}

const useBreakpoint = (): BreakpointInfo => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("xs")
  const [isOverXL, setIsOverXL] = useState<boolean>(false)
  const getBreakpoint = (): Breakpoint => {
    const width = window.innerWidth

    let activeBreakpoint: Breakpoint = "xs"

    Object.entries(breakpoints).forEach(([key, value]) => {
      if (width >= value) {
        activeBreakpoint = key as Breakpoint
      }
    })

    return activeBreakpoint
  }

  useLayoutEffect(() => {
    const updateBreakpoint = debounce(() => {
      setCurrentBreakpoint(getBreakpoint())
      setIsOverXL(window.innerWidth >= breakpoints.xl)
    }, 250)

    window.addEventListener("resize", updateBreakpoint)
    updateBreakpoint()

    return () => {
      window.removeEventListener("resize", updateBreakpoint)
      updateBreakpoint.cancel()
    }
  }, [])

  return { currentBreakpoint, isOverXL }
}

export default useBreakpoint
