import { useEffect, useState } from "react"
import { CButton, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react"
import { IInventoryItem } from "./type/Inventory.type"
import Table from "@/components/Table/TableControl"
import TableLoader from "@/components/Table/TableLoader"
import usePrivateApi from "@/hooks/usePrivateApi"
import { useNavigate } from "react-router"

const URI_INVENTORY = "/inventory"

const Inventory = () => {
  const [inventories, setInventories] = useState<IInventoryItem[]>()
  const [loading, setLoading] = useState(true)
  const nagative = useNavigate();
  const headers = [{
    title: "No"
  }, {
    title: "Name"
  }, {
    title: "Price"
  }, {
    title: "Quantity"
  }, {
    title: "#"
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

  const redirectDetail = (id: number) => {
    nagative(`/inventory/${id}`)
  }

  const deleteInventory = async () => {
    const data = await usePrivateApi.delete(URI_INVENTORY)

    if (data.status === 200) {
      getInventory();
    }
  }

  return (
    <Table headers={headers}>
      <CTableBody>
        {
          loading &&
          <TableLoader
            colSpan={5}
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
              <CTableDataCell>
                <CButton
                  type="button"
                  color="info"
                  className="mx-1"
                  onClick={() => redirectDetail(item.id)}
                >
                  Edit
                </CButton>
                <CButton
                  type="button"
                  color="danger"
                  className="mx-1"
                  onClick={() => deleteInventory}
                >
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))
        }
      </CTableBody>
    </Table >
  )
}

export default Inventory