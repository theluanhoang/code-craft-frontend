"use client"

import React, { forwardRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { subjects } from "@/services/subjects"
import useSidebarStore from "@/stores/sidebar.store"
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow"
import clsx from "clsx"

import useBreakpoint from "@/hooks/use-breakpoint"
import MenuItem from "@/components/sidebar/sidebar-item"

import styles from "./sidebar.module.scss"

const Sidebar = forwardRef<HTMLElement>((_, ref) => {
  const pathname = usePathname()
  const [subjectSlug, lessonSlug] = React.useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  )
  const {
    isSidebarOpen,
    isSidebarUnderXLOpen,
    activedSubject,
    toggleActiveSubject,
    toggleSidebar,
    toggleSidebarUnderXL,
  } = useSidebarStore()
  const { isOverXL } = useBreakpoint()
  useEffect(() => {
    if (subjectSlug && !activedSubject.includes(subjectSlug)) {
      toggleActiveSubject(subjectSlug)
    }
  }, [subjectSlug, activedSubject, toggleActiveSubject])

  return (
    <>
      {subjects.length > 0 && (
        <aside
          ref={ref}
          className={clsx(styles.sidebar, {
            [styles.open]: isSidebarOpen,
            [styles.visible]: !isOverXL && isSidebarUnderXLOpen,
          })}
        >
          <div className={clsx(styles["sidebar-content"])}>
            {subjects.map((subject) => (
              <MenuItem
                onClick={(slug) => toggleActiveSubject(slug!)}
                key={subject.id}
                subject={subject}
                activedSubject={activedSubject}
                lessonSlug={lessonSlug}
              />
            ))}
          </div>

          <div className={clsx(styles["sidebar-icon"])} onClick={toggleSidebar}>
            <DoubleArrowIcon />
          </div>
        </aside>
      )}
      {isSidebarUnderXLOpen && (
        <div
          onClick={toggleSidebarUnderXL}
          className={clsx(styles.overlay)}
        ></div>
      )}
    </>
  )
})

Sidebar.displayName = "Sidebar"

export default Sidebar
