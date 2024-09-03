import { useEffect, useState } from "react"
import { CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react"
import { IInventoryItem } from "./type/Inventory.type"
import Table from "@/components/Table/TableControl"
import TableLoader from "@/components/Table/TableLoader"
import usePrivateApi from "@/hooks/usePrivateApi"

const URI_INVENTORY = "/inventory"

const Inventory = () => {
  const [inventories, setInventories] = useState<IInventoryItem[]>()
  const [loading, setLoading] = useState(true)
  const headers = [{
    title: "No"
  }, {
    title: "Name"
  }, {
    title: "Price"
  }, {
    title: "Quantity"
  }]

  const getInventory = async () => {
    const data = await usePrivateApi.get(URI_INVENTORY).then((data) => {
      setLoading(false)
      return data
    })

    setInventories(data.data)
  }

  useEffect(() => {
    getInventory();
  }, [])

  return (
    <Table headers={headers}>
      <CTableBody>
        {
          loading &&
          <TableLoader
            colSpan={3}
          />
        }
        {
          !loading &&
          inventories?.map((item: IInventoryItem, index: number) => (
            <CTableRow
              key={item.id}
            >
              <CTableHeaderCell scope="row">
                {index + 1}
              </CTableHeaderCell>
              <CTableDataCell>
                {item.name}
              </CTableDataCell>
              <CTableDataCell>
                {item.price}
              </CTableDataCell>
              <CTableDataCell>
                {item.quantity}
              </CTableDataCell>
            </CTableRow>
          ))
        }
      </CTableBody>
    </Table >
  )
}

export default Inventory