import { useMemo } from "react"

const useSlug = (pathname: string) => {
  return useMemo(() => {
    const parts = pathname.split("/").filter(Boolean)
    return [parts[0] || null, parts[parts.length - 1] || null]
  }, [pathname])
}

export default useSlug
