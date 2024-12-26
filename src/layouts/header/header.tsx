"use client"

import Link from "next/link"
import { subjects } from "@/services/subjects"
import useSidebarStore from "@/stores/sidebar.store"
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar"
import clsx from "clsx"

import styles from "./header.module.scss"

function Header() {
  const { toggleSidebarUnderXL } = useSidebarStore()
  return (
    <header className={clsx(styles["header-container"])}>
      <section className={clsx(["container", styles.header])}>
        <figure className="header__logo">
          <Link href={"/"}>
            <img src="/assets/logo.svg" alt="logo" />
          </Link>
        </figure>
        <ul className={clsx(styles["header__menu"])}>
          {subjects.map((subject) => (
            <li
              key={subject.id}
              className={clsx([
                styles["header__menu-item"],
                styles["active-menu"],
              ])}
            >
              {subject.name}{" "}
            </li>
          ))}
        </ul>
        <div
          className={clsx(styles["header-view-sidebar"])}
          onClick={toggleSidebarUnderXL}
        >
          <ViewSidebarIcon />
        </div>
      </section>
    </header>
  )
}

export default Header
