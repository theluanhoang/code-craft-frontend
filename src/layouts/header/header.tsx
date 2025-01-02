"use client"

import useSidebarStore from "@/stores/sidebar.store";
import { IconLayoutSidebarRightExpand } from '@tabler/icons-react';
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import HeaderMenuItem from "@/components/header/header-menu";
import useSlug from "@/hooks/use-slug";

import { subjects } from "@/services/subjects";
import { Subject } from "@/types";
import styles from "./header.module.scss";

function Header() {
  const { toggleSidebarUnderXL } = useSidebarStore()
  const pathname = usePathname()
  const { subjectSlug, lessonSlug } = useSlug(pathname)

  return (
    <header className={clsx(styles["header-container"])}>
      <section className={clsx(["container", styles.header])}>
        <figure className={clsx(styles["header-logo"])}>
          <Link href={"/"}>
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/assets/logo.svg" alt="logo" />
            }
          </Link>
        </figure>
        <ul className={clsx(styles["header-menu"])}>
          {subjects.map((subject: Subject) => (

            <li
              key={subject.id}
              className={clsx(
                styles["header-menu-item"],
                subject.slug === subjectSlug && styles["active-menu"]
              )}
            >
              
                <Link href={subject.menu && subject.menu.length > 0 ? "#" : subject.path}>{subject.name}</Link>
              
              {
                subject.menu && subject.menu.length > 0 && (
                  <ul className={clsx(styles["menu-subjects"])}>

                    <HeaderMenuItem
                      key={subject.id}
                      subject={subject}
                      subjectSlug={subjectSlug!}
                      lessonSlug={lessonSlug!}
                    />
                  </ul>

                )
              }
            </li>
          ))}
        </ul>
        <div
          className={clsx(styles["header-view-sidebar"])}
          onClick={toggleSidebarUnderXL}
        >
          <IconLayoutSidebarRightExpand stroke={2} />
        </div>
      </section>
    </header>
  )
}

export default Header
