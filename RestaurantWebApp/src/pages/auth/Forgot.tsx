import '@/assets/app/index.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
  from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form';
import { IForgot } from './type/Forgot.type';

function App() {
  const { register, handleSubmit } = useForm<IForgot>()
  const onSubmit = (data: IForgot) => {
    console.log(data)
  }
  return (
    <MDBContainer fluid>
      <MDBRow
        className='d-flex justify-content-center align-items-center h-100'
      >
        <MDBCol col='12'>
          <MDBCard
            className='bg-dark text-white my-5 mx-auto'
            style={{ borderRadius: '1rem', maxWidth: '400px' }}
          >
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <form
                className="w-100"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2 className="fw-bold mb-2 text-uppercase text-center">
                  Forgot password
                </h2>
                <p className="text-white-50 mb-5">
                  Please enter your information
                </p>

                <MDBInput
                  wrapperClass='mb-4 mx-1 w-100'
                  labelClass='text-white'
                  label='User name'
                  id='userName'
                  type='text'
                  size="lg"
                  {...register('userName', {
                    required: true
                  })}
                />
                <MDBBtn
                  outline
                  className='mx-1 px-5'
                  color='white'
                  size='lg'
                >
                  Reset password
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;