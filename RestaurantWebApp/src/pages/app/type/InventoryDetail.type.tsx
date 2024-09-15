export interface IInventoryDetailItem {
  id: number
  name: string
  status: number
  type: number
  inventory: string
}

export interface IInventoryDetailRegist {
  name: string
  status: number
  type: number
  inventory_id: number
}