import Link from "next/link"
import { Subject } from "@/types"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import clsx from "clsx"

import styles from "./sidebar-item.module.scss"

interface MenuItemProps {
  subject: Subject
  lessonSlug: string
  activedSubject: string[]
  onClick?: (slug?: string) => void
}

interface SidebarMenuProps {
  subject: Subject
  activedSubject: string[]
  lessonSlug: string
  hasMenu: boolean
  onClick?: (slug?: string) => void
}

export default function MenuItem({
  subject,
  lessonSlug,
  activedSubject,
  onClick,
}: MenuItemProps) {
  const hasMenu = subject.menu && subject.menu.length > 0
  const isActiveMenuItem =
    !hasMenu &&
    subject.dept === 0 &&
    activedSubject.includes(subject.slug) &&
    subject.slug === lessonSlug

  const isLessonActive = subject.slug === lessonSlug

  const menuItemClass = clsx(styles["subject-menu-item"], {
    [styles["active-menu-item"]]: isActiveMenuItem || isLessonActive,
  })
  return (
    <li>
      <Link
        key={subject.id}
        href={`${hasMenu ? "#" : subject.path}`}
        className={menuItemClass}
        onClick={() => {
          if (hasMenu && onClick) {
            return onClick(subject.slug)
          }
        }}
        style={{
          paddingLeft: (subject.dept + 1) * 24,
        }}
      >
        <h2 className={styles["subject-title"]}>{subject.name}</h2>
        {hasMenu && (
          <KeyboardArrowDownIcon
            className={clsx(
              activedSubject.includes(subject.slug) && styles["toggle-icon"]
            )}
          />
        )}
      </Link>

      {hasMenu && (
        <SidebarMenu
          hasMenu={hasMenu}
          onClick={onClick}
          subject={subject}
          activedSubject={activedSubject}
          lessonSlug={lessonSlug}
        />
      )}
    </li>
  )
}

function SidebarMenu({
  lessonSlug,
  subject,
  activedSubject,
  onClick,
  hasMenu,
}: SidebarMenuProps) {
  return (
    <>
      {hasMenu && (
        <ul
          className={clsx(
            styles["subject-menu"],
            activedSubject.includes(subject.slug) && styles["toggle-menu"]
          )}
        >
          {subject.menu!.map((subjectChild) => (
            <MenuItem
              onClick={(slug) => onClick?.(slug)}
              key={subjectChild.id}
              subject={subjectChild}
              lessonSlug={lessonSlug}
              activedSubject={activedSubject}
            />
          ))}
        </ul>
      )}
    </>
  )
}
