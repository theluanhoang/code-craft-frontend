import { ReactNode } from "react"

import Header from "./header/header"
import Main from "./main/main"

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <Main>{children}</Main>
    </div>
  )
}

export default Layout
