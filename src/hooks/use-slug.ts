import { useMemo } from "react"

const useSlug = (pathname: string) => {
  return useMemo(() => {
    const parts = pathname.split("/").filter(Boolean)
    
    return {
      subjectSlug: parts[0] || null,
      lessonSlug: parts[parts.length - 1] || null
    }
  }, [pathname])
}

export default useSlug
