import { useEffect, useState } from "react"
import { CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react"
import Table from "@/components/TableControl"
import usePrivateApi from "@/hooks/usePrivateApi"
import { IMenuItem } from "./types/MenuType"

const URI_MENU = "/menu"

const Menu = () => {

  const [menus, setMenus] = useState<IMenuItem[]>()
  const headers = [{
    title: "col1"
  }, {
    title: "col2"
  }, {
    title: "col3"
  }]

  const getMenu = async () => {
    const data = usePrivateApi.get(URI_MENU)
    setMenus(data.data)
  }

  useEffect(() => {
    getMenu();
  }, [])

  return (
    <Table headers={headers}>
      <CTableBody>
        {
          menus?.map((item: IMenuItem) => (
            <CTableRow>
              <CTableHeaderCell scope="row">
                1
              </CTableHeaderCell>
              <CTableDataCell>
                {item.name}
              </CTableDataCell>
              <CTableDataCell>
                {item.description}
              </CTableDataCell>
              <CTableDataCell>
                {item.ordered}
              </CTableDataCell>
              <CTableDataCell>
                {item.quantity}
              </CTableDataCell>
              <CTableDataCell>
                {item.createdAt}
              </CTableDataCell>
              <CTableDataCell>
                {item.updatedAt}
              </CTableDataCell>
            </CTableRow>
          ))
        }
      </CTableBody>
    </Table >
  )
}

export default Menu