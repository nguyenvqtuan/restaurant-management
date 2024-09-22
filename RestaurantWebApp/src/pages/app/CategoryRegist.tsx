import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ICategoryRegist } from './type/Category.type';
import usePrivateApi from '@/hooks/usePrivateApi';
import ButtonLoading from '@/components/Button/ButtonLoading';

const URI_CATEGORY = '/category';

const CategoryRegist = () => {
  const { register, handleSubmit, formState } = useForm<ICategoryRegist>({});
  const { isSubmitting } = formState;
  const navigate = useNavigate();

  const regist = async (data: ICategoryRegist) => {
    const category = await usePrivateApi.post(URI_CATEGORY, data);
    if (category?.status === 201) {
      navigate('/category');
      toast.success('Regist category success');
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Category regist</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(regist)}>
              <div className="row">
                <div className="col-12 mb-3">
                  <CFormLabel htmlFor="inputName">Name</CFormLabel>
                  <CFormInput
                    type="text"
                    placeholder="Input name category"
                    {...register('name')}
                  />
                </div>
                <div className="col-12">
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <CFormTextarea
                    rows={3}
                    className="mb-3"
                    {...register('description')}
                  />
                </div>
              </div>
              <ButtonLoading isSubmit={isSubmitting} value="Submit" />
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CategoryRegist;
