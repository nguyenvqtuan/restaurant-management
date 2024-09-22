import { useEffect, useState } from "react"
import { CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react"
import { toast } from 'react-toastify'
import Table from "@/components/Table/TableControl"
import TableLoader from "@/components/Table/TableLoader"
import ButtonIcon from "@/components/Button/ButtonIcon"
import usePrivateApi from "@/hooks/usePrivateApi"
import { useNavigate } from "react-router"
import { IInventoryItem } from "./type/Inventory.type"
import Dialog from "@/components/Dialog/Dialog"
import useDialog from "@/hooks/useDialog"

const URI_INVENTORY = "/inventory"

const Inventory = () => {
  const [inventories, setInventories] = useState<IInventoryItem[]>()
  const { isOpen, content, openDialog, closeDialog } = useDialog();
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
    setLoading(true)
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

  const deleteInventory = async (id: number) => {
    const data = await usePrivateApi.delete(`${URI_INVENTORY}/${id}`)

    if (data.status === 200) {
      toast.success('Delete inventory success')
      getInventory();
    }
    closeDialog();
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
                <ButtonIcon
                  type="edit"
                  buttonClass="mx-1"
                  handleClick={() => redirectDetail(item.id)}
                />
                <ButtonIcon
                  type="delete"
                  buttonClass="mx-1"
                  handleClick={() => openDialog('Delete')}
                />
                <Dialog
                  title="Delete inventory"
                  type="confirm"
                  isOpen={isOpen}
                  content={content}
                  confirmDialog={() => deleteInventory(item.id)}
                  closeDialog={closeDialog}
                />
              </CTableDataCell>
            </CTableRow>
          ))
        }
      </CTableBody>
    </Table >
  )
}

export default Inventory