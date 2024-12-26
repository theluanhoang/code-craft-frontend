"use client"

import React, { ReactNode, useRef, useState } from "react"
import useSidebarStore from "@/stores/sidebar.store"
import clsx from "clsx"

import useBreakpoint from "@/hooks/use-breakpoint"

import Sidebar from "../sidebar/sidebar"
import styles from "./main.module.scss"

interface MainProps {
  children: ReactNode
}

const Main: React.FC<MainProps> = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(0)
  const [isSidebarMeasured, setIsSidebarMeasured] = useState<boolean>(false)
  const sidebarRef = useRef<HTMLElement>(null)
  const { isOverXL } = useBreakpoint()
  const { isSidebarOpen } = useSidebarStore()

  React.useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (sidebarRef.current) {
        setIsSidebarMeasured(true)
        setSidebarWidth(sidebarRef.current.offsetWidth)
      }
    })

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current)
    }

    return () => {
      if (sidebarRef.current) {
        observer.unobserve(sidebarRef.current)
      }
    }
  }, [sidebarRef])

  return (
    <main className={clsx([styles["main-layout"]])}>
      <Sidebar ref={sidebarRef} />
      <div
        className={clsx(["container", styles["main-content"]])}
        style={{
          marginLeft: `${isOverXL && isSidebarOpen ? sidebarWidth : 0}px`,
        }}
      >
        {children}
      </div>
    </main>
  )
}

export default Main
