export type Subject = {
  id: string
  name: string
  slug: string
  path: string
  dept: number
  parentId?: string | null
  menu?: Subject[] | null
}
