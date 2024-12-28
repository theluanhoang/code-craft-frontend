import { Subject } from "@/types"
import clsx from "clsx"

import Link from "next/link"
import styles from "./header-menu.module.scss"

interface HeaderMenuItemProps {
    subject: Subject
    subjectSlug: string
    lessonSlug: string
}

interface HeaderMenuProps {
    menu: Subject[]
    subjectSlug: string
    lessonSlug: string
}

export default function HeaderMenuItem({
    subject,
    subjectSlug,
    lessonSlug
}: HeaderMenuItemProps) {
    const hasSubmenu = Array.isArray(subject.menu) && subject.menu.length > 0

    return (
        <li
            className={clsx(styles["header-menu-item"], {
                [styles["active-menu"]]: subject.slug === lessonSlug,
            })}
            style={{ marginLeft: subject.dept !== 0 ? (subject.dept - 1) * 16 : 0 }}
        >
            {
                subject.dept !== 0 && <Link className={clsx({
                    [styles.underline]: subject.slug === lessonSlug,
                })} href={hasSubmenu ? "#" : subject.path}>{subject.name}</Link>
            }
            {hasSubmenu && (
                <HeaderMenu menu={subject.menu!} subjectSlug={subjectSlug} lessonSlug={lessonSlug} />
            )}
        </li>
    )
}

function HeaderMenu({ menu, subjectSlug, lessonSlug }: HeaderMenuProps) {
    return (
        <ul className={styles["menu-subjects"]}>
            {menu.map((menuItem) => (
                <HeaderMenuItem
                    key={menuItem.id}
                    subject={menuItem}
                    subjectSlug={subjectSlug}
                    lessonSlug={lessonSlug}
                />
            ))}
        </ul>
    )
}
