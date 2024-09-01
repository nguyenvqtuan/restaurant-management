import { CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CFormTextarea, CRow } from '@coreui/react'
import { IMenuRegist } from '../auth/type/Menu.type'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import ButtonLoading from '@/components/Button/ButtonLoading'
import usePrivateApi from '@/hooks/usePrivateApi'

const URI_MENU_REGIST = '/menu'

const MenuRegist = () => {
  const { register, handleSubmit, formState } = useForm<IMenuRegist>({})
  const { isSubmitting } = formState;
  const navigate = useNavigate()

  const regist = async (data: IMenuRegist) => {
    data.image = data.image_list[0]
    const menu = await usePrivateApi.post(URI_MENU_REGIST, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (menu?.status === 200) {
      navigate("/menu")
      toast.success('Regist menu success')
    }
  }

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
                  <CFormLabel htmlFor="inputName">Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="inputName"
                    placeholder="Input name menu"
                    {...register('name')}
                  />
                </div>
                <div className="col-6 mb-3">
                  <CFormLabel htmlFor="inputImage">Image</CFormLabel>
                  <CFormInput
                    type="file"
                    id="inputImage"
                    accept='image/*'
                    multiple={false}
                    {...register('image_list')}
                  />
                </div>
              </div>
              <div className='row'>
                <div className="col-6 mb-3">
                  <CFormLabel htmlFor="inputQuantity">Quantity</CFormLabel>
                  <CFormInput
                    type="number"
                    id="inputQuantity"
                    placeholder="Input quantity"
                    {...register('quantity')}
                  />
                </div>
                <div className="col-6 mb-3">
                  <CFormLabel htmlFor="inputOrdered">Ordered</CFormLabel>
                  <CFormInput
                    type="number"
                    id="inputOrdered"
                    placeholder="Input ordered"
                    {...register('ordered')}
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
    </CRow>
  )
}

export default MenuRegist