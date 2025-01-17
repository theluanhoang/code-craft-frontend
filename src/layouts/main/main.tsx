"use client"

import useSidebarStore from "@/stores/sidebar.store"
import clsx from "clsx"
import React, { ReactNode, useRef, useState } from "react"

import useBreakpoint from "@/hooks/use-breakpoint"

import Sidebar from "../sidebar/sidebar"
import styles from "./main.module.scss"

interface MainProps {
  children: ReactNode
}

const Main: React.FC<MainProps> = ({ children }) => {
  const sidebarRef = useRef<HTMLElement>(null)
  const [sidebarWidth, setSidebarWidth] = useState<number>(0);
  const [isCompleteMeasure, setIsCompleteMeasure] = useState<boolean>(false);
  const { isOverXL } = useBreakpoint()
  const { isSidebarOpen } = useSidebarStore()

  React.useEffect(() => {
    if (!isOverXL) {
      setIsCompleteMeasure(true);
      return;
    }

    const observer = new ResizeObserver(() => {
      if (sidebarRef.current) {
        setSidebarWidth(sidebarRef.current.offsetWidth);
        setIsCompleteMeasure(true);
      }
    });

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current);
    }

    return () => {
      if (sidebarRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sidebarRef.current);
      }
    };
  }, [isOverXL]);

  return (
    <main className={clsx([styles["main-layout"]])}>
      <Sidebar ref={sidebarRef} />
      {
        isCompleteMeasure && <div
          className={clsx(["container", styles["main-content"]])}
          style={{
            marginLeft: `${isOverXL && isSidebarOpen ? sidebarWidth : 0}px`,
          }}
        >
          {children}
        </div>
      }
    </main>
  )
}

export default Main
