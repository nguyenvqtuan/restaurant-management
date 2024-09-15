import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { IInventoryRegist } from './type/Inventory.type'
import usePrivateApi from '@/hooks/usePrivateApi'
import ButtonLoading from '@/components/Button/ButtonLoading'
import useDialog from '@/hooks/useDialog'
import Dialog from '@/components/Dialog/Dialog'

const URI_INVENTORY = '/inventory'

const InventoryRegist = () => {
  const { register, handleSubmit, formState } = useForm<IInventoryRegist>({})
  const { isSubmitting } = formState;
  const navigate = useNavigate()
  const { isOpen, content, openDialog, closeDialog } = useDialog();

  const regist = async (data: IInventoryRegist) => {
    const inventory = await usePrivateApi.post(URI_INVENTORY, data)
    if (inventory?.status === 201) {
      navigate("/inventory")
      toast.success('Regist inventory success')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CButton color="primary" onClick={() => openDialog('test')}>
          Launch demo modal
        </CButton>
        <Dialog title='test' isOpen={isOpen} content={content} closeDialog={closeDialog} />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Inventory regist</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              onSubmit={handleSubmit(regist)}
            >
              <div className="row">
                <div className="col-12 mb-3">
                  <CFormLabel htmlFor="name">
                    Name
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="name"
                    placeholder="Input inventory name"
                    {...register('name')}
                  />
                </div>
                <div className="col-12 mb-3">
                  <CFormLabel htmlFor="price">
                    Price
                  </CFormLabel>
                  <CFormInput
                    type="number"
                    id="price"
                    className="mb-3"
                    {...register('price')}
                  />
                </div>
                <div className="col-12 mb-3">
                  <CFormLabel htmlFor="quantity">
                    Quantity
                  </CFormLabel>
                  <CFormInput
                    type="number"
                    id="quantity"
                    className="mb-3"
                    {...register('quantity')}
                  />
                </div>
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

export default InventoryRegist