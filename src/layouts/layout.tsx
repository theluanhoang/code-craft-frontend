import { ReactNode, Suspense } from "react"

import Header from "./header/header"
import Loading from "./loading"
import Main from "./main/main"

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        <Main>{children}</Main>
      </Suspense>
    </div>
  )
}

export default Layout
