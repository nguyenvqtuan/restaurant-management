import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useForm } from 'react-hook-form';
import { ISignup } from './type/Signup.type';
import useApi from '@/hooks/useApi';
import { useNavigate } from 'react-router';

const URI_SIGNUP = "/sign-up"
const URI_LOGIN = "/login"

function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ISignup>({})
  const navigate = useNavigate();
  const onSubmit = async (data: ISignup) => {
    const signup = await useApi.post(URI_SIGNUP, data).catch(e => {
      alert(e.data.error.message)
    });
    navigate(URI_LOGIN)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      {...register("userName", {
                        required: true
                      })}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Full name"
                      autoComplete="fullName"
                      {...register("fullName", {
                        required: true
                      })}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      {...register("password", {
                        required: true
                      })}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      {...register("confirmPassword", {
                        required: true,
                        validate: (val: string) => {
                          if (watch("password") != val) {
                            return "Your password do not match"
                          }
                        }
                      })}
                    />
                  </CInputGroup>
                  {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                  <div className="d-grid">
                    <CButton color="success" type="submit">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default App;