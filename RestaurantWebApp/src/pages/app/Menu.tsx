import { useEffect, useState } from "react"
import { CImage, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react"
import Table from "@/components/TableControl"
import usePrivateApi from "@/hooks/usePrivateApi"
import { IMenuItem } from "./types/MenuType"

const URI_MENU = "/menu"

const Menu = () => {

  const [menus, setMenus] = useState<IMenuItem[]>()
  const headers = [{
    title: "No"
  }, {
    title: "Name"
  }, {
    title: "Description"
  }, {
    title: "Ordered"
  }, {
    title: "Quantity"
  }, {
    title: "Image"
  }, {
    title: "Create at"
  }, {
    title: "Updated at"
  }]

  const getMenu = async () => {
    const data = await usePrivateApi.get(URI_MENU)
    setMenus(data.data)
  }

  useEffect(() => {
    getMenu();
  }, [])

  return (
    <Table headers={headers}>
      <CTableBody>
        {
          menus?.map((item: IMenuItem, index: number) => (
            <CTableRow
              key={item.id}
            >
              <CTableHeaderCell scope="row">
                {index}
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
                <CImage
                  src={item.file_name}
                  thumbnail={true}
                  className="img-fluid img-thumbnail"
                />
              </CTableDataCell>
              <CTableDataCell>
                {item.created_at}
              </CTableDataCell>
              <CTableDataCell>
                {item.updated_at}
              </CTableDataCell>
            </CTableRow>
          ))
        }
      </CTableBody>
    </Table >
  )
}

export default Menu