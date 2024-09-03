import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CFormTextarea, CRow } from '@coreui/react'
import { IMenuRegist } from './type/Menu.type'
import { ICategoryItem } from './type/Category.type'
import { toast } from 'react-toastify'
import usePrivateApi from '@/hooks/usePrivateApi'
import FileInput from '@/components/Input/FileInput'
import ButtonLoading from '@/components/Button/ButtonLoading'

const URI_MENU = '/menu'
const URI_CATEGORY = '/category'

const MenuRegist = () => {
  const [categories, setCategories] = useState<ICategoryItem[]>([])
  const { control, register, handleSubmit, formState } = useForm<IMenuRegist>({})
  const { isSubmitting } = formState;
  const navigate = useNavigate()

  const regist = async (data: IMenuRegist) => {
    console.log(data, 'data')
    const menu = await usePrivateApi.post(URI_MENU, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (menu?.status === 200) {
      navigate("/menu")
      toast.success('Regist menu success')
    }
  }

  const getCategories = async () => {
    const data = await usePrivateApi.get(URI_CATEGORY);
    if (data?.status === 201) {
      setCategories(data.data)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Menu regist</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              onSubmit={handleSubmit(regist)}
            >
              <div className="row">
                <div className="col-6 mb-3">
                  <CFormLabel htmlFor="inputName">Category</CFormLabel>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    {...register('category_id')}
                  >
                    <option>Open this select menu</option>
                    {

                      categories?.map((item: ICategoryItem) => (
                        <option value={item.id}>
                          {item.name}
                        </option>
                      ))
                    }
                  </select>
                  <CFormLabel htmlFor="inputName">Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="inputName"
                    className="mb-3"
                    placeholder="Input name menu"
                    {...register('name')}
                  />
                  <CFormLabel htmlFor="inputQuantity">Quantity</CFormLabel>
                  <CFormInput
                    type="number"
                    id="inputQuantity"
                    className="mb-3"
                    placeholder="Input quantity"
                    {...register('quantity')}
                  />
                  <CFormLabel htmlFor="inputOrdered">Ordered</CFormLabel>
                  <CFormInput
                    type="number"
                    id="inputOrdered"
                    placeholder="Input ordered"
                    {...register('ordered')}
                  />
                </div>
                <div className="col-6 mb-3">
                  <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FileInput
                        onChange={onChange}
                        value={value ? URL.createObjectURL(value) : null}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="mb-3">
                <CFormLabel
                  htmlFor="exampleFormControlTextarea1"
                >
                  Description
                </CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  rows={3}
                  {...register('description')}
                ></CFormTextarea>
              </div>
              <ButtonLoading
                isSubmit={isSubmitting}
                value="Submit"
              />
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}

export default MenuRegist