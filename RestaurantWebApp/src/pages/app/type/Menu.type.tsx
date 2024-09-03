export interface IMenuRegist {
  menu: any
  name: string
  description: string
  image_list: File[]
  image: File
  quantity: number
  ordered: number
  category_id: number
}

export interface IMenuItem {
  id: number
  name: string
  description: string
  quantity: number
  ordered: number
  file_name: string
  created_at: string
  updated_at: string
}
