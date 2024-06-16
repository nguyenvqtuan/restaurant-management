import '@/assets/app/index.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form';
import { ISignup } from './type/Signup.type';
import { Link } from 'react-router-dom';

function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ISignup>({})

  const onSubmit = (data: ISignup) => {
    console.log(data.userName)

  }

  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard
            className='bg-dark text-white my-5 mx-auto'
            style={{ borderRadius: '1rem', maxWidth: '400px' }}
          >
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">
                Signup
              </h2>
              <p className="text-white-50 mb-5">
                Please enter your information
              </p>
              <form
                className="w-100"
                onSubmit={handleSubmit(onSubmit)}
              >
                <MDBInput
                  wrapperClass='mb-4 mx-1 w-100'
                  labelClass='text-white'
                  label='User names'
                  id='userName'
                  type='text'
                  size="lg"
                  {...register("userName", {
                    required: true
                  })}
                />
                {errors.userName && <p>{errors.userName.message}</p>}
                <MDBInput
                  wrapperClass='mb-4 mx-1 w-100'
                  labelClass='text-white'
                  label='Full name'
                  id='fullName'
                  type='text'
                  size="lg"
                  {...register("fullName", {
                    required: true
                  })}
                />
                {errors.fullName && <p>{errors.fullName.message}</p>}
                <MDBInput
                  wrapperClass='mb-4 mx-1 w-100'
                  labelClass='text-white'
                  label='Password'
                  id='password'
                  type='password'
                  size="lg"
                  {...register("password", {
                    required: true
                  })}
                />
                <MDBInput
                  wrapperClass='mb-4 mx-1 w-100'
                  labelClass='text-white'
                  label='Re Password'
                  id='rePassword'
                  type='password'
                  size="lg"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (val: string) => {
                      if (watch('password') != val) {
                        return 'Your password do not match'
                      }
                    },
                  })}
                />
                {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                <MDBBtn
                  outline
                  className='mx-1 px-5'
                  color='white'
                  size='lg'
                  type="submit"
                  block
                >
                  Signup
                </MDBBtn>
              </form>
              <div className="mt-2">
                <p className="mb-0">
                  Do you already account? {" "}
                  <Link to="/login" className="text-white-50 fw-bold">
                    Login
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer >
  );
}

export default App;